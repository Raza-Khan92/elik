'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProducts } from '@/lib/products'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/button'

export function FeaturedProducts() {
  const products = getFeaturedProducts()

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-amber-600 text-sm font-semibold tracking-wider uppercase">Handpicked for You</span>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-stone-900 mt-2">Featured Products</h2>
          <p className="text-stone-500 mt-4 max-w-xl mx-auto">Our most loved items, carefully selected for their exceptional quality and style.</p>
          <div className="mt-6">
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/category/handbags-wallets">View All<ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  )
}
