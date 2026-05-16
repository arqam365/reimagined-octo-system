'use client'

import Link from 'next/link'
import { MapPin, Phone, Clock, Instagram, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0C0907] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <p className="elegant-text text-2xl font-bold text-white leading-none">Mazencito</p>
              <p className="font-ui text-[10px] tracking-[0.3em] text-amber-400/70 uppercase mt-1">Pizzeria</p>
            </div>
            <p className="font-body text-white/55 text-sm leading-relaxed mb-6">
              Authentic Italian pizza and cuisine in the heart of Jeddah. Fresh ingredients, traditional recipes, warm hospitality — every single day.
            </p>
            <a
              href="https://www.instagram.com/mazencito.ksa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-ui text-sm text-amber-400/80 hover:text-amber-400 transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @mazencito.ksa
            </a>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-5">
              Navigation
            </h4>
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
                    className="font-ui text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-white/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400/80" />
                </div>
                <div>
                  <p className="font-ui text-xs text-white/40 mb-0.5">Address</p>
                  <p className="font-body text-sm text-white/70 leading-snug">
                    King Abdulaziz Branch Road<br />
                    Jeddah, Saudi Arabia
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-white/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400/80" />
                </div>
                <div>
                  <p className="font-ui text-xs text-white/40 mb-0.5">Phone</p>
                  <a
                    href="tel:+966555674383"
                    className="block font-body text-sm text-white/70 hover:text-white transition-colors"
                  >
                    +966 55 567 4383
                  </a>
                  <a
                    href="tel:+966554430556"
                    className="block font-body text-sm text-white/70 hover:text-white transition-colors"
                  >
                    +966 55 443 0556
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-white/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400/80" />
                </div>
                <div>
                  <p className="font-ui text-xs text-white/40 mb-0.5">Hours</p>
                  <p className="font-body text-sm text-white/70">
                    Daily 1:00 PM – 1:00 AM
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Reserve */}
          <div>
            <h4 className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-5">
              Reserve
            </h4>
            <p className="font-body text-sm text-white/55 leading-relaxed mb-6">
              Secure your table and enjoy an unforgettable evening of authentic Italian pizza in Jeddah.
            </p>
            <div className="space-y-3">
              <Link
                href="/reservation"
                className="block w-full text-center bg-amber-500 text-black font-ui font-bold text-sm px-5 py-3 rounded hover:bg-amber-400 transition-colors"
              >
                Reserve a Table
              </Link>
              <a
                href="https://wa.me/966555674383"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full text-center border border-white/20 text-white/80 font-ui font-semibold text-sm px-5 py-3 rounded hover:border-white/40 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-ui text-xs text-white/35">
            &copy; 2025 Mazencito Pizzeria. All rights reserved.
          </p>
          <p className="font-ui text-xs text-white/35">
            Jeddah, Saudi Arabia
          </p>
        </div>
      </div>
    </footer>
  )
}
