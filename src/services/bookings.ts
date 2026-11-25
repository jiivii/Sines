/**
 * Reservas: la web consulta y guarda directamente en Órbita (función
 * `web-booking` de Supabase). Órbita es la única que decide qué huecos hay:
 * fecha de inicio, horario, duración de cada sesión y citas ya ocupadas.
 */
import { RESERVAS_API } from '../config'
import type { AreaSlug, ReservaInput } from '../types'

export interface ServicioWeb { id: string; area: AreaSlug; name: string; duration: number; price: number; description: string | null }
export interface Hueco { time: string; free: boolean }
export interface DiaHuecos { date: string; slots: Hueco[] }
export interface Catalogo { enabled: boolean; firstDay: string; lastDay: string; services: ServicioWeb[] }
export interface Disponibilidad { enabled: boolean; firstDay: string; lastDay: string; from: string; to: string; more: boolean; days: DiaHuecos[] }

export class ReservaError extends Error {
  constructor(message: string, public code?: string) { super(message) }
}

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  let r: Response
  try {
    r = await fetch(url, { ...init, cache: 'no-store' })
  } catch {
    throw new ReservaError('No hemos podido conectar con el sistema de reservas. Revisa tu conexión o llámanos.', 'red')
  }
  // Solo aceptamos JSON: si la respuesta no lo es, lanzamos en lugar de resolver con datos vacíos.
  const j = r.headers.get('content-type')?.includes('application/json') ? await r.json().catch(() => null) : null
  if (!r.ok || !j) {
    const e = j as { error?: string; code?: string } | null
    throw new ReservaError(e?.error || 'No hemos podido completar la solicitud.', e?.code)
  }
  return j as T
}

export const getCatalogo = () => api<Catalogo>(`${RESERVAS_API}?servicios=1`)

export const getDisponibilidad = (servicio: string, desde?: string) =>
  api<Disponibilidad>(`${RESERVAS_API}?servicio=${encodeURIComponent(servicio)}${desde ? `&desde=${desde}` : ''}`)

export const crearReserva = async (data: ReservaInput) => {
  const j = await api<{ ok?: boolean; id?: string; error?: string }>(RESERVAS_API, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  })
  // Exigimos la confirmación explícita del servidor: nunca dar por buena una reserva sin ella.
  if (j.ok !== true) throw new ReservaError(j.error || 'No hemos podido completar la solicitud.')
  return { ok: true as const, id: j.id }
}
