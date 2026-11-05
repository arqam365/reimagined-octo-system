import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import SiteLoader from '@/components/site-loader'

export const metadata: Metadata = {
  title: {
    default: 'Mazencito Pizzeria — Authentic Italian in Jeddah',
    template: '%s | Mazencito Pizzeria',
  },
  description:
    'Experience authentic Italian pizza and cuisine at Mazencito Pizzeria, King Abdulaziz Branch Road, Jeddah. Open daily 1PM–1AM.',
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
  },
  openGraph: {
    title: 'Mazencito Pizzeria — Authentic Italian in Jeddah',
    description: 'Wood-fired Neapolitan pizza and Italian cuisine. King Abdulaziz Branch Road, Jeddah.',
    images: [{ url: '/logo.png' }],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <SiteLoader />
          {children}
        </Providers>
      </body>
    </html>
  )
}
