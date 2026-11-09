import { admin, AREAS, hasSupabaseConfig, type Env } from './_supabase'

/** GET /api/disponibilidad · horas ocupadas de un área y día (siempre JSON, sin caché). */
export async function onRequestGet(context: { request: Request; env: Env }) {
  const { searchParams } = new URL(context.request.url)
  const area = searchParams.get('area')
  const fecha = searchParams.get('fecha')

  if (!area || !AREAS.includes(area) || !fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha))
    return Response.json({ error: 'Parámetros no válidos.' }, { status: 400 })

  if (!hasSupabaseConfig(context.env))
    return Response.json({ error: 'No hemos podido consultar la disponibilidad.' }, { status: 500 })

  const { data, error } = await admin(context.env)
    .from('reservas')
    .select('hora')
    .eq('area', area)
    .eq('fecha', fecha)
    .neq('estado', 'cancelada')

  if (error)
    return Response.json({ error: 'No hemos podido consultar la disponibilidad.' }, { status: 500 })

  return Response.json(
    { ocupadas: (data ?? []).map((r: { hora: string }) => r.hora) },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
