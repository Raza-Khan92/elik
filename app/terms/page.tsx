import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText } from 'lucide-react'

const LAST_UPDATED = 'March 21, 2025'
const CONTACT_EMAIL = 'aliraxaa95@gmail.com'
const SITE_NAME = 'Elik'
const SITE_URL = 'www.elik.com'

const SECTIONS = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'products-pricing', title: 'Products & Pricing' },
  { id: 'ordering', title: 'Ordering Process' },
  { id: 'payment', title: 'Payment — Cash on Delivery' },
  { id: 'shipping', title: 'Shipping & Delivery' },
  { id: 'returns', title: 'Returns & Exchanges' },
  { id: 'intellectual-property', title: 'Intellectual Property' },
  { id: 'disclaimer', title: 'Disclaimer of Warranties' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'governing-law', title: 'Governing Law' },
  { id: 'changes', title: 'Changes to Terms' },
  { id: 'contact', title: 'Contact Us' },
]

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `${SITE_NAME} Terms & Conditions — the rules and guidelines that govern your use of our website and purchases.`,
  openGraph: { url: 'https://elik.xyz/terms' },
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <h2 className="text-xl font-serif font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100">{title}</h2>
      <div className="text-stone-600 leading-relaxed space-y-3 text-sm lg:text-base">{children}</div>
    </section>
  )
}

export default function TermsPage() {
  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
      <div className="bg-stone-900 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-amber-400" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white">Terms &amp; Conditions</h1>
          <p className="text-stone-400 mt-3 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <article className="prose prose-stone max-w-none">
            <Section id="acceptance" title="1. Acceptance of Terms">
              <p>By accessing or using the {SITE_NAME} website at {SITE_URL}, browsing our products, or placing an order, you confirm that you are at least 18 years of age and agree to be bound by these Terms &amp; Conditions and our <Link href="/privacy" className="text-amber-600 hover:underline">Privacy Policy</Link>.</p>
              <p>If you do not agree to these terms, please do not use our website or services.</p>
            </Section>

            <Section id="products-pricing" title="2. Products &amp; Pricing">
              <p>All products listed on {SITE_NAME} are subject to availability.</p>
              <ul>
                <li><strong>Pricing:</strong> All prices are listed in Pakistani Rupees (PKR) and are subject to change without prior notice.</li>
                <li><strong>Product Images:</strong> Images are for illustrative purposes. Slight variations in colour may occur.</li>
                <li><strong>Availability:</strong> If a product becomes unavailable after your order is placed, we will notify you and offer a full refund or alternative.</li>
                <li><strong>Discounts:</strong> Promotional discounts are valid for limited periods and cannot be applied retroactively.</li>
              </ul>
            </Section>

            <Section id="ordering" title="3. Ordering Process">
              <p>When you place an order, the following process applies:</p>
              <ul>
                <li><strong>Order Confirmation:</strong> After placing your order, you will receive a WhatsApp message and/or email confirmation. Our team will call you to confirm before dispatch.</li>
                <li><strong>Order Acceptance:</strong> Your order is only accepted once our team has verbally confirmed it with you.</li>
                <li><strong>Accurate Information:</strong> You are responsible for providing accurate delivery information.</li>
                <li><strong>Order Cancellations:</strong> You may cancel your order before it has been dispatched by contacting us on WhatsApp or by phone.</li>
              </ul>
            </Section>

            <Section id="payment" title="4. Payment — Cash on Delivery">
              <p>{SITE_NAME} currently accepts <strong>Cash on Delivery (COD)</strong> as the sole payment method.</p>
              <ul>
                <li>Please ensure the exact amount is available at the time of delivery.</li>
                <li>Refusing to pay upon delivery without a valid reason may result in future orders being declined.</li>
                <li>We are actively working to integrate additional payment methods (EasyPaisa, JazzCash, bank transfer) in the future.</li>
              </ul>
            </Section>

            <Section id="shipping" title="5. Shipping &amp; Delivery">
              <ul>
                <li><strong>Delivery Areas:</strong> We deliver across Pakistan.</li>
                <li><strong>Delivery Time:</strong> Orders are typically delivered within 3–7 business days.</li>
                <li><strong>Free Shipping:</strong> Shipping is free on orders over PKR 5,000.</li>
                <li><strong>Tracking:</strong> Our team will provide updates via WhatsApp once your order is dispatched.</li>
                <li><strong>Delays:</strong> {SITE_NAME} is not responsible for delays caused by courier services or circumstances beyond our control.</li>
              </ul>
            </Section>

            <Section id="returns" title="6. Returns &amp; Exchanges">
              <p>We offer a <strong>30-day return policy</strong> from the date of delivery, subject to the conditions below:</p>
              <ul>
                <li><strong>Eligible for Return:</strong> Items that are unused, unworn, and in their original packaging with all tags attached.</li>
                <li><strong>Not Eligible:</strong> Used, altered, or damaged items. Products marked as &quot;Final Sale&quot;.</li>
                <li><strong>Process:</strong> To initiate a return, contact us via WhatsApp (<a href="https://wa.me/923045163438" className="text-amber-600 hover:underline" target="_blank" rel="noopener noreferrer">+92 304 516 3438</a>) or email within 30 days of delivery.</li>
                <li><strong>Refunds:</strong> Approved refunds will be processed within 7–10 business days via bank transfer or EasyPaisa/JazzCash.</li>
                <li><strong>Defective Items:</strong> Contact us within 48 hours of delivery with photo evidence for a replacement or full refund.</li>
              </ul>
            </Section>

            <Section id="intellectual-property" title="7. Intellectual Property">
              <p>All content on the {SITE_NAME} website — including text, graphics, logos, images, and software — is the property of {SITE_NAME} and is protected under applicable intellectual property laws. You may not reproduce or use any content for commercial purposes without our prior written permission.</p>
            </Section>

            <Section id="disclaimer" title="8. Disclaimer of Warranties">
              <p>The {SITE_NAME} website and its content are provided on an <strong>&quot;as is&quot;</strong> and <strong>&quot;as available&quot;</strong> basis without any warranties of any kind. We do not warrant that the website will be uninterrupted or error-free.</p>
            </Section>

            <Section id="liability" title="9. Limitation of Liability">
              <p>To the fullest extent permitted by law, {SITE_NAME} shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products. Our maximum liability shall not exceed the purchase price paid for the relevant products.</p>
            </Section>

            <Section id="governing-law" title="10. Governing Law">
              <p>These Terms &amp; Conditions are governed by the laws of the <strong>Islamic Republic of Pakistan</strong>. Any disputes shall be subject to the exclusive jurisdiction of the courts of <strong>Lahore, Punjab</strong>.</p>
            </Section>

            <Section id="changes" title="11. Changes to Terms">
              <p>We reserve the right to update these Terms &amp; Conditions at any time. Changes will be effective immediately upon posting. Your continued use of our website after any changes constitutes acceptance of the new terms.</p>
            </Section>

            <Section id="contact" title="12. Contact Us">
              <p>If you have any questions about these Terms &amp; Conditions, please contact us:</p>
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
  )
}
