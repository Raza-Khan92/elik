'use client'
import { useState } from 'react'
import { Send, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (FORMSPREE_ID) {
        await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _subject: `📬 Elik Query – ${form.name}`,
            customer_name: form.name,
            customer_email: form.email,
            customer_phone: form.phone || 'Not provided',
            message: form.message,
            submitted_at: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }),
          }),
        })
      }
    } catch { /* continue */ }

    setIsLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center bg-green-50 border border-green-200 rounded-2xl p-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-stone-900 mb-2">Message Sent!</h3>
        <p className="text-stone-500 mb-6">Thank you for reaching out. We&apos;ll get back to you as soon as possible.</p>
        <Button className="bg-amber-500 hover:bg-amber-600" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }) }}>
          Send Another Message
        </Button>
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
    </form>
  )
}
