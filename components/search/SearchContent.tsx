'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search as SearchIcon, X, ArrowLeft } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/button'
import { searchProducts } from '@/lib/products'
import type { Product } from '@/types/product'

export function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') || ''

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [results, setResults] = useState<Product[]>(initialQuery ? searchProducts(initialQuery) : [])

  useEffect(() => {
    if (initialQuery) setResults(searchProducts(initialQuery))
  }, [initialQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setResults(searchProducts(searchQuery))
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-stone-900 mb-8">Search Products</h1>
        <form onSubmit={handleSearch} className="max-w-2xl mb-12">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="search"
              placeholder="Search by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 text-lg rounded-lg border border-stone-200 focus:border-amber-400 outline-none"
            />
            {searchQuery && (
              <button type="button" onClick={() => { setSearchQuery(''); setResults([]) }} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>

        {initialQuery || searchQuery ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-stone-900">
                {results.length > 0 ? <>Found <span className="font-semibold">{results.length}</span> results for &quot;{initialQuery || searchQuery}&quot;</> : <>No results found for &quot;{initialQuery || searchQuery}&quot;</>}
              </h2>
            </div>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            ) : (
              <div className="text-center py-16 bg-stone-100 rounded-lg">
                <SearchIcon className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-stone-900 mb-2">No products found</h3>
                <p className="text-stone-500 mb-6">Try searching with different keywords or browse our categories.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button asChild><Link href="/">Browse All</Link></Button>
                  <Button variant="outline" asChild><Link href="/category/handbags-wallets">Handbags</Link></Button>
                  <Button variant="outline" asChild><Link href="/category/perfumes">Perfumes</Link></Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-100 rounded-lg">
            <SearchIcon className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-stone-900 mb-2">Start Searching</h3>
            <p className="text-stone-500 mb-6">Enter a keyword to find products you&apos;re looking for.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="text-sm text-stone-500">Popular:</span>
              {['leather', 'watch', 'perfume', 'makeup'].map(term => (
                <button key={term} onClick={() => { setSearchQuery(term); setResults(searchProducts(term)) }} className="text-sm text-amber-600 hover:underline capitalize">{term.charAt(0).toUpperCase() + term.slice(1)}</button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/"><ArrowLeft className="w-4 h-4" />Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
