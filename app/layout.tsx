import type { Metadata } from 'next'
import './globals.css'
import { LayoutClient } from '@/components/layout/LayoutClient'
import { Footer } from '@/components/layout/Footer'
import { FloatingButtons } from '@/components/layout/FloatingButtons'

export const metadata: Metadata = {
  metadataBase: new URL('https://elik.xyz'),
  title: {
    default: 'Elik – Premium Store Pakistan',
    template: '%s | Elik',
  },
  description: 'Elik – your destination for premium handbags, luxury perfumes, elegant watches, cosmetics & kids products. Cash on Delivery across Pakistan.',
  keywords: ['premium handbags Pakistan', 'luxury perfumes Pakistan', 'watches Pakistan', 'cosmetics Pakistan', 'Cash on Delivery', 'Elik store', 'online shopping Pakistan'],
  openGraph: {
    siteName: 'Elik',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/png" href="/images/logo.png" />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <LayoutClient />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingButtons />
        </div>
      </body>
    </html>
  )
}
