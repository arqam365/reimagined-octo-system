'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'

const menuCategories = {
  pizza: [
    {
      name: 'Pizza Margherita',
      description: 'Classic pizza with fresh mozzarella, basil, and San Marzano tomato sauce',
      price: '25 SAR',
    },
    {
      name: 'Pizza Pepperoni',
      description: 'Traditional pizza with premium pepperoni and mozzarella cheese',
      price: '30 SAR',
    },
    {
      name: 'Pizza Quattro Formaggi',
      description: 'Four cheese blend with mozzarella, parmesan, gorgonzola, and ricotta',
      price: '35 SAR',
    },
    {
      name: 'Pizza Vegetariana',
      description: 'Fresh vegetables including bell peppers, mushrooms, olives, and tomatoes',
      price: '28 SAR',
    },
    {
      name: 'Pizza Al Tartufo',
      description: 'Black truffle with fresh mozzarella, wild mushrooms, and parmesan',
      price: '45 SAR',
    },
    {
      name: 'Pizza Diavola',
      description: 'Nduja, chili peppers, mozzarella, and San Marzano tomato',
      price: '32 SAR',
    },
  ],
  soups: [
    {
      name: 'Minestrone Soup',
      description: 'Classic Italian vegetable soup with pasta and beans',
      price: '15 SAR',
    },
    {
      name: 'Pasta e Fagioli',
      description: 'Hearty pasta and bean soup, Italian comfort food',
      price: '16 SAR',
    },
    {
      name: 'Tomato Basil Soup',
      description: 'Creamy tomato soup with fresh basil and Parmigiano',
      price: '14 SAR',
    },
  ],
  salads: [
    {
      name: 'Caprese Salad',
      description: 'Fresh mozzarella, ripe tomatoes, basil, and premium olive oil',
      price: '22 SAR',
    },
    {
      name: 'Arugula Salad',
      description: 'Peppery arugula with Parmigiano shavings and balsamic vinegar',
      price: '20 SAR',
    },
    {
      name: 'Mixed Green Salad',
      description: 'Fresh seasonal greens with house dressing',
      price: '18 SAR',
    },
  ],
  appetizers: [
    {
      name: 'Bruschetta al Pomodoro',
      description: 'Toasted bread with fresh tomato, garlic, and basil',
      price: '14 SAR',
    },
    {
      name: 'Calamari Fritti',
      description: 'Crispy fried squid served with marinara sauce',
      price: '28 SAR',
    },
    {
      name: 'Mozzarella Sticks',
      description: 'Golden fried mozzarella served with marinara sauce',
      price: '16 SAR',
    },
    {
      name: 'Garlic Bread',
      description: 'Crispy bread brushed with garlic and olive oil',
      price: '10 SAR',
    },
  ],
  pasta: [
    {
      name: 'Spaghetti Carbonara',
      description: 'Traditional Roman pasta with pancetta, pecorino, and egg',
      price: '32 SAR',
    },
    {
      name: 'Fettuccine Alfredo',
      description: 'Creamy sauce with butter, cream, and Parmigiano cheese',
      price: '30 SAR',
    },
    {
      name: 'Lasagna Bolognese',
      description: 'Layers of pasta with rich Bolognese sauce and béchamel',
      price: '34 SAR',
    },
    {
      name: 'Ravioli al Tartufo',
      description: 'Hand-filled ravioli with black truffle and ricotta',
      price: '40 SAR',
    },
    {
      name: 'Penne Arrabbiata',
      description: 'Spicy tomato sauce with garlic, red chili, and olive oil',
      price: '28 SAR',
    },
  ],
  desserts: [
    {
      name: 'Tiramisu',
      description: 'Layered mascarpone cream with espresso-soaked ladyfingers',
      price: '16 SAR',
    },
    {
      name: 'Panna Cotta',
      description: 'Silky smooth vanilla cream with fresh berry compote',
      price: '14 SAR',
    },
    {
      name: 'Gelato Selection',
      description: 'Choice of authentic Italian gelato flavors',
      price: '12 SAR',
    },
    {
      name: 'Chocolate Cake',
      description: 'Rich Italian chocolate cake with hazelnut cream',
      price: '15 SAR',
    },
  ],
  beverages: [
    {
      name: 'Italian Soft Drinks',
      description: 'Various imported Italian sodas and beverages',
      price: '8 SAR',
    },
    {
      name: 'Fresh Juice',
      description: 'Fresh orange, lemon, or mixed fruit juices',
      price: '10 SAR',
    },
    {
      name: 'Italian Coffee',
      description: 'Espresso, cappuccino, or latte',
      price: '7 SAR',
    },
    {
      name: 'Bottled Water',
      description: 'Still or sparkling mineral water',
      price: '5 SAR',
    },
  ],
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof menuCategories>('pizza')

  const categories = [
    { key: 'pizza' as const, label: 'Pizza' },
    { key: 'soups' as const, label: 'Soups' },
    { key: 'salads' as const, label: 'Salads' },
    { key: 'appetizers' as const, label: 'Appetizers' },
    { key: 'pasta' as const, label: 'Pasta' },
    { key: 'desserts' as const, label: 'Desserts' },
    { key: 'beverages' as const, label: 'Beverages' },
  ]

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
        <div className="bg-[#F5F0E8] sticky top-16 z-40 border-b border-[#0A0806]/8 py-4">
          <div className="flex flex-wrap gap-2 px-6 sm:px-8 max-w-7xl mx-auto">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`font-ui text-xs px-5 py-2.5 tracking-[0.2em] uppercase transition-all min-h-[44px] ${
                  activeCategory === category.key
                    ? 'bg-[#0A0806] text-white'
                    : 'text-[#5C4A3A] hover:text-[#0A0806] border border-transparent hover:border-[#0A0806]/15'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <section className="bg-[#F5F0E8] pt-12 pb-24">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">

            <h2 className="elegant-text text-3xl md:text-4xl text-[#0A0806] mb-10">
              {categories.find((c) => c.key === activeCategory)?.label}
            </h2>

            <div className="animate-fade-in">
              {menuCategories[activeCategory].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-baseline py-5 border-b border-[#0A0806]/8"
                >
                  <div className="flex-1 min-w-0 pr-6">
                    <p className="elegant-text text-xl text-[#0A0806]">{item.name}</p>
                    <p className="font-ui text-xs text-[#5C4A3A]/55 tracking-wide mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <span className="font-ui font-semibold text-[#8B1A1A] text-sm flex-shrink-0 ml-6">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Tuesday Pasta Day note */}
            {activeCategory === 'pasta' && (
              <div className="mt-8 border border-[#8B1A1A]/20 p-6 bg-[#8B1A1A]/4">
                <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-[#8B1A1A] mb-1">
                  Tuesday Pasta Day
                </p>
                <p className="font-body text-[#5C4A3A] text-sm">
                  Every Tuesday — buy one pasta, get the second free. Dine-in and delivery.
                </p>
              </div>
            )}
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
                  <em className="not-italic text-amber-500">table tonight</em>
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:flex-shrink-0">
                <Link
                  href="/reservation"
                  className="font-ui text-xs tracking-[0.3em] uppercase bg-amber-500 text-black px-7 py-4 hover:bg-amber-400 transition-colors text-center min-h-[44px] flex items-center justify-center"
                >
                  Make a Reservation
                </Link>
                <a
                  href="https://wa.me/966555674383"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui text-xs tracking-[0.3em] uppercase border border-white/20 text-white px-7 py-4 hover:bg-white/5 transition-colors text-center min-h-[44px] flex items-center justify-center"
                >
                  Order via WhatsApp
                </a>
              </div>
            </div>

            {/* Delivery platforms */}
            <div className="border-t border-white/8 pt-10">
              <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-white/20 mb-5">
                Also available on delivery platforms
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="elegant-text text-xl text-white/40 font-bold">HungerStation</span>
                <span className="text-white/15 font-thin">/</span>
                <span className="elegant-text text-xl text-white/40 font-bold">Keeta</span>
                <span className="text-white/15 font-thin">/</span>
                <span className="elegant-text text-xl text-white/40 font-bold">Jahez</span>
                <span className="text-white/15 font-thin">/</span>
                <span className="elegant-text text-xl text-white/40 font-bold">Lugmety</span>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
