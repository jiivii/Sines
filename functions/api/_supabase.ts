import { createClient } from '@supabase/supabase-js'

/** Variables de entorno de Cloudflare Pages (Settings > Environment variables). */
export type Env = {
  SUPABASE_URL?: string
  /** Nombre nuevo (Supabase > API keys). */
  SUPABASE_SECRET_KEY?: string
  /** Nombre clásico (legacy). Se aceptan ambos. */
  SUPABASE_SERVICE_ROLE_KEY?: string
}

/** Clave de servicio, aceptando el nombre nuevo y el clásico. */
export const supabaseSecret = (env: Env): string =>
  (env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY || '').trim()

export const hasSupabaseConfig = (env: Env): boolean =>
  !!env.SUPABASE_URL && !!supabaseSecret(env)

/** Cliente con service role: solo existe en el servidor (Pages Functions), nunca en el navegador. */
export const admin = (env: Env) =>
  createClient(env.SUPABASE_URL!, supabaseSecret(env), { auth: { persistSession: false } })

export const AREAS = ['psicologia', 'logopedia', 'fisioterapia', 'nutricion']

export const HORAS = ['09:00', '10:00', '11:00', '12:00', '16:00', '17:00', '18:00', '19:00']
