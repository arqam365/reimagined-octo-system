'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { DEFAULT_SHORTCUTS } from '@/components/admin-keyboard'

// ─── Types ────────────────────────────────────────────────────────────────────

type ShortcutMap = Record<string, { path: string; label: string }>

// ─── Keyboard-key visual ──────────────────────────────────────────────────────

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center font-mono text-[11px] bg-[#0A0806]/8 text-[#0A0806] border border-[#0A0806]/15 px-2 py-1 min-w-[28px] shadow-[0_2px_0_rgba(10,8,6,0.12)]">
      {children}
    </kbd>
  )
}

function KbdDark({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center font-mono text-[11px] bg-white/10 text-white border border-white/20 px-2 py-1 min-w-[28px] shadow-[0_2px_0_rgba(0,0,0,0.4)]">
      {children}
    </kbd>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_STYLE: Record<string, string> = {
  RECEIVED:   'bg-amber-100 text-amber-800 border-amber-200',
  PREPARING:  'bg-blue-100 text-blue-800 border-blue-200',
  READY:      'bg-green-100 text-green-800 border-green-200',
  SERVED:     'bg-[#0A0806]/6 text-[#0A0806]/50 border-[#0A0806]/8',
  CANCELLED:  'bg-red-100 text-red-700 border-red-200',
  PENDING:    'bg-amber-100 text-amber-800 border-amber-200',
  CONFIRMED:  'bg-green-100 text-green-800 border-green-200',
  NO_SHOW:    'bg-[#0A0806]/6 text-[#0A0806]/50 border-[#0A0806]/8',
  AVAILABLE:  'bg-green-50 text-green-800 border-green-200',
  OCCUPIED:   'bg-amber-50 text-amber-800 border-amber-200',
  RESERVED:   'bg-blue-50 text-blue-800 border-blue-200',
}

function Badge({ status }: { status: string }) {
  return (
    <span className={`font-ui text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 border ${STATUS_STYLE[status] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {status}
    </span>
  )
}

// ─── Section anchor ───────────────────────────────────────────────────────────

function Section({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-8 bg-[#CC2229]" />
        <h2 className="elegant-text text-3xl font-bold text-white">{label}</h2>
      </div>
      {children}
    </section>
  )
}

// ─── Shortcut row (remappable) ────────────────────────────────────────────────

function ShortcutRow({
  combo,
  entry,
  onRemap,
}: {
  combo: string
  entry: { path: string; label: string }
  onRemap: (combo: string, newCombo: string) => void
}) {
  const [remapping, setRemapping] = useState(false)
  const [captured, setCaptured] = useState<string[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!remapping) return

    const keys: string[] = []
    let timer: ReturnType<typeof setTimeout>

    const handler = (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.key === 'Escape') { setRemapping(false); return }

      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
      keys.push(k)
      setCaptured([...keys])

      clearTimeout(timer)
      timer = setTimeout(() => {
        if (keys.length > 0) {
          onRemap(combo, keys.join(','))
        }
        setRemapping(false)
      }, 800)
    }

    window.addEventListener('keydown', handler)
    ref.current?.focus()
    return () => { window.removeEventListener('keydown', handler); clearTimeout(timer) }
  }, [remapping, combo, onRemap])

  const parts = combo.split(',')

  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 group">
      <div className="flex items-center gap-3">
        {/* Keys display */}
        <div className="flex items-center gap-1.5 min-w-[80px]">
          {remapping ? (
            captured.length === 0 ? (
              <span className="font-mono text-xs text-[#CC2229] tracking-widest animate-pulse">listening…</span>
            ) : (
              captured.map((k, i) => <KbdDark key={i}>{k.toUpperCase()}</KbdDark>)
            )
          ) : (
            parts.map((k, i) => (
              <span key={i} className="flex items-center gap-1">
                <KbdDark>{k.toUpperCase()}</KbdDark>
                {i < parts.length - 1 && <span className="text-white/20 text-xs">then</span>}
              </span>
            ))
          )}
        </div>
        {/* Label */}
        <span className="font-ui text-xs text-white/60 tracking-wide">{entry.label}</span>
        <span className="font-mono text-[10px] text-white/20">{entry.path}</span>
      </div>

      {/* Remap button */}
      <div ref={ref} tabIndex={-1} className="outline-none">
        <button
          onClick={() => { setRemapping(true); setCaptured([]) }}
          className={`font-ui text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 border transition-all ${
            remapping
              ? 'border-[#CC2229] text-[#CC2229]'
              : 'border-white/10 text-white/20 opacity-0 group-hover:opacity-100 hover:border-white/30 hover:text-white/50'
          }`}
        >
          {remapping ? 'Press keys…' : 'Remap'}
        </button>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminDocs() {
  const [shortcuts, setShortcuts] = useState<ShortcutMap>(DEFAULT_SHORTCUTS)
  const [resetDone, setResetDone] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mz-shortcuts')
      if (stored) setShortcuts({ ...DEFAULT_SHORTCUTS, ...JSON.parse(stored) })
    } catch { /* ignore */ }
  }, [])

  function handleRemap(oldCombo: string, newCombo: string) {
    setShortcuts((prev) => {
      const next = { ...prev }
      const entry = next[oldCombo]
      if (!entry) return prev
      delete next[oldCombo]
      next[newCombo] = entry
      const custom: ShortcutMap = {}
      for (const [k, v] of Object.entries(next)) {
        if (DEFAULT_SHORTCUTS[k]?.path !== v.path || k !== Object.keys(DEFAULT_SHORTCUTS).find(dk => DEFAULT_SHORTCUTS[dk].path === v.path)) {
          custom[k] = v
        }
      }
      localStorage.setItem('mz-shortcuts', JSON.stringify(next))
      return next
    })
  }

  function resetShortcuts() {
    localStorage.removeItem('mz-shortcuts')
    setShortcuts(DEFAULT_SHORTCUTS)
    setResetDone(true)
    setTimeout(() => setResetDone(false), 2000)
  }

  const sections = [
    { id: 'shortcuts', label: 'Shortcuts' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders',    label: 'Orders'    },
    { id: 'tables',    label: 'Tables'    },
    { id: 'reservations', label: 'Reservations' },
    { id: 'menu',      label: 'Menu'      },
    { id: 'tips',      label: 'Tips'      },
  ]

  return (
    <div className="min-h-screen bg-[#0A0806] -mx-6 -mt-8 px-0">

      {/* ── Page header ── */}
      <div className="border-b border-white/8 px-8 sm:px-12 lg:px-16 py-10">
        <div className="max-w-6xl mx-auto flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-white/25 mb-3">
              v1.0 &nbsp;·&nbsp; Admin Reference
            </p>
            <h1 className="elegant-text text-5xl md:text-6xl font-bold text-white leading-none">
              Operator<br />
              <em className="not-italic text-[#CC2229]">Guide</em>
            </h1>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2 pb-1">
            <p className="font-mono text-[10px] text-white/20 tracking-widest">SYSTEM STATUS</p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#009246] animate-pulse" />
              <span className="font-mono text-xs text-[#009246]">ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-16">

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/20 mb-4 px-3">Contents</p>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block font-ui text-xs tracking-[0.2em] uppercase text-white/35 hover:text-white hover:bg-white/5 transition-all px-3 py-2"
                >
                  {s.label}
                </a>
              ))}
              <div className="pt-6 px-3">
                <Link
                  href="/admin"
                  className="font-ui text-[10px] tracking-[0.3em] uppercase text-white/20 hover:text-white/50 transition-colors"
                >
                  ← Back to Admin
                </Link>
              </div>
            </div>
          </aside>

          {/* ── Content ── */}
          <div className="space-y-20">

            {/* ══ SHORTCUTS ══════════════════════════════════════════════════ */}
            <Section id="shortcuts" label="Keyboard Shortcuts">

              {/* Quick-reference grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  { combo: 'G → D', desc: 'Go to Dashboard'    },
                  { combo: 'G → O', desc: 'Go to Orders'       },
                  { combo: 'G → T', desc: 'Go to Tables'       },
                  { combo: 'G → R', desc: 'Go to Reservations' },
                  { combo: 'G → M', desc: 'Go to Menu'         },
                  { combo: '?',     desc: 'Open this guide'    },
                ].map(({ combo, desc }) => (
                  <div key={combo} className="flex items-center justify-between bg-white/[0.03] border border-white/8 px-4 py-3">
                    <span className="font-ui text-xs text-white/50 tracking-wide">{desc}</span>
                    <div className="flex items-center gap-1">
                      {combo.split(' → ').map((k, i, arr) => (
                        <span key={i} className="flex items-center gap-1">
                          <KbdDark>{k}</KbdDark>
                          {i < arr.length - 1 && <span className="font-mono text-[9px] text-white/20 mx-0.5">→</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Remap interface */}
              <div className="border border-white/8">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                  <div>
                    <p className="font-ui text-xs tracking-[0.3em] uppercase text-white/70">Custom Bindings</p>
                    <p className="font-mono text-[10px] text-white/25 mt-0.5">Hover any row and click Remap — press your new keys</p>
                  </div>
                  <button
                    onClick={resetShortcuts}
                    className={`font-ui text-[9px] tracking-[0.3em] uppercase px-3 py-2 border transition-all ${
                      resetDone
                        ? 'border-[#009246] text-[#009246]'
                        : 'border-white/10 text-white/25 hover:border-white/30 hover:text-white/50'
                    }`}
                  >
                    {resetDone ? '✓ Reset' : 'Reset Defaults'}
                  </button>
                </div>
                <div className="px-5 py-2">
                  {Object.entries(shortcuts).map(([combo, entry]) => (
                    <ShortcutRow
                      key={combo}
                      combo={combo}
                      entry={entry}
                      onRemap={handleRemap}
                    />
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-white/5">
                  <p className="font-mono text-[9px] text-white/15 tracking-wide">
                    Bindings saved to browser &nbsp;·&nbsp; stored in localStorage &nbsp;·&nbsp; ESC cancels remap
                  </p>
                </div>
              </div>
            </Section>

            {/* ══ DASHBOARD ══════════════════════════════════════════════════ */}
            <Section id="dashboard" label="Dashboard">
              <p className="font-body text-white/50 text-base leading-relaxed mb-8 max-w-xl">
                The dashboard gives you a live snapshot of the day — it is the first page after login and refreshes on demand.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
                {[
                  { label: 'Pending Orders', note: 'Turns red when > 0 — your most urgent metric', urgent: true },
                  { label: 'Total Orders Today', note: 'Cumulative count across all statuses', urgent: false },
                  { label: "Today's Reservations", note: 'Number of bookings for the current calendar date', urgent: false },
                ].map(({ label, note, urgent }) => (
                  <div key={label} className={`border p-4 ${urgent ? 'border-[#CC2229]/30 bg-[#CC2229]/5' : 'border-white/8 bg-white/[0.02]'}`}>
                    <p className={`font-ui text-[9px] tracking-[0.3em] uppercase mb-2 ${urgent ? 'text-[#CC2229]' : 'text-white/30'}`}>{label}</p>
                    <p className="font-body text-white/40 text-xs leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.02] border border-white/8 px-5 py-4">
                <p className="font-mono text-[10px] text-white/30 tracking-wide mb-2">SHORTCUT</p>
                <div className="flex items-center gap-2">
                  <KbdDark>G</KbdDark>
                  <span className="font-mono text-[10px] text-white/20">then</span>
                  <KbdDark>D</KbdDark>
                  <span className="font-ui text-xs text-white/40 ml-3">Jump to Dashboard from anywhere</span>
                </div>
              </div>
            </Section>

            {/* ══ ORDERS ═════════════════════════════════════════════════════ */}
            <Section id="orders" label="Orders">
              <p className="font-body text-white/50 text-base leading-relaxed mb-8 max-w-xl">
                Orders arrive from QR table scans in real time. The page auto-refreshes every 10 seconds — no manual reload needed.
              </p>

              {/* Lifecycle */}
              <div className="mb-10">
                <p className="font-mono text-[10px] text-white/25 tracking-widest uppercase mb-5">Order Lifecycle</p>
                <div className="flex items-center gap-0 overflow-x-auto pb-2">
                  {[
                    { s: 'RECEIVED', note: 'Just placed' },
                    { s: 'PREPARING', note: 'Kitchen working' },
                    { s: 'READY', note: 'On the pass' },
                    { s: 'SERVED', note: 'Done' },
                  ].map(({ s, note }, i) => (
                    <div key={s} className="flex items-center flex-shrink-0">
                      <div className="flex flex-col items-center gap-2">
                        <Badge status={s} />
                        <span className="font-mono text-[9px] text-white/20">{note}</span>
                      </div>
                      {i < 3 && (
                        <div className="w-10 h-px bg-white/10 mx-3 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                  <div className="flex items-center ml-6">
                    <div className="w-px h-8 bg-white/10 mx-3" />
                    <div className="flex flex-col items-center gap-2">
                      <Badge status="CANCELLED" />
                      <span className="font-mono text-[9px] text-white/20">Any stage</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions reference */}
              <div className="border border-white/8 divide-y divide-white/5 mb-8">
                {[
                  { action: '→ PREPARING button', desc: 'Advance order to the next stage in the lifecycle', warn: false },
                  { action: 'Cancel button',       desc: 'Marks the order CANCELLED — cannot be undone', warn: true },
                  { action: 'Filter tabs',          desc: 'Active (live orders), or filter by individual status', warn: false },
                  { action: 'Refresh button',       desc: 'Manual refresh on top-right — or just wait 10 seconds', warn: false },
                ].map(({ action, desc, warn }) => (
                  <div key={action} className="flex items-start gap-4 px-5 py-4">
                    <span className={`font-ui text-[10px] tracking-[0.2em] uppercase px-2 py-1 flex-shrink-0 ${warn ? 'text-red-400 bg-red-500/10 border border-red-500/20' : 'text-white/50 bg-white/5 border border-white/10'}`}>
                      {action}
                    </span>
                    <p className="font-body text-white/40 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.02] border border-white/8 px-5 py-4">
                <p className="font-mono text-[10px] text-white/30 tracking-wide mb-2">SHORTCUT</p>
                <div className="flex items-center gap-2">
                  <KbdDark>G</KbdDark>
                  <span className="font-mono text-[10px] text-white/20">then</span>
                  <KbdDark>O</KbdDark>
                  <span className="font-ui text-xs text-white/40 ml-3">Jump to Orders</span>
                </div>
              </div>
            </Section>

            {/* ══ TABLES ══════════════════════════════════════════════════════ */}
            <Section id="tables" label="Tables">
              <p className="font-body text-white/50 text-base leading-relaxed mb-8 max-w-xl">
                Each table has a permanent UUID-based QR code. The QR links customers to the ordering screen. Print once — stick on the table.
              </p>

              {/* Table statuses */}
              <div className="grid grid-cols-3 gap-3 mb-10">
                {[
                  { s: 'AVAILABLE', desc: 'Empty, ready to seat' },
                  { s: 'OCCUPIED',  desc: 'Guests seated, order possible' },
                  { s: 'RESERVED',  desc: 'Booking confirmed, not yet seated' },
                ].map(({ s, desc }) => (
                  <div key={s} className="bg-white/[0.02] border border-white/8 p-4">
                    <Badge status={s} />
                    <p className="font-body text-white/35 text-xs mt-3 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              {/* QR workflow */}
              <div className="border border-white/8 mb-8">
                <div className="px-5 py-3 border-b border-white/8">
                  <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase">QR Code Workflow</p>
                </div>
                <div className="divide-y divide-white/5">
                  {[
                    { step: '01', action: 'Click the QR icon on any table card' },
                    { step: '02', action: 'QR modal opens — the code encodes a unique permanent URL' },
                    { step: '03', action: 'Click Download to save a 400×400 PNG — print and laminate' },
                    { step: '04', action: 'Stick the QR on the physical table' },
                  ].map(({ step, action }) => (
                    <div key={step} className="flex items-start gap-5 px-5 py-4">
                      <span className="font-mono text-xs text-white/15 flex-shrink-0 pt-0.5">{step}</span>
                      <p className="font-body text-white/50 text-sm">{action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regenerate warning */}
              <div className="border border-red-500/25 bg-red-500/5 px-5 py-4 mb-8">
                <p className="font-ui text-[10px] tracking-[0.35em] uppercase text-red-400 mb-2">⚠ Regenerate QR — use with caution</p>
                <p className="font-body text-white/40 text-sm leading-relaxed">
                  Regenerating creates a new UUID — the old QR sticker stops working immediately.
                  You must type <code className="font-mono text-red-300 bg-red-500/10 px-1">REGENERATE</code> exactly to confirm.
                  Only do this if a QR sticker has been tampered with or lost.
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/8 px-5 py-4">
                <p className="font-mono text-[10px] text-white/30 tracking-wide mb-2">SHORTCUT</p>
                <div className="flex items-center gap-2">
                  <KbdDark>G</KbdDark>
                  <span className="font-mono text-[10px] text-white/20">then</span>
                  <KbdDark>T</KbdDark>
                  <span className="font-ui text-xs text-white/40 ml-3">Jump to Tables</span>
                </div>
              </div>
            </Section>

            {/* ══ RESERVATIONS ═══════════════════════════════════════════════ */}
            <Section id="reservations" label="Reservations">
              <p className="font-body text-white/50 text-base leading-relaxed mb-8 max-w-xl">
                All bookings from the customer reservation form appear here, filtered by date. Defaults to today.
              </p>

              {/* Status flow */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Badge status="PENDING" />
                <span className="font-mono text-xs text-white/20">→ Confirm →</span>
                <Badge status="CONFIRMED" />
                <span className="font-mono text-xs text-white/20">→ No Show</span>
                <Badge status="NO_SHOW" />
              </div>

              <div className="border border-white/8 divide-y divide-white/5 mb-8">
                {[
                  { action: 'Date picker',    desc: 'Switch to any date to view that day\'s reservations' },
                  { action: 'Confirm button', desc: 'Moves reservation to CONFIRMED — customer expects this' },
                  { action: 'Cancel button',  desc: 'Marks as CANCELLED — available on PENDING only', warn: true },
                  { action: 'No Show button', desc: 'Available on CONFIRMED — records a no-show for the day', warn: false },
                ].map(({ action, desc, warn }) => (
                  <div key={action} className="flex items-start gap-4 px-5 py-4">
                    <span className={`font-ui text-[10px] tracking-[0.2em] uppercase px-2 py-1 flex-shrink-0 ${warn ? 'text-red-400 bg-red-500/10 border border-red-500/20' : 'text-white/50 bg-white/5 border border-white/10'}`}>
                      {action}
                    </span>
                    <p className="font-body text-white/40 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.02] border border-white/8 px-5 py-4">
                <p className="font-mono text-[10px] text-white/30 tracking-wide mb-2">SHORTCUT</p>
                <div className="flex items-center gap-2">
                  <KbdDark>G</KbdDark>
                  <span className="font-mono text-[10px] text-white/20">then</span>
                  <KbdDark>R</KbdDark>
                  <span className="font-ui text-xs text-white/40 ml-3">Jump to Reservations</span>
                </div>
              </div>
            </Section>

            {/* ══ MENU ════════════════════════════════════════════════════════ */}
            <Section id="menu" label="Menu">
              <p className="font-body text-white/50 text-base leading-relaxed mb-8 max-w-xl">
                All items here appear live on the customer-facing menu page and QR ordering screen. Changes are immediate.
              </p>

              <div className="border border-white/8 divide-y divide-white/5 mb-8">
                {[
                  {
                    action: 'Add Item',
                    desc: 'Opens a modal with English and Arabic name fields. Auto-translate fires after 600ms of typing — fills the other language automatically using MyMemory.',
                    warn: false,
                  },
                  {
                    action: 'Available toggle',
                    desc: 'Green = visible to customers. Click to toggle hidden (grey). Hidden items still exist in the database — they just won\'t show on the menu or QR ordering screen.',
                    warn: false,
                  },
                  {
                    action: 'Delete (×)',
                    desc: 'Permanently removes the item from the database. A browser confirm dialog prevents accidental deletion.',
                    warn: true,
                  },
                  {
                    action: 'Category filter',
                    desc: 'Filter the list by Pizza, Pasta, Soups, Salads, Desserts, Beverages — or show All.',
                    warn: false,
                  },
                ].map(({ action, desc, warn }) => (
                  <div key={action} className="flex items-start gap-4 px-5 py-4">
                    <span className={`font-ui text-[10px] tracking-[0.2em] uppercase px-2 py-1 flex-shrink-0 ${warn ? 'text-red-400 bg-red-500/10 border border-red-500/20' : 'text-white/50 bg-white/5 border border-white/10'}`}>
                      {action}
                    </span>
                    <p className="font-body text-white/40 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Auto-translate note */}
              <div className="border border-white/8 bg-white/[0.02] px-5 py-4 mb-8">
                <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase mb-3">Auto-Translate Detail</p>
                <div className="space-y-2">
                  {[
                    'Type in English → Arabic fills automatically after 0.6 s',
                    'Type in Arabic → English fills automatically after 0.6 s',
                    'Both directions work — just type in whichever language you know',
                    'You can edit the translated result manually if needed',
                    'Save is disabled while a translation is in flight',
                  ].map((line, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="font-mono text-[9px] text-[#009246] mt-0.5">→</span>
                      <p className="font-body text-white/40 text-sm">{line}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/8 px-5 py-4">
                <p className="font-mono text-[10px] text-white/30 tracking-wide mb-2">SHORTCUT</p>
                <div className="flex items-center gap-2">
                  <KbdDark>G</KbdDark>
                  <span className="font-mono text-[10px] text-white/20">then</span>
                  <KbdDark>M</KbdDark>
                  <span className="font-ui text-xs text-white/40 ml-3">Jump to Menu</span>
                </div>
              </div>
            </Section>

            {/* ══ TIPS ════════════════════════════════════════════════════════ */}
            <Section id="tips" label="Tips">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Keep Orders open during service',
                    body: 'The auto-refresh every 10 seconds means you always see new orders without touching the screen. Leave the tab on Orders during peak hours.',
                  },
                  {
                    title: 'Print QRs at 100mm × 100mm',
                    body: 'Download the 400×400 PNG and print at 100mm square. This gives a scan distance of ~50cm from a phone held at table height.',
                  },
                  {
                    title: 'Hide items don\'t need deleting',
                    body: 'Toggle "Available" to hide seasonal or sold-out items. The item stays in the database and can be re-enabled at any time.',
                  },
                  {
                    title: 'Use ? anywhere',
                    body: 'Press ? on any admin page (not in an input field) to jump back here instantly.',
                  },
                  {
                    title: 'Chord shortcuts are fast',
                    body: 'Press G then the letter — you have 1.2 seconds. A hint bar appears at the bottom so you don\'t need to memorise.',
                  },
                  {
                    title: 'Remaps persist per browser',
                    body: 'Custom keybinds are stored in localStorage. They persist across sessions but are per-device. Use Reset Defaults to restore the factory layout.',
                  },
                ].map(({ title, body }) => (
                  <div key={title} className="border border-white/8 bg-white/[0.02] p-5">
                    <p className="font-ui text-xs tracking-[0.2em] uppercase text-white/60 mb-3">{title}</p>
                    <p className="font-body text-white/35 text-sm leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>

              {/* Version footer */}
              <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
                <p className="font-mono text-[10px] text-white/15 tracking-widest">
                  MAZENCITO ADMIN &nbsp;·&nbsp; v1.0 &nbsp;·&nbsp; OPERATOR REFERENCE
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#009246]" />
                  <span className="font-mono text-[10px] text-white/20">LIVE</span>
                </div>
              </div>
            </Section>

          </div>
        </div>
      </div>
    </div>
  )
}
