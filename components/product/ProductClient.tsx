'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Heart, ShoppingCart, Check, Minus, Plus, Share2, Copy } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/button'
import { getCategoryBySlug, getSameCategoryProducts, getCrossCategoryProducts } from '@/lib/products'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { formatPrice, getDiscountInfo, cn } from '@/lib/utils'
import type { Product } from '@/types/product'

export function ProductClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showAddedMessage, setShowAddedMessage] = useState(false)
  const [showCopied, setShowCopied] = useState(false)

  const addItem = useCartStore((state) => state.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()

  const category = getCategoryBySlug(product.category)
  const sameCategory = getSameCategoryProducts(product, 4)
  const crossCategory = getCrossCategoryProducts(product)
  const inWishlist = isInWishlist(product.id)
  const discount = getDiscountInfo(product.price, product.originalPrice)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.slug,
    brand: { '@type': 'Brand', name: 'Elik' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'PKR',
      priceValidUntil: '2026-12-31',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: `https://elikstore.vercel.app/product/${product.slug}`,
      seller: { '@type': 'Organization', name: 'Elik Store' },
    },
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url })
      } else {
        await navigator.clipboard.writeText(url)
        setShowCopied(true)
        setTimeout(() => setShowCopied(false), 2000)
      }
    } catch { /* user cancelled */ }
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product)
    setShowAddedMessage(true)
    setTimeout(() => setShowAddedMessage(false), 2000)
  }

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      {/* Breadcrumb */}
      <div className="bg-stone-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm text-stone-500">
            <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            {category && (
              <>
                <Link href={`/category/${category.slug}`} className="hover:text-stone-900 transition-colors">{category.name}</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
              </>
            )}
            <span className="text-stone-900 line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
              {product.newArrival && (
                <span className="absolute top-4 left-4 bg-amber-400 text-stone-900 text-sm font-semibold px-3 py-1 rounded">New Arrival</span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button key={index} onClick={() => setSelectedImage(index)}
                    className={cn('relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors', selectedImage === index ? 'border-amber-400' : 'border-transparent hover:border-stone-300')}>
                    <img src={image} alt={`${product.name} - ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {discount.hasDiscount && (
                <span className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-2">
                  🔥 {discount.percent}% OFF — Save {formatPrice(discount.savings)}
                </span>
              )}
              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900">{product.name}</h1>
              <div className="flex items-center flex-wrap gap-3 mt-2">
                <span className="text-2xl font-bold text-amber-600">{formatPrice(product.price)}</span>
                {discount.hasDiscount && <span className="text-lg text-stone-400 line-through font-normal">{formatPrice(product.originalPrice!)}</span>}
                <span className={cn('text-sm font-semibold px-2 py-0.5 rounded-full', product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600')}>
                  {product.inStock ? '✓ In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <p className="text-stone-500 leading-relaxed">{product.description}</p>

            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-600 text-sm rounded-full">{tag}</span>
              ))}
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-stone-900">Quantity:</span>
                <div className="flex items-center border border-stone-200 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-stone-100 transition-colors" disabled={!product.inStock}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-stone-100 transition-colors" disabled={!product.inStock}>
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart} disabled={!product.inStock}>
                  {showAddedMessage ? <><Check className="w-5 h-5" />Added to Cart</> : <><ShoppingCart className="w-5 h-5" />Add to Cart</>}
                </Button>
                <Button size="lg" variant="outline" className={cn('gap-2', inWishlist && 'border-red-500 text-red-500')} onClick={() => toggleItem(product)}>
                  <Heart className={cn('w-5 h-5', inWishlist && 'fill-current')} />
                  {inWishlist ? 'Saved' : 'Wishlist'}
                </Button>
                <Button size="lg" variant="ghost" className="px-3 relative" onClick={handleShare} title="Share product">
                  {showCopied ? <Copy className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5" />}
                  {showCopied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-stone-900 text-white px-2 py-1 rounded whitespace-nowrap">Link copied!</span>}
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <div className="flex items-center text-sm"><Check className="w-4 h-4 text-green-500 mr-2" /><span className="text-stone-500">Free shipping on orders over PKR 5,000</span></div>
              <div className="flex items-center text-sm"><Check className="w-4 h-4 text-green-500 mr-2" /><span className="text-stone-500">30-day return policy</span></div>
              <div className="flex items-center text-sm"><Check className="w-4 h-4 text-green-500 mr-2" /><span className="text-stone-500">Authentic products guaranteed</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Same Category Row */}
      {sameCategory.length > 0 && (
        <div className="bg-stone-50 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 mb-8">
              More {category?.name ?? 'Like This'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sameCategory.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      )}

      {/* One from each other category */}
      {crossCategory.length > 0 && (
        <div className="bg-white py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 mb-8">
              Explore More at Elik
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {crossCategory.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
