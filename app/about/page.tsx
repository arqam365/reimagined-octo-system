import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { Leaf, Heart, Award, CheckCircle2, MapPin, Phone, Clock, MessageCircle } from 'lucide-react'

export default function About() {
  return (
    <>
      <Navigation />
      <main>

        {/* Dark Hero */}
        <section className="bg-[#0C0907] pt-36 pb-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0C0907]/90" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <p className="font-ui text-xs tracking-[0.35em] uppercase text-amber-400/80 mb-5">
              Who We Are
            </p>
            <h1 className="elegant-text text-6xl md:text-7xl font-bold text-white leading-tight mb-5">
              Our Story
            </h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-amber-500/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
              <div className="h-px w-16 bg-amber-500/40" />
            </div>
            <p className="font-body text-white/55 text-lg">
              Where Italian Tradition Meets Jeddah Hospitality
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-[#F9F5EE] py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="font-ui text-xs tracking-[0.3em] uppercase text-amber-600 mb-5">
                  Our Beginning
                </p>
                <h2 className="elegant-text text-4xl md:text-5xl font-bold text-[#1A0D0D] mb-6 leading-tight">
                  About Mazencito Pizzeria
                </h2>
                <p className="font-body text-[#5C4A3A] text-lg leading-relaxed mb-5">
                  Mazencito Pizzeria was founded with a simple yet passionate mission: to bring authentic Italian pizza tradition to the heart of Jeddah. Our journey began with a deep love for Italian culinary heritage and an unwavering commitment to quality.
                </p>
                <p className="font-body text-[#5C4A3A] text-lg leading-relaxed mb-5">
                  Every pizza that leaves our kitchen is a masterpiece, crafted with traditional Italian techniques using the finest fresh ingredients. We believe in the power of food to create connections, build community, and celebrate the warmth and hospitality that defines both Italian and Saudi cultures.
                </p>
                <p className="font-body text-[#5C4A3A] text-lg leading-relaxed">
                  Whether you&apos;re joining us for a casual family dinner or a special gathering with friends, Mazencito offers the perfect blend of authentic flavors, welcoming atmosphere, and genuine hospitality that turns a meal into a cherished memory.
                </p>
              </div>
              <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/restaurant-interior.jpg"
                  alt="Mazencito Restaurant Interior"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D0D]/30 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Craft Section */}
        <section className="bg-white py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
                <Image
                  src="/chef.jpg"
                  alt="Pizza Preparation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D0D]/30 to-transparent" />
              </div>
              <div className="order-1 md:order-2">
                <p className="font-ui text-xs tracking-[0.3em] uppercase text-amber-600 mb-5">
                  The Art of Pizza
                </p>
                <h2 className="elegant-text text-4xl md:text-5xl font-bold text-[#1A0D0D] mb-6 leading-tight">
                  Our Craft
                </h2>
                <p className="font-body text-[#5C4A3A] text-lg leading-relaxed mb-5">
                  At Mazencito, we treat pizza making as an art form. Our dough is prepared fresh daily using a blend of premium Italian flours and traditional fermentation techniques perfected over generations.
                </p>
                <p className="font-body text-[#5C4A3A] text-lg leading-relaxed mb-5">
                  Every ingredient — from San Marzano tomatoes to fresh mozzarella — is carefully selected to ensure the authentic taste of Italy in every bite. Our oven reaches the perfect temperature to create crispy, charred crusts while keeping the interior soft and flavorful.
                </p>
                <p className="font-body text-[#5C4A3A] text-lg leading-relaxed">
                  We believe that true Italian pizza is not rushed. It is a labor of love that demands patience, precision, and a genuine passion for creating something extraordinary.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#F9F5EE] py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="font-ui text-xs tracking-[0.3em] uppercase text-amber-600 mb-4">
                What We Stand For
              </p>
              <h2 className="elegant-text text-5xl md:text-6xl text-[#1A0D0D]">
                Our Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-[#E8DFD0] rounded-2xl p-10 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-[#7A1A1A]/8 flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-7 h-7 text-[#7A1A1A]" />
                </div>
                <h3 className="elegant-text text-2xl font-bold text-[#1A0D0D] mb-4">
                  Authenticity
                </h3>
                <p className="font-body text-[#5C4A3A] leading-relaxed">
                  We honor traditional Italian pizza-making methods, using time-tested recipes and authentic ingredients sourced with care.
                </p>
              </div>

              <div className="bg-white border border-[#E8DFD0] rounded-2xl p-10 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-[#7A1A1A]/8 flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-7 h-7 text-[#7A1A1A]" />
                </div>
                <h3 className="elegant-text text-2xl font-bold text-[#1A0D0D] mb-4">
                  Family Values
                </h3>
                <p className="font-body text-[#5C4A3A] leading-relaxed">
                  We create a warm, welcoming environment where families and friends gather to share moments of joy and connection.
                </p>
              </div>

              <div className="bg-white border border-[#E8DFD0] rounded-2xl p-10 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-[#7A1A1A]/8 flex items-center justify-center mx-auto mb-6">
                  <Award className="w-7 h-7 text-[#7A1A1A]" />
                </div>
                <h3 className="elegant-text text-2xl font-bold text-[#1A0D0D] mb-4">
                  Excellence
                </h3>
                <p className="font-body text-[#5C4A3A] leading-relaxed">
                  We never compromise on quality. Every pizza is crafted with meticulous attention to detail and genuine pride.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Contact */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="font-ui text-xs tracking-[0.3em] uppercase text-amber-600 mb-4">
                Visit Us
              </p>
              <h2 className="elegant-text text-5xl md:text-6xl text-[#1A0D0D]">
                Find Us in Jeddah
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#7A1A1A]/8 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#7A1A1A]" />
                  </div>
                  <div>
                    <h3 className="elegant-text text-xl font-bold text-[#1A0D0D] mb-1">Location</h3>
                    <p className="font-body text-[#5C4A3A]">
                      King Abdulaziz Branch Road<br />
                      Jeddah, Saudi Arabia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#7A1A1A]/8 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#7A1A1A]" />
                  </div>
                  <div>
                    <h3 className="elegant-text text-xl font-bold text-[#1A0D0D] mb-1">Hours</h3>
                    <p className="font-body text-[#5C4A3A]">
                      Open Daily &nbsp;1:00 PM &ndash; 1:00 AM
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#7A1A1A]/8 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#7A1A1A]" />
                  </div>
                  <div>
                    <h3 className="elegant-text text-xl font-bold text-[#1A0D0D] mb-1">Phone</h3>
                    <a
                      href="tel:+966555674383"
                      className="block font-body text-[#7A1A1A] hover:text-[#5a1414] transition-colors"
                    >
                      +966 55 567 4383
                    </a>
                    <a
                      href="tel:+966554430556"
                      className="block font-body text-[#7A1A1A] hover:text-[#5a1414] transition-colors"
                    >
                      +966 55 443 0556
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#7A1A1A]/8 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#7A1A1A]" />
                  </div>
                  <div>
                    <h3 className="elegant-text text-xl font-bold text-[#1A0D0D] mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/966555674383"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[#7A1A1A] hover:text-[#5a1414] transition-colors"
                    >
                      Message us on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Promise */}
        <section className="bg-[#0C0907] py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="font-ui text-xs tracking-[0.3em] uppercase text-amber-400/80 mb-4">
                Our Commitment
              </p>
              <h2 className="elegant-text text-5xl md:text-6xl font-bold text-white">
                Our Promise to You
              </h2>
            </div>

            <div className="space-y-4">
              {[
                'Fresh ingredients prepared daily with no shortcuts or compromises',
                'Traditional Italian pizza recipes passed down through generations',
                'Warm hospitality that reflects both Italian warmth and Saudi generosity',
                'A family-friendly environment perfect for celebrations and gatherings',
                'Fair pricing for premium quality that everyone can enjoy',
              ].map((promise, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 bg-white/5 border border-white/8 rounded-xl px-6 py-5"
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="font-body text-white/75 text-lg leading-relaxed">{promise}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#7A1A1A] py-24 text-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="elegant-text text-5xl md:text-6xl font-bold mb-5">
              Experience Mazencito
            </h2>
            <p className="font-body text-white/65 text-xl mb-10 max-w-xl mx-auto">
              Join us for an unforgettable evening of authentic Italian pizza and warm Jeddah hospitality.
            </p>
            <Link
              href="/reservation"
              className="inline-block bg-amber-500 text-black font-ui font-bold text-sm px-10 py-4 uppercase tracking-widest rounded hover:bg-amber-400 transition-colors"
            >
              Reserve Your Table Today
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
