'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types/product'

interface WishlistState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  toggleItem: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const { items } = get()
        if (!items.some((i) => i.id === product.id)) {
          set({ items: [...items, product] })
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((i) => i.id !== productId) })
      },

      toggleItem: (product: Product) => {
        const { items } = get()
        const exists = items.some((i) => i.id === product.id)
        set({ items: exists ? items.filter((i) => i.id !== product.id) : [...items, product] })
      },

      isInWishlist: (productId: string) => get().items.some((i) => i.id === productId),

      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'elik-wishlist-storage' }
  )
)
