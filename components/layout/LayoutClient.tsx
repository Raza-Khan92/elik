'use client'
import { Navbar } from './Navbar'
import { CartDrawer } from './CartDrawer'
import { useCartStore } from '@/stores/cartStore'

export function LayoutClient() {
  const { isCartOpen, openCart, closeCart } = useCartStore()
  return (
    <>
      <Navbar onCartClick={openCart} />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  )
}
