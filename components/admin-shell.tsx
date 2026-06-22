'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard, ShoppingBag, LayoutGrid,
  CalendarDays, UtensilsCrossed, BookOpen,
  Sun, Moon, LogOut, ChevronLeft, ChevronRight,
} from 'lucide-react'
import AdminKeyboard from './admin-keyboard'

const NAV = [
  { href: '/admin',              label: 'Dashboard',    icon: LayoutDashboard, exact: true  },
  { href: '/admin/orders',       label: 'Orders',       icon: ShoppingBag,     exact: false },
  { href: '/admin/tables',       label: 'Tables',       icon: LayoutGrid,      exact: false },
  { href: '/admin/reservations', label: 'Reservations', icon: CalendarDays,    exact: false },
  { href: '/admin/menu',         label: 'Menu',         icon: UtensilsCrossed, exact: false },
  { href: '/admin/docs',         label: 'Guide',        icon: BookOpen,        exact: false },
]

// Avoid hydration flash: the div has no class on first render, then JS applies it.
// suppressHydrationWarning lets React skip the mismatch warning.

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true)
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    try {
      const theme = localStorage.getItem('mz-admin-theme')
      if (theme === 'light') setDark(false)
      else setDark(true) // default: dark

      const sidebar = localStorage.getItem('mz-admin-sidebar')
      if (sidebar === 'collapsed') setCollapsed(true)
    } catch { /* ignore */ }
    setMounted(true)
  }, [])

  function toggleTheme() {
    setDark((prev) => {
      const next = !prev
      try { localStorage.setItem('mz-admin-theme', next ? 'dark' : 'light') } catch {}
      return next
    })
  }

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev
      try { localStorage.setItem('mz-admin-sidebar', next ? 'collapsed' : 'expanded') } catch {}
      return next
    })
  }

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  // Before mount: render dark (server default) to avoid flash
  const themeClass = !mounted ? 'dark' : (dark ? 'dark' : '')

  return (
    <div className={themeClass} suppressHydrationWarning>
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0A0806] flex">
        <AdminKeyboard />

        {/* ──── Desktop sidebar ──── */}
        <aside
          className={`hidden lg:flex flex-col fixed inset-y-0 left-0 bg-[#0A0806] border-r border-white/5 z-40 overflow-hidden transition-[width] duration-200 ease-in-out ${
            collapsed ? 'w-[60px]' : 'w-[220px]'
          }`}
        >
          {/* Logo */}
          <div className={`border-b border-white/5 flex items-center flex-shrink-0 ${
            collapsed ? 'justify-center py-5 px-2' : 'gap-3 px-5 pt-6 pb-5'
          }`}>
            <div className="w-8 h-8 bg-[#CC2229] flex items-center justify-center flex-shrink-0">
              <span className="font-ui font-bold text-white text-[11px] tracking-widest">MZ</span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="font-ui text-[11px] font-semibold text-white tracking-[0.2em] uppercase truncate">Mazencito</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1 h-1 rounded-full bg-[#009246] animate-pulse flex-shrink-0" />
                  <p className="font-mono text-[9px] text-white/25 tracking-widest uppercase">Admin Panel</p>
                </div>
              </div>
            )}
          </div>

          {/* Nav */}
          <nav className="flex-1 py-3 px-2 overflow-y-auto overflow-x-hidden">
            {NAV.map(({ href, label, icon: Icon, exact }) => {
              const active = exact ? pathname === href : pathname.startsWith(href)
              return (
                <div key={href} className="relative group mb-0.5">
                  <Link
                    href={href}
                    className={`relative flex items-center transition-all ${
                      collapsed ? 'justify-center px-0 py-3' : 'gap-3 px-3 py-2.5'
                    } ${
                      active
                        ? 'bg-white/8 text-white'
                        : 'text-white/35 hover:text-white/65 hover:bg-white/4'
                    }`}
                  >
                    {/* Active indicator */}
                    {active && !collapsed && (
                      <div className="absolute left-0 inset-y-0 w-0.5 bg-[#CC2229]" />
                    )}
                    {active && collapsed && (
                      <div className="absolute left-0 inset-y-0 w-0.5 bg-[#CC2229]" />
                    )}
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {!collapsed && (
                      <span className="font-ui text-[11px] tracking-[0.18em] uppercase truncate">{label}</span>
                    )}
                  </Link>

                  {/* Tooltip — collapsed only */}
                  {collapsed && (
                    <div
                      className="absolute left-[60px] top-1/2 -translate-y-1/2 ml-1 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    >
                      <div className="bg-[#1a1612] border border-white/15 text-white font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-2 whitespace-nowrap shadow-2xl">
                        {label}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#1a1612]" />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Footer */}
          <div className={`border-t border-white/5 py-2 flex-shrink-0 ${collapsed ? 'px-2' : 'px-3'}`}>

            {/* System live */}
            <div className={`flex items-center py-2 ${collapsed ? 'justify-center' : 'gap-2 px-1'}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#009246] animate-pulse flex-shrink-0" />
              {!collapsed && (
                <span className="font-mono text-[9px] text-white/18 tracking-[0.4em] uppercase">System Live</span>
              )}
            </div>

            {/* Theme toggle */}
            <div className="relative group">
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center text-white/30 hover:text-white/65 hover:bg-white/5 transition-all py-2.5 ${
                  collapsed ? 'justify-center px-0' : 'gap-3 px-1'
                }`}
              >
                {dark ? <Sun className="w-4 h-4 flex-shrink-0" /> : <Moon className="w-4 h-4 flex-shrink-0" />}
                {!collapsed && (
                  <span className="font-ui text-[11px] tracking-[0.18em] uppercase">
                    {dark ? 'Light Mode' : 'Dark Mode'}
                  </span>
                )}
              </button>
              {collapsed && (
                <div className="absolute left-[60px] top-1/2 -translate-y-1/2 ml-1 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <div className="bg-[#1a1612] border border-white/15 text-white font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-2 whitespace-nowrap shadow-2xl">
                    {dark ? 'Light Mode' : 'Dark Mode'}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#1a1612]" />
                  </div>
                </div>
              )}
            </div>

            {/* Logout */}
            <div className="relative group">
              <button
                onClick={logout}
                className={`w-full flex items-center text-white/30 hover:text-white/65 hover:bg-white/5 transition-all py-2.5 ${
                  collapsed ? 'justify-center px-0' : 'gap-3 px-1'
                }`}
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                {!collapsed && (
                  <span className="font-ui text-[11px] tracking-[0.18em] uppercase">Logout</span>
                )}
              </button>
              {collapsed && (
                <div className="absolute left-[60px] top-1/2 -translate-y-1/2 ml-1 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <div className="bg-[#1a1612] border border-white/15 text-white font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-2 whitespace-nowrap shadow-2xl">
                    Logout
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#1a1612]" />
                  </div>
                </div>
              )}
            </div>

            {/* Collapse toggle */}
            <button
              onClick={toggleCollapsed}
              className={`w-full flex items-center text-white/18 hover:text-white/45 hover:bg-white/4 transition-all py-2 mt-1 border-t border-white/5 ${
                collapsed ? 'justify-center px-0 pt-2.5' : 'gap-3 px-1 pt-2.5'
              }`}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed
                ? <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                : <ChevronLeft className="w-3.5 h-3.5 flex-shrink-0" />
              }
              {!collapsed && (
                <span className="font-ui text-[10px] tracking-[0.2em] uppercase">Collapse</span>
              )}
            </button>
          </div>
        </aside>

        {/* ──── Main content ──── */}
        <div
          className={`flex-1 min-h-screen flex flex-col transition-[margin-left] duration-200 ease-in-out ${
            collapsed ? 'lg:ml-[60px]' : 'lg:ml-[220px]'
          }`}
        >
          {/* Mobile top bar */}
          <header className="lg:hidden bg-[#0A0806] px-4 py-3.5 flex items-center justify-between sticky top-0 z-30 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-[#CC2229] flex items-center justify-center flex-shrink-0">
                <span className="font-ui font-bold text-white text-[10px] tracking-widest">MZ</span>
              </div>
              <span className="font-ui text-[11px] text-white font-semibold tracking-[0.2em] uppercase">Admin</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={toggleTheme} className="text-white/35 hover:text-white/65 transition-colors p-1">
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={logout} className="text-white/35 hover:text-white/65 transition-colors p-1">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Mobile nav tabs */}
          <nav className="lg:hidden bg-[#0A0806] border-b border-white/8 px-1 flex overflow-x-auto">
            {NAV.map(({ href, label, icon: Icon, exact }) => {
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
                  <span className="font-ui text-[10px] tracking-[0.15em] uppercase">{label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Page content */}
          <main className="flex-1 px-5 sm:px-8 py-7">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
