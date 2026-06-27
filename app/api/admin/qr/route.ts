import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const data     = searchParams.get('data')
  const filename = searchParams.get('filename') ?? 'qr.png'

  if (!data) return NextResponse.json({ error: 'Missing data param' }, { status: 400 })

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&format=png&data=${encodeURIComponent(data)}`
  const res   = await fetch(qrUrl)
  if (!res.ok) return NextResponse.json({ error: 'QR generation failed' }, { status: 502 })

  const buf = await res.arrayBuffer()
  return new NextResponse(buf, {
    headers: {
      'Content-Type':        'image/png',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control':       'no-store',
    },
  })
}
