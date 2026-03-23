'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Check } from 'lucide-react'
import type { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import { formatPrice, getDiscountInfo, cn } from '@/lib/utils'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)
  const discount = getDiscountInfo(product.price, product.originalPrice)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!product.inStock || justAdded) return
    addItem(product)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all duration-300">
      <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-stone-50" aria-label={`View ${product.name}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount.hasDiscount && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase">
              {discount.percent}% OFF
            </span>
          )}
          {product.newArrival && !discount.hasDiscount && (
            <span className="bg-amber-400 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase">New</span>
          )}
          {product.featured && !product.newArrival && !discount.hasDiscount && (
            <span className="bg-stone-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase">Featured</span>
          )}
          {!product.inStock && (
            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase">Sold Out</span>
          )}
        </div>
        <div className="absolute inset-x-3 bottom-3 hidden md:block opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || justAdded}
            className={cn(
              'w-full py-2 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-2',
              justAdded ? 'bg-green-500 text-white' : product.inStock ? 'bg-stone-900 text-white hover:bg-amber-500' : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            )}
          >
            {justAdded ? <><Check className="w-4 h-4" /> Added</> : <><ShoppingCart className="w-4 h-4" /> {product.inStock ? 'Quick Add' : 'Sold Out'}</>}
          </button>
        </div>
      </Link>

      <button
        onClick={() => toggleItem(product)}
        className={cn(
          'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm',
          inWishlist ? 'bg-red-50 border border-red-200' : 'bg-white/90 border border-stone-200 hover:border-red-200 hover:bg-red-50'
        )}
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart className={cn('w-4 h-4 transition-colors', inWishlist ? 'fill-red-500 text-red-500' : 'text-stone-400 hover:text-red-400')} />
      </button>

      <div className="p-3 lg:p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-stone-900 hover:text-amber-600 transition-colors line-clamp-1 text-sm lg:text-base">{product.name}</h3>
        </Link>
        <p className="hidden lg:block text-xs text-stone-500 mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-2 lg:mt-3">
          <div>
            <span className="font-bold text-stone-900 text-base lg:text-lg">{formatPrice(product.price)}</span>
            {discount.hasDiscount && (
              <span className="ml-1.5 text-xs text-stone-400 line-through">{formatPrice(product.originalPrice!)}</span>
            )}
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock || justAdded}
            className={cn('md:hidden gap-1.5 text-xs h-8 px-3 rounded-lg transition-all', justAdded && 'bg-green-500 hover:bg-green-500')}
          >
            {justAdded ? <><Check className="w-3.5 h-3.5" /> Added</> : <><ShoppingCart className="w-3.5 h-3.5" /> Add</>}
          </Button>
        </div>
      </div>
    </article>
  )
}
