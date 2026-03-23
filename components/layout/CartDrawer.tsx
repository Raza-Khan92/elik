'use client'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { useCartStore } from '@/stores/cartStore'
import { Button } from '@/components/ui/button'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()
  const totalPrice = getTotalPrice()

  return (
    <>
      <div
        className={cn('fixed inset-0 bg-black/50 z-50 transition-opacity duration-300', isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none')}
        onClick={onClose}
      />
      <div
        className={cn('fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-xl transition-transform duration-300 flex flex-col', isOpen ? 'translate-x-0' : 'translate-x-full')}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <span className="bg-amber-400 text-stone-900 text-xs font-semibold px-2 py-0.5 rounded-full">{items.length}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-stone-300 mb-4" />
              <h3 className="text-lg font-medium text-stone-900 mb-2">Your cart is empty</h3>
              <p className="text-stone-500 mb-6">Looks like you haven&apos;t added anything yet.</p>
              <Button onClick={onClose} asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3 bg-stone-50 rounded-lg">
                  <Link href={`/product/${item.product.slug}`} className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md" onClick={onClose}>
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.product.slug}`} onClick={onClose} className="font-medium text-sm text-stone-900 hover:text-amber-600 line-clamp-1">
                      {item.product.name}
                    </Link>
                    <p className="text-amber-600 font-semibold mt-1">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:bg-white rounded transition-colors">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:bg-white rounded transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Subtotal</span>
              <span className="text-xl font-semibold">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-stone-500">Shipping and taxes calculated at checkout.</p>
            <div className="space-y-2">
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout" onClick={onClose}>Proceed to Checkout</Link>
              </Button>
              <Button variant="outline" className="w-full" size="lg" onClick={onClose} asChild>
                <Link href="/cart">View Full Cart</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
