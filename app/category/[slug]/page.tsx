import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllCategories, getCategoryBySlug, getProductsByCategory } from '@/lib/products'
import { CategoryClient } from '@/components/category/CategoryClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return { title: 'Category Not Found' }

  const title = `${category.name} – Buy Online in Pakistan`
  const description = `Shop ${category.name} at Elik. ${category.description} Cash on Delivery available across Pakistan.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://elikstore.vercel.app/category/${slug}`,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()
  const products = getProductsByCategory(slug)
  return <CategoryClient category={category} products={products} />
}
