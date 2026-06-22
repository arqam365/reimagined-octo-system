import { cookies, headers } from 'next/headers'
import Link from 'next/link'
import LogoutButton from './logout-button'
import AdminKeyboard from '@/components/admin-keyboard'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const cookieStore = await cookies()
  const pin = cookieStore.get('mz-admin')?.value
  if (pin !== process.env.ADMIN_PIN) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <AdminKeyboard />

      {/* Top nav */}
      <header className="bg-[#0A0806] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-8">
          <span className="elegant-text text-xl font-bold text-white">Mazencito</span>
          <nav className="hidden md:flex gap-6">
            {[
              { href: '/admin',              label: 'Dashboard'    },
              { href: '/admin/orders',       label: 'Orders'       },
              { href: '/admin/tables',       label: 'Tables'       },
              { href: '/admin/reservations', label: 'Reservations' },
              { href: '/admin/menu',         label: 'Menu'         },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-ui text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/docs"
            className="font-mono text-[11px] text-white/25 hover:text-white/60 transition-colors border border-white/10 hover:border-white/25 px-2 py-1 hidden md:block"
            title="Operator guide &amp; shortcuts"
          >
            ?
          </Link>
          <LogoutButton />
        </div>
      </header>

      {/* Mobile nav */}
      <nav className="md:hidden bg-[#0A0806] border-t border-white/8 px-6 pb-3 flex gap-4 overflow-x-auto">
        {[
          { href: '/admin',              label: 'Dashboard'    },
          { href: '/admin/orders',       label: 'Orders'       },
          { href: '/admin/tables',       label: 'Tables'       },
          { href: '/admin/reservations', label: 'Reservations' },
          { href: '/admin/menu',         label: 'Menu'         },
          { href: '/admin/docs',         label: '?'            },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="font-ui text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors whitespace-nowrap"
          >
            {label}
          </Link>
        ))}
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
