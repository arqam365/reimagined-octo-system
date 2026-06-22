import { NextResponse } from 'next/server'
import { adminFetch } from '@/lib/api'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  try {
    const body = await request.json()
    const { action, ...rest } = body
    if (action === 'regen-qr') {
      const data = await adminFetch(`/tables/${id}/regen-qr`, { method: 'POST' })
      return NextResponse.json(data)
    }
    const data = await adminFetch(`/tables/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(rest),
    })
    return NextResponse.json(data)
  } catch (err: unknown) {
    const e = err as { status?: number; message?: string }
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  try {
    const data = await adminFetch(`/tables/${id}`, { method: 'DELETE' })
    return NextResponse.json(data)
  } catch (err: unknown) {
    const e = err as { status?: number; message?: string }
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
