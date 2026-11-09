import { admin, AREAS, hasSupabaseConfig } from './_supabase.js'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { area, fecha } = req.query
  if (typeof area !== 'string' || !AREAS.includes(area) || typeof fecha !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(fecha))
    return res.status(400).json({ error: 'Parámetros no válidos.' })

  if (!hasSupabaseConfig()) {
    console.error('Configuración Supabase incompleta:', {
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SUPABASE_SECRET_KEY: !!process.env.SUPABASE_SECRET_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    })
    return res.status(500).json({ error: 'No hemos podido consultar la disponibilidad.' })
  }

  const { data, error } = await admin().from('reservas').select('hora').eq('area', area).eq('fecha', fecha).neq('estado', 'cancelada')
  if (error) return res.status(500).json({ error: 'No hemos podido consultar la disponibilidad.' })
  res.setHeader('Cache-Control', 'no-store')
  res.status(200).json({ ocupadas: data.map((r) => r.hora) })
}
