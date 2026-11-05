'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import { restaurant } from '@/lib/restaurant'

interface MenuItem {
  id: string
  nameEn: string
  description: string
  price: number
  category: string
  special: boolean
}

const CATEGORY_LABELS: Record<string, string> = {
  PIZZA: 'Pizza',
  PASTA: 'Pasta',
  SOUPS: 'Soups',
  SALADS: 'Salads',
  DESSERTS: 'Desserts',
  BEVERAGES: 'Beverages',
}

export default function MenuClient({ items }: { items: MenuItem[] }) {
  const categories = [...new Set(items.map((i) => i.category))].sort()
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? 'PIZZA')
  const filtered = items.filter((i) => i.category === activeCategory)

  return (
    <>
      <Navigation />
      <main>

        {/* Dark Hero */}
        <section className="bg-[#0A0806] pt-36 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/30 mb-6">
              Mazencito Pizzeria
            </p>
            <h1 className="elegant-text font-bold text-white leading-none">
              <span className="block" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}>Our</span>
              <span className="block text-white/30" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}>Menu</span>
            </h1>
            <p className="font-body text-white/40 text-lg mt-4 max-w-sm">
              Wood-fired pizza, handcrafted pasta, and Italian classics — prepared fresh daily.
            </p>
          </div>
        </section>

        {/* Category Tabs */}
        <div className="bg-[#FAF8F5] sticky top-0 md:top-16 lg:top-20 z-40 border-b border-[#0A0806]/8 py-4">
          <div className="flex flex-wrap gap-2 px-6 sm:px-8 max-w-7xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-ui text-xs px-5 py-2.5 tracking-[0.2em] uppercase transition-all min-h-[44px] ${
                  activeCategory === cat
                    ? 'bg-[#0A0806] text-white'
                    : 'text-[#0A0806] hover:text-[#0A0806] border border-transparent hover:border-[#0A0806]/15'
                }`}
              >
                {CATEGORY_LABELS[cat] ?? cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <section className="bg-[#FAF8F5] pt-12 pb-24">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">

            <h2 className="elegant-text text-3xl md:text-4xl text-[#0A0806] mb-10">
              {CATEGORY_LABELS[activeCategory] ?? activeCategory}
            </h2>

            <div className="animate-fade-in">
              {filtered.length === 0 ? (
                <p className="font-body text-[#0A0806]/40 py-8">No items in this category.</p>
              ) : (
                filtered.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-baseline py-5 border-b border-[#0A0806]/8"
                  >
                    <div className="flex-1 min-w-0 pr-6">
                      <p className="elegant-text text-xl text-[#0A0806]">
                        {item.nameEn}
                        {item.special && (
                          <span className="ml-2 font-ui text-[9px] tracking-[0.3em] uppercase text-[#CC2229]">Special</span>
                        )}
                      </p>
                      <p className="font-ui text-xs text-[#0A0806]/55 tracking-wide mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <span className="font-ui font-semibold text-[#CC2229] text-sm flex-shrink-0 ml-6">
                      {item.price} SAR
                    </span>
                  </div>
                ))
              )}
            </div>

          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#0A0806] py-20">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12">
              <div>
                <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/30 mb-4">
                  Ready to dine in?
                </p>
                <h2 className="elegant-text text-4xl md:text-5xl text-white">
                  Reserve your<br />
                  <em className="not-italic text-[#CC2229]">table tonight</em>
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:flex-shrink-0">
                <Link
                  href="/reservation"
                  className="font-ui text-xs tracking-[0.3em] uppercase bg-[#CC2229] text-white px-7 py-4 hover:bg-[#B01E24] transition-colors text-center min-h-[44px] flex items-center justify-center"
                >
                  Make a Reservation
                </Link>

              </div>
            </div>

            {/* Delivery platforms */}
            <div className="border-t border-white/8 pt-10">
              <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-white/20 mb-5">
                Order delivery
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {restaurant.delivery.map(({ name, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="elegant-text text-xl text-white/60 hover:text-white font-bold transition-colors min-h-[44px] flex items-center"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
