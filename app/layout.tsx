import React from "react"
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mazencito - Premium Italian Restaurant',
  description: 'Experience authentic Italian cuisine at Mazencito. Fine dining with traditional recipes and modern ambiance.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">{children}</body>
    </html>
  )
}
