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

const STATUS_STYLES: Record<string, string> = {
  AVAILABLE: 'bg-green-50 border-green-200',
  OCCUPIED:  'bg-amber-50 border-amber-200',
  RESERVED:  'bg-blue-50 border-blue-200',
}
const BADGE_STYLES: Record<string, string> = {
  AVAILABLE: 'bg-green-100 text-green-800',
  OCCUPIED:  'bg-amber-100 text-amber-800',
  RESERVED:  'bg-blue-100 text-blue-800',
}

export default function AdminTables() {
  const [tables, setTables] = useState<Table[]>([])
  const [loading, setLoading] = useState(true)
  const [working, setWorking] = useState<string | null>(null)
  const [qrModal, setQrModal] = useState<Table | null>(null)
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
    if (!confirm(`Remove Table ${table.number} from the system? This cannot be undone.`)) return
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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-[#0A0806]/40 mb-2">Floor Plan</p>
          <h1 className="elegant-text text-4xl font-bold text-[#0A0806]">Tables</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchTables}
            className="flex items-center gap-2 font-ui text-xs tracking-[0.3em] uppercase text-[#0A0806]/40 hover:text-[#0A0806] transition-colors px-3 py-2.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 font-ui text-xs tracking-[0.3em] uppercase bg-[#CC2229] text-white px-5 py-2.5 hover:bg-[#B01E24] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Table
          </button>
        </div>
      </div>

      {loading && tables.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-[#0A0806]/30" />
        </div>
      ) : tables.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-body text-[#0A0806]/40 mb-4">No tables yet.</p>
          <button
            onClick={() => setShowAdd(true)}
            className="font-ui text-xs tracking-[0.3em] uppercase bg-[#0A0806] text-white px-6 py-3 hover:bg-[#1a1410] transition-colors"
          >
            Add Your First Table
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`border p-4 ${STATUS_STYLES[table.status] ?? 'bg-white border-[#0A0806]/8'}`}
            >
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="font-ui font-semibold text-xl text-[#0A0806]">T{table.number}</p>
                  <p className="font-ui text-xs text-[#0A0806]/40">{table.capacity} seats</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setQrModal(table)}
                    className="p-1.5 hover:bg-black/5 transition-colors rounded"
                    title="QR Code"
                  >
                    <QrCode className="w-3.5 h-3.5 text-[#0A0806]/40" />
                  </button>
                  <button
                    onClick={() => deleteTable(table)}
                    className="p-1.5 hover:bg-red-50 transition-colors rounded"
                    title="Remove table"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-[#0A0806]/25 hover:text-red-500" />
                  </button>
                </div>
              </div>

              <span className={`inline-block font-ui text-[10px] tracking-[0.2em] uppercase px-2 py-1 mb-3 ${BADGE_STYLES[table.status]}`}>
                {table.status}
              </span>

              <div className="space-y-1.5">
                {working === table.id ? (
                  <div className="flex justify-center py-1">
                    <Loader2 className="w-4 h-4 animate-spin text-[#0A0806]/30" />
                  </div>
                ) : (
                  (['AVAILABLE', 'OCCUPIED', 'RESERVED'] as const)
                    .filter((s) => s !== table.status)
                    .map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(table, s)}
                        className="w-full font-ui text-[10px] tracking-[0.15em] uppercase px-2 py-1.5 border border-[#0A0806]/15 text-[#0A0806]/60 hover:bg-[#0A0806]/5 transition-colors"
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

      {/* Add Table Modal */}
      {showAdd && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-6"
          onClick={() => { setShowAdd(false); setAddError('') }}
        >
          <div
            className="bg-white p-8 max-w-xs w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="elegant-text text-2xl font-bold text-[#0A0806]">Add Table</h2>
              <button onClick={() => { setShowAdd(false); setAddError('') }} className="p-1.5 text-[#0A0806]/40">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={addTable} className="space-y-4">
              <div>
                <label className="block font-ui text-[10px] tracking-[0.3em] uppercase text-[#0A0806]/60 mb-1.5">
                  Table Number *
                </label>
                <input
                  type="number"
                  min="1"
                  value={addForm.number}
                  onChange={(e) => setAddForm((p) => ({ ...p, number: e.target.value }))}
                  required
                  placeholder="e.g. 13"
                  autoFocus
                  className="w-full px-4 py-3 border border-[#0A0806]/12 bg-white text-[#0A0806] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#CC2229]/20"
                />
              </div>
              <div>
                <label className="block font-ui text-[10px] tracking-[0.3em] uppercase text-[#0A0806]/60 mb-1.5">
                  Capacity (seats) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={addForm.capacity}
                  onChange={(e) => setAddForm((p) => ({ ...p, capacity: e.target.value }))}
                  required
                  className="w-full px-4 py-3 border border-[#0A0806]/12 bg-white text-[#0A0806] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#CC2229]/20"
                />
              </div>
              {addError && <p className="font-ui text-xs text-[#CC2229]">{addError}</p>}
              <button
                type="submit"
                disabled={adding}
                className="w-full flex items-center justify-center gap-2 bg-[#CC2229] text-white font-ui text-xs tracking-[0.3em] uppercase px-6 py-4 hover:bg-[#B01E24] transition-colors disabled:opacity-50 min-h-[52px]"
              >
                {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add Table'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {qrModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-6"
          onClick={() => { setQrModal(null); setRegenConfirm(false); setRegenInput('') }}
        >
          <div
            className="bg-white p-8 max-w-xs w-full text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setQrModal(null); setRegenConfirm(false); setRegenInput('') }}
              className="absolute top-4 right-4 p-1.5 text-[#0A0806]/30 hover:text-[#0A0806] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            {!regenConfirm ? (
              <>
                <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-[#0A0806]/40 mb-2">
                  Table {qrModal.number}
                </p>
                <h2 className="elegant-text text-2xl font-bold text-[#0A0806] mb-6">QR Code</h2>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${appUrl}/table/${qrModal.uuid}`)}`}
                  alt={`QR for Table ${qrModal.number}`}
                  className="mx-auto mb-4"
                  width={200}
                  height={200}
                />
                <p className="font-ui text-[10px] text-[#0A0806]/35 tracking-wide mb-6 break-all">
                  {appUrl}/table/{qrModal.uuid}
                </p>
                <div className="flex gap-2">
                  <a
                    href={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(`${appUrl}/table/${qrModal.uuid}`)}&format=png`}
                    download={`table-${qrModal.number}-qr.png`}
                    className="flex-1 font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-2.5 bg-[#0A0806] text-white hover:bg-[#1a1410] transition-colors text-center"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => setRegenConfirm(true)}
                    className="flex-1 font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-2.5 border border-[#0A0806]/15 text-[#0A0806]/40 hover:border-red-300 hover:text-red-500 transition-colors"
                  >
                    Regenerate
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-500 text-lg font-bold">!</span>
                </div>
                <h2 className="elegant-text text-xl font-bold text-[#0A0806] mb-2">Are you sure?</h2>
                <p className="font-body text-sm text-[#0A0806]/60 mb-1">
                  Regenerating will <strong>permanently invalidate</strong> the QR sticker on Table {qrModal.number}.
                </p>
                <p className="font-body text-sm text-[#0A0806]/60 mb-5">
                  The printed QR will stop working and must be reprinted.
                </p>
                <p className="font-ui text-[10px] tracking-[0.3em] uppercase text-[#0A0806]/50 mb-2">
                  Type REGENERATE to confirm
                </p>
                <input
                  type="text"
                  value={regenInput}
                  onChange={(e) => setRegenInput(e.target.value)}
                  placeholder="REGENERATE"
                  autoFocus
                  className="w-full px-4 py-3 border border-[#0A0806]/12 text-[#0A0806] font-ui text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-red-300 mb-4"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { setRegenConfirm(false); setRegenInput('') }}
                    className="flex-1 font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-2.5 border border-[#0A0806]/15 text-[#0A0806]/50 hover:bg-[#0A0806]/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => regenQR(qrModal)}
                    disabled={regenInput !== 'REGENERATE' || working === qrModal.id}
                    className="flex-1 font-ui text-[10px] tracking-[0.2em] uppercase px-3 py-2.5 bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
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
