'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Clock, ChevronRight, Volume2, VolumeX, Loader2 } from 'lucide-react'
import { ordersApi } from '@/lib/api'
import { pollEvents } from '@/lib/socket'
import type { Order, OrderStatus } from '@/lib/api'

type KitchenStatus = 'RECEIVED' | 'PREPARING' | 'READY'

const columns: {
  key: KitchenStatus
  label: string
  next: OrderStatus | null
  nextLabel: string
  border: string
  text: string
  btn: string
}[] = [
  { key: 'RECEIVED',  label: 'New',       next: 'PREPARING', nextLabel: 'Start Preparing', border: 'border-[#CC2229]',   text: 'text-[#CC2229]',   btn: 'bg-[#CC2229]/15 hover:bg-[#CC2229]/30 text-[#CC2229]'   },
  { key: 'PREPARING', label: 'Preparing', next: 'READY',     nextLabel: 'Mark Ready',      border: 'border-amber-400',   text: 'text-amber-500',   btn: 'bg-amber-400/10 hover:bg-amber-400/20 text-amber-500'     },
  { key: 'READY',     label: 'Ready',     next: 'SERVED',    nextLabel: 'Mark Served',     border: 'border-[#009246]',   text: 'text-[#009246]',   btn: 'bg-[#009246]/15 hover:bg-[#009246]/30 text-[#009246]'    },
]

function ageMinutes(createdAt: string) {
  return Math.floor((Date.now() - new Date(createdAt).getTime()) / 60_000)
}

function ageLabel(mins: number) {
  if (mins < 1) return 'Just now'
  return `${mins}m`
}

function ageColor(mins: number) {
  if (mins < 5)  return 'text-gray-400 dark:text-white/40'
  if (mins < 12) return 'text-amber-500'
  return 'text-[#CC2229]'
}

export default function AdminKitchen() {
  const [orders, setOrders]     = useState<Order[]>([])
  const [loading, setLoading]   = useState(true)
  const [muted, setMuted]       = useState(false)
  const [advancing, setAdvancing] = useState<string | null>(null)
  const [tick, setTick]         = useState(0)
  const audioRef                = useRef<AudioContext | null>(null)

  const activeOrders = orders.filter(o =>
    ['RECEIVED', 'PREPARING', 'READY'].includes(o.status),
  )

  function playAlert() {
    if (muted) return
    try {
      const ctx = audioRef.current ?? (audioRef.current = new AudioContext())
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.frequency.value = 880
      osc.type = 'sine'
      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
      osc.start(); osc.stop(ctx.currentTime + 0.4)
    } catch { /* browser may block before first interaction */ }
  }

  const load = useCallback(async () => {
    try {
      const rows = await ordersApi.list()
      setOrders(rows.filter(o => ['RECEIVED', 'PREPARING', 'READY'].includes(o.status)))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()

    const stopPolling = pollEvents(Date.now() - 60_000, (ev) => {
      if (ev.type === 'order:new') {
        const o = ev.data as Order
        setOrders(prev => {
          if (prev.find(x => x.id === o.id)) return prev
          playAlert()
          return [o, ...prev]
        })
      }
      if (ev.type === 'order:updated') {
        const o = ev.data as Order
        setOrders(prev => {
          if (['RECEIVED', 'PREPARING', 'READY'].includes(o.status)) {
            const exists = prev.find(x => x.id === o.id)
            if (exists) return prev.map(x => x.id === o.id ? o : x)
            return [o, ...prev]
          }
          return prev.filter(x => x.id !== o.id)
        })
      }
    })

    const timer = setInterval(() => setTick(t => t + 1), 30_000)

    return () => {
      stopPolling()
      clearInterval(timer)
    }
  }, [load, tick])

  async function advance(order: Order, next: OrderStatus) {
    setAdvancing(order.id)
    try {
      const updated = await ordersApi.setStatus(order.id, next)
      setOrders(prev => {
        if (['SERVED', 'CANCELLED'].includes(updated.status)) return prev.filter(x => x.id !== updated.id)
        return prev.map(x => x.id === updated.id ? updated : x)
      })
    } finally {
      setAdvancing(null)
    }
  }

  return (
    <div className="h-[calc(100vh-56px-48px)] flex flex-col">

      <div className="flex items-center justify-between mb-5 flex-shrink-0">
        <div>
          <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-gray-400 dark:text-white/25 mb-1">Real-time</p>
          <h1 className="elegant-text text-3xl text-gray-900 dark:text-white font-bold">Kitchen Display</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#009246]/10 border border-[#009246]/20 px-3 py-2">
            <span className="w-1.5 h-1.5 bg-[#009246] animate-pulse" />
            <span className="font-ui text-[10px] tracking-[0.3em] uppercase text-[#009246]">Live</span>
          </div>
          <button
            onClick={() => setMuted(!muted)}
            className="text-gray-400 dark:text-white/25 hover:text-gray-700 dark:hover:text-white/50 transition-colors"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 text-gray-300 dark:text-white/20 animate-spin" />
          <span className="font-ui text-xs text-gray-300 dark:text-white/20">Loading orders…</span>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-3 gap-4 overflow-hidden">
          {columns.map(col => {
            const colOrders = activeOrders.filter(o => o.status === col.key)
            return (
              <div key={col.key} className="flex flex-col overflow-hidden">
                <div className={`flex items-center justify-between px-4 py-3 mb-3 border-b-2 ${col.border}`}>
                  <span className="font-ui text-xs tracking-[0.3em] uppercase text-gray-600 dark:text-white/70">
                    {col.label}
                  </span>
                  <span className={`font-ui text-xl font-bold ${col.text}`}>{colOrders.length}</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {colOrders.length === 0 && (
                    <div className="py-10 text-center">
                      <p className="font-ui text-[10px] text-gray-300 dark:text-white/15 tracking-widest uppercase">Empty</p>
                    </div>
                  )}

                  {colOrders.map(order => {
                    const mins = ageMinutes(order.createdAt)
                    const isAdvancing = advancing === order.id
                    return (
                      <div
                        key={order.id}
                        className={`bg-white dark:bg-white/[0.03] border p-4 shadow-sm dark:shadow-none ${
                          col.key === 'RECEIVED'  ? 'border-[#CC2229]/20' :
                          col.key === 'PREPARING' ? 'border-amber-400/15' : 'border-[#009246]/20'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="elegant-text text-lg text-gray-900 dark:text-white font-bold">
                                {order.table ? `T-${order.table.number}` : '—'}
                              </span>
                              <span className="font-ui text-[10px] text-gray-400 dark:text-white/30">#{order.orderNum}</span>
                            </div>
                            <p className="font-ui text-[10px] text-gray-400 dark:text-white/30 mt-0.5">
                              {order.guestName ?? 'Guest'}
                            </p>
                          </div>
                          <div className={`flex items-center gap-1 ${ageColor(mins)}`}>
                            <Clock className="w-3 h-3" />
                            <span className="font-ui text-xs font-medium">{ageLabel(mins)}</span>
                          </div>
                        </div>

                        <div className="space-y-1.5 border-t border-gray-100 dark:border-white/[0.06] pt-3 mb-4">
                          {order.items.map((item, i) => (
                            <div key={i}>
                              <div className="flex items-center gap-2">
                                <span className="font-ui text-[10px] text-gray-300 dark:text-white/25 w-4">{item.quantity}×</span>
                                <span className="font-body text-sm text-gray-700 dark:text-white/80">{item.menuItem.nameEn}</span>
                              </div>
                              {item.notes && (
                                <p className="font-ui text-[10px] text-amber-500/70 italic ml-6 mt-0.5">↳ {item.notes}</p>
                              )}
                            </div>
                          ))}
                          {order.notes && (
                            <p className="font-ui text-[10px] text-white/30 italic mt-2 pt-2 border-t border-white/[0.06]">
                              {order.notes}
                            </p>
                          )}
                        </div>

                        <button
                          disabled={isAdvancing}
                          onClick={() => col.next && advance(order, col.next)}
                          className={`w-full flex items-center justify-center gap-2 py-2.5 font-ui text-[10px] tracking-[0.2em] uppercase transition-colors disabled:opacity-40 ${col.btn}`}
                        >
                          {isAdvancing ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <>{col.nextLabel} <ChevronRight className="w-3 h-3" /></>
                          )}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
