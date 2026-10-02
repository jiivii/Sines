import type { VercelRequest, VercelResponse } from '@vercel/node'
import { admin, AREAS, HORAS } from './_supabase'

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

async function avisar(r: Record<string, unknown>) {
  const { RESEND_API_KEY, NOTIFY_EMAIL, MAIL_FROM } = process.env
  if (!RESEND_API_KEY || !NOTIFY_EMAIL) return
  const rows = Object.entries(r).filter(([, v]) => v).map(([k, v]) => `<p><b>${esc(k)}:</b> ${esc(String(v))}</p>`).join('')
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: MAIL_FROM || 'Sinestesya <onboarding@resend.dev>', to: [NOTIFY_EMAIL], reply_to: r.email, subject: `Nueva reserva · ${r.area}`, html: rows }),
    })
  } catch (e) { console.error('Aviso por email fallido', e) }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido.' })
  const b = (req.body ?? {}) as Record<string, unknown>
  if (b.web) return res.status(200).json({ ok: true }) // honeypot anti-bots

  const s = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
  const area = s(b.area, 20), paciente = s(b.paciente, 6), fecha = s(b.fecha, 10), hora = s(b.hora, 5)
  const nombre = s(b.nombre, 120), telefono = s(b.telefono, 30), email = s(b.email, 160), notas = s(b.notas, 500)
  const edad = b.edad === undefined ? null : Number(b.edad)

  const dia = new Date(`${fecha}T12:00:00`)
  const manana = new Date(); manana.setHours(0, 0, 0, 0); manana.setDate(manana.getDate() + 1)
  const err =
    !AREAS.includes(area) ? 'Área no válida.' :
    !['adulto', 'nino'].includes(paciente) ? 'Tipo de paciente no válido.' :
    paciente === 'nino' && !(Number.isInteger(edad) && edad! >= 0 && edad! <= 17) ? 'Edad no válida.' :
    !/^\d{4}-\d{2}-\d{2}$/.test(fecha) || isNaN(dia.getTime()) || dia < manana || dia.getDay() % 6 === 0 ? 'Elige un día laborable a partir de mañana.' :
    !HORAS.includes(hora) ? 'Hora no válida.' :
    nombre.length < 3 ? 'Escribe tu nombre.' :
    telefono.replace(/\D/g, '').length < 9 ? 'Teléfono no válido.' :
    !/^\S+@\S+\.\S+$/.test(email) ? 'Correo no válido.' : ''
  if (err) return res.status(400).json({ error: err })

  const row = { area, paciente, edad: paciente === 'nino' ? edad : null, fecha, hora, nombre, telefono, email, notas: notas || null }
  const { data, error } = await admin().from('reservas').insert(row).select('id').single()
  if (error?.code === '23505') return res.status(409).json({ error: 'Ese hueco ya está ocupado. Elige otra hora.' })
  if (error || !data) { console.error(error); return res.status(500).json({ error: 'No hemos podido guardar tu reserva. Inténtalo de nuevo o llámanos.' }) }

  await avisar(row)
  res.status(201).json({ ok: true, id: data.id })
}
