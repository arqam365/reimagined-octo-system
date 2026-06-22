import { NextResponse } from 'next/server'
import { adminFetch } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date   = searchParams.get('date')
  const status = searchParams.get('status')
  const params = new URLSearchParams()
  if (date)   params.set('date', date)
  if (status) params.set('status', status)
  const qs = params.toString() ? `?${params}` : ''
  try {
    const data = await adminFetch(`/reservations${qs}`)
    return NextResponse.json(data)
  } catch (err: unknown) {
    const e = err as { status?: number; message?: string }
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
