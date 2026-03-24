import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllProducts, getProductBySlug } from '@/lib/products'
import { ProductClient } from '@/components/product/ProductClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }

  const title = `${product.name} – Buy Online Pakistan`
  const description = `${product.description} Buy ${product.name} at Elik for ${new Intl.NumberFormat('en-PK').format(product.price)} PKR. Cash on Delivery across Pakistan.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
      url: `https://elik.xyz/product/${slug}`,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()
  return <ProductClient product={product} />
}
