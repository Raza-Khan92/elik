'use client'
import Link from 'next/link'
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice } from '@/lib/utils'

export function CartContent() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()
  const totalPrice = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-[80vh] flex items-center bg-stone-50">
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-stone-300" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 mb-2">Your cart is empty</h1>
          <p className="text-stone-500 mb-8">Looks like you haven&apos;t added anything yet. Start browsing our premium collections.</p>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/">Start Shopping<ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <div className="bg-stone-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white">Shopping Cart</h1>
          <p className="text-stone-400 mt-2 text-sm">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
      </div>
      <div className="bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center justify-end mb-8">
          <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 transition-colors">Clear all</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-10">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-stone-100 hover:border-amber-100 transition-colors">
                <Link href={`/product/${item.product.slug}`} className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-xl bg-stone-100">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.product.slug}`} className="font-semibold text-stone-900 hover:text-amber-600 transition-colors line-clamp-1 text-sm sm:text-base">
                    {item.product.name}
                  </Link>
                  <p className="text-amber-600 font-bold mt-1">{formatPrice(item.product.price)}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-stone-50 transition-colors text-stone-600" aria-label="Decrease quantity">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-stone-900">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-stone-50 transition-colors text-stone-600" aria-label="Increase quantity">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-stone-900 text-sm sm:text-base">{formatPrice(item.product.price * item.quantity)}</span>
                      <button onClick={() => removeItem(item.product.id)} className="p-1.5 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" aria-label="Remove item">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="gap-2 mt-2" asChild>
              <Link href="/"><ArrowLeft className="w-4 h-4" />Continue Shopping</Link>
            </Button>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900 mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Shipping</span>
                  <span className={totalPrice >= 5000 ? 'text-green-600 font-semibold' : ''}>{totalPrice >= 5000 ? '🎉 Free' : 'Calculated at checkout'}</span>
                </div>
              </div>
              <div className="border-t border-stone-100 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-bold text-stone-900">Total</span>
                  <span className="font-bold text-stone-900 text-xl">{formatPrice(totalPrice)}</span>
                </div>
              </div>
              <Button className="w-full gap-2 h-12 text-base rounded-xl" size="lg" asChild>
                <Link href="/checkout">Proceed to Checkout<ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />Cash on Delivery — pay when it arrives
              </div>
              {totalPrice < 5000 && (
                <div className="mt-3 p-3 bg-amber-50 rounded-xl text-xs text-amber-700 text-center">
                  Add <strong>{formatPrice(5000 - totalPrice)}</strong> more for free shipping!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
