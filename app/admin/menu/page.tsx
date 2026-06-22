'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader2, Plus, X } from 'lucide-react'

interface MenuItem {
  id: string
  nameEn: string
  nameAr: string
  description: string
  price: number
  category: string
  available: boolean
  special: boolean
}

const CATEGORIES = ['PIZZA', 'PASTA', 'SOUPS', 'SALADS', 'DESSERTS', 'BEVERAGES']

const BLANK_FORM = {
  nameEn: '',
  nameAr: '',
  description: '',
  price: '',
  category: 'PIZZA',
}

async function mymemoryTranslate(text: string, from: string, to: string): Promise<string> {
  if (!text.trim()) return ''
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
  )
  const data = await res.json()
  return data.responseData?.translatedText ?? ''
}

export default function AdminMenu() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('ALL')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState(BLANK_FORM)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [translating, setTranslating] = useState<'nameEn' | 'nameAr' | null>(null)

  // Track which field the user is actively typing in to avoid feedback loops
  const typingField = useRef<'nameEn' | 'nameAr' | null>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  async function fetchMenu() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/menu')
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMenu() }, [])

  function handleNameChange(field: 'nameEn' | 'nameAr', value: string) {
    typingField.current = field
    setForm((p) => ({ ...p, [field]: value }))

    if (debounceTimer.current) clearTimeout(debounceTimer.current)

    if (!value.trim()) {
      const other = field === 'nameEn' ? 'nameAr' : 'nameEn'
      setForm((p) => ({ ...p, [other]: '' }))
      return
    }

    debounceTimer.current = setTimeout(async () => {
      const [from, to, target] =
        field === 'nameEn'
          ? ['en', 'ar', 'nameAr' as const]
          : ['ar', 'en', 'nameEn' as const]

      setTranslating(target)
      try {
        const translated = await mymemoryTranslate(value, from, to)
        if (translated && typingField.current === field) {
          setForm((p) => ({ ...p, [target]: translated }))
        }
      } finally {
        setTranslating(null)
      }
    }, 600)
  }

  async function toggleAvailable(item: MenuItem) {
    setToggling(item.id)
    await fetch(`/api/admin/menu/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available: !item.available }),
    })
    await fetchMenu()
    setToggling(null)
  }

  async function deleteItem(item: MenuItem) {
    if (!confirm(`Delete "${item.nameEn}"?`)) return
    setToggling(item.id)
    await fetch(`/api/admin/menu/${item.id}`, { method: 'DELETE' })
    await fetchMenu()
    setToggling(null)
  }

  async function addItem(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setFormError('')
    try {
      const res = await fetch('/api/admin/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          available: true,
          special: false,
        }),
      })
      if (!res.ok) {
        const err = await res.json()
        setFormError(err.error ?? 'Failed to add item')
        return
      }
      setForm(BLANK_FORM)
      setShowAdd(false)
      await fetchMenu()
    } finally {
      setSaving(false)
    }
  }

  const filtered = activeCategory === 'ALL' ? items : items.filter((i) => i.category === activeCategory)

  const inputClass = 'w-full px-4 py-3 border border-[#0A0806]/12 bg-white text-[#0A0806] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#CC2229]/20'

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-[#0A0806]/40 mb-2">Inventory</p>
          <h1 className="elegant-text text-4xl font-bold text-[#0A0806]">Menu</h1>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 font-ui text-xs tracking-[0.3em] uppercase bg-[#CC2229] text-white px-5 py-3 hover:bg-[#B01E24] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Item
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {['ALL', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`font-ui text-xs px-4 py-2 tracking-[0.2em] uppercase transition-all whitespace-nowrap ${
              activeCategory === cat ? 'bg-[#0A0806] text-white' : 'text-[#0A0806] border border-transparent hover:border-[#0A0806]/15'
            }`}
          >
            {cat === 'ALL' ? 'All' : cat.charAt(0) + cat.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-[#0A0806]/30" />
        </div>
      ) : (
        <div className="border border-[#0A0806]/8 divide-y divide-[#0A0806]/8">
          {filtered.length === 0 && (
            <p className="font-body text-[#0A0806]/40 px-6 py-8">No items in this category.</p>
          )}
          {filtered.map((item) => (
            <div key={item.id} className={`flex items-center justify-between px-6 py-4 gap-4 ${!item.available ? 'opacity-50' : ''}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-body text-[#0A0806]">{item.nameEn}</p>
                  {item.nameAr && (
                    <p className="font-body text-sm text-[#0A0806]/40" dir="rtl">{item.nameAr}</p>
                  )}
                  <span className="font-ui text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 bg-[#0A0806]/6 text-[#0A0806]/50">
                    {item.category}
                  </span>
                </div>
                <p className="font-ui text-sm text-[#CC2229] mt-0.5">{item.price} SAR</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {toggling === item.id ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#0A0806]/30" />
                ) : (
                  <>
                    <button
                      onClick={() => toggleAvailable(item)}
                      className={`font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border transition-colors ${
                        item.available
                          ? 'border-green-300 text-green-700 hover:bg-green-50'
                          : 'border-[#0A0806]/15 text-[#0A0806]/50 hover:bg-[#0A0806]/5'
                      }`}
                    >
                      {item.available ? 'Available' : 'Hidden'}
                    </button>
                    <button
                      onClick={() => deleteItem(item)}
                      className="p-1.5 text-[#0A0806]/30 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Item Modal */}
      {showAdd && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-6"
          onClick={() => { setShowAdd(false); setForm(BLANK_FORM) }}
        >
          <div
            className="bg-white p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="elegant-text text-2xl font-bold text-[#0A0806]">Add Menu Item</h2>
              <button
                onClick={() => { setShowAdd(false); setForm(BLANK_FORM) }}
                className="p-1.5 text-[#0A0806]/40 hover:text-[#0A0806]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={addItem} className="space-y-4">

              {/* Name (English) — auto-translates to Arabic */}
              <div>
                <label className="block font-ui text-[10px] tracking-[0.3em] uppercase text-[#0A0806]/60 mb-1.5">
                  Name (English) *
                </label>
                <input
                  type="text"
                  value={form.nameEn}
                  onChange={(e) => handleNameChange('nameEn', e.target.value)}
                  required
                  placeholder="e.g. Pizza Margherita"
                  className={inputClass}
                />
              </div>

              {/* Name (Arabic) — auto-translates to English */}
              <div>
                <label className="flex items-center gap-2 font-ui text-[10px] tracking-[0.3em] uppercase text-[#0A0806]/60 mb-1.5">
                  <span>Name (Arabic) *</span>
                  {translating === 'nameAr' && (
                    <span className="flex items-center gap-1 text-[#CC2229]/70 normal-case tracking-normal">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span className="text-[9px]">translating…</span>
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  value={form.nameAr}
                  onChange={(e) => handleNameChange('nameAr', e.target.value)}
                  required
                  placeholder="مثال: بيتزا مرغريتا"
                  dir="rtl"
                  className={`${inputClass} ${translating === 'nameAr' ? 'bg-[#FAF8F5] text-[#0A0806]/50' : ''}`}
                />
                {translating === 'nameEn' && (
                  <p className="flex items-center gap-1 mt-1 text-[#CC2229]/70 font-ui text-[9px]">
                    <Loader2 className="w-2.5 h-2.5 animate-spin" />
                    translating to English…
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block font-ui text-[10px] tracking-[0.3em] uppercase text-[#0A0806]/60 mb-1.5">
                  Description
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Brief description of the dish"
                  className={inputClass}
                />
              </div>

              {/* Price */}
              <div>
                <label className="block font-ui text-[10px] tracking-[0.3em] uppercase text-[#0A0806]/60 mb-1.5">
                  Price (SAR) *
                </label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                  required
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className={inputClass}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-ui text-[10px] tracking-[0.3em] uppercase text-[#0A0806]/60 mb-1.5">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  className={inputClass}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c.charAt(0) + c.slice(1).toLowerCase()}</option>
                  ))}
                </select>
              </div>

              {formError && (
                <p className="font-ui text-xs text-[#CC2229]">{formError}</p>
              )}

              <button
                type="submit"
                disabled={saving || translating !== null}
                className="w-full flex items-center justify-center gap-2 bg-[#CC2229] text-white font-ui text-xs tracking-[0.3em] uppercase px-6 py-4 hover:bg-[#B01E24] transition-colors disabled:opacity-50 min-h-[52px]"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add Item'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
