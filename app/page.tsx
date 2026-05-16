import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  Phone,
  Clock,
  Star,
  MessageCircle,
  ChevronDown,
} from 'lucide-react'

const signaturePizzas = [
  {
    name: 'Pizza Margherita',
    description: 'Classic with fresh mozzarella, basil, and San Marzano tomato sauce',
    price: '25 SAR',
    image: '/pizza-margherita.jpg',
  },
  {
    name: 'Pizza Pepperoni',
    description: 'Premium pepperoni with house-blend mozzarella on a hand-stretched crust',
    price: '30 SAR',
    image: '/risotto.jpg',
  },
  {
    name: 'Pizza Al Tartufo',
    description: 'Truffle-infused base with fresh mozzarella, gorgonzola, and wild mushrooms',
    price: '45 SAR',
    image: '/tiramisu.jpg',
  },
]

const deliveryPlatforms = [
  { name: 'Lugmety', letter: 'L' },
  { name: 'Jahez', letter: 'J' },
  { name: 'HungerStation', letter: 'H' },
  { name: 'KEeta', letter: 'K' },
]

const reviews = [
  {
    name: 'أحمد محمد',
    comment: 'أفضل بيتزا إيطالية في جدة! الطعم أصلي والأسعار معقولة جداً.',
    note: 'Best Italian pizza in Jeddah — authentic taste, great prices.',
    rating: 5,
  },
  {
    name: 'فاطمة علي',
    comment: 'العائلة كلها استمتعت بالطعام. الجو دافئ وودود جداً.',
    note: 'The whole family loved it. Warm, welcoming atmosphere.',
    rating: 5,
  },
  {
    name: 'محمود حسن',
    comment: 'تجربة رائعة! الخدمة ممتازة والبيتزا طازة جداً كل مرة.',
    note: 'Amazing experience — excellent service, always fresh pizza.',
    rating: 5,
  },
]

export default function Home() {
  return (
    <>
      <Navigation />
      <main>

        {/* ── A. HERO ── */}
        <section className="bg-[#0C0907] min-h-screen flex items-center justify-center relative overflow-hidden">
          <Image
            src="/hero-pasta.jpg"
            alt="Mazencito Pizzeria"
            fill
            className="object-cover opacity-20"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C0907]/70 via-[#0C0907]/30 to-[#0C0907]/90" />

          {/* Content */}
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
            <p className="font-ui text-xs tracking-[0.35em] uppercase text-amber-400/90 mb-6">
              Authentic Italian &middot; Jeddah, Saudi Arabia
            </p>

            <h1 className="elegant-text text-8xl sm:text-[9rem] md:text-[11rem] font-bold text-white leading-none mb-6">
              Mazencito
            </h1>

            {/* Gold divider */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-24 bg-amber-500/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <div className="h-px w-24 bg-amber-500/50" />
            </div>

            <p className="font-body text-xl md:text-2xl text-white/65 mb-12">
              Fresh ingredients. Traditional recipes. Warm hospitality.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <Link
                href="/menu"
                className="w-full sm:w-auto bg-amber-500 text-black font-ui font-bold text-sm px-8 py-4 tracking-widest uppercase rounded hover:bg-amber-400 transition-colors duration-200 text-center"
              >
                Explore Menu
              </Link>
              <Link
                href="/reservation"
                className="w-full sm:w-auto border border-white/30 text-white font-ui font-semibold text-sm px-8 py-4 uppercase rounded hover:bg-white/10 transition-colors duration-200 text-center"
              >
                Reserve a Table
              </Link>
              <a
                href="https://wa.me/966555674383"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-amber-500/30 text-amber-400 font-ui font-semibold text-sm px-8 py-4 uppercase rounded hover:bg-amber-500/10 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>

            {/* Hours badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
              <Clock className="w-3.5 h-3.5 text-amber-400/80" />
              <span className="font-ui text-xs text-white/60">Open Daily &nbsp; 1:00 PM – 1:00 AM</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <ChevronDown className="w-6 h-6 text-white/30" />
          </div>
        </section>

        {/* ── B. INFO STRIP ── */}
        <section className="bg-[#7A1A1A] text-white">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/15 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 py-5 px-8">
              <div className="p-2.5 rounded-full bg-white/10 flex-shrink-0">
                <MapPin className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <p className="font-ui text-[10px] tracking-widest uppercase text-white/50 mb-0.5">Location</p>
                <p className="font-ui text-sm font-semibold text-white">King Abdulaziz Rd, Jeddah</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-5 px-8">
              <div className="p-2.5 rounded-full bg-white/10 flex-shrink-0">
                <Clock className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <p className="font-ui text-[10px] tracking-widest uppercase text-white/50 mb-0.5">Hours</p>
                <p className="font-ui text-sm font-semibold text-white">Daily 1:00 PM – 1:00 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-5 px-8">
              <div className="p-2.5 rounded-full bg-white/10 flex-shrink-0">
                <Phone className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <p className="font-ui text-[10px] tracking-widest uppercase text-white/50 mb-0.5">Phone</p>
                <a
                  href="tel:+966555674383"
                  className="font-ui text-sm font-semibold text-white hover:text-amber-200 transition-colors"
                >
                  +966 55 567 4383
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── C. SIGNATURE PIZZAS ── */}
        <section className="bg-[#F9F5EE] py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="font-ui text-xs tracking-[0.3em] uppercase text-amber-600 mb-4">
                Crafted with Passion
              </p>
              <h2 className="elegant-text text-5xl md:text-6xl text-[#1A0D0D] mb-0">
                Signature Pizzas
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {signaturePizzas.map((pizza) => (
                <div
                  key={pizza.name}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={pizza.image}
                      alt={pizza.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-amber-500 text-black font-ui font-bold text-sm px-3 py-1.5 rounded">
                        {pizza.price}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="elegant-text text-2xl font-bold text-[#7A1A1A] mb-2">
                      {pizza.name}
                    </h3>
                    <p className="font-body text-[#5C4A3A] text-sm leading-relaxed">
                      {pizza.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-[#7A1A1A] text-white font-ui font-semibold text-sm px-8 py-3.5 rounded hover:bg-[#6a1616] transition-colors"
              >
                View Full Menu
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── D. OUR STORY ── */}
        <section className="bg-[#0C0907] py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left: text */}
              <div>
                <p className="font-ui text-xs tracking-[0.3em] uppercase text-amber-400 mb-5">
                  Our Story
                </p>
                <h2 className="elegant-text text-5xl md:text-6xl text-white leading-tight mb-6">
                  Where Italian Craft Meets{' '}
                  <em className="text-amber-400 not-italic">Jeddah&apos;s Soul</em>
                </h2>

                {/* Gold divider */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-16 bg-amber-500/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
                  <div className="h-px w-16 bg-amber-500/40" />
                </div>

                <p className="font-body text-white/60 text-lg leading-relaxed mb-5">
                  Mazencito Pizzeria was born from a simple, passionate mission: to bring the true flavors of Italy to the heart of Jeddah. We celebrate the tradition of Italian cooking with the finest fresh ingredients and recipes passed down through generations.
                </p>
                <p className="font-body text-white/60 text-lg leading-relaxed mb-8">
                  Every pizza that leaves our kitchen is a labor of love — hand-stretched dough, San Marzano tomatoes, fresh mozzarella — crafted with patience and genuine care for the people who sit at our tables.
                </p>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Read Our Story
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>

              {/* Right: image */}
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/restaurant-interior.jpg"
                  alt="Mazencito Restaurant Interior"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0907]/40 to-transparent" />

                {/* Floating stat card */}
                <div className="absolute -bottom-0 -left-0 lg:-bottom-6 lg:-left-6 bg-[#7A1A1A] text-white p-6 rounded-xl shadow-2xl">
                  <p className="elegant-text text-4xl font-bold text-amber-400 leading-none">25+</p>
                  <p className="font-ui text-xs text-white/70 mt-1 tracking-wide uppercase">Signature Pizzas</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── E. DELIVERY ── */}
        <section className="bg-[#F9F5EE] py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-ui text-xs tracking-[0.3em] uppercase text-amber-600 mb-4">
              Order from Home
            </p>
            <h2 className="elegant-text text-5xl md:text-6xl text-[#1A0D0D] mb-4">
              Order Delivery
            </h2>
            <p className="font-body text-[#5C4A3A] text-lg mb-14 max-w-xl mx-auto">
              Enjoy authentic Mazencito pizza delivered to your door through your preferred platform.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {deliveryPlatforms.map((platform) => (
                <div
                  key={platform.name}
                  className="bg-white border border-[#E8DFD0] rounded-xl p-6 text-center hover:border-[#7A1A1A]/30 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-full bg-[#7A1A1A]/10 flex items-center justify-center mx-auto mb-4">
                    <span className="elegant-text text-xl font-bold text-[#7A1A1A]">
                      {platform.letter}
                    </span>
                  </div>
                  <p className="font-ui text-sm font-semibold text-[#1A0D0D]">{platform.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── F. GUEST REVIEWS ── */}
        <section className="bg-white py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="font-ui text-xs tracking-[0.3em] uppercase text-amber-600 mb-4">
                What Our Guests Say
              </p>
              <h2 className="elegant-text text-5xl md:text-6xl text-[#1A0D0D]">
                Guest Reviews
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-[#F9F5EE] rounded-2xl p-8 border border-[#E8DFD0]"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Arabic comment */}
                  <p
                    dir="rtl"
                    className="font-body text-[#1A0D0D] text-base leading-relaxed mb-3"
                  >
                    &ldquo;{review.comment}&rdquo;
                  </p>

                  {/* English translation */}
                  <p className="font-body text-[#5C4A3A] text-sm italic mb-6">
                    &ldquo;{review.note}&rdquo;
                  </p>

                  {/* Guest */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#7A1A1A]/10 flex items-center justify-center flex-shrink-0">
                      <span className="elegant-text text-sm font-bold text-[#7A1A1A]">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-ui text-sm font-semibold text-[#1A0D0D]">{review.name}</p>
                      <p className="font-ui text-xs text-[#5C4A3A]">Verified Guest</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── G. RESERVE CTA ── */}
        <section className="bg-[#7A1A1A] py-24 md:py-32 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-ui text-xs tracking-[0.3em] uppercase text-amber-300/80 mb-6">
              Limited Tables Available
            </p>

            <h2 className="elegant-text text-6xl md:text-7xl font-bold leading-tight mb-6">
              Reserve Your Table Tonight
            </h2>

            {/* Gold divider */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-20 bg-amber-400/30 mx-auto" />
            </div>

            <p className="font-body text-white/65 text-xl mb-12 max-w-2xl mx-auto">
              Join us for an evening of authentic Italian pizza, warm hospitality, and unforgettable flavors on King Abdulaziz Branch Road.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/reservation"
                className="w-full sm:w-auto bg-amber-500 text-black font-ui font-bold text-sm px-10 py-4 uppercase tracking-widest rounded hover:bg-amber-400 transition-colors"
              >
                Book a Table
              </Link>
              <a
                href="https://wa.me/966555674383"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-white/30 text-white font-ui font-semibold text-sm px-10 py-4 uppercase rounded hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* ── H. LOCATION ── */}
        <section className="bg-[#F9F5EE] py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="font-ui text-xs tracking-[0.3em] uppercase text-amber-600 mb-4">
                Find Us
              </p>
              <h2 className="elegant-text text-5xl md:text-6xl text-[#1A0D0D]">
                Visit Us in Jeddah
              </h2>
            </div>

            {/* 3 info cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white border border-[#E8DFD0] rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#7A1A1A]/8 flex items-center justify-center mx-auto mb-5">
                  <MapPin className="w-6 h-6 text-[#7A1A1A]" />
                </div>
                <h3 className="elegant-text text-xl font-bold text-[#1A0D0D] mb-3">Location</h3>
                <p className="font-body text-[#5C4A3A] text-sm leading-relaxed">
                  King Abdulaziz Branch Road<br />
                  Jeddah, Saudi Arabia
                </p>
              </div>

              <div className="bg-white border border-[#E8DFD0] rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#7A1A1A]/8 flex items-center justify-center mx-auto mb-5">
                  <Phone className="w-6 h-6 text-[#7A1A1A]" />
                </div>
                <h3 className="elegant-text text-xl font-bold text-[#1A0D0D] mb-3">Call Us</h3>
                <div className="space-y-2">
                  <a
                    href="tel:+966555674383"
                    className="block font-body text-sm text-[#7A1A1A] hover:text-[#5a1414] font-medium transition-colors"
                  >
                    +966 55 567 4383
                  </a>
                  <a
                    href="tel:+966554430556"
                    className="block font-body text-sm text-[#7A1A1A] hover:text-[#5a1414] font-medium transition-colors"
                  >
                    +966 55 443 0556
                  </a>
                </div>
              </div>

              <div className="bg-white border border-[#E8DFD0] rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#7A1A1A]/8 flex items-center justify-center mx-auto mb-5">
                  <Clock className="w-6 h-6 text-[#7A1A1A]" />
                </div>
                <h3 className="elegant-text text-xl font-bold text-[#1A0D0D] mb-3">Hours</h3>
                <p className="font-body text-[#5C4A3A] text-sm leading-relaxed">
                  Open Daily<br />
                  1:00 PM &ndash; 1:00 AM
                </p>
              </div>
            </div>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden shadow-xl h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.8372839174876!2d39.17224!3d21.543915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sKing+Abdulaziz+Branch+Road!2sJeddah+Saudi+Arabia!5e0!3m2!1sen!2ssa!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Mazencito Pizzeria Location"
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
