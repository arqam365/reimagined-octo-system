'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

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
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-[#0A0806]' : 'bg-[#0A0806]/85 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex flex-col items-start leading-none group flex-shrink-0">
            <span className="elegant-text text-xl font-bold text-white group-hover:text-amber-100 transition-colors duration-200">
              Mazencito
            </span>
            <span className="font-ui text-[9px] tracking-[0.4em] text-amber-500/60 uppercase mt-0.5">
              Pizzeria
            </span>
          </Link>

          {/* Desktop Nav Links — centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-ui text-xs tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block flex-shrink-0">
            <Link
              href="/reservation"
              className="font-ui text-xs tracking-[0.25em] uppercase bg-amber-500 text-black px-5 py-2.5 hover:bg-amber-400 transition-colors duration-200"
            >
              Reserve
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-[#0A0806] border-t border-white/8 pb-8 pt-4">
            <div className="space-y-0">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-2 py-4 font-ui text-xs tracking-[0.25em] uppercase text-white/60 hover:text-white border-b border-white/5 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-6">
              <Link
                href="/reservation"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-amber-500 text-black font-ui text-xs tracking-[0.3em] uppercase px-5 py-4 hover:bg-amber-400 transition-colors min-h-[44px]"
              >
                Reserve a Table
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
