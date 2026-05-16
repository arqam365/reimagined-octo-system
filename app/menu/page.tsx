'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

const menuCategories = {
  pizza: [
    {
      name: 'Pizza Margherita',
      description: 'Classic pizza with fresh mozzarella, basil, and tomato sauce',
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
      description: 'Truffle-infused pizza with fresh mozzarella and gorgonzola',
      price: '45 SAR',
    },
    {
      name: 'Pizza Diavola',
      description: 'Spicy pizza with pepperoni, chili peppers, and mozzarella',
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

        {/* Page Hero */}
        <section className="bg-[#0C0907] pt-36 pb-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0C0907]/80" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <p className="font-ui text-xs tracking-[0.35em] uppercase text-amber-400/80 mb-5">
              Authentic Italian Cuisine
            </p>
            <h1 className="elegant-text text-6xl md:text-7xl font-bold text-white leading-tight mb-5">
              Our Menu
            </h1>
            {/* Gold divider */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-amber-500/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
              <div className="h-px w-16 bg-amber-500/40" />
            </div>
            <p className="font-body text-white/55 text-lg">
              Explore our authentic Italian dishes — prepared daily with fresh ingredients and traditional recipes.
            </p>
          </div>
        </section>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center py-8 bg-[#F9F5EE] sticky top-16 z-40 border-b border-[#E8DFD0] px-4">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`font-ui text-sm px-6 py-2.5 rounded transition-all duration-200 ${
                activeCategory === category.key
                  ? 'bg-[#7A1A1A] text-white font-semibold shadow-sm'
                  : 'bg-white border border-[#E8DFD0] text-[#5C4A3A] hover:border-[#7A1A1A]/40'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <section className="bg-[#F9F5EE] py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section heading */}
            <div className="mb-10">
              <h2 className="elegant-text text-3xl md:text-4xl text-[#1A0D0D]">
                {categories.find((c) => c.key === activeCategory)?.label}
              </h2>
              <div className="h-px w-12 bg-amber-500 mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 animate-fade-in">
              {menuCategories[activeCategory].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-start pb-6 mb-6 border-b border-[#E8DFD0] last:border-0 last:mb-0 pr-4"
                >
                  <div className="flex-1 mr-4">
                    <h3 className="elegant-text text-xl text-[#1A0D0D] mb-1.5">
                      {item.name}
                    </h3>
                    <p className="font-body text-[#5C4A3A] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <span className="font-ui font-bold text-amber-600 text-lg whitespace-nowrap ml-4 flex-shrink-0">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#0C0907] py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="font-ui text-xs tracking-[0.3em] uppercase text-amber-400/80 mb-4">
              Ready to Order?
            </p>
            <h2 className="elegant-text text-4xl md:text-5xl font-bold text-white mb-4">
              Reserve Your Table
            </h2>
            <p className="font-body text-white/55 text-lg mb-10 max-w-xl mx-auto">
              Dine with us and enjoy these authentic Italian dishes prepared fresh every day with love and tradition.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/reservation"
                className="w-full sm:w-auto bg-amber-500 text-black font-ui font-bold text-sm px-8 py-4 uppercase tracking-widest rounded hover:bg-amber-400 transition-colors"
              >
                Make a Reservation
              </Link>
              <a
                href="https://wa.me/966555674383"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-white/20 text-white font-ui font-semibold text-sm px-8 py-4 rounded hover:bg-white/8 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Order via WhatsApp
              </a>
            </div>

            {/* Delivery platforms strip */}
            <div className="border-t border-white/10 pt-12">
              <p className="font-ui text-xs tracking-[0.2em] uppercase text-white/30 mb-6">
                Also available on delivery platforms
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {['Lugmety', 'Jahez', 'HungerStation', 'KEeta'].map((platform) => (
                  <span
                    key={platform}
                    className="font-ui text-sm font-semibold text-white/50 px-4 py-2 border border-white/10 rounded"
                  >
                    {platform}
                  </span>
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
