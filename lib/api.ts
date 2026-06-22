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
