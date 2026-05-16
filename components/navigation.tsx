'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'Our Story' },
  { href: '/reservation', label: 'Reservations' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0C0907]/98 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex flex-col items-start leading-none group">
            <span className="elegant-text text-2xl font-bold text-white group-hover:text-amber-100 transition-colors">
              Mazencito
            </span>
            <span className="font-ui text-[10px] tracking-[0.3em] text-amber-400/70 uppercase mt-0.5">
              Pizzeria
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-ui text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:+966555674383"
              className="font-ui text-sm text-white/60 hover:text-white/90 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              +966 55 567 4383
            </a>
            <Link
              href="/reservation"
              className="bg-amber-500 text-black font-ui font-bold text-sm px-5 py-2 rounded hover:bg-amber-400 transition-colors duration-200"
            >
              Reserve Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-[#0C0907]/98 backdrop-blur-md border-t border-white/10 pb-6 pt-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 font-ui text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-4 space-y-3">
              <Link
                href="/reservation"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-amber-500 text-black font-ui font-bold text-sm px-5 py-3 rounded hover:bg-amber-400 transition-colors"
              >
                Reserve a Table
              </Link>
              <a
                href="tel:+966555674383"
                className="flex items-center justify-center gap-2 font-ui text-sm text-white/60 hover:text-white/90 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                <Phone className="w-4 h-4" />
                +966 55 567 4383
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
