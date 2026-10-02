import { createClient } from '@supabase/supabase-js'

/** Cliente con service role: solo existe en el servidor (Vercel), nunca en el navegador. */
export const admin = () =>
  createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })

export const AREAS = ['psicologia', 'logopedia', 'fisioterapia', 'nutricion']
export const HORAS = ['9:00', '10:00', '11:00', '12:00', '16:00', '17:00', '18:00', '19:00']
