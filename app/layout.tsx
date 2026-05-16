import React from 'react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Mazencito Pizzeria — Authentic Italian in Jeddah',
    template: '%s | Mazencito Pizzeria',
  },
  description:
    'Experience authentic Italian pizza and cuisine at Mazencito Pizzeria, located on King Abdulaziz Branch Road, Jeddah. Open daily 1PM–1AM.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
