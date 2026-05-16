'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#0A0806] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-14 pb-10">

        {/* Top row: Logo + Instagram */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <Link href="/" aria-label="Mazencito Pizzeria — Home">
            <Image
              src="/logo.png"
              alt="Mazencito Pizzeria"
              width={140}
              height={70}
              className="h-12 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-90 transition-opacity duration-200"
            />
          </Link>
          <a
            href="https://www.instagram.com/mazencito.ksa"
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white/70 transition-colors"
          >
            46.9K on Instagram &nbsp;@mazencito.ksa
          </a>
        </div>

        {/* Thin rule */}
        <div className="h-px bg-white/8 mb-10" />

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">

          {/* Quick Links */}
          <div>
            <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-white/25 mb-5">Quick Links</p>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/menu', label: 'Menu' },
                { href: '/about', label: 'Our Story' },
                { href: '/reservation', label: 'Reservations' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-ui text-xs tracking-[0.15em] text-white/45 hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-white/25 mb-5">Contact</p>
            <div className="space-y-4">
              <div>
                <p className="font-ui text-[10px] tracking-widest uppercase text-white/20 mb-1">Address</p>
                <p className="font-ui text-xs text-white/50 leading-relaxed">
                  Ash Shati, Atelier Lavie<br />
                  Jeddah, Saudi Arabia
                </p>
              </div>
              <div>
                <p className="font-ui text-[10px] tracking-widest uppercase text-white/20 mb-1">Phone</p>
                <a
                  href="tel:+966555674383"
                  className="block font-ui text-xs text-white/50 hover:text-white/80 transition-colors"
                >
                  +966 55 567 4383
                </a>
                <a
                  href="tel:+966554430556"
                  className="block font-ui text-xs text-white/50 hover:text-white/80 transition-colors mt-0.5"
                >
                  +966 55 443 0556
                </a>
              </div>
              <div>
                <p className="font-ui text-[10px] tracking-widest uppercase text-white/20 mb-1">Hours</p>
                <p className="font-ui text-xs text-white/50">
                  Daily 12:00 PM &ndash; 1:00 AM
                </p>
                <p className="font-ui text-xs text-white/30 mt-0.5">
                  Weekends till 2:00 AM
                </p>
              </div>
            </div>
          </div>

          {/* Reserve */}
          <div>
            <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-white/25 mb-5">Reserve</p>
            <p className="font-ui text-xs text-white/35 leading-relaxed mb-6 max-w-[180px]">
              Secure your table for an evening of authentic Italian hospitality.
            </p>
            <div className="space-y-3">
              <Link
                href="/reservation"
                className="w-full text-center bg-amber-500 text-black font-ui text-xs tracking-[0.25em] uppercase px-5 py-3.5 hover:bg-amber-400 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Reserve a Table
              </Link>
              <a
                href="https://wa.me/966555674383"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center border border-white/15 text-white/50 font-ui text-xs tracking-[0.2em] uppercase px-5 py-3.5 hover:border-white/30 hover:text-white/70 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/8 pt-8">
          <p className="font-ui text-[10px] tracking-[0.2em] text-white/20">
            &copy; 2025 Mazencito Pizzeria &nbsp;&middot;&nbsp; Ash Shati, Atelier Lavie, Jeddah
          </p>
        </div>
      </div>
    </footer>
  )
}
