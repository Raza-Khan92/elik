'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=85&auto=format&fit=crop',
    position: 'object-center',
    badge: 'Premium Collection 2025',
    headline: 'The Art of',
    highlight: 'Elegance',
    sub: 'Handcrafted leather bags, wallets, and accessories designed for the woman who commands attention wherever she goes.',
    cta1: { label: 'Shop Handbags', href: '/category/handbags-wallets' },
    cta2: { label: 'Explore Perfumes', href: '/category/perfumes' },
  },
  {
    id: 2,
    image: '/images/category-perfumes.jpg',
    position: 'object-center',
    badge: 'Exclusive Fragrances',
    headline: 'A Scent That',
    highlight: 'Tells Your Story',
    sub: 'Discover our curated range of international and signature perfumes. Every bottle is an experience waiting to unfold.',
    cta1: { label: 'Explore Perfumes', href: '/category/perfumes' },
    cta2: { label: 'Shop Watches', href: '/category/watches' },
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1920&q=85&auto=format&fit=crop',
    position: 'object-top',
    badge: 'New Arrivals',
    headline: 'New Season,',
    highlight: 'New You',
    sub: "From luxury cosmetics to elegant timepieces and children's essentials — everything your family deserves, in one place.",
    cta1: { label: 'Shop New Arrivals', href: '/search?q=new' },
    cta2: { label: 'Shop Cosmetics', href: '/category/cosmetics' },
  },
]

const AUTOPLAY_INTERVAL = 5000

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }, [isTransitioning])

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo])

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(next, AUTOPLAY_INTERVAL)
    return () => clearInterval(id)
  }, [isPaused, next])

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {SLIDES.map((slide, i) => (
        <div key={slide.id} className={cn('absolute inset-0 transition-opacity duration-700 ease-in-out', i === current ? 'opacity-100 z-10' : 'opacity-0 z-0')}>
          <img
            src={slide.image}
            alt={slide.headline + ' ' + slide.highlight}
            className={`w-full h-full object-cover ${slide.position}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        </div>
      ))}

      {SLIDES.map((slide, i) => (
        <div key={`content-${slide.id}`} className={cn('absolute inset-0 z-20 flex items-center transition-all duration-700', i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="max-w-2xl">
              <span className="inline-block text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">{slide.badge}</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-tight mb-6">
                {slide.headline}
                <span className="block text-amber-400">{slide.highlight}</span>
              </h1>
              <p className="text-base sm:text-lg text-white/85 mb-8 max-w-lg leading-relaxed">{slide.sub}</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2 bg-amber-500 text-white hover:bg-amber-600 border-0 px-7" asChild>
                  <Link href={slide.cta1.href}>{slide.cta1.label}<ArrowRight className="w-4 h-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 border-2 border-white/70 text-white bg-white/10 hover:bg-white hover:text-stone-900 backdrop-blur-sm px-7" asChild>
                  <Link href={slide.cta2.href}>{slide.cta2.label}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button onClick={prev} aria-label="Previous slide" className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm text-white hover:bg-white/20 transition-colors flex items-center justify-center">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} aria-label="Next slide" className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm text-white hover:bg-white/20 transition-colors flex items-center justify-center">
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}
            className={cn('transition-all duration-300 rounded-full', i === current ? 'w-8 h-2 bg-amber-400' : 'w-2 h-2 bg-white/50 hover:bg-white/80')}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-white/20">
        <div
          key={current}
          className="h-full bg-amber-400"
          style={{ animation: isPaused ? 'none' : `slideProgress ${AUTOPLAY_INTERVAL}ms linear`, width: isPaused ? '0%' : undefined }}
        />
      </div>
    </section>
  )
}
