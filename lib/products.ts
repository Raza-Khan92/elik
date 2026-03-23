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

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const others = products.filter((p) => p.id !== product.id)

  // 3 from the same category first (user is already interested in it)
  const sameCategory = others
    .filter((p) => p.category === product.category)
    .slice(0, 3)

  // Fill remaining slots with 1 random product from a different category
  const remaining = limit - sameCategory.length
  const otherCategories = others
    .filter((p) => p.category !== product.category)
    .sort(() => 0.5 - Math.random())
    .slice(0, remaining)

  return [...sameCategory, ...otherCategories]
}
