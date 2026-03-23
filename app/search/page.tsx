import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SearchContent } from '@/components/search/SearchContent'

export const metadata: Metadata = {
  title: 'Search Products',
  description: 'Search for premium handbags, perfumes, watches, cosmetics and kids products at Elik.',
  robots: { index: false, follow: false },
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  )
}
