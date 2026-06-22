'use client'

import { useEffect, useState, useCallback } from 'react'
import { Loader2 } from 'lucide-react'

interface Reservation {
  id: string
  refNum: string
  name: string
  phone: string
  email?: string
  date: string
  time: string
  party: number
  type: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'NO_SHOW'
  notes?: string
  table?: { number: number } | null
}

const STATUS_BADGE: Record<string, string> = {
  PENDING:   'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
  CONFIRMED: 'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-300',
  CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
  NO_SHOW:   'bg-[#0A0806]/8 text-[#0A0806]/50 dark:bg-white/5 dark:text-white/30',
}

function toDateInput(d: Date) {
  return d.toISOString().split('T')[0]
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [date, setDate] = useState(() => toDateInput(new Date()))
  const [loading, setLoading] = useState(true)
  const [working, setWorking] = useState<string | null>(null)

  const fetchReservations = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/reservations?date=${date}`)
      const data = await res.json()
      setReservations(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }, [date])

  useEffect(() => { fetchReservations() }, [fetchReservations])

  async function updateStatus(id: string, status: string) {
    setWorking(id)
    await fetch(`/api/admin/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    await fetchReservations()
    setWorking(null)
  }

  return (
    <div>
      <div className="mb-8">
        <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-[#0A0806]/40 dark:text-white/25 mb-2">
          Bookings
        </p>
        <h1 className="elegant-text text-4xl font-bold text-[#0A0806] dark:text-white/88">Reservations</h1>
      </div>

      {/* Date picker */}
      <div className="flex items-center gap-4 mb-8">
        <label className="font-ui text-xs tracking-[0.3em] uppercase text-[#0A0806]/50 dark:text-white/35">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2.5 border border-[#0A0806]/12 dark:border-white/10 bg-white dark:bg-white/6 text-[#0A0806] dark:text-white/85 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#CC2229]/20"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-[#0A0806]/30 dark:text-white/20" />
        </div>
      ) : reservations.length === 0 ? (
        <p className="font-body text-[#0A0806]/40 dark:text-white/30 py-8">No reservations for this date.</p>
      ) : (
        <div className="border border-[#0A0806]/8 dark:border-white/8 divide-y divide-[#0A0806]/8 dark:divide-white/5">
          {reservations.map((res) => (
            <div key={res.id} className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-ui font-semibold text-[#0A0806] dark:text-white/80">{res.name}</p>
                  <span className={`font-ui text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 ${STATUS_BADGE[res.status]}`}>
                    {res.status}
                  </span>
                </div>
                <p className="font-ui text-xs text-[#0A0806]/50 dark:text-white/35">
                  {res.refNum} &middot; {res.time} &middot; {res.party} guests &middot; {res.phone}
                </p>
                {res.notes && (
                  <p className="font-body text-xs text-[#0A0806]/40 dark:text-white/28 mt-1 italic">{res.notes}</p>
                )}
              </div>

              {res.status === 'PENDING' && (
                <div className="flex gap-2 flex-shrink-0">
                  {working === res.id ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#0A0806]/30 dark:text-white/25" />
                  ) : (
                    <>
                      <button
                        onClick={() => updateStatus(res.id, 'CONFIRMED')}
                        className="font-ui text-[10px] tracking-[0.2em] uppercase px-4 py-2 bg-[#0A0806] dark:bg-white text-white dark:text-[#0A0806] hover:bg-[#1a1410] dark:hover:bg-white/85 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(res.id, 'CANCELLED')}
                        className="font-ui text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-red-300 dark:border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              )}

              {res.status === 'CONFIRMED' && (
                <button
                  onClick={() => updateStatus(res.id, 'NO_SHOW')}
                  disabled={working === res.id}
                  className="font-ui text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-[#0A0806]/15 dark:border-white/10 text-[#0A0806]/50 dark:text-white/35 hover:bg-[#0A0806]/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50 flex-shrink-0 flex items-center gap-1.5"
                >
                  {working === res.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'No Show'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
