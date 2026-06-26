'use client'

import Link from 'next/link'
import Image from 'next/image'
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
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      const doc = document.documentElement
      const scrollTop = window.scrollY
      const total = doc.scrollHeight - doc.clientHeight
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0)
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
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-[#CC2229] transition-none z-10"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group" aria-label="Mazencito Pizzeria — Home">
            <Image
              src="/mazencito-logo.png"
              alt="Mazencito Pizzeria"
              width={220}
              height={100}
              className="h-10 md:h-12 w-auto object-contain invert mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity duration-200"
              priority
            />
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
              className="font-ui text-xs tracking-[0.25em] uppercase bg-[#CC2229] text-white px-5 py-2.5 hover:bg-[#B01E24] transition-colors duration-200"
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
                className="block w-full text-center bg-[#CC2229] text-white font-ui text-xs tracking-[0.3em] uppercase px-5 py-4 hover:bg-[#B01E24] transition-colors min-h-[44px]"
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
