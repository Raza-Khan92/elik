'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Filter, Grid3X3, LayoutList } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Product, Category } from '@/types/product'

interface Props {
  category: Category
  products: Product[]
}

export function CategoryClient({ category, products }: Props) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'name': return a.name.localeCompare(b.name)
      default: return 0
    }
  })

  return (
    <div className="pt-20">
      <div className="bg-stone-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white">{category.name}</h1>
          <p className="text-stone-400 mt-2 text-sm">{products.length} products</p>
        </div>
      </div>
      <div className="bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <p className="text-stone-500">
            Showing <span className="font-semibold text-stone-900">{products.length}</span> products
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-stone-500" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-stone-200 rounded-lg px-3 py-2 text-sm focus:border-amber-400 outline-none">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
              <button onClick={() => setViewMode('grid')} className={cn('p-2 transition-colors', viewMode === 'grid' ? 'bg-stone-900 text-white' : 'bg-white text-stone-500 hover:bg-stone-100')}>
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={cn('p-2 transition-colors', viewMode === 'list' ? 'bg-stone-900 text-white' : 'bg-white text-stone-500 hover:bg-stone-100')}>
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-stone-500 text-lg">No products found in this category.</p>
            <Button className="mt-4" asChild><Link href="/">Browse All Products</Link></Button>
          </div>
        ) : (
          <div className={cn(viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-4')}>
            {sortedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
