import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { NewArrivals } from '@/components/home/NewArrivals'

export const metadata: Metadata = {
  title: 'Elik – Premium Store Pakistan',
  description: 'Elik – your destination for premium handbags, luxury perfumes, elegant watches, cosmetics & kids products. Cash on Delivery across Pakistan. Shop now!',
  openGraph: {
    title: 'Elik – Premium Store Pakistan',
    description: 'Premium handbags, luxury perfumes, elegant watches, cosmetics & kids products. Cash on Delivery across Pakistan.',
    url: 'https://elikstore.vercel.app',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <NewArrivals />

      {/* Newsletter */}
      <section className="py-16 lg:py-24 bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">Stay Updated</span>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mt-2 mb-4">Join the Elik Family</h2>
            <p className="text-stone-400 mb-8">Subscribe for exclusive offers, early access to new arrivals, and style tips.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-stone-800 text-white placeholder:text-stone-500 border border-stone-700 focus:border-amber-400 outline-none transition-colors text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 active:bg-amber-700 transition-colors text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
