import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import FoodMarquee from '@/components/food-marquee'
import Link from 'next/link'
import Image from 'next/image'
import { restaurant } from '@/lib/restaurant'

// Names + prices mirror mazencito.com/menu
const signaturePizzas = [
  { index: '01', name: 'Margherita Classic', price: '45 SAR' },
  { index: '02', name: 'Pepperoni', price: '52 SAR' },
  { index: '03', name: 'Quattro Formaggi', price: '59 SAR' },
  { index: '04', name: 'Mazencito Special', price: '72 SAR' },
  { index: '05', name: 'Funghi Tartufo', price: '79 SAR' },
]

export default function Home() {
  return (
    <>
      <Navigation />
      <main>

        {/* ── A. HERO — Editorial split: type left · photo mosaic right ── */}
        <section className="bg-[#0A0806] h-screen min-h-[640px] max-h-[1080px] overflow-hidden relative">

          {/* Desktop background: dark-treated restaurant exterior behind MAZENCITO text */}
          <div className="absolute inset-0 hidden lg:block">
            <Image
              src="/mz-exterior.png"
              alt=""
              fill
              className="object-cover object-center grayscale brightness-[0.42] contrast-[1.1] saturate-0"
              priority
            />
            {/* Left-to-right gradient: readable left, fades fully before food strips */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0806]/55 via-[#0A0806]/30 to-[#0A0806]" />
            {/* Bottom vignette */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A0806] to-transparent" />
            {/* Top vignette */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0A0806] to-transparent" />
          </div>

          {/* Mobile: overhead pizza full-bleed under the text */}
          <div className="absolute inset-0 lg:hidden">
            <Image
              src="/food-margherita.jpg"
              alt="Mazencito Pizzeria — Jeddah"
              fill
              className="object-cover object-center scale-[1.08]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0806]/85 via-[#0A0806]/60 to-[#0A0806]/92" />
          </div>

          {/* Layout grid */}
          <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-[1fr_42%]">

            {/* ── LEFT: Typography panel ── */}
            <div className="flex flex-col justify-between h-full px-5 sm:px-12 lg:px-14 pt-28 sm:pt-32 pb-10">

              {/* Location label */}
              <p className="font-ui text-[11px] tracking-[0.55em] uppercase text-white/50">
                King Abdulaziz Branch Road &nbsp;&middot;&nbsp; Jeddah
              </p>

              {/* Central content */}
              <div>
                {/* Big mark — Italian tricolore stripe above name */}
                <div className="flex gap-1.5 mb-6">
                  <div className="w-8 h-[3px] bg-white/50" />
                  <div className="w-8 h-[3px] bg-[#CC2229]" />
                  <div className="w-8 h-[3px] bg-[#009246]" />
                </div>

                <h1
                  className="font-brand text-white leading-[0.82] tracking-[0.02em] mb-8"
                  style={{ fontSize: 'clamp(1.9rem, 10.5vw, 13rem)' }}
                >
                  MAZENCITO
                </h1>

                <p
                  className="elegant-text italic text-white/65 font-light leading-snug mb-7 sm:mb-11"
                  style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)' }}
                >
                  A Taste of Italy.<br />
                  In The Heart of Jeddah.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/menu"
                    className="font-ui text-xs tracking-[0.3em] uppercase bg-[#CC2229] text-white px-8 py-4 hover:bg-[#B01E24] transition-colors text-center min-h-[44px] flex items-center justify-center"
                  >
                    View Menu
                  </Link>
                  <Link
                    href="#order"
                    className="font-ui text-xs tracking-[0.3em] uppercase border border-white/20 text-white px-8 py-4 hover:bg-white/5 transition-colors text-center min-h-[44px] flex items-center justify-center"
                  >
                    Order Delivery
                  </Link>
                  <Link
                    href="/reservation"
                    className="font-ui text-xs tracking-[0.3em] uppercase border border-white/20 text-white px-8 py-4 hover:bg-white/5 transition-colors text-center min-h-[44px] flex items-center justify-center"
                  >
                    Reserve
                  </Link>
                </div>
              </div>

              {/* Bottom info bar */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-ui text-[11px] text-white/40 tracking-wide">
                    Open daily &nbsp;&middot;&nbsp; {restaurant.hoursShort}
                  </span>
                  <a
                    href={`tel:${restaurant.phones[0].tel}`}
                    className="font-ui text-[11px] text-white/30 hover:text-white/60 transition-colors tracking-wide"
                  >
                    Reservations {restaurant.phones[0].display}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-px w-6 bg-[#CC2229]/60" />
                  <p className="font-ui text-[10px] tracking-[0.3em] uppercase text-white/35">
                    Time Out Jeddah &nbsp;&middot;&nbsp; 2026 Shortlisted
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Kinetic film strips — desktop only ── */}
            <div className="hidden lg:flex h-full border-l border-white/5 overflow-hidden gap-px bg-white/[0.03]">

              {/* Strip A — scrolls upward */}
              <div className="flex-1 overflow-hidden relative">
                <div className="flex flex-col gap-px animate-strip-up will-change-transform hover:[animation-play-state:paused]">
                  {[
                    { src: '/food-margherita.jpg',       alt: 'Pizza Margherita' },
                    { src: '/food-spaghetti-seafood.jpg', alt: 'Spaghetti ai Frutti di Mare' },
                    { src: '/food-schnitzel.jpg',         alt: 'Cotoletta alla Milanese' },
                    { src: '/food-mini-pizzas.jpg',       alt: 'Pizzette Assortite' },
                    { src: '/food-margherita.jpg',       alt: 'Pizza Margherita' },
                    { src: '/food-spaghetti-seafood.jpg', alt: 'Spaghetti ai Frutti di Mare' },
                    { src: '/food-schnitzel.jpg',         alt: 'Cotoletta alla Milanese' },
                    { src: '/food-mini-pizzas.jpg',       alt: 'Pizzette Assortite' },
                  ].map((photo, i) => (
                    <div key={i} className="relative flex-shrink-0" style={{ height: 260 }}>
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover object-center"
                        sizes="21vw"
                        priority={i < 2}
                      />
                    </div>
                  ))}
                </div>
                {/* Top + bottom fade masks */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0A0806] to-transparent pointer-events-none z-10" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0806] to-transparent pointer-events-none z-10" />
              </div>

              {/* Strip B — scrolls downward */}
              <div className="flex-1 overflow-hidden relative">
                <div className="flex flex-col gap-px animate-strip-down will-change-transform hover:[animation-play-state:paused]">
                  {[
                    { src: '/food-fettuccine.jpg',       alt: 'Fettuccine ai Funghi' },
                    { src: '/food-fritto-misto.jpg',     alt: 'Fritto Misto' },
                    { src: '/food-pasta-baked.jpg',      alt: 'Pasta al Forno' },
                    { src: '/food-spaghetti-shrimp.jpg', alt: 'Spaghetti al Limone e Gamberi' },
                    { src: '/food-fettuccine.jpg',       alt: 'Fettuccine ai Funghi' },
                    { src: '/food-fritto-misto.jpg',     alt: 'Fritto Misto' },
                    { src: '/food-pasta-baked.jpg',      alt: 'Pasta al Forno' },
                    { src: '/food-spaghetti-shrimp.jpg', alt: 'Spaghetti al Limone e Gamberi' },
                  ].map((photo, i) => (
                    <div key={i} className="relative flex-shrink-0" style={{ height: 260 }}>
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover object-center"
                        sizes="21vw"
                        priority={i < 2}
                      />
                    </div>
                  ))}
                </div>
                {/* Top + bottom fade masks */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0A0806] to-transparent pointer-events-none z-10" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0806] to-transparent pointer-events-none z-10" />
              </div>
            </div>

          </div>
        </section>

        {/* Italian tricolore separator */}
        <div className="flex h-1">
          <div className="flex-1 bg-white/70" />
          <div className="flex-1 bg-[#CC2229]" />
          <div className="flex-1 bg-[#009246]" />
        </div>

        {/* ── B.5. FOOD MARQUEE — auto-scrolling dish ticker ── */}
        <FoodMarquee />

        {/* ── ORDER DELIVERY ── */}
        <section id="order" className="bg-[#FAF8F5] py-20 md:py-24 scroll-mt-20">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-[#CC2229] mb-6">
              Order Delivery
            </p>
            <h2 className="elegant-text text-4xl md:text-5xl text-[#0A0806] font-bold mb-10">
              Order through<br />
              <em className="italic text-[#CC2229]">our delivery apps.</em>
            </h2>
            <div className="h-px bg-[#0A0806]/10 mb-10" />
            <div className="flex flex-wrap gap-3">
              {restaurant.delivery.map(({ name, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="elegant-text text-xl md:text-2xl font-bold text-[#0A0806] border border-[#0A0806]/15 px-6 py-3 hover:bg-[#0A0806] hover:text-white transition-colors min-h-[44px]"
                >
                  {name}
                </a>
              ))}
            </div>
            <p className="font-ui text-xs text-[#0A0806]/50 tracking-wide mt-8">
              We do not take orders by phone or WhatsApp.
            </p>
          </div>
        </section>

        {/* ── SIGNATURE PIZZAS ── */}
        <section className="bg-[#0A0806] py-24 md:py-32">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-white/8 pb-8 max-w-6xl mx-auto px-6 lg:px-12 gap-4">
            <div>
              <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-white/30 mb-3">
                From the Kitchen
              </p>
              <h2 className="elegant-text text-5xl md:text-6xl text-white leading-none">
                Signature<br />
                <em className="not-italic text-[#CC2229]">Pizzas</em>
              </h2>
            </div>
            <Link
              href="/menu"
              className="font-ui text-xs tracking-[0.3em] uppercase text-white/30 hover:text-white/60 transition-colors self-end pb-1"
            >
              Full Menu &rarr;
            </Link>
          </div>
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            {signaturePizzas.map((pizza) => (
              <div
                key={pizza.index}
                className="flex items-center justify-between py-5 border-b border-white/[0.06]"
              >
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-ui text-xs text-white/15 w-6 flex-shrink-0">{pizza.index}</span>
                  <span className="elegant-text text-xl md:text-2xl text-white">{pizza.name}</span>
                </div>
                <span className="font-ui text-sm text-[#CC2229] font-medium flex-shrink-0 ml-4">
                  {pizza.price}
                </span>
              </div>
            ))}
            <div className="mt-10">
              <Link
                href="/menu"
                className="font-ui text-xs tracking-[0.3em] uppercase text-[#CC2229] border border-[#CC2229]/30 px-6 py-3.5 hover:bg-[#CC2229]/8 transition-colors min-h-[44px] inline-flex items-center"
              >
                View Full Menu
              </Link>
            </div>
          </div>
        </section>

        {/* ── VISIT ── */}
        <section id="visit" className="bg-[#FAF8F5] py-20 md:py-28 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative h-64 lg:h-[420px] overflow-hidden">
              <Image src="/mz-exterior.png" alt="Mazencito Pizzeria storefront" fill className="object-cover object-center" />
            </div>
            <div>
              <p className="font-ui text-[10px] tracking-[0.45em] uppercase text-[#CC2229] mb-6">Visit Us</p>
              <h2 className="elegant-text text-4xl md:text-5xl font-bold text-[#0A0806] mb-8 leading-none">
                {restaurant.addressLines[0]}
              </h2>
              <div className="space-y-3 font-body text-[#0A0806]/70">
                <p>{restaurant.addressLines.join(', ')}</p>
                <p>Open daily &mdash; {restaurant.hours}</p>
                <p className="text-sm">
                  Reservations:{' '}
                  {restaurant.phones.map((p, i) => (
                    <span key={p.tel}>
                      {i > 0 && ' · '}
                      <a href={`tel:${p.tel}`} className="text-[#0A0806] hover:text-[#CC2229] transition-colors">{p.display}</a>
                    </span>
                  ))}
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/reservation"
                  className="font-ui text-xs tracking-[0.3em] uppercase bg-[#0A0806] text-white px-8 py-4 hover:bg-[#CC2229] transition-colors min-h-[44px] flex items-center justify-center w-fit"
                >
                  Reserve a Table
                </Link>
                <a
                  href={restaurant.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui text-xs tracking-[0.3em] uppercase border border-[#0A0806]/15 text-[#0A0806] px-8 py-4 hover:bg-[#0A0806]/5 transition-colors min-h-[44px] flex items-center justify-center w-fit"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── C. CRAFT SECTION — Full-bleed, no cards ── */}
        <section className="bg-[#FAF8F5]">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT: image */}
            <div className="relative h-[55vw] lg:h-auto lg:min-h-[700px] overflow-hidden">
              <Image
                src="/mz-bar.png"
                alt="Mazencito Pizzeria — interior, full view"
                fill
                className="object-cover object-center"
              />
            </div>

            {/* RIGHT: text */}
            <div className="flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-20">
              <p className="font-ui text-[10px] tracking-[0.45em] uppercase text-[#CC2229] mb-10">
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

              <div className="h-px w-12 bg-[#CC2229]/30 mb-8" />

              <p className="font-body text-[#0A0806] text-lg leading-relaxed max-w-sm mb-4">
                Baked at 500&deg;C in our Morello Forni wood-fired oven. Every dough hand-stretched to order. Every ingredient chosen for flavour.
              </p>

              <p className="font-body text-[#0A0806]/60 text-base leading-relaxed max-w-sm mb-12">
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
              <div className="grid grid-cols-2 gap-6 mt-14 pt-10 border-t border-[#0A0806]/8">
                <div>
                  <p className="elegant-text text-2xl text-[#CC2229] font-bold">500°</p>
                  <p className="font-ui text-[10px] text-[#0A0806]/60 mt-0.5">Celsius — Morello Forni</p>
                </div>
                <div>
                  <p className="elegant-text text-2xl text-[#CC2229] font-bold">24h</p>
                  <p className="font-ui text-[10px] text-[#0A0806]/60 mt-0.5">Slow-proofed dough</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── J. GUEST REVIEWS — Google Reviews ── */}
        <section className="bg-[#0A0806] py-24 md:py-32 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">

            {/* Header */}
            <div className="flex justify-between items-end mb-10">
              <div>
                <p className="font-ui text-[10px] tracking-[0.45em] uppercase text-white/30 mb-3">
                  Guest Reviews
                </p>
                {/* Google rating badge */}
                <div className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-label="Google" fill="none">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.909-2.258c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                    <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                  <span className="text-amber-400 text-sm tracking-widest" aria-hidden="true">&#9733;</span>
                  <span className="font-ui text-xs text-white/50">{restaurant.google.rating} on Google &middot; {restaurant.google.count} reviews</span>
                </div>
              </div>
              <a
                href="https://share.google/rl2nvvv4DPatmmDQC"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-xs tracking-[0.3em] uppercase text-white/30 hover:text-white/60 transition-colors pb-1"
              >
                All Reviews &rarr;
              </a>
            </div>

            {/* Google CTA */}
            <div className="mt-16 pt-10 border-t border-white/8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://share.google/rl2nvvv4DPatmmDQC"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-xs tracking-[0.3em] uppercase text-white border border-white/20 px-6 py-3.5 hover:bg-white/5 transition-colors min-h-[44px] flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.909-2.258c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                Read Reviews on Google
              </a>
              <a
                href="https://share.google/xGoUs5J2V2pAxsr7c"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-xs tracking-[0.3em] uppercase text-[#CC2229] border border-[#CC2229]/30 px-6 py-3.5 hover:bg-[#CC2229]/8 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Leave Us a Review
              </a>
            </div>
          </div>
        </section>

        {/* ── I. INSTAGRAM REELS ── */}
        <section className="bg-[#0A0806] border-t border-white/5 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12">
              <div>
                <p className="font-ui text-[10px] tracking-[0.45em] uppercase text-white/30 mb-3">
                  @mazencito.ksa
                </p>
                <h2 className="elegant-text text-4xl md:text-5xl text-white leading-none">
                  Watch<br />
                  <em className="not-italic text-[#CC2229]">Our Story</em>
                </h2>
              </div>
              <a
                href="https://www.instagram.com/mazencito.ksa"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-xs tracking-[0.3em] uppercase text-white/30 hover:text-white/60 transition-colors mt-4 sm:mt-0"
              >
                @mazencito.ksa &rarr;
              </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { code: 'C-FaUOAIAR0',   label: 'Good food, good mood' },
                { code: 'DRO4hKfjuBl',   label: 'Fettuccine Alfredo' },
                { code: 'DWRa87jAswt',   label: 'Crafted with passion' },
                { code: 'DJoVWBMIshy',   label: 'Mazencito' },
              ].map(({ code, label }) => (
                <div key={code}>
                  <div className="relative w-full overflow-hidden bg-[#111]" style={{ paddingBottom: '177.78%' }}>
                    <iframe
                      src={`https://www.instagram.com/reel/${code}/embed/`}
                      className="absolute inset-0 w-full h-full border-0"
                      style={{ overflow: 'hidden' }}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      title={label}
                    />
                  </div>
                  <p className="font-ui text-[9px] tracking-[0.25em] uppercase text-white/30 mt-3">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
