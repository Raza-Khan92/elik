// Run: node scripts/generate-sitemap.js
// Auto-generates public/sitemap.xml from data/products.json

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE_URL = 'https://elikstore.vercel.app'
const TODAY = new Date().toISOString().split('T')[0]

const { products, categories } = JSON.parse(
  readFileSync(join(__dirname, '../data/products.json'), 'utf8')
)

const staticPages = [
  { path: '/',        changefreq: 'daily',   priority: '1.0' },
  { path: '/contact', changefreq: 'monthly',  priority: '0.7' },
  { path: '/privacy', changefreq: 'yearly',   priority: '0.4' },
  { path: '/terms',   changefreq: 'yearly',   priority: '0.4' },
]

function url(loc, changefreq, priority) {
  return `  <url><loc>${BASE_URL}${loc}</loc><lastmod>${TODAY}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
}

const lines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  '',
  '  <!-- Static Pages -->',
  ...staticPages.map(p => url(p.path, p.changefreq, p.priority)),
  '',
  '  <!-- Categories -->',
  ...categories.map(c => url(`/category/${c.slug}`, 'weekly', '0.9')),
  '',
  '  <!-- Products -->',
  ...products.map(p => url(`/product/${p.slug}`, 'monthly', '0.8')),
  '',
  '</urlset>',
]

const output = lines.join('\n')
writeFileSync(join(__dirname, '../public/sitemap.xml'), output)
console.log(`✅ Sitemap generated with ${products.length} products and ${categories.length} categories`)
console.log(`📄 Saved to public/sitemap.xml`)
