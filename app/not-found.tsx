import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found | Mazencito Pizzeria',
}

export default function NotFound() {
  return (
    <main className="bg-[#0A0806] min-h-screen flex flex-col relative overflow-hidden">

      {/* Italian tricolore top stripe */}
      <div className="flex h-1.5 flex-shrink-0">
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#CC2229]" />
        <div className="flex-1 bg-[#009246]" />
      </div>

      {/* Giant 404 letterform watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center font-brand font-bold text-white/[0.025] leading-none select-none pointer-events-none"
        style={{ fontSize: 'clamp(18rem, 45vw, 56rem)' }}
        aria-hidden="true"
      >
        404
      </div>

      {/* Nav bar — minimal */}
      <nav className="relative z-10 flex items-center justify-between px-8 sm:px-12 lg:px-20 h-20">
        <Link href="/" aria-label="Mazencito Pizzeria — Home">
          <Image
            src="/mazencito-brand-logo.jpg"
            alt="Mazencito Pizzeria"
            width={120}
            height={84}
            className="h-12 w-auto object-contain invert mix-blend-screen opacity-80 hover:opacity-100 transition-opacity"
          />
        </Link>
        <Link
          href="/menu"
          className="font-ui text-xs tracking-[0.25em] uppercase text-white/40 hover:text-white/70 transition-colors"
        >
          Menu
        </Link>
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pb-20">

        <p className="font-ui text-[10px] tracking-[0.6em] uppercase text-[#CC2229] mb-8">
          Errore &nbsp;·&nbsp; 404
        </p>

        <h1
          className="font-brand font-bold text-white leading-[0.85] mb-8"
          style={{ fontSize: 'clamp(5rem, 18vw, 14rem)' }}
        >
          404
        </h1>

        {/* Italian tricolore divider */}
        <div className="flex gap-1 mb-10">
          <div className="h-0.5 w-8 bg-white/60" />
          <div className="h-0.5 w-8 bg-[#CC2229]" />
          <div className="h-0.5 w-8 bg-[#009246]" />
        </div>

        <p
          className="elegant-text italic text-white/60 mb-4 leading-snug"
          style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
        >
          Questa pagina non esiste.
        </p>

        <p className="font-body text-white/30 text-sm leading-relaxed max-w-xs mb-12">
          The page you&apos;re looking for is gone — like overcooked pasta, it&apos;s not something we allow here.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="font-ui text-xs tracking-[0.35em] uppercase bg-[#CC2229] text-white px-8 py-4 hover:bg-[#B01E24] transition-colors min-h-[44px] flex items-center justify-center"
          >
            Back to Home
          </Link>
          <Link
            href="/menu"
            className="font-ui text-xs tracking-[0.35em] uppercase border border-white/20 text-white px-8 py-4 hover:bg-white/5 transition-colors min-h-[44px] flex items-center justify-center"
          >
            View Menu
          </Link>
          <Link
            href="/reservation"
            className="font-ui text-xs tracking-[0.35em] uppercase border border-[#CC2229]/30 text-[#CC2229] px-8 py-4 hover:bg-[#CC2229]/8 transition-colors min-h-[44px] flex items-center justify-center"
          >
            Reserve a Table
          </Link>
        </div>

        {/* Tech support */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="font-ui text-[9px] tracking-[0.35em] uppercase text-white/15">
            Mazencito Pizzeria &nbsp;&middot;&nbsp; Ash Shati, Atelier Lavie &nbsp;&middot;&nbsp; Jeddah
          </p>
          <div className="h-px w-12 bg-white/8" />
          <p className="font-ui text-[9px] tracking-[0.25em] uppercase text-white/20">
            Experiencing a technical issue?
          </p>
          <a
            href="https://revzion.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-200"
          >
            <Image
              src="/revzion-icon.png"
              alt="Revzion"
              width={60}
              height={60}
              className="h-5 w-auto object-contain"
            />
            <span className="font-ui text-[10px] tracking-[0.15em] uppercase text-white font-medium">
              Revzion
            </span>
            <span className="font-ui text-[9px] tracking-[0.2em] uppercase text-white/50">
              &mdash; Tech Support
            </span>
          </a>
        </div>
      </div>

    </main>
  )
}
