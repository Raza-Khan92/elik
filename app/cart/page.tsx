import type { Metadata } from 'next'
import { CartContent } from '@/components/cart/CartContent'

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review your cart and proceed to checkout.',
  robots: { index: false, follow: false },
}

export default function CartPage() {
  return <CartContent />
}
