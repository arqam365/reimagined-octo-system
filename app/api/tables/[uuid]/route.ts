import { NextResponse } from 'next/server'
import { apiFetch } from '@/lib/api'

export async function GET(_req: Request, { params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params
  try {
    const data = await apiFetch(`/tables/by-uuid/${uuid}`)
    return NextResponse.json(data)
  } catch (err: unknown) {
    const e = err as { status?: number; message?: string }
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
