'use client'

import { useEffect, useState, useCallback } from 'react'
import { Loader2, RefreshCw } from 'lucide-react'

interface OrderItem {
  id: string
  quantity: number
  unitPrice: number
  notes?: string
  menuItem: { nameEn: string }
}

interface Order {
  id: string
  orderNum: string
  status: 'RECEIVED' | 'PREPARING' | 'READY' | 'SERVED' | 'CANCELLED'
  type: string
  total: number
  notes?: string
  guestName?: string
  createdAt: string
  table: { number: number } | null
  items: OrderItem[]
}

const STATUSES = ['RECEIVED', 'PREPARING', 'READY', 'SERVED', 'CANCELLED'] as const

const NEXT_STATUS: Record<string, string | null> = {
  RECEIVED:  'PREPARING',
  PREPARING: 'READY',
  READY:     'SERVED',
  SERVED:    null,
  CANCELLED: null,
}

const STATUS_CARD: Record<string, string> = {
  RECEIVED:   'bg-amber-50 border-amber-200 dark:bg-amber-500/8 dark:border-amber-500/25',
  PREPARING:  'bg-blue-50 border-blue-200 dark:bg-blue-500/8 dark:border-blue-500/25',
  READY:      'bg-green-50 border-green-200 dark:bg-green-500/8 dark:border-green-500/25',
  SERVED:     'bg-white border-[#0A0806]/8 opacity-60 dark:bg-white/3 dark:border-white/8',
  CANCELLED:  'bg-red-50 border-red-200 opacity-60 dark:bg-red-500/8 dark:border-red-500/25',
}

const STATUS_BADGE: Record<string, string> = {
  RECEIVED:   'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
  PREPARING:  'bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300',
  READY:      'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-300',
  SERVED:     'bg-[#0A0806]/8 text-[#0A0806]/50 dark:bg-white/5 dark:text-white/30',
  CANCELLED:  'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState<string>('active')
  const [loading, setLoading] = useState(true)
  const [advancing, setAdvancing] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const statusParam = filter !== 'active' ? `?status=${filter}` : ''
      const res = await fetch(`/api/admin/orders${statusParam}`)
      const data = await res.json()
      const all: Order[] = Array.isArray(data) ? data : []
      if (filter === 'active') {
        setOrders(all.filter((o) => ['RECEIVED', 'PREPARING', 'READY'].includes(o.status)))
      } else {
        setOrders(all)
      }
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchOrders()
    const id = setInterval(fetchOrders, 10_000)
    return () => clearInterval(id)
  }, [fetchOrders])

  async function advance(order: Order) {
    const next = NEXT_STATUS[order.status]
    if (!next) return
    setAdvancing(order.id)
    await fetch(`/api/admin/orders/${order.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    })
    await fetchOrders()
    setAdvancing(null)
  }

  async function cancel(order: Order) {
    setAdvancing(order.id)
    await fetch(`/api/admin/orders/${order.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'CANCELLED' }),
    })
    await fetchOrders()
    setAdvancing(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-[#0A0806]/40 dark:text-white/25 mb-2">
            Kitchen Display
          </p>
          <h1 className="elegant-text text-4xl font-bold text-[#0A0806] dark:text-white/88">Orders</h1>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 font-ui text-xs tracking-[0.3em] uppercase text-[#0A0806]/40 dark:text-white/30 hover:text-[#0A0806] dark:hover:text-white/65 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {[
          { key: 'active', label: 'Active' },
          ...STATUSES.map((s) => ({ key: s, label: s.charAt(0) + s.slice(1).toLowerCase() })),
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`font-ui text-xs px-4 py-2 tracking-[0.2em] uppercase transition-all whitespace-nowrap ${
              filter === key
                ? 'bg-[#0A0806] dark:bg-white text-white dark:text-[#0A0806]'
                : 'text-[#0A0806] dark:text-white/40 border border-transparent hover:border-[#0A0806]/15 dark:hover:border-white/15 hover:text-[#0A0806] dark:hover:text-white/65'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading && orders.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-[#0A0806]/30 dark:text-white/20" />
        </div>
      ) : orders.length === 0 ? (
        <p className="font-body text-[#0A0806]/40 dark:text-white/30 py-8">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`border p-5 ${STATUS_CARD[order.status] ?? 'bg-white dark:bg-white/4 border-[#0A0806]/8 dark:border-white/8'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-ui font-semibold text-lg text-[#0A0806] dark:text-white/85">{order.orderNum}</p>
                  <p className="font-ui text-xs text-[#0A0806]/50 dark:text-white/35">
                    {order.table ? `Table ${order.table.number}` : order.type} &middot;{' '}
                    {new Date(order.createdAt).toLocaleTimeString('en-SA', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <span className={`font-ui text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 ${STATUS_BADGE[order.status]}`}>
                  {order.status}
                </span>
              </div>

              <div className="mb-4 space-y-1.5">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="font-body text-[#0A0806] dark:text-white/75">
                      {item.quantity}× {item.menuItem.nameEn}
                    </span>
                    <span className="font-ui text-[#0A0806]/50 dark:text-white/35">
                      {(item.quantity * item.unitPrice).toFixed(0)} SAR
                    </span>
                  </div>
                ))}
              </div>

              {order.notes && (
                <p className="font-body text-xs text-[#0A0806]/50 dark:text-white/35 mb-4 italic">{order.notes}</p>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-current/10">
                <span className="font-ui font-semibold text-sm text-[#0A0806] dark:text-white/80">
                  {order.total.toFixed(0)} SAR
                </span>
                <div className="flex gap-2">
                  {order.status !== 'SERVED' && order.status !== 'CANCELLED' && (
                    <button
                      onClick={() => cancel(order)}
                      disabled={advancing === order.id}
                      className="font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border border-red-300 dark:border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  )}
                  {NEXT_STATUS[order.status] && (
                    <button
                      onClick={() => advance(order)}
                      disabled={advancing === order.id}
                      className="font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 bg-[#0A0806] dark:bg-white text-white dark:text-[#0A0806] hover:bg-[#1a1410] dark:hover:bg-white/85 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {advancing === order.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        `→ ${NEXT_STATUS[order.status]}`
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
