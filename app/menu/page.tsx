'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

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
      <main className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="elegant-text text-5xl md:text-6xl font-bold mb-4 text-primary">
              Our Menu
            </h1>
            <p className="text-xl text-foreground/70">
              Explore our authentic Italian dishes prepared with traditional recipes and fresh ingredients
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-12 scroll-smooth">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`px-6 py-2 rounded font-medium transition-all ${
                  activeCategory === category.key
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card text-foreground border border-border hover:bg-accent/10'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 animate-fade-in">
            {menuCategories[activeCategory].map((item, idx) => (
              <div
                key={idx}
                className="pb-6 border-b border-border last:border-b-0 hover:bg-accent/5 p-4 rounded transition-colors"
              >
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h3 className="elegant-text text-2xl font-bold text-primary">
                    {item.name}
                  </h3>
                  <span className="text-xl font-bold text-accent flex-shrink-0 whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
                <p className="text-foreground/70 text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg text-center">
            <h2 className="elegant-text text-3xl md:text-4xl font-bold mb-4">
              Ready to Order?
            </h2>
            <p className="text-lg mb-6 text-primary-foreground/90">
              Reserve your table and enjoy these delicious authentic Italian dishes prepared with love
            </p>
            <a
              href="/reservation"
              className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded font-medium hover:bg-accent/90 transition-colors"
            >
              Make a Reservation
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
