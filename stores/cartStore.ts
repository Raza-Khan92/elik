'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, CartItem } from '@/types/product'

interface CartState {
  items: CartItem[]
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addItem: (product: Product) => {
        const { items } = get()
        const existing = items.find((i) => i.product.id === product.id)
        if (existing) {
          set({ items: items.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) })
        } else {
          set({ items: [...items, { product, quantity: 1 }] })
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) })
      },

      updateQuantity: (productId: string, quantity: number) => {
        const { items } = get()
        if (quantity <= 0) {
          set({ items: items.filter((i) => i.product.id !== productId) })
        } else {
          set({ items: items.map((i) => i.product.id === productId ? { ...i, quantity } : i) })
        }
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((t, i) => t + i.quantity, 0),

      getTotalPrice: () => get().items.reduce((t, i) => t + i.product.price * i.quantity, 0),
    }),
    { name: 'elik-cart-storage', partialize: (s) => ({ items: s.items }) }
  )
)
