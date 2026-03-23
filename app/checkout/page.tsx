import type { Metadata } from 'next'
import { CheckoutContent } from '@/components/checkout/CheckoutContent'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your order securely. Cash on Delivery available across Pakistan.',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return <CheckoutContent />
}
