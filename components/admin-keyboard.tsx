'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export const DEFAULT_SHORTCUTS: Record<string, { path: string; label: string }> = {
  'g,d': { path: '/admin',              label: 'Dashboard'    },
  'g,o': { path: '/admin/orders',       label: 'Orders'       },
  'g,t': { path: '/admin/tables',       label: 'Tables'       },
  'g,r': { path: '/admin/reservations', label: 'Reservations' },
  'g,m': { path: '/admin/menu',         label: 'Menu'         },
  '?':   { path: '/admin/docs',         label: 'Help'         },
}

export function getShortcuts(): Record<string, { path: string; label: string }> {
  if (typeof window === 'undefined') return DEFAULT_SHORTCUTS
  try {
    const stored = localStorage.getItem('mz-shortcuts')
    if (stored) return { ...DEFAULT_SHORTCUTS, ...JSON.parse(stored) }
  } catch { /* ignore */ }
  return DEFAULT_SHORTCUTS
}

export default function AdminKeyboard() {
  const router = useRouter()
  const [chordActive, setChordActive] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const chordRef = useRef<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const toastRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const key = e.key.toLowerCase()
      const shortcuts = getShortcuts()

      if (chordRef.current) {
        const combo = `${chordRef.current},${key}`
        if (shortcuts[combo]) {
          e.preventDefault()
          showToast(shortcuts[combo].label)
          router.push(shortcuts[combo].path)
        }
        chordRef.current = null
        setChordActive(false)
        if (timerRef.current) clearTimeout(timerRef.current)
        return
      }

      if (shortcuts[key]) {
        e.preventDefault()
        showToast(shortcuts[key].label)
        router.push(shortcuts[key].path)
        return
      }

      if (key === 'g') {
        e.preventDefault()
        chordRef.current = 'g'
        setChordActive(true)
        timerRef.current = setTimeout(() => {
          chordRef.current = null
          setChordActive(false)
        }, 1200)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [router])

  function showToast(label: string) {
    setToast(label)
    if (toastRef.current) clearTimeout(toastRef.current)
    toastRef.current = setTimeout(() => setToast(null), 1400)
  }

  return (
    <>
      {/* Chord hint */}
      {chordActive && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
          <div className="bg-[#0A0806] border border-white/20 px-5 py-3 flex items-center gap-4 shadow-2xl">
            <kbd className="font-mono text-xs bg-white/15 text-white px-2 py-1 border border-white/25">G</kbd>
            <span className="font-ui text-[10px] tracking-[0.4em] uppercase text-white/40 mx-1">then</span>
            {[
              ['D', 'Dashboard'],
              ['O', 'Orders'],
              ['T', 'Tables'],
              ['R', 'Reservations'],
              ['M', 'Menu'],
            ].map(([k, l]) => (
              <span key={k} className="flex items-center gap-1.5">
                <kbd className="font-mono text-xs bg-white/10 text-white/70 px-1.5 py-1 border border-white/20">{k}</kbd>
                <span className="font-ui text-[9px] text-white/30 tracking-wide hidden sm:inline">{l}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Navigation toast */}
      {toast && (
        <div className="fixed top-20 right-6 z-[100] pointer-events-none">
          <div className="bg-[#CC2229] text-white px-4 py-2.5 flex items-center gap-2 shadow-xl">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
            <span className="font-ui text-[10px] tracking-[0.35em] uppercase">{toast}</span>
          </div>
        </div>
      )}
    </>
  )
}
