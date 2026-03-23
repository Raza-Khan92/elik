import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 – Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="pt-20 min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <p className="text-8xl font-serif font-bold text-stone-200 mb-4">404</p>
        <h1 className="text-2xl font-serif font-bold text-stone-900 mb-3">Page Not Found</h1>
        <p className="text-stone-500 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/category/handbags-wallets"
            className="inline-flex items-center justify-center px-6 py-3 border border-stone-200 hover:border-stone-300 text-stone-700 font-medium rounded-lg transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}
