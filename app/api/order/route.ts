import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// ─── Validation Schema ────────────────────────────────────────────────────────

const OrderItemSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  qty: z.number().int().min(1).max(100),
  price: z.string().min(1).max(50),
})

const OrderSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(200).trim(),
  phone: z.string().min(7).max(20).trim(),
  address: z.string().min(5).max(300).trim(),
  landmark: z.string().max(200).trim().optional().default(''),
  city: z.string().min(1).max(100).trim(),
  postalCode: z.string().max(20).trim().optional().default(''),
  items: z.array(OrderItemSchema).min(1).max(50),
  total: z.string().min(1).max(50),
  itemsSummary: z.string().max(2000),
})

type OrderData = z.infer<typeof OrderSchema>

// ─── Rate Limiter ─────────────────────────────────────────────────────────────
// Simple in-memory limiter — resets on cold starts, which is fine for a small store.
// Prevents form-spam and accidental double-submissions.

const ipCache = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_COUNT = 3
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipCache.get(ip)
  if (!entry || now > entry.resetAt) {
    ipCache.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  if (entry.count >= RATE_LIMIT_COUNT) return true
  entry.count++
  return false
}

// ─── WhatsApp Message Builder ─────────────────────────────────────────────────

function buildWhatsAppMessage(d: OrderData): string {
  const itemLines = d.items.map(i => `  • ${i.name} x${i.qty} — ${i.price}`).join('\n')
  return [
    '🛍️ *New Order – Elik Store*',
    `🕐 ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}`,
    '',
    '👤 *Customer*',
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
    '',
    '📦 *Items*',
    itemLines,
    '',
    `💰 *Total: ${d.total}*`,
    `💳 Payment: Cash on Delivery`,
    '',
    '📍 *Delivery Address*',
    d.address,
    d.landmark ? `Near: ${d.landmark}` : null,
    `City: ${d.city}${d.postalCode ? ` – ${d.postalCode}` : ''}`,
  ].filter((l): l is string => l !== null && l !== '').join('\n')
}

// ─── Notification Channels ────────────────────────────────────────────────────

/**
 * Sends an order notification to the business owner's WhatsApp number
 * via the WhatsApp Cloud API (server-to-server — no user action required).
 *
 * Requires these env vars (server-side only, never NEXT_PUBLIC_):
 *   WHATSAPP_ACCESS_TOKEN     — System User permanent token from Meta Business Suite
 *   WHATSAPP_PHONE_NUMBER_ID  — The Phone Number ID from WhatsApp Manager
 *   WHATSAPP_NOTIFY_NUMBER    — The number to receive notifications (your own number)
 *
 * Note: For business-initiated free-form messages to work in production,
 * either add your number as a test number in the Meta App dashboard,
 * or create an approved message template and switch to the template payload below.
 */
async function notifyWhatsApp(message: string): Promise<boolean> {
  const { WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_NOTIFY_NUMBER } = process.env
  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_NOTIFY_NUMBER) {
    console.warn('[order/whatsapp] Missing env vars — skipping WhatsApp notification')
    return false
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: WHATSAPP_NOTIFY_NUMBER,
          type: 'text',
          text: { preview_url: false, body: message },
        }),
      },
    )

    if (!res.ok) {
      // Log the Meta API error server-side only — never expose to client
      const err = await res.json().catch(() => ({}))
      console.error('[order/whatsapp] Meta API error', { status: res.status, err })
    }
    return res.ok
  } catch (err) {
    console.error('[order/whatsapp] Network error', err)
    return false
  }
}

/**
 * Sends the order details to the business email via Formspree.
 * Runs server-side so the Formspree form ID is never exposed to the browser.
 *
 * Requires: FORMSPREE_ORDER_ID env var (no NEXT_PUBLIC_ prefix)
 */
async function notifyEmail(d: OrderData): Promise<boolean> {
  const formspreeId = process.env.FORMSPREE_ORDER_ID
  if (!formspreeId) {
    console.warn('[order/email] FORMSPREE_ORDER_ID not set — skipping email')
    return false
  }

  try {
    const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _subject: `🛍️ New Elik Order – ${d.name}`,
        customer_name: d.name,
        customer_phone: d.phone,
        customer_email: d.email,
        delivery_address: [d.address, d.landmark && `near ${d.landmark}`, d.city, d.postalCode]
          .filter(Boolean)
          .join(', '),
        payment_method: 'Cash on Delivery',
        order_items: d.itemsSummary,
        order_total: d.total,
        submitted_at: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }),
      }),
    })
    if (!res.ok) console.error('[order/email] Formspree error', res.status)
    return res.ok
  } catch (err) {
    console.error('[order/email] Network error', err)
    return false
  }
}

/**
 * Sends an order notification to a Telegram chat via a bot.
 * 100% automatic — no user action required. Fires server-side when an order is placed.
 *
 * Setup steps:
 *   1. Open Telegram → message @BotFather → /newbot → follow prompts → copy the token
 *   2. Start a chat with your new bot (send it any message like /start)
 *   3. Visit https://api.telegram.org/bot{YOUR_TOKEN}/getUpdates in your browser
 *      Find "chat":{"id": XXXXXXX} — that number is your TELEGRAM_CHAT_ID
 *   4. Add both values to .env.local (see below)
 *
 * Requires (server-side only):
 *   TELEGRAM_BOT_TOKEN   — token from @BotFather  e.g. 7123456789:AAFxxx...
 *   TELEGRAM_CHAT_ID     — your personal chat ID   e.g. 123456789
 */
async function notifyTelegram(message: string): Promise<boolean> {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('[order/telegram] Missing env vars — skipping Telegram notification')
    return false
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      },
    )
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error('[order/telegram] API error', { status: res.status, err })
    }
    return res.ok
  } catch (err) {
    console.error('[order/telegram] Network error', err)
    return false
  }
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Rate limit by IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  // 2. Parse body
  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // 3. Validate with Zod — rejects malformed or oversized fields
  const parsed = OrderSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid order data' }, { status: 422 })
  }

  const data = parsed.data
  const message = buildWhatsAppMessage(data)

  // 4. Fire all three channels concurrently — any one succeeding is enough
  const [whatsapp, telegram, email] = await Promise.all([
    notifyWhatsApp(message),
    notifyTelegram(message),
    notifyEmail(data),
  ])

  // 5. Only return an error if ALL channels failed
  if (!whatsapp && !telegram && !email) {
    console.error('[order] All notification channels failed', { name: data.name, phone: data.phone })
    return NextResponse.json(
      { error: 'Could not deliver your order. Please contact us directly on WhatsApp.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
