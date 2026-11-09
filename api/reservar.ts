import type { VercelRequest, VercelResponse } from '@vercel/node'

const AREAS = [
  'psicologia',
  'logopedia',
  'fisioterapia',
  'nutricion'
]

const HORAS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00'
]

/** Acepta "9:00" y "09:00" y devuelve siempre "HH:MM". */
const normalizarHora = (value: string): string => {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value)
  return match ? `${match[1].padStart(2, '0')}:${match[2]}` : value
}

/**
 * Construye siempre `https://host/base/api/public-reservation`, de forma
 * idempotente: vale tanto `https://host`, `https://host/`,
 * `https://host/api` como la URL completa del endpoint.
 */
const buildEndpoint = (raw: string | undefined): string | null => {
  if (!raw) return null

  const trimmed = raw.trim().replace(/\/+$/, '')
  if (!trimmed) return null

  let url: URL
  try {
    url = new URL(trimmed)
  } catch {
    return null
  }

  const localhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1'
  if (url.protocol !== 'https:' && !localhost) return null
  if (!url.hostname) return null

  const basePath = url.pathname
    .replace(/\/+$/, '')
    .replace(/\/api\/public-reservation$/i, '')
    .replace(/\/api$/i, '')

  return `${url.origin}${basePath}/api/public-reservation`
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método no permitido.'
    })
  }

  const {
    WEB1_API_URL,
    WEB1_API_SECRET
  } = process.env

  const endpoint = buildEndpoint(WEB1_API_URL)
  const secret = (WEB1_API_SECRET || '').trim()

  if (!endpoint || !secret) {
    console.error('Configuración Web1 incompleta:', {
      WEB1_API_URL: !!WEB1_API_URL,
      WEB1_API_URL_valida: !!endpoint,
      WEB1_API_SECRET: !!WEB1_API_SECRET
    })

    return res.status(500).json({
      error: 'Configuración de conexión con Web1 incompleta.'
    })
  }

  const b = (req.body || {}) as Record<string, unknown>

  // Honeypot antispam
  if (b.web) {
    return res.status(200).json({
      ok: true
    })
  }

  const s = (value: unknown, max: number): string =>
    typeof value === 'string'
      ? value.trim().slice(0, max)
      : ''

  const area = s(b.area, 20)
  const paciente = s(b.paciente, 6)
  const fecha = s(b.fecha, 10)
  const hora = normalizarHora(s(b.hora, 5))
  const nombre = s(b.nombre, 120)
  const telefono = s(b.telefono, 30)
  const email = s(b.email, 160)
  const notas = s(b.notas, 500)

  const edad: number | null =
    b.edad === undefined ||
    b.edad === null ||
    b.edad === ''
      ? null
      : Number(b.edad)

  const dia = new Date(`${fecha}T12:00:00`)

  const manana = new Date()
  manana.setHours(0, 0, 0, 0)
  manana.setDate(manana.getDate() + 1)

  const error =
    !AREAS.includes(area)
      ? 'Área no válida.'
      : !['adulto', 'nino'].includes(paciente)
      ? 'Tipo de paciente no válido.'
      : paciente === 'nino' &&
        !(typeof edad === 'number' &&
          Number.isInteger(edad) &&
          edad >= 0 &&
          edad <= 17)
      ? 'Edad no válida.'
      : !/^\d{4}-\d{2}-\d{2}$/.test(fecha) ||
        isNaN(dia.getTime()) ||
        dia < manana ||
        dia.getDay() % 6 === 0
      ? 'Elige un día laborable a partir de mañana.'
      : !HORAS.includes(hora)
      ? 'Hora no válida.'
      : nombre.length < 3
      ? 'Escribe tu nombre.'
      : telefono.replace(/\D/g, '').length < 9
      ? 'Teléfono no válido.'
      : !/^\S+@\S+\.\S+$/.test(email)
      ? 'Correo no válido.'
      : ''

  if (error) {
    return res.status(400).json({
      error
    })
  }

  const reservation = {
    area,
    paciente,
    edad: paciente === 'nino' ? edad : null,
    fecha,
    hora,
    nombre,
    telefono,
    email,
    notas: notas || null
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-web2-secret': secret
      },
      body: JSON.stringify(reservation)
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      console.error('Web1 respondió con error:', {
        endpoint,
        status: response.status,
        result
      })

      return res.status(response.status).json({
        error:
          result.error ||
          'No hemos podido guardar la solicitud.'
      })
    }

    return res.status(201).json({
      ok: true,
      id: result.id
    })
  } catch (error) {
    console.error('Error conectando con Web1:', {
      endpoint,
      message: error instanceof Error ? error.message : String(error)
    })

    return res.status(502).json({
      error:
        'No hemos podido conectar con el sistema de reservas. Inténtalo de nuevo.'
    })
  }
}
