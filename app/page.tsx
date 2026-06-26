import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import FoodMarquee from '@/components/food-marquee'
import Link from 'next/link'
import Image from 'next/image'

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

        {/* ── A. HERO — Editorial split: type left · photo mosaic right ── */}
        <section className="bg-[#0A0806] h-screen min-h-[640px] max-h-[1080px] overflow-hidden relative">

          {/* Desktop background: dark-treated restaurant exterior behind MAZENCITO text */}
          <div className="absolute inset-0 hidden lg:block">
            <Image
              src="/mz-exterior.png"
              alt=""
              fill
              className="object-cover object-center grayscale brightness-[0.22] contrast-[1.15] saturate-0"
              priority
            />
            {/* Left-to-right gradient: text zone dark, fades fully before food strips */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0806]/60 via-[#0A0806]/45 to-[#0A0806]" />
            {/* Bottom vignette */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A0806] to-transparent" />
            {/* Top vignette */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0A0806] to-transparent" />
          </div>

          {/* Mobile: overhead pizza full-bleed under the text */}
          <div className="absolute inset-0 lg:hidden">
            <Image
              src="/food-margherita.jpg"
              alt="Mazencito Pizzeria — Ash Shati, Jeddah"
              fill
              className="object-cover object-center scale-[1.08]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0806]/85 via-[#0A0806]/60 to-[#0A0806]/92" />
          </div>

          {/* Layout grid */}
          <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-[1fr_42%]">

            {/* ── LEFT: Typography panel ── */}
            <div className="flex flex-col justify-between h-full px-8 sm:px-12 lg:px-14 pt-28 sm:pt-32 pb-10">

              {/* Location label */}
              <p className="font-ui text-[10px] tracking-[0.55em] uppercase text-white/30">
                Ash Shati &nbsp;&middot;&nbsp; Jeddah &nbsp;&middot;&nbsp; KSA
              </p>

              {/* Central content */}
              <div>
                {/* Big mark — Italian tricolore stripe above name */}
                <div className="flex gap-1 mb-5">
                  <div className="w-6 h-1 bg-white/40" />
                  <div className="w-6 h-1 bg-[#CC2229]" />
                  <div className="w-6 h-1 bg-[#009246]" />
                </div>

                <h1
                  className="font-brand text-white leading-[0.82] tracking-[0.02em] mb-7"
                  style={{ fontSize: 'clamp(3.8rem, 8.5vw, 10.5rem)' }}
                >
                  MAZENCITO
                </h1>

                <p
                  className="elegant-text italic text-white/45 font-light leading-snug mb-10"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.55rem)' }}
                >
                  A Taste of Italy.<br />
                  In The Heart of Jeddah.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/reservation"
                    className="font-ui text-xs tracking-[0.3em] uppercase bg-[#CC2229] text-white px-8 py-4 hover:bg-[#B01E24] transition-colors text-center min-h-[44px] flex items-center justify-center"
                  >
                    Reserve A Table
                  </Link>
                  <Link
                    href="/menu"
                    className="font-ui text-xs tracking-[0.3em] uppercase border border-white/20 text-white px-8 py-4 hover:bg-white/5 transition-colors text-center min-h-[44px] flex items-center justify-center"
                  >
                    View Menu
                  </Link>
                </div>
              </div>

              {/* Bottom info bar */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-ui text-[10px] text-white/25 tracking-wide">
                    12PM &ndash; 1AM &nbsp;&middot;&nbsp; Weekends 2AM
                  </span>
                  <a
                    href="tel:+966555674383"
                    className="font-ui text-[10px] text-white/20 hover:text-white/45 transition-colors tracking-wide"
                  >
                    +966 55 567 4383
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-px w-4 bg-[#CC2229]/50" />
                  <p className="font-ui text-[9px] tracking-[0.3em] uppercase text-white/20">
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

        {/* ── C. CRAFT SECTION — Full-bleed, no cards ── */}
        <section className="bg-[#FAF8F5]">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT: image */}
            <div className="relative h-[55vw] lg:h-auto lg:min-h-[700px] overflow-hidden">
              <Image
                src="/mz-bar.png"
                alt="Mazencito Pizzeria — interior, full view"
                fill
                className="object-cover object-top"
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
              <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-[#0A0806]/8">
                <div>
                  <p className="elegant-text text-2xl text-[#CC2229] font-bold">500°</p>
                  <p className="font-ui text-[10px] text-[#0A0806]/60 mt-0.5">Celsius — Morello Forni</p>
                </div>
                <div>
                  <p className="elegant-text text-2xl text-[#CC2229] font-bold">24h</p>
                  <p className="font-ui text-[10px] text-[#0A0806]/60 mt-0.5">Slow-proofed dough</p>
                </div>
                <div>
                  <p className="elegant-text text-2xl text-[#CC2229] font-bold">46.9K</p>
                  <p className="font-ui text-[10px] text-[#0A0806]/60 mt-0.5">Instagram Followers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── C.5. THE KITCHEN — Editorial food photo grid ── */}
        <section className="bg-[#0A0806] py-16 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">

            {/* Section label */}
            <div className="flex items-center justify-between mb-8">
              <p className="font-ui text-[10px] tracking-[0.45em] uppercase text-white/30">The Kitchen</p>
              <div className="h-px flex-1 bg-white/8 mx-6" />
              <p className="font-ui text-[10px] tracking-[0.3em] uppercase text-white/20">Fresh Daily</p>
            </div>

            {/* Grid: large left + 2 stacked right */}
            <div className="grid grid-cols-[3fr_2fr] gap-2 mb-2">

              {/* Large hero — spaghetti seafood */}
              <div className="relative overflow-hidden group" style={{ aspectRatio: '4/3' }}>
                <Image
                  src="/food-spaghetti-seafood.jpg"
                  alt="Spaghetti ai Frutti di Mare"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="font-ui text-[8px] tracking-[0.4em] uppercase text-white/40 mb-1">Pasta</p>
                  <p className="elegant-text text-xl text-white">Spaghetti ai Frutti di Mare</p>
                </div>
              </div>

              {/* Stacked right column */}
              <div className="flex flex-col gap-2">
                <div className="relative overflow-hidden group flex-1">
                  <Image
                    src="/food-fritto-misto.jpg"
                    alt="Fritto Misto"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="font-ui text-[8px] tracking-[0.4em] uppercase text-white/40 mb-0.5">Starters</p>
                    <p className="elegant-text text-sm text-white">Fritto Misto</p>
                  </div>
                </div>
                <div className="relative overflow-hidden group flex-1">
                  <Image
                    src="/food-spaghetti-shrimp.jpg"
                    alt="Spaghetti al Limone e Gamberi"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="font-ui text-[8px] tracking-[0.4em] uppercase text-white/40 mb-0.5">Pasta</p>
                    <p className="elegant-text text-sm text-white">Spaghetti al Limone e Gamberi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row — 3 equal */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { src: '/food-schnitzel.jpg',   label: 'Cotoletta alla Milanese', cat: 'Mains' },
                { src: '/food-fettuccine.jpg',  label: 'Fettuccine ai Funghi',    cat: 'Pasta' },
                { src: '/food-mini-pizzas.jpg', label: 'Pizzette Assortite',       cat: 'Pizza' },
              ].map((item) => (
                <div key={item.src} className="relative overflow-hidden group" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="font-ui text-[8px] tracking-[0.4em] uppercase text-white/40 mb-0.5">{item.cat}</p>
                    <p className="elegant-text text-sm text-white leading-tight">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <Link
                href="/menu"
                className="inline-flex items-center gap-3 group min-h-[44px]"
              >
                <div className="h-px w-8 bg-[#CC2229] group-hover:w-14 transition-all duration-300" />
                <span className="font-ui text-[10px] tracking-[0.35em] uppercase text-white/50 group-hover:text-white/80 transition-colors">
                  Explore the Full Menu
                </span>
                <div className="h-px w-8 bg-[#CC2229] group-hover:w-14 transition-all duration-300" />
              </Link>
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
                    <span className="elegant-text text-xl md:text-2xl text-white group-hover:text-[#CC2229]/80 transition-colors block">
                      {pizza.name}
                    </span>
                    <span className="font-ui text-xs text-white/30 tracking-wide block mt-0.5 truncate">
                      {pizza.desc}
                    </span>
                  </div>
                </div>
                <span className="font-ui text-sm text-[#CC2229] font-medium flex-shrink-0 ml-4">
                  {pizza.price}
                </span>
              </div>
            ))}

            <div className="mt-10 flex gap-4">
              <Link
                href="/menu"
                className="font-ui text-xs tracking-[0.3em] uppercase text-[#CC2229] border border-[#CC2229]/30 px-6 py-3.5 hover:bg-[#CC2229]/8 transition-colors min-h-[44px] flex items-center"
              >
                View Full Menu
              </Link>
            </div>
          </div>
        </section>

        {/* ── E. TUESDAY PASTA DAY — Full-bleed promotional ── */}
        <div className="h-1 bg-[#009246]" />
        <section className="bg-[#FAF8F5] grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT: image */}
          <div className="relative h-[50vw] lg:h-auto min-h-[400px] overflow-hidden">
            <Image
              src="/food-pasta-baked.jpg"
              alt="Pasta al Forno — baked penne, Tuesday Pasta Day"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#0A0806]/20" />
          </div>

          {/* RIGHT: promo text */}
          <div className="relative bg-[#CC2229] flex flex-col justify-center px-10 sm:px-14 lg:px-16 py-20 overflow-hidden">
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
              className="font-ui text-xs tracking-[0.3em] uppercase text-[#CC2229] bg-white px-7 py-4 hover:bg-white/90 transition-colors w-fit min-h-[44px] flex items-center justify-center"
            >
              View Menu
            </Link>

            <p className="font-ui text-[10px] text-white/30 mt-4 tracking-wide">
              Dine-in &amp; delivery &middot; Every Tuesday
            </p>

            {/* Italian tricolore bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 flex h-1.5">
              <div className="flex-1 bg-white/40" />
              <div className="flex-1 bg-[#CC2229]" />
              <div className="flex-1 bg-[#009246]" />
            </div>
          </div>
        </section>

        {/* ── F. LUNCH OFFER ── */}
        <section className="bg-[#0A0806] border-y border-white/5 py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">

            <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-[#CC2229] mb-8">
              Lunch Offer
            </p>

            <h2
              className="elegant-text font-bold text-white leading-none mb-4"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Sunday &ndash; Thursday
            </h2>

            <p className="font-ui text-xs tracking-[0.4em] uppercase text-white/25 mb-16">
              1:00 PM &ndash; 5:00 PM &nbsp;&middot;&nbsp; Dine-in Only
            </p>

            <div className="border-t border-white/8">

              <div className="grid grid-cols-[6rem_1fr] sm:grid-cols-[9rem_1fr] gap-8 py-10 border-b border-white/8 items-baseline">
                <p
                  className="elegant-text font-bold text-white"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  65 SAR
                </p>
                <div>
                  <p className="font-ui text-[10px] tracking-[0.35em] uppercase text-white/20 mb-2">Per Person</p>
                  <p className="font-body text-white/50 text-lg leading-relaxed">
                    Salad or Soup &nbsp;&middot;&nbsp; Main Course &nbsp;&middot;&nbsp; Soft Drink
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[6rem_1fr] sm:grid-cols-[9rem_1fr] gap-8 py-10 border-b border-white/8 items-baseline">
                <p
                  className="elegant-text font-bold text-white"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  85 SAR
                </p>
                <div>
                  <p className="font-ui text-[10px] tracking-[0.35em] uppercase text-white/20 mb-2">Per Person</p>
                  <p className="font-body text-white/50 text-lg leading-relaxed">
                    Salad &nbsp;&middot;&nbsp; Main Course &nbsp;&middot;&nbsp; Dessert &nbsp;&middot;&nbsp; Beverages
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ── G. DELIVERY — Pure typography, no cards ── */}
        <section className="bg-[#FAF8F5] py-20 md:py-24">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">

            <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-[#CC2229] mb-6">
              Order Delivery
            </p>

            <h2 className="elegant-text text-4xl md:text-5xl text-[#0A0806] font-bold mb-10">
              We deliver<br />
              <em className="italic text-[#CC2229]">everywhere.</em>
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

            <p className="font-ui text-xs text-[#0A0806]/50 tracking-wide mt-8">
              Available for delivery and takeaway
            </p>
          </div>
        </section>

        {/* ── H. PHOTO GALLERY — Real restaurant photography ── */}
        <section className="bg-[#0A0806]">

          {/* Section label */}
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-10">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/30 mb-3">
                  Inside Mazencito
                </p>
                <h2 className="elegant-text text-4xl md:text-5xl text-white leading-none">
                  Two Locations.<br />
                  <em className="not-italic text-[#CC2229]">One Experience.</em>
                </h2>
              </div>
              <a
                href="https://www.instagram.com/mazencito.ksa"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-xs tracking-[0.3em] uppercase text-white/25 hover:text-white/50 transition-colors hidden sm:block pb-1"
              >
                @mazencito.ksa &rarr;
              </a>
            </div>
          </div>

          {/* Photo grid — editorial asymmetric */}
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 h-[80vw] md:h-[55vw] max-h-[700px]">

            {/* 1 — Exterior night (tall, spans 2 rows on left) */}
            <div className="relative row-span-2 overflow-hidden group">
              <Image
                src="/mz-exterior.png"
                alt="Mazencito Pizzeria — Ash Shati storefront at night"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0A0806]/15" />
              <div className="absolute bottom-4 left-4">
                <span className="font-ui text-[9px] tracking-[0.3em] uppercase text-white/60 bg-[#0A0806]/60 px-2 py-1">
                  Ash Shati
                </span>
              </div>
            </div>

            {/* 2 — Interior dining (top centre) */}
            <div className="relative overflow-hidden group">
              <Image
                src="/mz-dining.png"
                alt="Mazencito Pizzeria — warm dining room interior"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0A0806]/10" />
            </div>

            {/* 3 — Chef / modern location (top, spans 2 cols) */}
            <div className="relative col-span-2 overflow-hidden group">
              <Image
                src="/mz-chef.png"
                alt="Mazencito Pizzeria — chef in the dining room"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0A0806]/10" />
              <div className="absolute bottom-4 right-4">
                <span className="font-ui text-[9px] tracking-[0.3em] uppercase text-white/60 bg-[#0A0806]/60 px-2 py-1">
                  Al Zahra
                </span>
              </div>
            </div>

            {/* 4 — Booth seating (bottom centre) */}
            <div className="relative overflow-hidden group">
              <Image
                src="/mz-booth.png"
                alt="Mazencito Pizzeria — booth seating with arched walls"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0A0806]/10" />
            </div>

            {/* 5 — Terrace exterior (bottom right, spans 2 cols) */}
            <div className="relative col-span-2 overflow-hidden group">
              <Image
                src="/mz-terrace.png"
                alt="Mazencito Pizzeria — outdoor terrace seating"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0A0806]/15" />
              <div className="absolute bottom-4 left-4">
                <span className="font-ui text-[9px] tracking-[0.3em] uppercase text-white/60 bg-[#0A0806]/60 px-2 py-1">
                  Terrace · 15 Seats
                </span>
              </div>
            </div>

          </div>

          {/* Second row — 3 smaller photos */}
          <div className="grid grid-cols-3 h-[30vw] max-h-[280px] border-t border-white/5">
            {[
              { src: '/mz-window.png', alt: 'Mazencito — window table, Ash Shati' },
              { src: '/mz-table.png', alt: 'Mazencito — marble table, Al Zahra' },
              { src: '/mz-exterior2.png', alt: 'Mazencito — daytime exterior, Al Zahra' },
            ].map(({ src, alt }, i) => (
              <div key={i} className={`relative overflow-hidden group ${i < 2 ? 'border-r border-white/5' : ''}`}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0A0806]/10" />
              </div>
            ))}
          </div>

        </section>

        {/* ── I. FUTURE ORDERING CONCEPT ── */}
        <section className="bg-[#0A0806] py-24 md:py-32 relative overflow-hidden">

          <div
            className="absolute right-[-2vw] top-1/2 -translate-y-1/2 elegant-text font-bold text-white/[0.02] leading-none select-none pointer-events-none hidden lg:block"
            style={{ fontSize: 'clamp(16rem, 28vw, 28rem)' }}
            aria-hidden="true"
          >
            M
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

            <div className="mb-16 md:mb-24">
              <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/40 mb-5">
                Coming Soon
              </p>
              <h2
                className="elegant-text font-bold text-white leading-[1.0]"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
              >
                Order Direct.<br />
                <em className="text-[#CC2229]">No Middleman.</em>
              </h2>
              <p className="font-body text-white/35 text-lg max-w-lg mt-6 leading-relaxed">
                We are building our own ordering experience — faster, smarter, built entirely around you.
              </p>
            </div>

            {/* Editorial numbered list — no icon boxes */}
            <div className="border-t border-white/8">
              {[
                {
                  num: '01',
                  title: 'QR Table Ordering',
                  body: 'Every table gets its own code. Scan from your phone, browse in Arabic and English, and order without waiting.',
                  tag: null,
                },
                {
                  num: '02',
                  title: 'Mazencito App',
                  body: 'Our own platform — launching soon. Order dine-in or delivery, track your meal in real time, unlock member-only offers.',
                  tag: 'In Development',
                },
                {
                  num: '03',
                  title: 'Direct Delivery',
                  body: 'Zero platform commission. Every direct order means better prices and exclusive rewards — no middlemen, no markups.',
                  tag: null,
                },
              ].map((item, idx) => (
                <div
                  key={item.num}
                  className={`grid grid-cols-[3rem_1fr] sm:grid-cols-[5rem_1fr] gap-6 py-10 ${idx < 2 ? 'border-b border-white/8' : ''}`}
                >
                  <span className="font-ui text-xs tracking-[0.3em] text-white/20 pt-1.5">{item.num}</span>
                  <div>
                    <h3
                      className="elegant-text font-bold text-white mb-3 leading-tight"
                      style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="font-body text-white/40 text-base leading-relaxed max-w-xl">
                      {item.body}
                    </p>
                    {item.tag && (
                      <p className="font-ui text-[9px] tracking-[0.35em] uppercase text-[#CC2229]/55 mt-4">
                        {item.tag}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-t border-white/8 pt-8">
              <p className="font-body text-white/30 text-sm italic">
                Follow us on Instagram for the launch announcement.
              </p>
              <a
                href="https://www.instagram.com/mazencito.ksa"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-xs tracking-[0.3em] uppercase text-white border border-white/20 px-6 py-3.5 hover:bg-white/5 transition-colors min-h-[44px] flex items-center justify-center sm:flex-shrink-0 w-fit"
              >
                Follow @mazencito.ksa
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
                46.9K on Instagram &rarr;
              </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { code: 'C-FaUOAIAR0',   label: 'Good food, good mood' },
                { code: 'DRO4hKfjuBl',   label: 'Fettuccine Alfredo' },
                { code: 'DWRa87jAswt',   label: 'Crafted with passion' },
                { code: 'DJoVWBMIshy',   label: 'Fresh new location' },
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

        {/* ── J. GUEST REVIEWS — Google Reviews ── */}
        <section className="bg-[#0A0806] py-24 md:py-32 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">

            {/* Header */}
            <div className="flex justify-between items-end mb-16">
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
                  <span className="text-amber-400 text-sm tracking-widest">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                  <span className="font-ui text-xs text-white/30">on Google</span>
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
                    <span className="font-ui text-[10px] text-white/20">Google Review</span>
                  </div>
                </div>
              ))}
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

        {/* ── I. LOCATIONS — Two branches ── */}
        <section className="bg-[#FAF8F5] py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

            <p className="font-ui text-[10px] tracking-[0.45em] uppercase text-[#CC2229] mb-8">
              Visit Us
            </p>
            <h2 className="elegant-text text-4xl md:text-5xl font-bold text-[#0A0806] mb-14 leading-none">
              Two Locations<br />
              <em className="italic text-[#0A0806]/35">across Jeddah</em>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Branch 1 — Ash Shati */}
              <div className="border border-[#0A0806]/8 overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src="/mz-exterior.png"
                    alt="Mazencito Pizzeria — Ash Shati"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-8">
                  <p className="font-ui text-[10px] tracking-[0.35em] uppercase text-[#CC2229] mb-3">Branch 01</p>
                  <h3 className="elegant-text text-2xl font-bold text-[#0A0806] mb-5">Ash Shati</h3>
                  <div className="space-y-3 text-sm">
                    <p className="font-body text-[#0A0806]/70">Atelier Lavie, Ash Shati<br />Jeddah, Saudi Arabia</p>
                    <p className="font-body text-[#0A0806]/70">Open Daily &mdash; 12PM &ndash; 1AM &nbsp;&middot;&nbsp; Weekends 2AM</p>
                    <div className="flex gap-4 pt-1">
                      <a href="tel:+966555674383" className="font-ui text-xs text-[#0A0806] hover:text-[#CC2229] transition-colors">+966 55 567 4383</a>
                      <a href="tel:+966554430556" className="font-ui text-xs text-[#0A0806] hover:text-[#CC2229] transition-colors">+966 55 443 0556</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch 2 — Al Zahra */}
              <div className="border border-[#0A0806]/8 overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src="/mz-exterior2.png"
                    alt="Mazencito Pizzeria — Al Zahra"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-8">
                  <p className="font-ui text-[10px] tracking-[0.35em] uppercase text-[#CC2229] mb-3">Branch 02</p>
                  <h3 className="elegant-text text-2xl font-bold text-[#0A0806] mb-5">Al Zahra</h3>
                  <div className="space-y-3 text-sm">
                    <p className="font-body text-[#0A0806]/70">Al Batarji Street, Al Zahra<br />Jeddah, Saudi Arabia</p>
                    <p className="font-body text-[#0A0806]/70">Open Daily &mdash; 12PM &ndash; 1AM &nbsp;&middot;&nbsp; Weekends 2AM</p>
                    <a
                      href="https://wa.me/966555674383"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-ui text-xs text-[#009246] hover:text-[#007B38] transition-colors inline-block pt-1"
                    >
                      Chat on WhatsApp &rarr;
                    </a>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/reservation"
                className="font-ui text-xs tracking-[0.3em] uppercase bg-[#0A0806] text-white px-8 py-4 hover:bg-[#CC2229] transition-colors min-h-[44px] flex items-center justify-center w-fit"
              >
                Reserve a Table
              </Link>
              <a
                href="https://wa.me/966555674383"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-xs tracking-[0.3em] uppercase border border-[#0A0806]/15 text-[#0A0806] px-8 py-4 hover:bg-[#0A0806]/5 transition-colors min-h-[44px] flex items-center justify-center w-fit"
              >
                WhatsApp Us
              </a>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
