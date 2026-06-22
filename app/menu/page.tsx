import { apiFetch } from '@/lib/api'
import MenuClient from './client'

interface MenuItem {
  id: string
  nameEn: string
  description: string
  price: number
  category: string
  special: boolean
}

async function getMenu(): Promise<MenuItem[]> {
  try {
    return await apiFetch(`/menu?outlet=${process.env.OUTLET_SLUG}`)
  } catch {
    return []
  }
}

export default async function MenuPage() {
  const items = await getMenu()
  return <MenuClient items={items} />
}
