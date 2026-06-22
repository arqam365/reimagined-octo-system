'use client'

import { useState } from 'react'
import { Loader2, Minus, Plus, ShoppingCart, X } from 'lucide-react'

interface Table {
  id: string
  number: number
  capacity: number
  outlet: { name: string; currency: string }
}

interface MenuItem {
  id: string
  nameEn: string
  nameAr: string
  description: string
  price: number
  category: string
}

type CartItem = { item: MenuItem; qty: number; notes: string }

const CATEGORY_LABELS: Record<string, string> = {
  PIZZA: 'Pizza',
  PASTA: 'Pasta',
  SOUPS: 'Soups',
  SALADS: 'Salads',
  DESSERTS: 'Desserts',
  BEVERAGES: 'Beverages',
}

export default function TableOrderClient({
  table,
  menu,
}: {
  table: Table
  menu: MenuItem[]
}) {
  const categories = [...new Set(menu.map((m) => m.category))].sort()
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? 'PIZZA')
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [orderNum, setOrderNum] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const filteredItems = menu.filter((m) => m.category === activeCategory)
  const totalItems = cart.reduce((s, c) => s + c.qty, 0)
  const total = cart.reduce((s, c) => s + c.item.price * c.qty, 0)

  function addItem(item: MenuItem) {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id)
      if (existing) return prev.map((c) => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { item, qty: 1, notes: '' }]
    })
  }

  function removeItem(id: string) {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === id)
      if (!existing) return prev
      if (existing.qty === 1) return prev.filter((c) => c.item.id !== id)
      return prev.map((c) => c.item.id === id ? { ...c, qty: c.qty - 1 } : c)
    })
  }

  function getQty(id: string) {
    return cart.find((c) => c.item.id === id)?.qty ?? 0
  }

  async function placeOrder() {
    if (cart.length === 0) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableId: table.id,
          type: 'DINE_IN',
          guestName: guestName || undefined,
          guestPhone: guestPhone || undefined,
          notes: notes || undefined,
          items: cart.map((c) => ({
            menuItemId: c.item.id,
            quantity: c.qty,
            notes: c.notes || undefined,
          })),
        }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? 'Failed to place order')
      }
      const data = await res.json()
      setOrderNum(data.orderNum)
      setCart([])
      setShowCart(false)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (orderNum) {
    return (
      <div className="min-h-screen bg-[#0A0806] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/30 mb-6">
            Order Placed
          </p>
          <h1 className="elegant-text text-6xl font-bold text-white mb-4">{orderNum}</h1>
          <div className="h-px w-16 bg-[#CC2229] mx-auto mb-6" />
          <p className="font-body text-white/50 text-lg mb-2">
            Your order has been received by the kitchen.
          </p>
          <p className="font-ui text-xs text-white/30 tracking-wide">
            Table {table.number}
          </p>
          <button
            onClick={() => setOrderNum(null)}
            className="mt-10 font-ui text-xs tracking-[0.3em] uppercase border border-white/20 text-white px-8 py-3.5 hover:bg-white/5 transition-colors"
          >
            Order More
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <div className="bg-[#0A0806] pt-12 pb-8 px-6">
        <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-white/30 mb-2">
          {table.outlet.name}
        </p>
        <h1 className="elegant-text text-4xl font-bold text-white">
          Table {table.number}
        </h1>
        <p className="font-ui text-xs text-white/30 mt-1">
          Scan to order — items go straight to the kitchen
        </p>
      </div>

      {/* Category Tabs */}
      <div className="bg-[#FAF8F5] sticky top-0 z-30 border-b border-[#0A0806]/8 py-3 px-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-ui text-xs px-4 py-2 tracking-[0.2em] uppercase transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#0A0806] text-white'
                  : 'text-[#0A0806] border border-transparent hover:border-[#0A0806]/15'
              }`}
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-2xl mx-auto px-6 py-8 pb-32">
        {filteredItems.map((item) => {
          const qty = getQty(item.id)
          return (
            <div
              key={item.id}
              className="flex items-start justify-between py-5 border-b border-[#0A0806]/8"
            >
              <div className="flex-1 min-w-0 pr-4">
                <p className="elegant-text text-xl text-[#0A0806]">{item.nameEn}</p>
                {item.nameAr && (
                  <p className="font-body text-sm text-[#0A0806]/40 mt-0.5" dir="rtl">
                    {item.nameAr}
                  </p>
                )}
                <p className="font-ui text-xs text-[#0A0806]/50 tracking-wide mt-1 leading-relaxed">
                  {item.description}
                </p>
                <p className="font-ui font-semibold text-[#CC2229] text-sm mt-2">
                  {item.price} {table.outlet.currency ?? 'SAR'}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 mt-1">
                {qty > 0 ? (
                  <>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-8 h-8 flex items-center justify-center border border-[#0A0806]/20 hover:bg-[#0A0806]/5 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5 text-[#0A0806]" />
                    </button>
                    <span className="font-ui text-sm font-semibold w-4 text-center">{qty}</span>
                  </>
                ) : null}
                <button
                  onClick={() => addItem(item)}
                  className="w-8 h-8 flex items-center justify-center bg-[#0A0806] hover:bg-[#1a1410] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Cart Button */}
      {totalItems > 0 && !showCart && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center px-6 z-40">
          <button
            onClick={() => setShowCart(true)}
            className="flex items-center gap-3 bg-[#0A0806] text-white px-8 py-4 font-ui text-xs tracking-[0.3em] uppercase shadow-2xl w-full max-w-md justify-between"
          >
            <span className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              {totalItems} item{totalItems > 1 ? 's' : ''}
            </span>
            <span>{total.toFixed(0)} {table.outlet.currency ?? 'SAR'}</span>
          </button>
        </div>
      )}

      {/* Cart Sheet */}
      {showCart && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end">
          <div className="bg-white w-full max-h-[90vh] overflow-y-auto rounded-t-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#0A0806]/8 sticky top-0 bg-white">
              <h2 className="elegant-text text-2xl font-bold text-[#0A0806]">Your Order</h2>
              <button onClick={() => setShowCart(false)} className="p-2">
                <X className="w-5 h-5 text-[#0A0806]/50" />
              </button>
            </div>

            <div className="px-6 py-4">
              {cart.map((cartItem) => (
                <div key={cartItem.item.id} className="flex items-center justify-between py-3 border-b border-[#0A0806]/8">
                  <div className="flex-1 min-w-0 pr-3">
                    <p className="font-body text-[#0A0806]">{cartItem.item.nameEn}</p>
                    <p className="font-ui text-xs text-[#0A0806]/50">
                      {cartItem.qty} × {cartItem.item.price} {table.outlet.currency ?? 'SAR'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => removeItem(cartItem.item.id)}
                      className="w-7 h-7 flex items-center justify-center border border-[#0A0806]/20"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-ui text-sm w-4 text-center">{cartItem.qty}</span>
                    <button
                      onClick={() => addItem(cartItem.item)}
                      className="w-7 h-7 flex items-center justify-center bg-[#0A0806]"
                    >
                      <Plus className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-5 pb-2">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-ui text-xs tracking-[0.3em] uppercase text-[#0A0806]/50">Total</span>
                  <span className="elegant-text text-2xl font-bold text-[#0A0806]">
                    {total.toFixed(0)} {table.outlet.currency ?? 'SAR'}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-3 border border-[#0A0806]/12 bg-[#FAF8F5] text-[#0A0806] placeholder-[#0A0806]/35 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#CC2229]/20"
                  />
                  <textarea
                    placeholder="Order notes (optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 border border-[#0A0806]/12 bg-[#FAF8F5] text-[#0A0806] placeholder-[#0A0806]/35 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#CC2229]/20 resize-none"
                  />
                </div>

                {error && (
                  <p className="font-ui text-xs text-[#CC2229] mb-4">{error}</p>
                )}

                <button
                  onClick={placeOrder}
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#CC2229] text-white font-ui text-xs tracking-[0.3em] uppercase px-6 py-4 hover:bg-[#B01E24] transition-colors disabled:opacity-60 min-h-[52px]"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    `Place Order — ${total.toFixed(0)} SAR`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
