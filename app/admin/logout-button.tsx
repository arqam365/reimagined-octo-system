'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const router = useRouter()
  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }
  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 font-ui text-xs tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  )
}
