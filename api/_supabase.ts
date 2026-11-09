import { createClient } from '@supabase/supabase-js'

/** Clave de servicio, aceptando el nombre nuevo y el clásico. */
export const supabaseSecret = (): string =>
  (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim()

export const hasSupabaseConfig = (): boolean =>
  !!process.env.SUPABASE_URL && !!supabaseSecret()

/** Cliente con service role: solo existe en el servidor (Vercel), nunca en el navegador. */
export const admin = () =>
  createClient(process.env.SUPABASE_URL!, supabaseSecret(), { auth: { persistSession: false } })

export const AREAS = ['psicologia', 'logopedia', 'fisioterapia', 'nutricion']
export const HORAS = ['09:00', '10:00', '11:00', '12:00', '16:00', '17:00', '18:00', '19:00']
