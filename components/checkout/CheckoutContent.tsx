'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Check, ArrowLeft, Truck, Package, MessageCircle, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice } from '@/lib/utils'
import type { OrderDetails } from '@/types/product'

const WHATSAPP_NUMBER = '923045163438'

export function CheckoutContent() {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [form, setForm] = useState<OrderDetails>({
    name: '', email: '', phone: '', address: '', landmark: '', city: '', postalCode: '', paymentMethod: 'cash-on-delivery',
  })

  const { items, getTotalPrice, clearCart } = useCartStore()
  const totalPrice = getTotalPrice()

  const set = (field: keyof OrderDetails) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    const orderItems = items.map(item => ({
      name: item.product.name,
      qty: item.quantity,
      price: formatPrice(item.product.price * item.quantity),
    }))
    const total = formatPrice(totalPrice)
    const itemsSummary = orderItems.map(i => `${i.name} x${i.qty} = ${i.price}`).join(' | ')

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items: orderItems, total, itemsSummary }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        alert(data.error ?? 'Something went wrong. Please contact us directly on WhatsApp.')
        setIsProcessing(false)
        return
      }
    } catch {
      alert('Network error. Please check your connection and try again.')
      setIsProcessing(false)
      return
    }

    clearCart()
    setIsProcessing(false)
    setIsOrderPlaced(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isOrderPlaced) {
    return (
      <div className="pt-20 min-h-[80vh] flex items-center bg-stone-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="text-center bg-white border border-stone-200 rounded-2xl p-8 lg:p-14 shadow-sm">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-stone-900 mb-3">Order Confirmed!</h1>
            <p className="text-stone-500 mb-2 max-w-md mx-auto">
              Thank you, <strong>{form.name}</strong>! Your order has been received and is being processed.
            </p>
            <p className="text-stone-400 text-sm mb-8">
              Your order details have been sent to our team automatically. Need help?{' '}
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">
                Chat with us on WhatsApp
              </a>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-amber-500 hover:bg-amber-600" asChild><Link href="/">Continue Shopping</Link></Button>
              <Button variant="outline" className="gap-2 border-green-300 text-green-700 hover:bg-green-50" asChild>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-[60vh] flex items-center">
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-stone-900 mb-3">Your cart is empty</h1>
          <p className="text-stone-500 mb-6">Add some items before proceeding to checkout.</p>
          <Button className="bg-amber-500 hover:bg-amber-600" asChild><Link href="/">Start Shopping</Link></Button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <div className="bg-stone-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white">Secure Checkout</h1>
          <p className="text-stone-400 mt-2 text-sm flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-green-400" />Your information is safe with us
          </p>
        </div>
      </div>
      <div className="bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 lg:p-8">
              <h2 className="text-lg font-semibold text-stone-900 mb-5">Your Contact Details</h2>
              <div className="space-y-4">
                <FormField label="Full Name *">
                  <input type="text" value={form.name} onChange={set('name')} placeholder="e.g. Ahmed Ali" required className="form-input" />
                </FormField>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Phone Number *">
                    <input type="tel" value={form.phone} onChange={set('phone')} placeholder="03XX XXXXXXX" required className="form-input" />
                  </FormField>
                  <FormField label="Email Address *">
                    <input type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" required className="form-input" />
                  </FormField>
                </div>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6 lg:p-8">
              <h2 className="text-lg font-semibold text-stone-900 mb-5">Delivery Address</h2>
              <div className="space-y-4">
                <FormField label="Street Address *">
                  <input type="text" value={form.address} onChange={set('address')} placeholder="House #, Street #, Area/Colony" required className="form-input" />
                </FormField>
                <FormField label="Nearest Landmark" hint="Helps our rider reach you faster">
                  <input type="text" value={form.landmark} onChange={set('landmark')} placeholder="e.g. Near Liberty Market, Lahore" className="form-input" />
                </FormField>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="City *">
                    <input type="text" value={form.city} onChange={set('city')} placeholder="Lahore" required className="form-input" />
                  </FormField>
                  <FormField label="Postal Code">
                    <input type="text" value={form.postalCode} onChange={set('postalCode')} placeholder="54000" className="form-input" />
                  </FormField>
                </div>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6 lg:p-8">
              <h2 className="text-lg font-semibold text-stone-900 mb-5">Payment Method</h2>
              <div className="flex items-center gap-4 p-5 bg-amber-50 border-2 border-amber-400 rounded-xl">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-stone-900">Cash on Delivery</p>
                  <p className="text-sm text-stone-500">Pay in cash when your order arrives at your door</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Available</span>
              </div>
              <p className="text-xs text-stone-400 mt-3">Our team will call you to confirm your order before dispatch. No payment required until delivery.</p>
            </div>

            <Button type="submit" size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base h-14 rounded-xl gap-2" disabled={isProcessing}>
              {isProcessing ? (<><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />Placing Your Order...</>) : (`Confirm Order – ${formatPrice(totalPrice)}`)}
            </Button>
            <Button variant="outline" size="lg" className="w-full gap-2 rounded-xl" asChild>
              <Link href="/cart"><ArrowLeft className="w-4 h-4" />Back to Cart</Link>
            </Button>
          </form>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900 mb-5">
                Order Summary <span className="ml-2 text-sm font-normal text-stone-400">({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
              </h2>
              <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-xl bg-stone-100">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-900 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-stone-400 mt-0.5">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-amber-600 mt-0.5">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-stone-100 pt-4 space-y-2.5 text-sm">
                <div className="flex justify-between text-stone-500"><span>Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
                <div className="flex justify-between text-stone-500">
                  <span>Shipping</span>
                  <span className={totalPrice >= 5000 ? 'text-green-600 font-medium' : 'text-stone-500'}>{totalPrice >= 5000 ? '🎉 Free' : 'Calculated at delivery'}</span>
                </div>
                <div className="border-t border-stone-100 pt-3 flex justify-between">
                  <span className="font-bold text-stone-900 text-base">Total</span>
                  <span className="font-bold text-stone-900 text-xl">{formatPrice(totalPrice)}</span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-500">
                <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />30-day hassle-free returns</p>
                <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />100% authentic products</p>
                <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />Free shipping over PKR 5,000</p>
                <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />Pay only on delivery — zero risk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

function FormField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-800 mb-1">
        {label}{hint && <span className="ml-1 text-xs text-stone-400 font-normal">({hint})</span>}
      </label>
      {children}
    </div>
  )
}
