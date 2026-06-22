import { notFound } from 'next/navigation'
import { apiFetch } from '@/lib/api'
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
  try {
    return await apiFetch(`/tables/by-uuid/${uuid}`)
  } catch {
    return null
  }
}

async function getMenu(outletSlug: string): Promise<MenuItem[]> {
  try {
    return await apiFetch(`/menu?outlet=${outletSlug}`)
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
  const table = await getTable(uuid)
  if (!table) notFound()
  const menu = await getMenu(table.outlet.slug)
  return <TableOrderClient table={table} menu={menu} />
}
