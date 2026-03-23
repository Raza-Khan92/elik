import type { Product, Category } from '@/types/product'
import data from '@/data/products.json'

const { products, categories } = data as { products: Product[]; categories: Category[] }

export function getAllProducts(): Product[] {
  return products
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.newArrival)
}

export function getAllCategories(): Category[] {
  return categories
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q))
  )
}

// 4 products from the same category (for "More like this" row)
export function getSameCategoryProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit)
}

// 1 product from each other category (for "Explore other categories" row)
export function getCrossCategoryProducts(product: Product): Product[] {
  const otherCategories = categories.filter((c) => c.slug !== product.category)
  return otherCategories
    .map((cat) => products.find((p) => p.category === cat.slug))
    .filter((p): p is Product => p !== undefined)
}
