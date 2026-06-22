import { NextResponse } from 'next/server'
import { apiFetch } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const slug = process.env.OUTLET_SLUG!
  const qs = category ? `?outlet=${slug}&category=${category}` : `?outlet=${slug}`
  try {
    const data = await apiFetch(`/menu${qs}`)
    return NextResponse.json(data)
  } catch (err: unknown) {
    const e = err as { status?: number; message?: string }
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
