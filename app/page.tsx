import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Phone } from 'lucide-react'

const signaturePizzas = [
  {
    index: '01',
    name: 'Pizza Margherita',
    desc: 'San Marzano tomato · Fior di latte · Fresh basil',
    price: '25 SAR',
  },
  {
    index: '02',
    name: 'Pizza Pepperoni',
    desc: 'Premium pepperoni · House mozzarella',
    price: '30 SAR',
  },
  {
    index: '03',
    name: 'Pizza Quattro Formaggi',
    desc: 'Mozzarella · Parmesan · Gorgonzola · Ricotta',
    price: '35 SAR',
  },
  {
    index: '04',
    name: 'Pizza Al Tartufo',
    desc: 'Black truffle · Wild mushrooms · Parmesan',
    price: '45 SAR',
  },
  {
    index: '05',
    name: 'Pizza Diavola',
    desc: 'Nduja · Chili · Mozzarella · Tomato',
    price: '32 SAR',
  },
]

const reviews = [
  {
    arabic: 'أفضل بيتزا إيطالية في جدة! الطعم أصلي والأسعار معقولة جداً.',
    english: 'Best Italian pizza in Jeddah — authentic taste, great prices.',
    name: 'أحمد محمد',
  },
  {
    arabic: 'العائلة كلها استمتعت بالطعام. الجو دافئ وودود جداً.',
    english: 'The whole family loved it. Warm, welcoming atmosphere.',
    name: 'فاطمة علي',
  },
  {
    arabic: 'تجربة رائعة! الخدمة ممتازة والبيتزا طازة جداً كل مرة.',
    english: 'Amazing experience — excellent service, always fresh.',
    name: 'محمود حسن',
  },
]

export default function Home() {
  return (
    <>
      <Navigation />
      <main>

        {/* ── A. HERO — Editorial split ── */}
        <section className="bg-[#0A0806] min-h-screen relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[55%_45%] lg:grid-cols-[55%_45%] min-h-screen">

            {/* LEFT COLUMN — text */}
            <div className="relative z-10 pt-36 pb-16 px-8 sm:px-12 lg:px-20 flex flex-col justify-between min-h-screen">

              {/* TOP: location label */}
              <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-white/35 pl-3 border-l-2 border-amber-500">
                Ash Shati &middot; Jeddah &middot; KSA
              </p>

              {/* MIDDLE: main content */}
              <div className="flex-1 flex flex-col justify-center py-12">
                <p className="font-ui text-xs tracking-[0.5em] uppercase text-amber-500/70 mb-5">
                  A Taste of Italy
                </p>

                <h1
                  className="elegant-text font-bold text-white leading-[0.88] tracking-tight mb-0"
                  style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
                >
                  MAZEN<br />
                  <span className="text-amber-500/90">CITO</span>
                </h1>

                <hr className="border-white/8 my-6 max-w-xs" />

                <p className="font-ui text-[10px] tracking-[0.7em] uppercase text-white/20">
                  PIZZERIA
                </p>

                <p className="font-body text-white/45 text-base leading-relaxed max-w-sm mt-6 mb-10">
                  Wood-fired Neapolitan pizza, handcrafted pasta, and genuine Italian hospitality.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/menu"
                    className="font-ui text-xs tracking-[0.3em] uppercase bg-amber-500 text-black px-7 py-4 hover:bg-amber-400 transition-colors text-center min-h-[44px] flex items-center justify-center"
                  >
                    Explore Menu
                  </Link>
                  <Link
                    href="/reservation"
                    className="font-ui text-xs tracking-[0.3em] uppercase border border-white/20 text-white px-7 py-4 hover:bg-white/5 transition-colors text-center min-h-[44px] flex items-center justify-center"
                  >
                    Reserve a Table
                  </Link>
                </div>
              </div>

              {/* BOTTOM: meta info */}
              <div className="flex items-center gap-6 flex-wrap text-white/30">
                <span className="flex items-center gap-2">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  <span className="font-ui text-xs">12PM&ndash;1AM &middot; Weekends 2AM</span>
                </span>
                <a
                  href="tel:+966555674383"
                  className="flex items-center gap-2 hover:text-white/50 transition-colors min-h-[44px]"
                >
                  <Phone className="w-3 h-3 flex-shrink-0" />
                  <span className="font-ui text-xs">+966 55 567 4383</span>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN — image */}
            <div className="hidden md:block relative overflow-hidden">
              <Image
                src="/hero-pasta.jpg"
                alt="Mazencito Pizzeria — wood-fired Italian cuisine"
                fill
                className="object-cover"
                priority
              />
              {/* Gradient blend into left column */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0806] via-[#0A0806]/30 to-transparent" />
            </div>
          </div>

          {/* Mobile background image (below z-10 text) */}
          <div className="absolute inset-0 md:hidden">
            <Image
              src="/hero-pasta.jpg"
              alt=""
              fill
              className="object-cover opacity-[0.08]"
              priority
              aria-hidden="true"
            />
          </div>

          {/* TIME OUT BADGE — premium circular award badge */}
          <div className="absolute top-24 right-4 md:top-auto md:bottom-14 md:right-10 z-20">
            <div className="relative w-36 h-36 md:w-44 md:h-44">
              {/* Outer gold ring */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-500/60" />
              {/* Inner ring */}
              <div className="absolute inset-[6px] rounded-full border border-amber-500/25" />
              {/* Badge body */}
              <div className="absolute inset-0 rounded-full bg-[#0D0B08]/95 flex flex-col items-center justify-center gap-0 text-center px-4">
                <span className="font-ui text-[9px] md:text-[10px] tracking-[0.35em] text-amber-400 uppercase leading-none">Time Out</span>
                <span className="font-ui text-[8px] md:text-[9px] tracking-[0.25em] text-white/50 uppercase leading-none mt-1">Jeddah</span>
                <div className="h-px w-10 bg-amber-500/50 my-2" />
                <span className="elegant-text text-3xl md:text-4xl font-bold text-amber-400 leading-none">2026</span>
                <div className="h-px w-10 bg-amber-500/25 mt-2 mb-1.5" />
                <span className="font-ui text-[7px] md:text-[8px] tracking-[0.3em] uppercase text-white/45 leading-none">Shortlisted</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── B. BRAND PROMISE STRIP ── */}
        <section className="bg-[#8B1A1A] py-4 overflow-hidden">
          <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/75 text-center whitespace-normal sm:whitespace-nowrap">
            Same Quality &nbsp;&middot;&nbsp; Same Fresh Ingredients &nbsp;&middot;&nbsp; Better Value &nbsp;&middot;&nbsp; Wood-Fired Since Day One &nbsp;&middot;&nbsp; Ash Shati, Jeddah
          </p>
        </section>

        {/* ── C. CRAFT SECTION — Full-bleed, no cards ── */}
        <section className="bg-[#F5F0E8]">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT: image */}
            <div className="relative h-[55vw] lg:h-auto lg:min-h-[700px] overflow-hidden">
              <Image
                src="/restaurant-interior.jpg"
                alt="Mazencito restaurant interior"
                fill
                className="object-cover"
              />
            </div>

            {/* RIGHT: text */}
            <div className="flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-20">
              <p className="font-ui text-[10px] tracking-[0.45em] uppercase text-[#8B1A1A] mb-10">
                Our Craft
              </p>

              <h2
                className="elegant-text font-bold text-[#0A0806] leading-[1.05] mb-8"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              >
                Wood-fired.<br />
                <em className="italic">Hand-made.</em><br />
                Genuine.
              </h2>

              <div className="h-px w-12 bg-[#8B1A1A]/30 mb-8" />

              <p className="font-body text-[#5C4A3A] text-lg leading-relaxed max-w-sm mb-4">
                Baked at 500&deg;C in our Morello Forni wood-fired oven. Every dough hand-stretched to order. Every ingredient chosen for flavour.
              </p>

              <p className="font-body text-[#5C4A3A]/60 text-base leading-relaxed max-w-sm mb-12">
                This is not fast food. This is the Italian way.
              </p>

              <Link
                href="/about"
                className="inline-flex items-center gap-3 group w-fit min-h-[44px]"
              >
                <span className="font-ui text-[10px] tracking-[0.35em] uppercase text-[#0A0806]">
                  Our Story
                </span>
                <div className="h-px w-8 bg-[#0A0806] group-hover:w-16 transition-all duration-300" />
              </Link>

              {/* Stat block */}
              <div className="grid grid-cols-2 gap-4 mt-14 pt-10 border-t border-[#0A0806]/8">
                <div>
                  <p className="font-ui text-xs tracking-wide text-[#0A0806]">Morello Forni</p>
                  <p className="font-ui text-[10px] text-[#5C4A3A]/60 mt-0.5">Italian Wood-Fired Oven</p>
                </div>
                <div>
                  <p className="elegant-text text-2xl text-[#8B1A1A] font-bold">46.9K</p>
                  <p className="font-ui text-[10px] text-[#5C4A3A]/60 mt-0.5">Instagram Followers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── D. MENU SECTION — Typographic list, NO cards ── */}
        <section className="bg-[#0A0806] py-24 md:py-32">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-white/8 pb-8 mb-0 max-w-6xl mx-auto px-6 lg:px-12 gap-4">
            <div>
              <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-white/30 mb-3">
                From the Kitchen
              </p>
              <h2 className="elegant-text text-5xl md:text-6xl text-white leading-none">
                Signature<br />
                <em className="not-italic text-amber-500">Pizzas</em>
              </h2>
            </div>
            <Link
              href="/menu"
              className="font-ui text-xs tracking-[0.3em] uppercase text-white/30 hover:text-white/60 transition-colors self-end pb-1"
            >
              Full Menu &rarr;
            </Link>
          </div>

          {/* Pizza rows */}
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            {signaturePizzas.map((pizza) => (
              <div
                key={pizza.index}
                className="flex items-center justify-between py-5 border-b border-white/[0.06] hover:border-white/15 transition-colors group"
              >
                <div className="flex items-baseline gap-4 sm:gap-6 flex-1 min-w-0">
                  <span className="font-ui text-xs text-white/15 w-6 flex-shrink-0">{pizza.index}</span>
                  <div className="min-w-0">
                    <span className="elegant-text text-xl md:text-2xl text-white group-hover:text-amber-100/90 transition-colors block">
                      {pizza.name}
                    </span>
                    <span className="font-ui text-xs text-white/30 tracking-wide block mt-0.5 truncate">
                      {pizza.desc}
                    </span>
                  </div>
                </div>
                <span className="font-ui text-sm text-amber-500 font-medium flex-shrink-0 ml-4">
                  {pizza.price}
                </span>
              </div>
            ))}

            <div className="mt-10 flex gap-4">
              <Link
                href="/menu"
                className="font-ui text-xs tracking-[0.3em] uppercase text-amber-500 border border-amber-500/25 px-6 py-3.5 hover:bg-amber-500/8 transition-colors min-h-[44px] flex items-center"
              >
                View Full Menu
              </Link>
            </div>
          </div>
        </section>

        {/* ── E. TUESDAY PASTA DAY — Full-bleed promotional ── */}
        <section className="bg-[#F5F0E8] grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT: image */}
          <div className="relative h-[50vw] lg:h-auto min-h-[400px] overflow-hidden">
            <Image
              src="/tiramisu.jpg"
              alt="Tiramisu dessert at Mazencito Pizzeria"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#0A0806]/20" />
          </div>

          {/* RIGHT: promo text */}
          <div className="bg-[#8B1A1A] flex flex-col justify-center px-10 sm:px-14 lg:px-16 py-20">
            <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/40 mb-6">
              Every Tuesday
            </p>

            <h2 className="elegant-text font-bold text-white leading-[0.95] mb-6" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
              Pasta<br />
              Day
            </h2>

            <div className="h-px w-12 bg-white/20 mb-8" />

            <p className="font-body text-white/65 text-xl mb-10">
              Order one pasta, get the second completely free.
            </p>

            <Link
              href="/menu"
              className="font-ui text-xs tracking-[0.3em] uppercase text-black bg-amber-500 px-7 py-4 hover:bg-amber-400 transition-colors w-fit min-h-[44px] flex items-center justify-center"
            >
              Order Now
            </Link>

            <p className="font-ui text-[10px] text-white/30 mt-4 tracking-wide">
              Dine-in &amp; delivery &middot; Every Tuesday
            </p>
          </div>
        </section>

        {/* ── F. LUNCH OFFER STRIP ── */}
        <section className="bg-[#0A0806] border-y border-white/5 py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">

            <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-amber-500/70 mb-6">
              Lunch Offer
            </p>

            <h2 className="elegant-text text-4xl md:text-5xl text-white mb-2">
              Sunday &ndash; Thursday
            </h2>

            <p className="font-ui text-xs tracking-[0.3em] uppercase text-white/30 mb-10">
              1:00 PM to 5:00 PM
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              <div className="border border-white/8 p-8 text-center">
                <p className="elegant-text text-4xl text-amber-500 font-bold">65 SAR</p>
                <p className="font-ui text-xs text-white/30 tracking-wide uppercase mt-1">per person</p>
                <div className="h-px bg-white/8 mt-4 mb-4" />
                <p className="font-body text-sm text-white/45 leading-relaxed">
                  Salad or Soup + Main Course + Soft Drink
                </p>
              </div>
              <div className="border border-white/8 p-8 text-center">
                <p className="elegant-text text-4xl text-amber-500 font-bold">85 SAR</p>
                <p className="font-ui text-xs text-white/30 tracking-wide uppercase mt-1">per person</p>
                <div className="h-px bg-white/8 mt-4 mb-4" />
                <p className="font-body text-sm text-white/45 leading-relaxed">
                  Salad + Main Course + Dessert + Beverages
                </p>
              </div>
            </div>

            <p className="font-ui text-[10px] text-white/25 tracking-wide mt-10">
              Subject to availability &middot; Dine-in only
            </p>
          </div>
        </section>

        {/* ── G. DELIVERY — Pure typography, no cards ── */}
        <section className="bg-[#F5F0E8] py-20 md:py-24">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">

            <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-[#8B1A1A] mb-6">
              Order Delivery
            </p>

            <h2 className="elegant-text text-4xl md:text-5xl text-[#0A0806] font-bold mb-10">
              We deliver<br />
              <em className="italic text-[#8B1A1A]">everywhere.</em>
            </h2>

            <div className="h-px bg-[#0A0806]/10 mb-10" />

            {/* Platforms — horizontal typographic list */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="elegant-text text-2xl md:text-3xl text-[#0A0806] font-bold">HungerStation</span>
              <span className="text-[#0A0806]/15 text-xl font-thin">/</span>
              <span className="elegant-text text-2xl md:text-3xl text-[#0A0806] font-bold">Keeta</span>
              <span className="text-[#0A0806]/15 text-xl font-thin">/</span>
              <span className="elegant-text text-2xl md:text-3xl text-[#0A0806] font-bold">Jahez</span>
              <span className="text-[#0A0806]/15 text-xl font-thin">/</span>
              <span className="elegant-text text-2xl md:text-3xl text-[#0A0806] font-bold">Lugmety</span>
            </div>

            <p className="font-ui text-xs text-[#5C4A3A]/50 tracking-wide mt-8">
              Available for delivery and takeaway
            </p>
          </div>
        </section>

        {/* ── H. FUTURE ORDERING CONCEPT ── */}
        <section className="bg-[#0A0806] py-24 md:py-32 relative overflow-hidden">

          {/* Background texture — large faint letterform */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 elegant-text font-bold text-white/[0.025] leading-none select-none pointer-events-none hidden lg:block"
            style={{ fontSize: 'clamp(16rem, 28vw, 28rem)' }}
            aria-hidden="true"
          >
            QR
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

            {/* Header */}
            <div className="mb-16 md:mb-20">
              <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-amber-500/60 mb-5">
                Coming Soon
              </p>
              <h2
                className="elegant-text font-bold text-white leading-[1.0]"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
              >
                Order Direct.<br />
                <em className="text-amber-500/90">No Middleman.</em>
              </h2>
              <p className="font-body text-white/35 text-lg max-w-lg mt-6 leading-relaxed">
                We are building our own ordering experience — faster, smarter, and built entirely around you.
              </p>
            </div>

            {/* Three concept pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/8">

              {/* 1 — QR Table Ordering */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/8 group hover:bg-white/[0.025] transition-colors">
                <div className="w-10 h-10 border border-amber-500/30 flex items-center justify-center mb-8">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <rect x="1" y="1" width="6" height="6" stroke="#E8970F" strokeOpacity="0.7" strokeWidth="1.5"/>
                    <rect x="11" y="1" width="6" height="6" stroke="#E8970F" strokeOpacity="0.7" strokeWidth="1.5"/>
                    <rect x="1" y="11" width="6" height="6" stroke="#E8970F" strokeOpacity="0.7" strokeWidth="1.5"/>
                    <rect x="3" y="3" width="2" height="2" fill="#E8970F" fillOpacity="0.7"/>
                    <rect x="13" y="3" width="2" height="2" fill="#E8970F" fillOpacity="0.7"/>
                    <rect x="3" y="13" width="2" height="2" fill="#E8970F" fillOpacity="0.7"/>
                    <rect x="11" y="11" width="2" height="2" fill="#E8970F" fillOpacity="0.5"/>
                    <rect x="14" y="11" width="2" height="2" fill="#E8970F" fillOpacity="0.5"/>
                    <rect x="11" y="14" width="2" height="2" fill="#E8970F" fillOpacity="0.5"/>
                    <rect x="14" y="14" width="2" height="2" fill="#E8970F" fillOpacity="0.5"/>
                  </svg>
                </div>
                <p className="font-ui text-[9px] tracking-[0.4em] uppercase text-amber-500/50 mb-3">01 &nbsp;/&nbsp; QR Ordering</p>
                <h3 className="elegant-text text-2xl text-white font-bold mb-4 leading-tight">
                  Scan.<br />Browse.<br />Order.
                </h3>
                <p className="font-body text-white/40 text-sm leading-relaxed">
                  Every table gets its own QR code. Scan from your phone, browse the full menu in Arabic and English, and place your order without waiting for a waiter.
                </p>
              </div>

              {/* 2 — Mazencito App */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/8 group hover:bg-white/[0.025] transition-colors">
                <div className="w-10 h-10 border border-amber-500/30 flex items-center justify-center mb-8">
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden="true">
                    <rect x="1" y="1" width="14" height="18" rx="2" stroke="#E8970F" strokeOpacity="0.7" strokeWidth="1.5"/>
                    <rect x="6" y="16" width="4" height="1.5" rx="0.75" fill="#E8970F" fillOpacity="0.5"/>
                    <rect x="4" y="5" width="8" height="1" fill="#E8970F" fillOpacity="0.4"/>
                    <rect x="4" y="8" width="8" height="1" fill="#E8970F" fillOpacity="0.4"/>
                    <rect x="4" y="11" width="5" height="1" fill="#E8970F" fillOpacity="0.4"/>
                  </svg>
                </div>
                <p className="font-ui text-[9px] tracking-[0.4em] uppercase text-amber-500/50 mb-3">02 &nbsp;/&nbsp; Our App</p>
                <h3 className="elegant-text text-2xl text-white font-bold mb-4 leading-tight">
                  Mazencito<br />Platform
                </h3>
                <p className="font-body text-white/40 text-sm leading-relaxed">
                  Our own mobile app — launching soon. Order dine-in or delivery, track your meals in real time, and unlock member-only offers. No third-party fees.
                </p>
                <div className="mt-6 inline-flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 animate-pulse" aria-hidden="true" />
                  <span className="font-ui text-[9px] tracking-[0.3em] uppercase text-amber-500/60">In Development</span>
                </div>
              </div>

              {/* 3 — Direct Delivery */}
              <div className="p-8 md:p-10 group hover:bg-white/[0.025] transition-colors">
                <div className="w-10 h-10 border border-amber-500/30 flex items-center justify-center mb-8">
                  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
                    <path d="M1 6H14V13H1V6Z" stroke="#E8970F" strokeOpacity="0.7" strokeWidth="1.5"/>
                    <path d="M14 4L19 6V13H14V4Z" stroke="#E8970F" strokeOpacity="0.7" strokeWidth="1.5"/>
                    <circle cx="5" cy="13.5" r="1.5" stroke="#E8970F" strokeOpacity="0.6" strokeWidth="1.2"/>
                    <circle cx="17" cy="13.5" r="1.5" stroke="#E8970F" strokeOpacity="0.6" strokeWidth="1.2"/>
                  </svg>
                </div>
                <p className="font-ui text-[9px] tracking-[0.4em] uppercase text-amber-500/50 mb-3">03 &nbsp;/&nbsp; Direct Delivery</p>
                <h3 className="elegant-text text-2xl text-white font-bold mb-4 leading-tight">
                  Order Direct.<br />Save More.
                </h3>
                <p className="font-body text-white/40 text-sm leading-relaxed">
                  When we launch our own platform, every direct order means zero platform commission — which means better prices and exclusive loyalty rewards for you.
                </p>
              </div>
            </div>

            {/* Bottom strip — early access CTA */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-t border-white/8 pt-8">
              <p className="font-body text-white/30 text-sm italic">
                Be the first to experience the new Mazencito — follow us on Instagram for the launch.
              </p>
              <a
                href="https://www.instagram.com/mazencito.ksa"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-xs tracking-[0.3em] uppercase text-amber-500 border border-amber-500/25 px-6 py-3.5 hover:bg-amber-500/8 transition-colors min-h-[44px] flex items-center justify-center sm:flex-shrink-0 w-fit"
              >
                Follow @mazencito.ksa
              </a>
            </div>
          </div>
        </section>

        {/* ── I. GUEST REVIEWS — Editorial pull quote style ── */}
        <section className="bg-[#0A0806] py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">

            {/* Header */}
            <div className="flex justify-between items-end mb-16">
              <p className="font-ui text-[10px] tracking-[0.45em] uppercase text-white/30">
                Guest Reviews
              </p>
              <span className="text-amber-500 text-sm tracking-widest">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            </div>

            {/* Reviews — stacked, editorial */}
            <div className="space-y-16">
              {reviews.map((review, idx) => (
                <div key={idx}>
                  {/* Giant quote mark */}
                  <div className="elegant-text text-8xl text-white/5 leading-none font-bold -mb-6 ml-4 select-none" aria-hidden="true">
                    &ldquo;
                  </div>

                  {/* Arabic quote */}
                  <p
                    dir="rtl"
                    className="elegant-text text-2xl md:text-3xl text-white/75 leading-relaxed italic font-normal pl-6 border-l border-white/10"
                  >
                    {review.arabic}
                  </p>

                  {/* English translation */}
                  <p className="font-body text-white/35 text-base italic mt-3 pl-6">
                    &ldquo;{review.english}&rdquo;
                  </p>

                  {/* Attribution */}
                  <div className="flex items-center gap-3 mt-6 pl-6">
                    <div className="h-px w-8 bg-white/15" />
                    <span className="font-ui text-xs tracking-[0.2em] text-white/40 uppercase">{review.name}</span>
                    <span className="font-ui text-[10px] text-white/20">Verified Guest</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── I. LOCATION — Clean minimal ── */}
        <section className="bg-[#F5F0E8] py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 items-start">

            {/* LEFT: info */}
            <div>
              <p className="font-ui text-[10px] tracking-[0.45em] uppercase text-[#8B1A1A] mb-8">
                Visit Us
              </p>

              <h2 className="elegant-text text-4xl font-bold text-[#0A0806] mb-8">
                Ash Shati,<br />
                Jeddah
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="font-ui text-xs uppercase tracking-widest text-[#5C4A3A]/50 mb-1">Address</p>
                  <p className="font-body text-[#0A0806]">
                    Ash Shati, Atelier Lavie<br />
                    Jeddah, Saudi Arabia
                  </p>
                </div>

                <div>
                  <p className="font-ui text-xs uppercase tracking-widest text-[#5C4A3A]/50 mb-1">Hours</p>
                  <p className="font-body text-[#0A0806]">Open Daily &mdash; 12:00 PM &ndash; 1:00 AM</p>
                  <p className="font-body text-[#5C4A3A]/60 text-sm mt-0.5">Weekends till 2:00 AM</p>
                </div>

                <div>
                  <p className="font-ui text-xs uppercase tracking-widest text-[#5C4A3A]/50 mb-1">Phone</p>
                  <a
                    href="tel:+966555674383"
                    className="font-body text-[#0A0806] hover:text-[#8B1A1A] transition-colors min-h-[44px] flex items-center"
                  >
                    +966 55 567 4383
                  </a>
                  <a
                    href="tel:+966554430556"
                    className="block font-body text-[#0A0806] hover:text-[#8B1A1A] transition-colors"
                  >
                    +966 55 443 0556
                  </a>
                </div>

                <div>
                  <a
                    href="https://wa.me/966555674383"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-ui text-xs tracking-[0.2em] uppercase text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    Chat on WhatsApp &rarr;
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/reservation"
                  className="font-ui text-xs tracking-[0.3em] uppercase bg-[#0A0806] text-white px-6 py-3.5 hover:bg-[#8B1A1A] transition-colors min-h-[44px] flex items-center"
                >
                  Reserve a Table
                </Link>
              </div>
            </div>

            {/* RIGHT: map */}
            <div className="overflow-hidden h-[400px] lg:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.872!2d39.1726!3d21.6226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d14e7e5c5555%3A0x0!2sMazencito%20Pizzeria!5e0!3m2!1sen!2ssa!4v1716900000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Mazencito Pizzeria — Ash Shati, Atelier Lavie, Jeddah"
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
