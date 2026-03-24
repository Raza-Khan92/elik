import type { Metadata } from 'next'
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'

const WHATSAPP_NUMBER = '923045163438'
const CONTACT_EMAIL = 'aliraxaa95@gmail.com'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Elik. We\'re here to help with orders, products, and anything else. WhatsApp, email, or contact form.',
  openGraph: {
    title: 'Contact Elik – We\'re Here to Help',
    url: 'https://elik.xyz/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-stone-900 mb-3">Get in Touch</h1>
          <p className="text-stone-500">Have a question about an order or a product? We&apos;re here to help.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-stone-100">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5 text-amber-600" /></div>
                <div>
                  <p className="font-semibold text-stone-900 mb-1">Our Address</p>
                  <p className="text-stone-500 text-sm">19, G Block Gulberg III, Lahore, Pakistan</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-stone-100">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5 text-green-600" /></div>
                <div>
                  <p className="font-semibold text-stone-900 mb-1">Phone / WhatsApp</p>
                  <a href="tel:+923045163438" className="text-stone-500 text-sm hover:text-stone-900 transition-colors block">+92 304 516 3438</a>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-green-600 font-medium hover:underline text-sm mt-1">
                    <MessageCircle className="w-4 h-4" />Chat on WhatsApp
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-stone-100">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-blue-600" /></div>
                <div>
                  <p className="font-semibold text-stone-900 mb-1">Email Us</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-stone-500 text-sm hover:text-stone-900 transition-colors">{CONTACT_EMAIL}</a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
