const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export interface ServerEvent {
  type: string
  data: unknown
  ts:   number
}

export function pollEvents(since: number, callback: (ev: ServerEvent) => void): () => void {
  let lastTs = since
  let stopped = false

  const poll = async () => {
    if (stopped) return
    try {
      const res = await fetch(`${API}/events?since=${lastTs}`)
      if (res.ok) {
        const events: ServerEvent[] = await res.json()
        for (const ev of events) {
          if (ev.ts > lastTs) lastTs = ev.ts
          callback(ev)
        }
      }
    } catch { /* network error — retry next tick */ }
    if (!stopped) setTimeout(poll, 4000)
  }

  setTimeout(poll, 4000)
  return () => { stopped = true }
}
