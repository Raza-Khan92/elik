import type { Metadata } from 'next'
import { WishlistContent } from '@/components/wishlist/WishlistContent'

export const metadata: Metadata = {
  title: 'My Wishlist',
  description: 'Your saved items at Elik.',
  robots: { index: false, follow: false },
}

export default function WishlistPage() {
  return <WishlistContent />
}
