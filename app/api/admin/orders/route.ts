import { NextResponse } from 'next/server'
import { adminFetch } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const qs = status ? `?status=${status}` : ''
  try {
    const data = await adminFetch(`/orders${qs}`)
    return NextResponse.json(data)
  } catch (err: unknown) {
    const e = err as { status?: number; message?: string }
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
