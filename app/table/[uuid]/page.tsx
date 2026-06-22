import { notFound } from 'next/navigation'
import TableOrderClient from './client'

interface Table {
  id: string
  number: number
  capacity: number
  uuid: string
  outlet: { id: string; name: string; slug: string; currency: string }
}

interface MenuItem {
  id: string
  nameEn: string
  nameAr: string
  description: string
  price: number
  category: string
  available: boolean
}

async function getTable(uuid: string): Promise<Table | null> {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  try {
    const res = await fetch(`${base}/api/tables/${uuid}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function getMenu(): Promise<MenuItem[]> {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  try {
    const res = await fetch(`${base}/api/menu`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function TablePage({
  params,
}: {
  params: Promise<{ uuid: string }>
}) {
  const { uuid } = await params
  const [table, menu] = await Promise.all([getTable(uuid), getMenu()])
  if (!table) notFound()
  return <TableOrderClient table={table} menu={menu} />
}
