'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard, ShoppingBag, LayoutGrid,
  CalendarDays, UtensilsCrossed, BookOpen, Sun, Moon,
} from 'lucide-react'
import AdminKeyboard from './admin-keyboard'
import LogoutButton from '@/app/admin/logout-button'

const NAV = [
  { href: '/admin',              label: 'Dashboard',    short: 'Dash',   icon: LayoutDashboard,  exact: true  },
  { href: '/admin/orders',       label: 'Orders',       short: 'Orders', icon: ShoppingBag,      exact: false },
  { href: '/admin/tables',       label: 'Tables',       short: 'Tables', icon: LayoutGrid,       exact: false },
  { href: '/admin/reservations', label: 'Reservations', short: 'Res.',   icon: CalendarDays,     exact: false },
  { href: '/admin/menu',         label: 'Menu',         short: 'Menu',   icon: UtensilsCrossed,  exact: false },
  { href: '/admin/docs',         label: 'Guide',        short: '?',      icon: BookOpen,         exact: false },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mz-admin-theme')
      if (stored === 'light') setDark(false)
    } catch { /* ignore */ }
  }, [])

  function toggleTheme() {
    setDark((prev) => {
      const next = !prev
      try { localStorage.setItem('mz-admin-theme', next ? 'dark' : 'light') } catch { /* ignore */ }
      return next
    })
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0A0806] flex">
        <AdminKeyboard />

        {/* ──── Desktop sidebar ──── */}
        <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-[220px] bg-[#0A0806] border-r border-white/5 z-40">

          {/* Logo */}
          <div className="px-5 pt-6 pb-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#CC2229] flex items-center justify-center flex-shrink-0">
                <span className="font-ui font-bold text-white text-[11px] tracking-widest">MZ</span>
              </div>
              <div>
                <p className="font-ui text-[11px] font-semibold text-white tracking-[0.2em] uppercase">Mazencito</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1 h-1 rounded-full bg-[#009246] animate-pulse" />
                  <p className="font-mono text-[9px] text-white/25 tracking-widest uppercase">Admin Panel</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex-1 py-3 px-2 overflow-y-auto">
            {NAV.map(({ href, label, icon: Icon, exact }) => {
              const active = exact ? pathname === href : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-3 px-3 py-2.5 transition-all mb-0.5 ${
                    active
                      ? 'bg-white/8 text-white'
                      : 'text-white/35 hover:text-white/65 hover:bg-white/4'
                  }`}
                >
                  {active && <div className="absolute left-0 inset-y-0 w-0.5 bg-[#CC2229]" />}
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="font-ui text-[11px] tracking-[0.18em] uppercase">{label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="px-3 py-4 border-t border-white/5 space-y-0.5">
            <div className="flex items-center gap-2 px-3 py-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#009246] animate-pulse flex-shrink-0" />
              <span className="font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase">System Live</span>
            </div>

            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-white/30 hover:text-white/65 hover:bg-white/5 transition-all"
            >
              {dark
                ? <Sun className="w-4 h-4 flex-shrink-0" />
                : <Moon className="w-4 h-4 flex-shrink-0" />
              }
              <span className="font-ui text-[11px] tracking-[0.18em] uppercase">
                {dark ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>

            <div className="px-3 py-1">
              <LogoutButton />
            </div>
          </div>
        </aside>

        {/* ──── Main content ──── */}
        <div className="flex-1 lg:ml-[220px] min-h-screen flex flex-col">

          {/* Mobile top bar */}
          <header className="lg:hidden bg-[#0A0806] px-4 py-3.5 flex items-center justify-between sticky top-0 z-30 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-[#CC2229] flex items-center justify-center flex-shrink-0">
                <span className="font-ui font-bold text-white text-[10px] tracking-widest">MZ</span>
              </div>
              <span className="font-ui text-[11px] text-white font-semibold tracking-[0.2em] uppercase">Admin</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={toggleTheme} className="text-white/30 hover:text-white/65 transition-colors p-1">
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <LogoutButton />
            </div>
          </header>

          {/* Mobile nav tabs */}
          <nav className="lg:hidden bg-[#0A0806] border-b border-white/8 px-1 flex overflow-x-auto">
            {NAV.map(({ href, short, icon: Icon, exact }) => {
              const active = exact ? pathname === href : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-1.5 px-3 py-3 whitespace-nowrap flex-shrink-0 transition-colors ${
                    active ? 'text-white' : 'text-white/35 hover:text-white/60'
                  }`}
                >
                  {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CC2229]" />}
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-ui text-[10px] tracking-[0.15em] uppercase">{short}</span>
                </Link>
              )
            })}
          </nav>

          {/* Page */}
          <main className="flex-1 px-5 sm:px-8 py-7">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
