export interface NavCategory {
  slug: string
  label: string
  href: string
  description: string
  badge?: string
}

export const NAV_CATEGORIES: NavCategory[] = [
  { slug: 'handbags-wallets', label: 'Handbags', href: '/category/handbags-wallets', description: 'Leather bags & wallets' },
  { slug: 'perfumes', label: 'Perfumes', href: '/category/perfumes', description: 'International fragrances' },
  { slug: 'watches', label: 'Watches', href: '/category/watches', description: 'Elegant timepieces' },
  { slug: 'kids-products', label: 'Kids', href: '/category/kids-products', description: 'Books & care products' },
  { slug: 'cosmetics', label: 'Cosmetics', href: '/category/cosmetics', description: 'Beauty essentials' },
]

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  ...NAV_CATEGORIES,
]
