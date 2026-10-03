import { AREAS, HORAS } from './_supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método no permitido.'
    })
  }

  const {
    WEB1_API_URL,
    WEB1_API_SECRET
  } = process.env

  if (!WEB1_API_URL || !WEB1_API_SECRET) {
  console.error('Configuración Web1:', {
    WEB1_API_URL: !!WEB1_API_URL,
    WEB1_API_SECRET: !!WEB1_API_SECRET
  })

  return res.status(500).json({
    error: 'Configuración de conexión con Web1 incompleta.'
  })
}

  const b = req.body || {}

  // Honeypot antispam
  if (b.web) {
    return res.status(200).json({
      ok: true
    })
  }

  const s = (value, max) =>
    typeof value === 'string'
      ? value.trim().slice(0, max)
      : ''

  const area = s(b.area, 20)
  const paciente = s(b.paciente, 6)
  const fecha = s(b.fecha, 10)
  const hora = s(b.hora, 5)

  const nombre = s(b.nombre, 120)
  const telefono = s(b.telefono, 30)
  const email = s(b.email, 160)
  const notas = s(b.notas, 500)

  const edad =
    b.edad === undefined ||
    b.edad === null ||
    b.edad === ''
      ? null
      : Number(b.edad)

  // Validación de fecha
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
        !(Number.isInteger(edad) && edad >= 0 && edad <= 17)
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
  // Validación de notas
  if (notas.length > 0 && notas.length < 10) {
    return res.status(400).json({
      error: 'Si escribes notas, deben tener al menos 10 caracteres.'
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
    const response = await fetch(
      `${WEB1_API_URL.replace(/\/$/, '')}/api/public-reservation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-web2-secret': WEB1_API_SECRET
        },
        body: JSON.stringify(reservation)
      }
    )

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      console.error(
        'Web1 respondió con error:',
        response.status,
        result
      )

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
    console.error(
      'Error conectando con Web1:',
      error
    )

    return res.status(502).json({
      error:
        'No hemos podido conectar con el sistema de reservas. Inténtalo de nuevo.'
    })
  }
}