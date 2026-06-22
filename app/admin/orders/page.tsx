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
const STATUS_COLORS: Record<string, string> = {
  RECEIVED:   'bg-amber-50 border-amber-200',
  PREPARING:  'bg-blue-50 border-blue-200',
  READY:      'bg-green-50 border-green-200',
  SERVED:     'bg-white border-[#0A0806]/8 opacity-60',
  CANCELLED:  'bg-red-50 border-red-200 opacity-60',
}
const BADGE_COLORS: Record<string, string> = {
  RECEIVED:   'bg-amber-100 text-amber-800',
  PREPARING:  'bg-blue-100 text-blue-800',
  READY:      'bg-green-100 text-green-800',
  SERVED:     'bg-[#0A0806]/8 text-[#0A0806]/50',
  CANCELLED:  'bg-red-100 text-red-700',
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
          <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-[#0A0806]/40 mb-2">Kitchen Display</p>
          <h1 className="elegant-text text-4xl font-bold text-[#0A0806]">Orders</h1>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 font-ui text-xs tracking-[0.3em] uppercase text-[#0A0806]/40 hover:text-[#0A0806] transition-colors"
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
              filter === key ? 'bg-[#0A0806] text-white' : 'text-[#0A0806] border border-transparent hover:border-[#0A0806]/15'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading && orders.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-[#0A0806]/30" />
        </div>
      ) : orders.length === 0 ? (
        <p className="font-body text-[#0A0806]/40 py-8">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`border p-5 ${STATUS_COLORS[order.status] ?? 'bg-white border-[#0A0806]/8'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-ui font-semibold text-lg text-[#0A0806]">{order.orderNum}</p>
                  <p className="font-ui text-xs text-[#0A0806]/50">
                    {order.table ? `Table ${order.table.number}` : order.type} &middot;{' '}
                    {new Date(order.createdAt).toLocaleTimeString('en-SA', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <span className={`font-ui text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 ${BADGE_COLORS[order.status]}`}>
                  {order.status}
                </span>
              </div>

              <div className="mb-4 space-y-1.5">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="font-body text-[#0A0806]">
                      {item.quantity}× {item.menuItem.nameEn}
                    </span>
                    <span className="font-ui text-[#0A0806]/50">
                      {(item.quantity * item.unitPrice).toFixed(0)} SAR
                    </span>
                  </div>
                ))}
              </div>

              {order.notes && (
                <p className="font-body text-xs text-[#0A0806]/50 mb-4 italic">{order.notes}</p>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-current/10">
                <span className="font-ui font-semibold text-sm text-[#0A0806]">
                  {order.total.toFixed(0)} SAR
                </span>
                <div className="flex gap-2">
                  {order.status !== 'SERVED' && order.status !== 'CANCELLED' && (
                    <button
                      onClick={() => cancel(order)}
                      disabled={advancing === order.id}
                      className="font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border border-red-300 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  )}
                  {NEXT_STATUS[order.status] && (
                    <button
                      onClick={() => advance(order)}
                      disabled={advancing === order.id}
                      className="font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 bg-[#0A0806] text-white hover:bg-[#1a1410] transition-colors disabled:opacity-50 flex items-center gap-1.5"
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
