import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    const pin = request.cookies.get('mz-admin')?.value
    const authed = pin === process.env.ADMIN_PIN

    if (!authed && pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const res = NextResponse.next()
    res.headers.set('x-pathname', pathname)
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
