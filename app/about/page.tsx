import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'

const values = [
  {
    number: '01',
    title: 'Authenticity',
    description:
      'We honour traditional Italian pizza-making methods, using time-tested recipes and authentic ingredients sourced with care. No shortcuts — ever.',
  },
  {
    number: '02',
    title: 'Craft',
    description:
      'Every dough is hand-stretched to order. Every pizza is baked in our Morello Forni wood-fired oven at 500°C. This is a labour of love, not a production line.',
  },
  {
    number: '03',
    title: 'Hospitality',
    description:
      'We create a warm, welcoming environment where families and friends gather to share moments of joy. Italian warmth meets Jeddah generosity.',
  },
]

const promises = [
  'Same Quality. Same Fresh Ingredients. Better Value.',
  'Wood-fired in our Morello Forni oven — every single pizza.',
  'Hand-stretched dough, prepared to order, not in advance.',
  'San Marzano tomatoes. Fior di latte. No compromise on ingredients.',
  'A family-friendly environment perfect for celebrations and gatherings.',
]

export default function About() {
  return (
    <>
      <Navigation />
      <main>

        {/* Dark Hero */}
        <section className="bg-[#0A0806] pt-36 pb-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/25 mb-8">
              Who We Are
            </p>
            <h1
              className="elegant-text font-bold text-white leading-none mb-8"
              style={{ fontSize: 'clamp(4rem, 10vw, 9rem)' }}
            >
              Our<br />
              <span className="text-white/20">Story</span>
            </h1>
            <div className="h-px w-16 bg-white/10 mb-8" />
            <p className="font-body text-white/40 text-xl max-w-sm leading-relaxed">
              Where Italian tradition meets Jeddah hospitality.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-[#F5F0E8]">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Text */}
            <div className="flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-20 order-2 lg:order-1">
              <p className="font-ui text-[10px] tracking-[0.45em] uppercase text-[#8B1A1A] mb-8">
                Our Beginning
              </p>
              <h2
                className="elegant-text font-bold text-[#0A0806] leading-[1.05] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Authentic Italian<br />
                <em className="italic">in the heart of Jeddah</em>
              </h2>
              <div className="h-px w-12 bg-[#8B1A1A]/30 mb-8" />
              <p className="font-body text-[#5C4A3A] text-lg leading-relaxed mb-5">
                Mazencito Pizzeria was founded with a simple yet passionate mission: to bring authentic Italian pizza tradition to the heart of Jeddah. Our journey began with a deep love for Italian culinary heritage and an unwavering commitment to quality.
              </p>
              <p className="font-body text-[#5C4A3A] text-lg leading-relaxed mb-5">
                Every pizza that leaves our kitchen is a masterpiece, crafted with traditional Italian techniques using the finest fresh ingredients. We believe in the power of food to create connections, build community, and celebrate the warmth and hospitality that defines both Italian and Saudi cultures.
              </p>
              <p className="font-body text-[#5C4A3A]/70 text-base leading-relaxed">
                Whether you&apos;re joining us for a casual family dinner or a special gathering, Mazencito offers the perfect blend of authentic flavours, welcoming atmosphere, and genuine hospitality.
              </p>
            </div>

            {/* Image */}
            <div className="relative h-[60vw] lg:h-auto lg:min-h-[600px] overflow-hidden order-1 lg:order-2">
              <Image
                src="/restaurant-interior.jpg"
                alt="Mazencito Restaurant Interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Craft Section */}
        <section className="bg-[#0A0806]">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Image */}
            <div className="relative h-[60vw] lg:h-auto lg:min-h-[600px] overflow-hidden">
              <Image
                src="/chef.jpg"
                alt="Mazencito pizza preparation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#0A0806]/20" />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-20">
              <p className="font-ui text-[10px] tracking-[0.45em] uppercase text-white/30 mb-8">
                The Art of Pizza
              </p>
              <h2
                className="elegant-text font-bold text-white leading-[1.05] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Baked at 500&deg;C.<br />
                <em className="italic text-amber-500/80">Never rushed.</em>
              </h2>
              <div className="h-px w-12 bg-white/10 mb-8" />
              <p className="font-body text-white/60 text-lg leading-relaxed mb-5">
                At Mazencito, we treat pizza making as an art form. Our dough is prepared fresh daily using a blend of premium Italian flours and traditional fermentation techniques — baked in our authentic Morello Forni wood-fired oven.
              </p>
              <p className="font-body text-white/60 text-lg leading-relaxed mb-5">
                Every ingredient — from San Marzano tomatoes to fresh mozzarella — is carefully selected to ensure the authentic taste of Italy in every bite.
              </p>
              <p className="font-body text-white/40 text-base leading-relaxed">
                We believe that true Italian pizza is not rushed. It is a labour of love that demands patience, precision, and genuine passion.
              </p>
            </div>
          </div>
        </section>

        {/* Values — stacked list, NOT cards */}
        <section className="bg-[#F5F0E8] py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
              <div>
                <p className="font-ui text-[10px] tracking-[0.45em] uppercase text-[#8B1A1A] mb-4">
                  What We Stand For
                </p>
                <h2
                  className="elegant-text font-bold text-[#0A0806] leading-none"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                >
                  Our Values
                </h2>
              </div>
            </div>

            {/* Stacked value rows */}
            <div>
              {values.map((value, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-[auto_1fr] gap-8 sm:gap-16 py-10 ${
                    idx < values.length - 1 ? 'border-b border-[#0A0806]/8' : ''
                  }`}
                >
                  <span className="font-ui text-xs tracking-[0.3em] text-[#0A0806]/20 pt-1">
                    {value.number}
                  </span>
                  <div>
                    <h3
                      className="elegant-text font-bold text-[#0A0806] mb-4"
                      style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                    >
                      {value.title}
                    </h3>
                    <p className="font-body text-[#5C4A3A] text-lg leading-relaxed max-w-lg">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promise — typographic list on wine red */}
        <section className="bg-[#8B1A1A] py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">

            <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/30 mb-12">
              Our Promise
            </p>

            <div>
              {promises.map((promise, idx) => (
                <div
                  key={idx}
                  className={`py-7 ${idx < promises.length - 1 ? 'border-b border-white/10' : ''}`}
                >
                  <p
                    className="elegant-text font-bold text-white leading-tight"
                    style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
                  >
                    {promise}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0A0806] py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
              <div>
                <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/25 mb-6">
                  Time Out Jeddah Restaurant Awards 2026
                </p>
                <h2
                  className="elegant-text font-bold text-white leading-none mb-4"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
                >
                  Shortlisted.<br />
                  <em className="not-italic text-amber-500">Come see why.</em>
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-shrink-0">
                <Link
                  href="/reservation"
                  className="font-ui text-xs tracking-[0.3em] uppercase bg-amber-500 text-black px-7 py-4 hover:bg-amber-400 transition-colors text-center min-h-[44px] flex items-center justify-center"
                >
                  Reserve Your Table
                </Link>
                <Link
                  href="/menu"
                  className="font-ui text-xs tracking-[0.3em] uppercase border border-white/20 text-white px-7 py-4 hover:bg-white/5 transition-colors text-center min-h-[44px] flex items-center justify-center"
                >
                  View Menu
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
