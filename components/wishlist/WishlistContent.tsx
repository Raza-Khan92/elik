'use client'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice } from '@/lib/utils'

export function WishlistContent() {
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const addItem = useCartStore((state) => state.addItem)

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-[80vh] flex items-center bg-stone-50">
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-red-200" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 mb-2">Your wishlist is empty</h1>
          <p className="text-stone-500 mb-8">Save items you love and come back to them anytime. Your wishlist is saved on this device.</p>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/">Discover Products<ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <div className="bg-stone-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white">My Wishlist</h1>
          <p className="text-stone-400 mt-2 text-sm">{items.length} saved item{items.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <div className="bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center justify-end mb-8">
          <button onClick={clearWishlist} className="text-sm text-red-400 hover:text-red-600 transition-colors">Clear all</button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((product) => (
            <article key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all duration-300">
              <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-stone-50">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </Link>
              <div className="p-3 lg:p-4">
                <Link href={`/product/${product.slug}`}>
                  <h3 className="font-semibold text-stone-900 hover:text-amber-600 transition-colors line-clamp-1 text-sm lg:text-base">{product.name}</h3>
                </Link>
                <p className="font-bold text-amber-600 mt-1">{formatPrice(product.price)}</p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="flex-1 gap-1.5 text-xs h-8 rounded-lg" onClick={() => addItem(product)} disabled={!product.inStock}>
                    <ShoppingCart className="w-3.5 h-3.5" />{product.inStock ? 'Add' : 'Out of Stock'}
                  </Button>
                  <button onClick={() => removeItem(product.id)} className="w-8 h-8 rounded-lg flex items-center justify-center border border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all" aria-label="Remove from wishlist">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/"><ArrowLeft className="w-4 h-4" />Continue Shopping</Link>
          </Button>
        </div>
      </div>
      </div>
    </div>
  )
}
