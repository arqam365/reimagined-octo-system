import { NextResponse } from 'next/server'
import { adminFetch } from '@/lib/api'

export async function GET() {
  try {
    const data = await adminFetch('/tables')
    return NextResponse.json(data)
  } catch (err: unknown) {
    const e = err as { status?: number; message?: string }
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = await adminFetch('/tables', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    return NextResponse.json(data, { status: 201 })
  } catch (err: unknown) {
    const e = err as { status?: number; message?: string }
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
