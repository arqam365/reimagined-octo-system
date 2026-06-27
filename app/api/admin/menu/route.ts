import { NextResponse } from 'next/server'
import { adminFetch } from '@/lib/api'

export async function GET() {
  try {
    const slug = process.env.OUTLET_SLUG ?? process.env.NEXT_PUBLIC_OUTLET_SLUG ?? 'mazencito-jeddah'
    const data = await adminFetch(`/menu?outlet=${slug}`)
    return NextResponse.json(data)
  } catch (err: unknown) {
    const e = err as { status?: number; message?: string }
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = await adminFetch('/menu', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    return NextResponse.json(data, { status: 201 })
  } catch (err: unknown) {
    const e = err as { status?: number; message?: string }
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
