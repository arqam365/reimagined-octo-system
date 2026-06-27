'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ShoppingCart, Plus, Minus, X, ChevronRight, Utensils, CheckCircle, Loader2, QrCode } from 'lucide-react'
import type { MenuItem, Table, Outlet } from '@/lib/api'

type MenuCategory = 'PIZZA' | 'PASTA' | 'SOUPS' | 'SALADS' | 'DESSERTS' | 'BEVERAGES'

interface CartItem extends MenuItem {
  quantity: number
  notes: string
}

const CATEGORIES: { key: MenuCategory; labelEn: string; labelAr: string }[] = [
  { key: 'PIZZA',     labelEn: 'Pizza',    labelAr: 'بيتزا' },
  { key: 'PASTA',     labelEn: 'Pasta',    labelAr: 'مكرونة' },
  { key: 'SOUPS',     labelEn: 'Soups',    labelAr: 'شوربات' },
  { key: 'SALADS',    labelEn: 'Salads',   labelAr: 'سلطات' },
  { key: 'DESSERTS',  labelEn: 'Desserts', labelAr: 'حلويات' },
  { key: 'BEVERAGES', labelEn: 'Drinks',   labelAr: 'مشروبات' },
]

type Step = 'loading' | 'error' | 'no-session' | 'menu' | 'cart' | 'info' | 'placing' | 'confirm'

export default function OrderPage() {
  const { tableId } = useParams<{ tableId: string }>()
  const [step, setStep]               = useState<Step>('loading')
  const [table, setTable]             = useState<Table & { outlet: Pick<Outlet, 'id' | 'name' | 'slug' | 'currency'> } | null>(null)
  const [menu, setMenu]               = useState<MenuItem[]>([])
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('PIZZA')
  const [cart, setCart]               = useState<CartItem[]>([])
  const [guestName, setGuestName]     = useState('')
  const [guestPhone, setGuestPhone]   = useState('')
  const [orderNotes, setOrderNotes]   = useState('')
  const [editNotes, setEditNotes]     = useState<string | null>(null)
  const [orderNum, setOrderNum]       = useState('')
  const [orderId, setOrderId]         = useState('')
  const [errorMsg, setErrorMsg]       = useState('')

  useEffect(() => {
    async function load() {
      console.log('[order] load() start, tableId=', tableId)

      const urlParams = new URLSearchParams(window.location.search)
      const scanToken = urlParams.get('t')
      const sessionKey = `mz-order-${tableId}`
      const MAX_AGE = 8 * 60 * 60 * 1000

      console.log('[order] scanToken=', scanToken, 'sessionKey=', sessionKey)

      if (scanToken) {
        sessionStorage.setItem(sessionKey, scanToken)
        console.log('[order] stored token in sessionStorage')
      }

      const stored = sessionStorage.getItem(sessionKey)
      const age = stored ? Date.now() - Number(stored) : null
      console.log('[order] stored=', stored, 'age(ms)=', age, 'MAX_AGE=', MAX_AGE)

      if (!stored || Date.now() - Number(stored) > MAX_AGE) {
        console.log('[order] no valid session → showing no-session screen')
        setStep('no-session')
        return
      }

      const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'
      console.log('[order] NEXT_PUBLIC_API_URL=', API)

      try {
        console.log('[order] fetching table:', `${API}/tables/by-uuid/${tableId}`)
        const tRes = await fetch(`${API}/tables/by-uuid/${tableId}`)
        console.log('[order] table response status=', tRes.status, tRes.statusText)
        if (!tRes.ok) {
          const body = await tRes.text()
          console.error('[order] table fetch failed, body=', body)
          throw new Error('Table not found')
        }
        const t: Table & { outlet: Pick<Outlet, 'id' | 'name' | 'slug' | 'currency'> } = await tRes.json()
        console.log('[order] table=', t)
        setTable(t)

        console.log('[order] fetching menu:', `${API}/menu?outlet=${t.outlet.slug}`)
        const mRes = await fetch(`${API}/menu?outlet=${t.outlet.slug}`)
        console.log('[order] menu response status=', mRes.status, mRes.statusText)
        if (!mRes.ok) {
          const body = await mRes.text()
          console.error('[order] menu fetch failed, body=', body)
          throw new Error('Menu unavailable')
        }
        const items: MenuItem[] = await mRes.json()
        console.log('[order] menu items count=', items.length)
        setMenu(Array.isArray(items) ? items.filter(i => i.available) : [])
        console.log('[order] setting step → menu')
        setStep('menu')
      } catch (err) {
        console.error('[order] caught error:', err)
        setErrorMsg('Table not found or menu unavailable.')
        setStep('error')
      }
    }
    load()
  }, [tableId])

  const currency  = table?.outlet.currency ?? 'SAR'
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  function addToCart(item: MenuItem) {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...item, quantity: 1, notes: '' }]
    })
  }

  function removeFromCart(id: string) {
    setCart(prev => {
      const existing = prev.find(i => i.id === id)
      if (!existing) return prev
      if (existing.quantity === 1) return prev.filter(i => i.id !== id)
      return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
    })
  }

  function deleteFromCart(id: string) { setCart(prev => prev.filter(i => i.id !== id)) }
  function updateNote(id: string, notes: string) { setCart(prev => prev.map(i => i.id === id ? { ...i, notes } : i)) }
  function getQty(id: string) { return cart.find(i => i.id === id)?.quantity ?? 0 }

  async function placeOrder() {
    if (!table) return
    if (!guestName.trim()) {
      setErrorMsg('Please enter your name.')
      return
    }
    if (!guestPhone.trim()) {
      setErrorMsg('Please enter your phone number.')
      return
    }
    setErrorMsg('')
    setStep('placing')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableId:    table.id,
          guestName:  guestName.trim(),
          guestPhone: guestPhone.trim(),
          notes:      orderNotes.trim() || undefined,
          type:       'DINE_IN',
          items:      cart.map(i => ({ menuItemId: i.id, quantity: i.quantity, notes: i.notes || undefined })),
        }),
      })
      if (!res.ok) {
        const text = await res.text().catch(() => `HTTP ${res.status}`)
        throw new Error(text)
      }
      const order = await res.json()
      setOrderNum(order.orderNum)
      setOrderId(order.id)
      setStep('confirm')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to place order. Please try again.')
      setStep('info')
    }
  }

  const visibleItems = menu.filter(m => m.category === activeCategory)

  // ── Loading ───────────────────────────────────────────────────────────────

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-white/20 animate-spin" />
      </div>
    )
  }

  if (step === 'error') {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-white/40 text-sm font-mono">{errorMsg}</p>
      </div>
    )
  }

  if (step === 'no-session') {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center px-6 text-center">
        <QrCode className="w-12 h-12 text-white/10 mb-6" />
        <p className="text-white/50 text-sm font-mono mb-2">Scan the QR code at your table to order</p>
        <p className="text-white/20 text-[10px] font-mono tracking-widest">امسح رمز QR على طاولتك</p>
      </div>
    )
  }

  // ── Confirm ───────────────────────────────────────────────────────────────

  if (step === 'confirm') {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 w-16 h-16 rounded-full bg-[#009246]/15 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-[#009246]" />
        </div>
        <h1 className="font-serif text-2xl text-white mb-2">Order Placed</h1>
        <p className="text-white/40 text-sm font-mono mb-1">طلبك في المطبخ</p>
        <p className="text-white/50 font-mono text-sm mt-1 mb-1">{orderNum}</p>
        <p className="text-white/25 text-xs tracking-widest uppercase font-mono mb-8">
          Table {table?.number}
        </p>
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-sm px-8 py-6 w-full max-w-xs mb-8">
          <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-mono mb-3">Order Summary</p>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between text-sm mb-2">
              <span className="text-white/60">{item.quantity}× {item.nameEn}</span>
              <span className="text-white/40 font-mono">{item.price * item.quantity} {currency}</span>
            </div>
          ))}
          <div className="border-t border-white/[0.06] mt-3 pt-3 flex justify-between">
            <span className="text-white/40 text-sm">Total</span>
            <span className="text-white font-mono text-sm">{cartTotal} {currency}</span>
          </div>
        </div>
        <p className="text-white/25 text-xs font-mono">Our team will bring your order shortly</p>
        <p className="text-white/15 text-[10px] font-mono mt-1 tracking-widest mb-8">سيقوم فريقنا بتقديم طلبك قريباً</p>
        {orderId && (
          <a
            href={`/track/${orderId}`}
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#CC2229]/60 hover:text-[#CC2229] transition-colors border border-[#CC2229]/20 px-4 py-2.5"
          >
            Track Order →
          </a>
        )}
      </div>
    )
  }

  // ── Guest info ────────────────────────────────────────────────────────────

  if (step === 'info' || step === 'placing') {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
        <header className="px-5 pt-safe-top pt-6 pb-4 border-b border-white/[0.06]">
          <button
            onClick={() => setStep('cart')}
            className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-1"
            disabled={step === 'placing'}
          >
            ← Back
          </button>
          <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase font-mono">Your Details</p>
          <h1 className="font-serif text-xl text-white mt-1">Almost done</h1>
        </header>
        <div className="flex-1 px-5 py-6 space-y-5">
          {errorMsg && (
            <p className="text-[#CC2229] text-xs font-mono">{errorMsg}</p>
          )}
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 font-mono mb-2">Name</label>
            <input
              type="text"
              value={guestName}
              onChange={e => setGuestName(e.target.value)}
              placeholder="Ahmad"
              className="w-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 px-4 py-3 text-sm font-mono focus:outline-none focus:border-white/20"
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 font-mono mb-2">Phone</label>
            <input
              type="tel"
              value={guestPhone}
              onChange={e => setGuestPhone(e.target.value)}
              placeholder="+966 5X XXX XXXX"
              className="w-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 px-4 py-3 text-sm font-mono focus:outline-none focus:border-white/20"
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 font-mono mb-2">Order Notes (optional)</label>
            <textarea
              value={orderNotes}
              onChange={e => setOrderNotes(e.target.value)}
              placeholder="Any allergies or special requests..."
              rows={3}
              className="w-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 px-4 py-3 text-sm font-mono focus:outline-none focus:border-white/20 resize-none"
            />
          </div>
        </div>
        <div className="px-5 pb-safe-bottom pb-8">
          <button
            disabled={step === 'placing'}
            onClick={placeOrder}
            className="w-full bg-[#CC2229] text-white font-mono text-xs tracking-[0.3em] uppercase py-4 disabled:opacity-30 active:opacity-80 transition-opacity flex items-center justify-center gap-2"
          >
            {step === 'placing' ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Placing Order…</>
            ) : (
              `Place Order · ${cartTotal} ${currency}`
            )}
          </button>
        </div>
      </div>
    )
  }

  // ── Cart ──────────────────────────────────────────────────────────────────

  if (step === 'cart') {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
        <header className="px-5 pt-safe-top pt-6 pb-4 border-b border-white/[0.06]">
          <button onClick={() => setStep('menu')} className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-1">
            ← Menu
          </button>
          <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase font-mono">Table {table?.number}</p>
          <h1 className="font-serif text-xl text-white mt-1">Your Order</h1>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {cart.length === 0 ? (
            <p className="text-white/20 text-sm font-mono text-center py-12">Cart is empty</p>
          ) : cart.map(item => (
            <div key={item.id} className="border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium leading-tight">{item.nameEn}</p>
                  <p className="text-white/30 text-[10px] font-mono mt-0.5">{item.nameAr}</p>
                  {item.notes && <p className="text-white/25 text-[10px] font-mono mt-1 italic">Note: {item.notes}</p>}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-white font-mono text-sm w-4 text-center">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-white/50 font-mono text-xs w-16 text-right">{item.price * item.quantity} {currency}</span>
                  <button onClick={() => deleteFromCart(item.id)} className="text-white/20 hover:text-white/50">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {editNotes === item.id ? (
                <div className="mt-3">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Add a note for this item…"
                    defaultValue={item.notes}
                    onBlur={e => { updateNote(item.id, e.target.value); setEditNotes(null) }}
                    className="w-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 px-3 py-2 text-xs font-mono focus:outline-none"
                  />
                </div>
              ) : (
                <button onClick={() => setEditNotes(item.id)} className="mt-2 text-[10px] text-white/20 font-mono hover:text-white/40 tracking-widest uppercase">
                  + Add note
                </button>
              )}
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="px-5 pb-safe-bottom pb-8 border-t border-white/[0.06] pt-4">
            <div className="flex justify-between text-sm mb-4">
              <span className="text-white/40 font-mono">Total</span>
              <span className="text-white font-mono font-medium">{cartTotal} {currency}</span>
            </div>
            <button
              onClick={() => setStep('info')}
              className="w-full bg-[#CC2229] text-white font-mono text-xs tracking-[0.3em] uppercase py-4 active:opacity-80 transition-opacity flex items-center justify-center gap-2"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    )
  }

  // ── Menu ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
      <header className="px-5 pt-safe-top pt-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Utensils className="w-3 h-3 text-[#CC2229]" />
              <p className="text-[10px] tracking-[0.4em] uppercase font-mono text-white/25">Table {table?.number}</p>
            </div>
            <h1 className="font-serif text-2xl text-white leading-tight">
              {table?.outlet.name ?? 'Mazencito'}
            </h1>
            <p className="text-white/20 text-[10px] font-mono mt-0.5 tracking-widest">مازنشيتو</p>
          </div>
          <button
            onClick={() => setStep('cart')}
            className="relative flex items-center justify-center w-11 h-11 border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06]"
          >
            <ShoppingCart className="w-4 h-4 text-white/60" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#CC2229] text-white text-[9px] font-mono flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Category tabs */}
      <div className="flex overflow-x-auto scrollbar-none border-b border-white/[0.06] px-5 gap-0">
        {CATEGORIES.filter(c => menu.some(m => m.category === c.key)).map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`shrink-0 py-3 px-3 font-mono text-[10px] tracking-[0.25em] uppercase border-b-2 transition-colors ${
              activeCategory === cat.key
                ? 'border-[#CC2229] text-white'
                : 'border-transparent text-white/25 hover:text-white/50'
            }`}
          >
            {cat.labelEn}
          </button>
        ))}
      </div>

      <div className="px-5 pt-4 pb-2">
        <p className="text-white/15 text-xs font-mono text-right">
          {CATEGORIES.find(c => c.key === activeCategory)?.labelAr}
        </p>
      </div>

      {/* Menu items */}
      <div className="flex-1 overflow-y-auto px-5 pb-32 space-y-3">
        {visibleItems.length === 0 && (
          <p className="text-white/20 text-sm font-mono text-center py-12">No items in this category</p>
        )}
        {visibleItems.map(item => {
          const qty = getQty(item.id)
          return (
            <div
              key={item.id}
              className={`border p-4 transition-colors ${
                qty > 0 ? 'border-[#CC2229]/30 bg-[#CC2229]/[0.03]' : 'border-white/[0.06] bg-white/[0.02]'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white text-sm font-medium">{item.nameEn}</p>
                    <p className="text-white/25 text-[10px] font-mono">{item.nameAr}</p>
                    {item.special && (
                      <span className="text-[8px] tracking-[0.3em] uppercase font-mono px-1.5 py-0.5 bg-amber-400/10 text-amber-400 border border-amber-400/20">
                        Special
                      </span>
                    )}
                  </div>
                  <p className="text-white/35 text-xs mt-1 leading-relaxed">{item.description}</p>
                  <p className="text-white/60 font-mono text-sm mt-2">{item.price} {currency}</p>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-2">
                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="w-8 h-8 flex items-center justify-center border border-white/10 bg-white/[0.04] text-white/50 hover:text-white hover:border-white/20 active:bg-white/[0.08] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-7 h-7 flex items-center justify-center border border-white/10 text-white/50 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white font-mono text-sm w-4 text-center">{qty}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-7 h-7 flex items-center justify-center border border-[#CC2229]/40 bg-[#CC2229]/10 text-[#CC2229]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Sticky cart bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 px-5 pb-safe-bottom pb-6 pt-4 bg-gradient-to-t from-[#0d0d0d] to-transparent">
          <button
            onClick={() => setStep('cart')}
            className="w-full bg-[#CC2229] text-white font-mono text-xs tracking-[0.3em] uppercase py-4 flex items-center justify-between px-5 active:opacity-80 transition-opacity"
          >
            <span className="bg-white/20 px-2 py-0.5 font-mono text-xs">{cartCount}</span>
            <span>View Order</span>
            <span className="font-mono">{cartTotal} {currency}</span>
          </button>
        </div>
      )}
    </div>
  )
}
