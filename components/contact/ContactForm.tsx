'use client'
import { useState } from 'react'
import { MessageCircle, Send, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const WHATSAPP_NUMBER = '923045163438'
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID

async function sendContactEmail(data: { name: string; email: string; phone: string; message: string }) {
  if (!FORMSPREE_ID) return
  try {
    await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _subject: `📬 Elik Query – ${data.name}`,
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone || 'Not provided',
        message: data.message,
        submitted_at: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }),
      }),
    })
  } catch { /* WhatsApp is primary */ }
}

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const msg = [
      '📬 *New Contact Form – Elik*', '',
      `👤 Name: ${form.name}`,
      `📧 Email: ${form.email}`,
      form.phone ? `📞 Phone: ${form.phone}` : '',
      '', `💬 Query:\n${form.message}`,
    ].filter(Boolean).join('\n')

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

    await Promise.all([sendContactEmail(form), new Promise<void>(r => setTimeout(r, 600))])

    setIsLoading(false)
    setSubmitted(true)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  if (submitted) {
    return (
      <div className="text-center bg-green-50 border border-green-200 rounded-2xl p-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-stone-900 mb-2">Message Sent!</h3>
        <p className="text-stone-500 mb-6">A WhatsApp window opened with your message pre-filled. If it didn&apos;t open, you can reach us directly below.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="bg-amber-500 hover:bg-amber-600" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }) }}>Send Another</Button>
          <Button variant="outline" className="gap-2 text-green-700 border-green-300 hover:bg-green-50" asChild>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />Open WhatsApp
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-900 mb-1">Full Name *</label>
          <input type="text" value={form.name} onChange={set('name')} placeholder="Your name" required className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:border-amber-400 outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-900 mb-1">Phone Number</label>
          <input type="tel" value={form.phone} onChange={set('phone')} placeholder="03XX XXXXXXX" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:border-amber-400 outline-none transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-900 mb-1">Email Address *</label>
        <input type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" required className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:border-amber-400 outline-none transition-colors" />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-900 mb-1">Your Query *</label>
        <textarea value={form.message} onChange={set('message')} placeholder="Tell us how we can help you..." required rows={5} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:border-amber-400 outline-none transition-colors resize-none" />
      </div>
      <Button type="submit" size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-white gap-2" disabled={isLoading}>
        {isLoading ? (<><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />Sending...</>) : (<><Send className="w-4 h-4" />Send Message</>)}
      </Button>
      <p className="text-xs text-stone-400 text-center">Your message will be sent via WhatsApp for the fastest response.</p>
    </form>
  )
}
