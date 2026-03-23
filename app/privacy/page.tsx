import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, ChevronRight } from 'lucide-react'

const LAST_UPDATED = 'March 21, 2025'
const CONTACT_EMAIL = 'aliraxaa95@gmail.com'
const SITE_NAME = 'Elik'
const SITE_URL = 'www.elik.com'

const SECTIONS = [
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use', title: 'How We Use Your Information' },
  { id: 'information-sharing', title: 'Information Sharing' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'cookies', title: 'Cookies & Local Storage' },
  { id: 'your-rights', title: 'Your Rights' },
  { id: 'childrens-privacy', title: "Children's Privacy" },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact', title: 'Contact Us' },
]

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `${SITE_NAME} Privacy Policy — how we collect, use, and protect your personal information when you shop with us.`,
  openGraph: { url: 'https://elikstore.vercel.app/privacy' },
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <h2 className="text-xl font-serif font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100">{title}</h2>
      <div className="text-stone-600 leading-relaxed space-y-3 text-sm lg:text-base">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
      <div className="bg-stone-900 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <nav className="flex items-center text-xs text-stone-500">
              <Link href="/" className="hover:text-stone-300 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 mx-1.5" />
              <span className="text-stone-300">Privacy Policy</span>
            </nav>
          </div>
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white">Privacy Policy</h1>
          <p className="text-stone-400 mt-3 text-sm">Last updated: {LAST_UPDATED}</p>
          <p className="text-stone-400 mt-2 max-w-2xl">Your privacy is important to us. This policy explains how {SITE_NAME} collects, uses, and protects your personal information when you shop with us at {SITE_URL}.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-24 bg-white rounded-2xl border border-stone-100 p-5">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">Contents</p>
              <nav className="space-y-1">
                {SECTIONS.map((s, i) => (
                  <a key={s.id} href={`#${s.id}`} className="flex items-center gap-2 text-sm text-stone-600 hover:text-amber-600 py-1 transition-colors">
                    <span className="text-stone-300 text-xs">{i + 1}.</span>{s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="prose prose-stone max-w-none">
            <Section id="information-we-collect" title="1. Information We Collect">
              <p>When you use our website or place an order, we may collect the following information:</p>
              <ul>
                <li><strong>Personal Identification:</strong> Your full name, phone number, and email address.</li>
                <li><strong>Delivery Information:</strong> Your street address, nearest landmark, city, and postal code.</li>
                <li><strong>Order Information:</strong> Details of the products you purchase, quantities, and order totals.</li>
                <li><strong>Device Information:</strong> Browser type, IP address, and general location.</li>
                <li><strong>Communication Records:</strong> Messages sent to us via WhatsApp, Messenger, or our contact form.</li>
              </ul>
              <p>We do <strong>not</strong> collect or store payment card information. All current transactions use Cash on Delivery.</p>
            </Section>

            <Section id="how-we-use" title="2. How We Use Your Information">
              <p>We use the information we collect for the following purposes:</p>
              <ul>
                <li><strong>Order Processing:</strong> To confirm, process, and deliver your orders.</li>
                <li><strong>Customer Support:</strong> To respond to your queries via WhatsApp, Messenger, or email.</li>
                <li><strong>Communication:</strong> To send order confirmations and delivery updates.</li>
                <li><strong>Fraud Prevention:</strong> To verify orders and prevent fraudulent transactions.</li>
                <li><strong>Website Improvement:</strong> To analyse how our website is used and improve user experience.</li>
              </ul>
            </Section>

            <Section id="information-sharing" title="3. Information Sharing">
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
              <ul>
                <li><strong>Delivery Partners:</strong> Your name, phone, and address may be shared with our courier partners to fulfil your order.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law.</li>
                <li><strong>Business Transfer:</strong> In the event of a merger or acquisition.</li>
              </ul>
            </Section>

            <Section id="data-security" title="4. Data Security">
              <p>We take reasonable measures to protect your personal information:</p>
              <ul>
                <li>Order notifications are sent via WhatsApp and Formspree — both use encrypted connections (HTTPS/TLS).</li>
                <li>Your cart and wishlist data is stored locally on your device (localStorage) and never transmitted to our servers unless you place an order.</li>
                <li>We limit access to your personal information to authorised team members only.</li>
              </ul>
            </Section>

            <Section id="cookies" title="5. Cookies & Local Storage">
              <p>Our website uses browser local storage (not traditional cookies) to save your cart and wishlist between visits. This data stays on your device and is not sent to our servers.</p>
              <p>We may use third-party analytics tools (such as Google Analytics) which may set cookies. You can disable cookies in your browser settings.</p>
            </Section>

            <Section id="your-rights" title="6. Your Rights">
              <p>You have the following rights regarding your personal information:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> Ask us to correct any inaccurate information.</li>
                <li><strong>Deletion:</strong> Request that we delete your personal information.</li>
                <li><strong>Objection:</strong> Object to how we process your information.</li>
              </ul>
              <p>To exercise any of these rights, contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-600 hover:underline">{CONTACT_EMAIL}</a>.</p>
            </Section>

            <Section id="childrens-privacy" title="7. Children's Privacy">
              <p>Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.</p>
            </Section>

            <Section id="changes" title="8. Changes to This Policy">
              <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the &quot;Last updated&quot; date at the top of this page.</p>
            </Section>

            <Section id="contact" title="9. Contact Us">
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <div className="bg-stone-50 rounded-xl p-5 not-prose mt-4">
                <div className="space-y-2 text-sm text-stone-700">
                  <p><strong className="text-stone-900">Elik Store</strong></p>
                  <p>19 G Block Gulberg III, Lahore, Pakistan</p>
                  <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-600 hover:underline">{CONTACT_EMAIL}</a></p>
                  <p>Phone: <a href="tel:+923045163438" className="text-amber-600 hover:underline">+92 304 516 3438</a></p>
                  <p><Link href="/contact" className="text-amber-600 hover:underline">Contact Form →</Link></p>
                </div>
              </div>
            </Section>
          </article>
        </div>
      </div>
    </div>
  )
}
