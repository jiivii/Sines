import { supabase } from '../lib/supabase'
import type { AreaSlug, Estado, Reserva, ReservaInput } from '../types'

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, init)
  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(j.error || 'No hemos podido completar la solicitud.')
  return j as T
}
export const crearReserva = (data: ReservaInput) =>
  api<{ ok: true; id: string }>('/api/reservar', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  })
export const horasOcupadas = (area: AreaSlug, fecha: string) =>
  api<{ ocupadas: string[] }>(`/api/disponibilidad?area=${area}&fecha=${fecha}`).then((r) => r.ocupadas)

export async function listarReservas(): Promise<Reserva[]> {
  if (!supabase) throw new Error('Supabase no está configurado.')
  const { data, error } = await supabase.from('reservas').select('*').order('fecha').order('hora')
  if (error) throw error
  return data as Reserva[]
}
export async function cambiarEstado(id: string, estado: Estado) {
  if (!supabase) throw new Error('Supabase no está configurado.')
  const { error } = await supabase.from('reservas').update({ estado }).eq('id', id)
  if (error) throw error
}
