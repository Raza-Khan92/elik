'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { NAV_LINKS } from '@/config/nav'

interface NavbarProps {
  onCartClick: () => void
}

export function Navbar({ onCartClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  const cartItemsCount = useCartStore((state) => state.getTotalItems())
  const wishlistItemsCount = useWishlistStore((state) => state.items.length)

  const isHomePage = pathname === '/'
  const isTransparent = isHomePage && !isScrolled

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isTransparent ? 'bg-transparent' : 'bg-white shadow-sm border-b border-stone-100'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center" aria-label="Elik Home">
            <img
              src="/images/logo.png"
              alt="Elik"
              className={cn(
                'h-20 w-auto transition-all duration-300',
                isTransparent ? 'brightness-0 invert' : 'brightness-0'
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'text-amber-600 bg-amber-50'
                      : isTransparent
                        ? 'text-white hover:text-amber-300 hover:bg-white/10'
                        : 'text-stone-700 hover:text-amber-600 hover:bg-amber-50'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-xs mx-4 lg:max-w-sm"
          >
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'w-full pr-10 pl-4 py-2 rounded-full text-sm border outline-none transition-all duration-200',
                  isTransparent
                    ? 'border-white/30 bg-white/15 text-white placeholder:text-white/60 focus:bg-white/25 focus:border-white/60'
                    : 'border-stone-200 bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/20'
                )}
              />
              <button
                type="submit"
                aria-label="Search"
                className={cn(
                  'absolute right-3 top-1/2 -translate-y-1/2 transition-colors',
                  isTransparent ? 'text-white/70 hover:text-white' : 'text-stone-400 hover:text-amber-600'
                )}
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Action Icons */}
          <div className="flex items-center gap-1">
            <Link
              href="/search"
              aria-label="Search"
              className={cn(
                'md:hidden p-2 rounded-lg transition-colors',
                isTransparent ? 'text-white hover:bg-white/10' : 'text-stone-600 hover:bg-stone-100 hover:text-amber-600'
              )}
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              href="/wishlist"
              aria-label={`Wishlist (${wishlistItemsCount} items)`}
              className={cn(
                'relative p-2 rounded-lg transition-colors',
                isTransparent ? 'text-white hover:bg-white/10' : 'text-stone-600 hover:bg-stone-100 hover:text-amber-600'
              )}
            >
              <Heart className="w-5 h-5" />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {wishlistItemsCount}
                </span>
              )}
            </Link>

            <button
              onClick={onCartClick}
              aria-label={`Cart (${cartItemsCount} items)`}
              className={cn(
                'relative p-2 rounded-lg transition-colors',
                isTransparent ? 'text-white hover:bg-white/10' : 'text-stone-600 hover:bg-stone-100 hover:text-amber-600'
              )}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                isTransparent ? 'text-white hover:bg-white/10' : 'text-stone-600 hover:bg-stone-100'
              )}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="bg-white border-t border-stone-100 shadow-lg">
          <form onSubmit={handleSearch} className="px-4 pt-4 pb-2">
            <div className="relative">
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 border border-stone-200 rounded-xl text-sm bg-stone-50 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:bg-white transition-all"
              />
              <button type="submit" aria-label="Search" className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <nav className="px-3 pb-4 space-y-0.5" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center py-3 px-3 rounded-xl text-sm font-medium transition-all duration-150',
                    isActive ? 'bg-amber-50 text-amber-600' : 'text-stone-700 hover:bg-stone-50 active:bg-stone-100'
                  )}
                >
                  {link.label}
                  {isActive && <span className="ml-auto w-1.5 h-1.5 bg-amber-500 rounded-full" />}
                </Link>
              )
            })}
            <Link
              href="/contact"
              className={cn(
                'flex items-center py-3 px-3 rounded-xl text-sm font-medium transition-all duration-150',
                pathname === '/contact' ? 'bg-amber-50 text-amber-600' : 'text-stone-700 hover:bg-stone-50 active:bg-stone-100'
              )}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
