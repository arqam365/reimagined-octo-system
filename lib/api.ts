const BASE = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'
const KEY  = process.env.API_KEY ?? process.env.NEXT_PUBLIC_API_KEY ?? ''

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
