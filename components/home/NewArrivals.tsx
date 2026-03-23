'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getNewArrivals } from '@/lib/products'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/button'

export function NewArrivals() {
  const products = getNewArrivals()

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-amber-600 text-sm font-semibold tracking-wider uppercase">Just Arrived</span>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-stone-900 mt-2">New Arrivals</h2>
          <p className="text-stone-500 mt-4 max-w-xl mx-auto">Be the first to discover our latest additions to the collection.</p>
          <div className="mt-6">
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/search?q=new">View All<ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  )
}
