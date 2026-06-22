import { adminFetch } from '@/lib/api'
import Link from 'next/link'

interface Order {
  id: string
  orderNum: string
  status: string
  total: number
  createdAt: string
  table: { number: number } | null
}

interface Reservation {
  id: string
  refNum: string
  name: string
  status: string
  date: string
  party: number
}

async function getStats() {
  const [orders, pending] = await Promise.all([
    adminFetch('/orders').catch(() => [] as Order[]),
    adminFetch('/orders?status=RECEIVED').catch(() => [] as Order[]),
  ])
  const today = new Date().toISOString().split('T')[0]
  const reservations: Reservation[] = await adminFetch(`/reservations?date=${today}`).catch(() => [])
  return {
    totalOrders: (orders as Order[]).length,
    pendingOrders: (pending as Order[]).length,
    todayReservations: reservations.length,
    recentOrders: (orders as Order[]).slice(0, 5),
  }
}

const STATUS_COLORS: Record<string, string> = {
  RECEIVED:   'bg-amber-100 text-amber-800',
  PREPARING:  'bg-blue-100 text-blue-800',
  READY:      'bg-green-100 text-green-800',
  SERVED:     'bg-[#0A0806]/8 text-[#0A0806]/50',
  CANCELLED:  'bg-red-100 text-red-700',
}

export default async function AdminDashboard() {
  const { totalOrders, pendingOrders, todayReservations, recentOrders } = await getStats()

  return (
    <div>
      <div className="mb-8">
        <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-[#0A0806]/40 mb-2">
          Overview
        </p>
        <h1 className="elegant-text text-4xl font-bold text-[#0A0806]">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Pending Orders', value: pendingOrders, href: '/admin/orders?status=RECEIVED', urgent: pendingOrders > 0 },
          { label: 'Total Orders Today', value: totalOrders, href: '/admin/orders', urgent: false },
          { label: "Today's Reservations", value: todayReservations, href: '/admin/reservations', urgent: false },
        ].map(({ label, value, href, urgent }) => (
          <Link
            key={label}
            href={href}
            className={`p-6 border transition-all hover:shadow-sm ${
              urgent ? 'border-[#CC2229]/30 bg-[#CC2229]/4' : 'border-[#0A0806]/8 bg-white'
            }`}
          >
            <p className={`font-ui text-[10px] tracking-[0.3em] uppercase mb-3 ${urgent ? 'text-[#CC2229]' : 'text-[#0A0806]/40'}`}>
              {label}
            </p>
            <p className={`elegant-text text-4xl font-bold ${urgent ? 'text-[#CC2229]' : 'text-[#0A0806]'}`}>
              {value}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="elegant-text text-2xl font-bold text-[#0A0806]">Recent Orders</h2>
          <Link href="/admin/orders" className="font-ui text-xs tracking-[0.3em] uppercase text-[#0A0806]/40 hover:text-[#CC2229] transition-colors">
            View All
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="font-body text-[#0A0806]/40 py-8">No orders yet.</p>
        ) : (
          <div className="border border-[#0A0806]/8">
            {recentOrders.map((order, idx) => (
              <div
                key={order.id}
                className={`flex items-center justify-between px-5 py-4 ${idx < recentOrders.length - 1 ? 'border-b border-[#0A0806]/8' : ''}`}
              >
                <div>
                  <p className="font-ui text-sm font-semibold text-[#0A0806]">{order.orderNum}</p>
                  <p className="font-ui text-xs text-[#0A0806]/40">
                    {order.table ? `Table ${order.table.number}` : 'Takeaway'} &middot;{' '}
                    {new Date(order.createdAt).toLocaleTimeString('en-SA', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-ui font-semibold text-sm text-[#0A0806]">
                    {order.total.toFixed(0)} SAR
                  </span>
                  <span className={`font-ui text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
