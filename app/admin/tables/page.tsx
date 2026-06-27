'use client'

import { useEffect, useState } from 'react'
import { Loader2, Plus, QrCode, RefreshCw, Trash2, X } from 'lucide-react'

interface Table {
  id: string
  number: number
  capacity: number
  status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED'
  uuid: string
}

const STATUS_CARD: Record<string, string> = {
  AVAILABLE: 'bg-green-50  border-green-200  dark:bg-[rgba(34,197,94,0.08)]   dark:border-[rgba(34,197,94,0.25)]',
  OCCUPIED:  'bg-amber-50  border-amber-200  dark:bg-[rgba(245,158,11,0.08)]  dark:border-[rgba(245,158,11,0.25)]',
  RESERVED:  'bg-blue-50   border-blue-200   dark:bg-[rgba(59,130,246,0.08)]  dark:border-[rgba(59,130,246,0.25)]',
}

const STATUS_BADGE: Record<string, string> = {
  AVAILABLE: 'bg-green-100  text-green-800  dark:bg-[rgba(34,197,94,0.15)]   dark:text-green-300',
  OCCUPIED:  'bg-amber-100  text-amber-800  dark:bg-[rgba(245,158,11,0.15)]  dark:text-amber-300',
  RESERVED:  'bg-blue-100   text-blue-800   dark:bg-[rgba(59,130,246,0.15)]  dark:text-blue-300',
}

export default function AdminTables() {
  const [tables, setTables] = useState<Table[]>([])
  const [loading, setLoading] = useState(true)
  const [working, setWorking] = useState<string | null>(null)
  const [qrModal, setQrModal] = useState<Table | null>(null)
  const [qrTimestamp, setQrTimestamp] = useState(0)
  const [regenConfirm, setRegenConfirm] = useState(false)
  const [regenInput, setRegenInput] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [addForm, setAddForm] = useState({ number: '', capacity: '4' })
  const [addError, setAddError] = useState('')
  const [adding, setAdding] = useState(false)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  async function fetchTables() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/tables')
      const data = await res.json()
      setTables(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTables() }, [])

  async function setStatus(table: Table, status: Table['status']) {
    setWorking(table.id)
    await fetch(`/api/admin/tables/${table.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    await fetchTables()
    setWorking(null)
  }

  async function downloadQR(table: Table) {
    const ts       = qrTimestamp || Date.now()
    const data     = `${appUrl}/table/${table.uuid}?t=${ts}`
    const filename = `table-${table.number}-qr.png`
    const res      = await fetch(`/api/admin/qr?data=${encodeURIComponent(data)}&filename=${encodeURIComponent(filename)}`)
    const blob     = await res.blob()
    const objUrl   = URL.createObjectURL(blob)
    const a        = document.createElement('a')
    a.href         = objUrl
    a.download     = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(objUrl)
  }

  async function regenQR(table: Table) {
    setWorking(table.id)
    setRegenConfirm(false)
    setRegenInput('')
    await fetch(`/api/admin/tables/${table.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'regen-qr' }),
    })
    await fetchTables()
    setWorking(null)
    setQrModal(null)
  }

  async function deleteTable(table: Table) {
    if (!confirm(`Remove Table ${table.number}? This cannot be undone.`)) return
    setWorking(table.id)
    await fetch(`/api/admin/tables/${table.id}`, { method: 'DELETE' })
    await fetchTables()
    setWorking(null)
  }

  async function addTable(e: React.FormEvent) {
    e.preventDefault()
    setAdding(true)
    setAddError('')
    const num = parseInt(addForm.number)
    const cap = parseInt(addForm.capacity)
    if (!num || num < 1) { setAddError('Enter a valid table number.'); setAdding(false); return }
    if (tables.some((t) => t.number === num)) { setAddError(`Table ${num} already exists.`); setAdding(false); return }
    try {
      const res = await fetch('/api/admin/tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: num, capacity: cap }),
      })
      if (!res.ok) {
        const err = await res.json()
        setAddError(err.error ?? 'Failed to add table')
        return
      }
      setAddForm({ number: '', capacity: '4' })
      setShowAdd(false)
      await fetchTables()
    } catch {
      setAddError('Failed to add table')
    } finally {
      setAdding(false)
    }
  }

  const inputCls = 'w-full px-4 py-3 border border-[var(--adm-border-md)] bg-[var(--adm-input)] text-[var(--adm-text)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#CC2229]/20'

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-[var(--adm-text-dim)] mb-2">Floor Plan</p>
          <h1 className="elegant-text text-4xl font-bold text-[var(--adm-text)]">Tables</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchTables} className="flex items-center gap-2 font-ui text-xs tracking-[0.3em] uppercase text-[var(--adm-text-dim)] hover:text-[var(--adm-text)] transition-colors px-3 py-2.5">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 font-ui text-xs tracking-[0.3em] uppercase bg-[#CC2229] text-white px-5 py-2.5 hover:bg-[#B01E24] transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Add Table
          </button>
        </div>
      </div>

      {loading && tables.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-[var(--adm-text-dim)]" />
        </div>
      ) : tables.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-body text-[var(--adm-text-dim)] mb-4">No tables yet.</p>
          <button onClick={() => setShowAdd(true)} className="font-ui text-xs tracking-[0.3em] uppercase bg-[#0A0806] dark:bg-white text-white dark:text-[#0A0806] px-6 py-3 transition-colors">
            Add Your First Table
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {tables.map((table) => (
            <div key={table.id} className={`border p-4 ${STATUS_CARD[table.status] ?? 'bg-[var(--adm-card)] border-[var(--adm-border)]'}`}>
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="font-ui font-semibold text-xl text-[var(--adm-text)]">T{table.number}</p>
                  <p className="font-ui text-xs text-[var(--adm-text-dim)]">{table.capacity} seats</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setQrModal(table); setQrTimestamp(Date.now()) }} className="p-1.5 hover:bg-[var(--adm-hover)] transition-colors" title="QR Code">
                    <QrCode className="w-3.5 h-3.5 text-[var(--adm-text-dim)]" />
                  </button>
                  <button onClick={() => deleteTable(table)} className="p-1.5 hover:bg-red-50 dark:hover:bg-[rgba(239,68,68,0.08)] transition-colors" title="Remove">
                    <Trash2 className="w-3.5 h-3.5 text-[var(--adm-text-faint)] hover:text-red-500" />
                  </button>
                </div>
              </div>

              <span className={`inline-block font-ui text-[10px] tracking-[0.2em] uppercase px-2 py-1 mb-3 ${STATUS_BADGE[table.status]}`}>
                {table.status}
              </span>

              <div className="space-y-1.5">
                {working === table.id ? (
                  <div className="flex justify-center py-1">
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--adm-text-dim)]" />
                  </div>
                ) : (
                  (['AVAILABLE', 'OCCUPIED', 'RESERVED'] as const)
                    .filter((s) => s !== table.status)
                    .map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(table, s)}
                        className="w-full font-ui text-[10px] tracking-[0.15em] uppercase px-2 py-1.5 border border-[var(--adm-border)] text-[var(--adm-text-sub)] hover:bg-[var(--adm-hover)] transition-colors"
                      >
                        → {s.toLowerCase()}
                      </button>
                    ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add Table Modal ── */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-6" onClick={() => { setShowAdd(false); setAddError('') }}>
          <div className="bg-[var(--adm-modal)] border border-[var(--adm-border)] p-8 max-w-xs w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="elegant-text text-2xl font-bold text-[var(--adm-text)]">Add Table</h2>
              <button onClick={() => { setShowAdd(false); setAddError('') }} className="p-1.5 text-[var(--adm-text-dim)]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={addTable} className="space-y-4">
              <div>
                <label className="block font-ui text-[10px] tracking-[0.3em] uppercase text-[var(--adm-text-sub)] mb-1.5">Table Number *</label>
                <input type="number" min="1" value={addForm.number} onChange={(e) => setAddForm((p) => ({ ...p, number: e.target.value }))} required placeholder="e.g. 13" autoFocus className={inputCls} />
              </div>
              <div>
                <label className="block font-ui text-[10px] tracking-[0.3em] uppercase text-[var(--adm-text-sub)] mb-1.5">Capacity (seats) *</label>
                <input type="number" min="1" max="20" value={addForm.capacity} onChange={(e) => setAddForm((p) => ({ ...p, capacity: e.target.value }))} required className={inputCls} />
              </div>
              {addError && <p className="font-ui text-xs text-[#CC2229]">{addError}</p>}
              <button type="submit" disabled={adding} className="w-full flex items-center justify-center gap-2 bg-[#CC2229] text-white font-ui text-xs tracking-[0.3em] uppercase px-6 py-4 hover:bg-[#B01E24] transition-colors disabled:opacity-50 min-h-[52px]">
                {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add Table'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── QR Modal ── */}
      {qrModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-6" onClick={() => { setQrModal(null); setRegenConfirm(false); setRegenInput('') }}>
          <div className="bg-[var(--adm-modal)] border border-[var(--adm-border)] p-8 max-w-xs w-full text-center relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { setQrModal(null); setRegenConfirm(false); setRegenInput('') }} className="absolute top-4 right-4 p-1.5 text-[var(--adm-text-dim)] hover:text-[var(--adm-text)] transition-colors">
              <X className="w-4 h-4" />
            </button>

            {!regenConfirm ? (
              <>
                <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-[var(--adm-text-dim)] mb-2">Table {qrModal.number}</p>
                <h2 className="elegant-text text-2xl font-bold text-[var(--adm-text)] mb-6">QR Code</h2>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${appUrl}/table/${qrModal.uuid}?t=${qrTimestamp}`)}`} alt={`QR for Table ${qrModal.number}`} className="mx-auto mb-4" width={200} height={200} />
                <p className="font-ui text-[10px] text-[var(--adm-text-faint)] tracking-wide mb-6 break-all">{appUrl}/table/{qrModal.uuid}</p>
                <div className="flex gap-2">
                  <button onClick={() => downloadQR(qrModal)} className="flex-1 font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-2.5 bg-[#0A0806] dark:bg-white text-white dark:text-[#0A0806] hover:opacity-85 transition-opacity text-center">
                    Download
                  </button>
                  <button onClick={() => setRegenConfirm(true)} className="flex-1 font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-2.5 border border-[var(--adm-border)] text-[var(--adm-text-sub)] hover:border-red-300 hover:text-red-500 transition-colors">
                    Regenerate
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 bg-red-100 dark:bg-[rgba(239,68,68,0.15)] flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-500 text-lg font-bold">!</span>
                </div>
                <h2 className="elegant-text text-xl font-bold text-[var(--adm-text)] mb-2">Are you sure?</h2>
                <p className="font-body text-sm text-[var(--adm-text-sub)] mb-1">Regenerating will <strong>permanently invalidate</strong> the QR sticker on Table {qrModal.number}.</p>
                <p className="font-body text-sm text-[var(--adm-text-sub)] mb-5">The printed QR will stop working and must be reprinted.</p>
                <p className="font-ui text-[10px] tracking-[0.3em] uppercase text-[var(--adm-text-dim)] mb-2">Type REGENERATE to confirm</p>
                <input type="text" value={regenInput} onChange={(e) => setRegenInput(e.target.value)} placeholder="REGENERATE" autoFocus className="w-full px-4 py-3 border border-[var(--adm-border-md)] bg-[var(--adm-input)] text-[var(--adm-text)] font-ui text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-red-300 mb-4" />
                <div className="flex gap-2">
                  <button onClick={() => { setRegenConfirm(false); setRegenInput('') }} className="flex-1 font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-2.5 border border-[var(--adm-border)] text-[var(--adm-text-sub)] hover:bg-[var(--adm-hover)] transition-colors">Cancel</button>
                  <button onClick={() => regenQR(qrModal)} disabled={regenInput !== 'REGENERATE' || working === qrModal.id} className="flex-1 font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-2.5 bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1.5">
                    {working === qrModal.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Confirm'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
