'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      })
      if (!res.ok) {
        setError('Invalid PIN')
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0806] flex items-center justify-center px-6">
      <div className="w-full max-w-xs">
        <p className="font-ui text-[10px] tracking-[0.5em] uppercase text-white/20 mb-8 text-center">
          Mazencito Admin
        </p>
        <h1 className="elegant-text text-5xl font-bold text-white text-center mb-12">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            autoFocus
            className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white placeholder-white/25 font-body text-base focus:outline-none focus:ring-2 focus:ring-[#CC2229]/40 focus:border-[#CC2229]/40 text-center tracking-[0.3em]"
          />
          {error && (
            <p className="font-ui text-xs text-[#CC2229] text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !pin}
            className="w-full flex items-center justify-center gap-2 bg-[#CC2229] text-white font-ui text-xs tracking-[0.3em] uppercase px-6 py-4 hover:bg-[#B01E24] transition-colors disabled:opacity-50 min-h-[52px]"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}
