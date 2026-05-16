'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="elegant-text text-2xl font-bold mb-4">Mazencito</h3>
            <p className="text-primary-foreground/80">
              Authentic Italian cuisine crafted with passion and tradition.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="elegant-text text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-accent transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="hover:text-accent transition-colors">
                  Reservation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="elegant-text text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex gap-2 items-start">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex gap-2 items-start">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>info@mazencito.com</span>
              </li>
              <li className="flex gap-2 items-start">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>123 Italian Street, NY 10001</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="elegant-text text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-primary-foreground/80">
            © 2024 Mazencito. All rights reserved. | Fine Italian Dining
          </p>
        </div>
      </div>
    </footer>
  )
}
