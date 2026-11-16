import type { AreaSlug, ReservaInput } from '../types'

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, init)
  // Solo aceptamos JSON: si la respuesta no lo es (p. ej. la web estática sin
  // functions detrás), lanzamos en lugar de resolver con datos vacíos.
  const j = r.headers.get('content-type')?.includes('application/json')
    ? await r.json().catch(() => null)
    : null
  if (!r.ok || !j) throw new Error((j as { error?: string } | null)?.error || 'No hemos podido completar la solicitud.')
  return j as T
}
export const crearReserva = async (data: ReservaInput) => {
  const j = await api<{ ok?: boolean; id?: string; error?: string }>('/api/reservar', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  })
  // Exigimos la confirmación explícita del servidor: nunca dar por buena una reserva sin ella.
  if (j.ok !== true) throw new Error(j.error || 'No hemos podido completar la solicitud.')
  return { ok: true as const, id: j.id }
}
export const horasOcupadas = async (area: AreaSlug, fecha: string) => {
  const j = await api<{ ocupadas?: unknown }>(`/api/disponibilidad?area=${area}&fecha=${fecha}`)
  return Array.isArray(j.ocupadas) ? (j.ocupadas as string[]) : []
}

