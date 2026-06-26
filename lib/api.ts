const BASE = process.env.API_URL!
const KEY  = process.env.API_KEY!

export async function apiFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    cache: 'no-store',
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw Object.assign(new Error(err.error ?? res.statusText), { status: res.status })
  }
  return res.json()
}

export function adminFetch(path: string, init?: RequestInit) {
  return apiFetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': KEY,
      ...(init?.headers ?? {}),
    },
  })
}

// ── Types ──────────────────────────────────────────────────────────────────

export type OrderStatus = 'RECEIVED' | 'PREPARING' | 'READY' | 'SERVED'

export interface Outlet {
  id: string
  slug: string
  name: string
}

export interface Table {
  id: string
  uuid: string
  number: number
  outlet: Outlet
}

export interface MenuItem {
  id: string
  nameEn: string
  nameAr: string
  descEn?: string
  descAr?: string
  price: number
  category: string
  available: boolean
  imageUrl?: string
}

export interface Order {
  id: string
  status: OrderStatus
  tableId: string
  table?: Table
  items: Array<{ id: string; menuItem: MenuItem; quantity: number; notes?: string }>
  total: number
  createdAt: string
  updatedAt: string
}

// ── API helpers ────────────────────────────────────────────────────────────

export const tablesApi = {
  byUuid: (uuid: string): Promise<Table> => apiFetch(`/tables/uuid/${uuid}`),
}

export const menuApi = {
  list: (outletSlug: string): Promise<MenuItem[]> => apiFetch(`/menu?outlet=${outletSlug}`),
}

export const ordersApi = {
  get:       (id: string): Promise<Order>         => apiFetch(`/orders/${id}`),
  list:      (): Promise<Order[]>                  => adminFetch('/orders'),
  create:    (body: unknown): Promise<Order>       => apiFetch('/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
  setStatus: (id: string, status: OrderStatus): Promise<Order> => adminFetch(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
}

export const reservationsApi = {
  create: (body: unknown): Promise<{ id: string }> => apiFetch('/reservations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
}
