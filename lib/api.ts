const BASE = process.env.API_URL!
const KEY  = process.env.API_KEY!

export async function apiFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    cache: 'no-store',
  })
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    let msg = text
    try { msg = (JSON.parse(text) as { error?: string }).error ?? text } catch { /* text wasn't JSON */ }
    throw Object.assign(new Error(msg || `HTTP ${res.status}`), { status: res.status })
  }
  const body = await res.text()
  try {
    return JSON.parse(body)
  } catch {
    throw new Error(`Server returned invalid response: ${body.slice(0, 120)}`)
  }
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
  byUuid: (uuid: string): Promise<Table> => apiFetch(`/tables/by-uuid/${uuid}`),
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
