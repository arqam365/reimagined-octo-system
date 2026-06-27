'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ordersApi } from '@/lib/api'
import { pollEvents } from '@/lib/socket'
import type { Order, OrderStatus } from '@/lib/api'
import { CheckCircle, Clock, ChefHat, Bell, Loader2, UtensilsCrossed, AlertCircle } from 'lucide-react'

const STATUS_STEPS: OrderStatus[] = ['RECEIVED', 'PREPARING', 'READY', 'SERVED']

const statusMeta: Record<OrderStatus, { label: string; sub: string; icon: React.ElementType; color: string }> = {
  RECEIVED:  { label: 'Order Received',  sub: 'Your order is in the queue',        icon: Clock,          color: 'text-gray-400 dark:text-white/40' },
  PREPARING: { label: 'Being Prepared',  sub: 'Kitchen is cooking your order',     icon: ChefHat,        color: 'text-amber-500' },
  READY:     { label: 'Ready to Serve',  sub: 'Your order is ready at the kitchen', icon: Bell,          color: 'text-[#009246]' },
  SERVED:    { label: 'Served',          sub: 'Enjoy your meal!',                   icon: UtensilsCrossed, color: 'text-[#CC2229]' },
  CANCELLED: { label: 'Cancelled',       sub: 'This order has been cancelled',      icon: AlertCircle,   color: 'text-gray-400 dark:text-white/30' },
}

function ageLabel(createdAt: string) {
  const mins = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000)
  return mins < 1 ? 'Just now' : mins < 60 ? `${mins} min ago` : `${Math.floor(mins / 60)}h ${mins % 60}m ago`
}

export default function TrackOrder() {
  const { orderId } = useParams<{ orderId: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState('')
  const [now, setNow]       = useState(Date.now())
  const prevStatus = useRef<OrderStatus | null>(null)

  useEffect(() => {
    if (!orderId) return

    ordersApi.get(orderId).then(o => {
      setOrder(o)
      prevStatus.current = o.status
      setLoading(false)
    }).catch(() => {
      setError('Order not found. Check your order number and try again.')
      setLoading(false)
    })

    const stopPolling = pollEvents(Date.now() - 60_000, (ev) => {
      if (ev.type === 'order:updated') {
        const updated = ev.data as Order
        if (updated.id === orderId || updated.orderNum === orderId) {
          setOrder(updated)
          prevStatus.current = updated.status
        }
      }
    })

    const ticker = setInterval(() => setNow(Date.now()), 30000)

    return () => {
      stopPolling()
      clearInterval(ticker)
    }
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0806] flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-6 h-6 text-white/30 animate-spin mx-auto" />
          <p className="font-ui text-xs text-white/30 tracking-widest uppercase">Loading order…</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#0A0806] flex items-center justify-center px-6">
        <div className="text-center space-y-4 max-w-sm">
          <AlertCircle className="w-10 h-10 text-[#CC2229]/50 mx-auto" />
          <p className="font-body text-white/60 text-sm">{error || 'Order not found.'}</p>
          <Link href="/" className="font-ui text-[10px] tracking-[0.3em] uppercase text-white/30 hover:text-white/60 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  const meta = statusMeta[order.status]
  const Icon = meta.icon
  const activeStep = STATUS_STEPS.indexOf(order.status as OrderStatus)
  const isCancelled = order.status === 'CANCELLED'
  const isDone = order.status === 'SERVED'

  void now // suppress unused warning — triggers re-render for age label

  return (
    <div className="min-h-screen bg-[#0A0806] text-white">

      {/* Header */}
      <div className="px-6 pt-12 pb-8 text-center">
        <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/20 mb-6">Mazencito</p>
        <h1 className="elegant-text text-3xl font-bold mb-1">{order.orderNum}</h1>
        {order.table && (
          <p className="font-ui text-xs text-white/30 tracking-widest uppercase">Table {order.table.number}</p>
        )}
      </div>

      {/* Status card */}
      <div className="mx-6 mb-8 border border-white/[0.08] bg-white/[0.03] p-6 text-center">
        <div className={`w-14 h-14 flex items-center justify-center mx-auto mb-4 ${isDone ? 'bg-[#CC2229]/15' : isCancelled ? 'bg-white/5' : 'bg-white/[0.06]'}`}>
          <Icon className={`w-6 h-6 ${meta.color}`} />
        </div>
        <p className={`font-ui text-lg font-bold mb-1 ${meta.color}`}>{meta.label}</p>
        <p className="font-ui text-xs text-white/40 tracking-wide">{meta.sub}</p>
      </div>

      {/* Progress steps */}
      {!isCancelled && (
        <div className="mx-6 mb-8">
          <div className="flex items-center">
            {STATUS_STEPS.map((s, i) => {
              const done   = activeStep > i
              const active = activeStep === i
              return (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 flex items-center justify-center border transition-all ${
                      done
                        ? 'bg-[#CC2229] border-[#CC2229]'
                        : active
                        ? 'bg-transparent border-[#CC2229]'
                        : 'bg-transparent border-white/10'
                    }`}>
                      {done
                        ? <CheckCircle className="w-3.5 h-3.5 text-white" />
                        : <span className={`font-ui text-[9px] font-bold ${active ? 'text-[#CC2229]' : 'text-white/20'}`}>{i + 1}</span>
                      }
                    </div>
                    <span className={`font-ui text-[8px] mt-1.5 tracking-wide uppercase text-center w-14 ${
                      done || active ? 'text-white/50' : 'text-white/20'
                    }`}>
                      {s === 'RECEIVED' ? 'Received' : s === 'PREPARING' ? 'Cooking' : s === 'READY' ? 'Ready' : 'Served'}
                    </span>
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div className={`flex-1 h-px mx-1 mb-5 transition-all ${done ? 'bg-[#CC2229]/50' : 'bg-white/[0.08]'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Order items */}
      <div className="mx-6 mb-8">
        <p className="font-ui text-[9px] tracking-[0.4em] uppercase text-white/25 mb-3">Your Order</p>
        <div className="border border-white/[0.06]">
          {order.items.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-center justify-between px-4 py-3.5 ${i < order.items.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="font-ui text-[10px] text-white/25 w-5">×{item.quantity}</span>
                <div>
                  <p className="font-ui text-sm text-white/80">{item.menuItem?.nameEn}</p>
                  {item.notes && <p className="font-ui text-[10px] text-white/30 mt-0.5 italic">{item.notes}</p>}
                </div>
              </div>
              <span className="font-ui text-xs text-[#CC2229]/80">{(item.unitPrice * item.quantity).toFixed(0)} SAR</span>
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06] bg-white/[0.02]">
            <span className="font-ui text-[10px] tracking-widest uppercase text-white/30">Total</span>
            <span className="font-ui text-sm font-bold text-[#CC2229]">{order.total} SAR</span>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="mx-6 mb-12 space-y-2">
        {order.guestName && (
          <div className="flex items-center justify-between">
            <span className="font-ui text-[10px] text-white/25 uppercase tracking-wide">Name</span>
            <span className="font-ui text-xs text-white/50">{order.guestName}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="font-ui text-[10px] text-white/25 uppercase tracking-wide">Placed</span>
          <span className="font-ui text-xs text-white/50">{ageLabel(order.createdAt)}</span>
        </div>
        {order.notes && (
          <div className="flex items-start justify-between gap-4">
            <span className="font-ui text-[10px] text-white/25 uppercase tracking-wide flex-shrink-0">Notes</span>
            <span className="font-ui text-xs text-white/40 text-right italic">{order.notes}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center pb-12">
        <div className="w-8 h-px bg-white/10 mx-auto mb-4" />
        <p className="font-ui text-[9px] tracking-[0.4em] uppercase text-white/15">Mazencito Pizzeria · Ash Shati · Jeddah</p>
      </div>
    </div>
  )
}
