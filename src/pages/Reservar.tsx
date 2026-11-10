import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AREAS, CONTACTO, getArea, isAreaSlug } from '../services/areas'
import { crearReserva, horasOcupadas } from '../services/bookings'
import { fmtFecha, HORAS, proximosDias } from '../utils/dates'
import { useTitle } from '../hooks/useTitle'
import { EMPRESA, SITE, WHATSAPP } from '../config'
import type { AreaSlug, Paciente } from '../types'

const empty = { nombre: '', telefono: '', email: '', notas: '', edad: '', web: '', ok: false }

export default function Reservar() {
  useTitle('Reserva tu cita')
  const [sp] = useSearchParams()
  const q = sp.get('area')
  const [step, setStep] = useState(1)
  const [paciente, setPaciente] = useState<Paciente>()
  const [slug, setSlug] = useState<AreaSlug | undefined>(isAreaSlug(q) ? q : undefined)
  const [fecha, setFecha] = useState<string>()
  const [hora, setHora] = useState<string>()
  const [d, setD] = useState(empty)
  const [ocupadas, setOcupadas] = useState<string[]>([])
  const [err, setErr] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const dias = useMemo(() => proximosDias(12), [])
  const area = getArea(slug)

  useEffect(() => {
    if (!slug || !fecha) return
    let alive = true
    horasOcupadas(slug, fecha).then((o) => alive && setOcupadas(o)).catch(() => alive && setOcupadas([]))
    return () => { alive = false }
  }, [slug, fecha])

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setD({ ...d, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value })

  async function enviar() {
    if (!slug || !paciente || !fecha || !hora) return
    if (paciente === 'nino' && !d.edad) return setErr('Indica la edad del niño o niña.')
    if (d.nombre.trim().length < 3) return setErr('Escribe tu nombre y apellidos.')
    if (d.telefono.replace(/\D/g, '').length < 9) return setErr('Revisa el teléfono: faltan dígitos.')
    if (!/^\S+@\S+\.\S+$/.test(d.email)) return setErr('Revisa el correo electrónico.')
    if (!d.ok) return setErr('Necesitamos tu aceptación para continuar.')
    setErr(''); setSending(true)
    try {
      await crearReserva({ area: slug, paciente, fecha, hora, nombre: d.nombre.trim(), telefono: d.telefono.trim(), email: d.email.trim(),
        notas: d.notas.trim() || undefined, edad: paciente === 'nino' ? Number(d.edad) : undefined, web: d.web })
      setDone(true)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Error inesperado. Inténtalo de nuevo.')
      if (e instanceof Error && /ocupado/i.test(e.message)) { setHora(undefined); setStep(3) }
    } finally { setSending(false) }
  }

  const chip = (on: boolean, onClick: () => void, children: React.ReactNode, extra = '', disabled = false) => (
    <button type="button" aria-pressed={on} disabled={disabled} onClick={onClick} className={`chip ${on ? (area?.bg ?? 'bg-bosque') : ''} ${extra}`}>{children}</button>
  )
  const resumen = (
    <dl className="m-0">
      {[['Para', paciente && (paciente === 'nino' ? 'Niño o adolescente' : 'Adulto')], ['Área', area?.nombre], ['Día', fecha && fmtFecha(fecha)], ['Hora', hora]].map(([k, v]) => (
        <div key={k as string} className="mt-2.5"><dt className="text-[.78rem] text-soft">{k}</dt><dd className="m-0 font-serif text-[1.3rem]">{v || '—'}</dd></div>
      ))}
    </dl>
  )

  if (!SITE.reservasAbiertas) return (
    <div className="wrap mt-14">
      <div className="mx-auto max-w-[720px] rounded-[28px] bg-ocre/25 p-8 text-center">
        <span className="lab">Web en construcción</span>
        <h1 className="my-3 text-[clamp(2rem,5vw,3rem)]">Citas online en pausa</h1>
        <p className="mx-auto text-soft">Estamos actualizando el sitio y, de momento, no recogemos citas online. Para pedir información o resolver cualquier duda, llámanos o escríbenos por WhatsApp.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={`tel:+34${CONTACTO.telefono.replace(/\s/g, '')}`} className="btn">Llamar al {CONTACTO.telefono}</a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn-alt">WhatsApp</a>
        </div>
        <p className="mb-0 mt-6 text-[.85rem] text-soft">{CONTACTO.direccion.split('\n')[0]} · Atención {CONTACTO.horario}</p>
        <Link to="/" className="mt-6 inline-block underline">Volver al inicio</Link>
      </div>
    </div>
  )

  if (done) return (
    <div className="wrap mt-14"><div className="max-w-[720px] rounded-[28px] bg-amarillo/25 p-8">
      <span className="lab">Solicitud recibida</span>
      <h1 className="my-3 text-[clamp(2rem,5vw,3rem)]">Gracias, {d.nombre.split(' ')[0]}.</h1>
      <p>Hemos recibido tu solicitud. El equipo te confirmará el hueco por teléfono o email en un plazo de 48 horas laborables.</p>
      {resumen}
      <Link to="/" className="btn mt-6">Volver al inicio</Link>
    </div></div>
  )

  return (
    <div className="wrap mt-14">
      <span className="lab">Reserva</span>
      <h1 className="mb-1.5 mt-2 text-[clamp(2.2rem,5vw,3.4rem)]">Reserva tu cita</h1>
      <p className="text-soft">Cuatro pasos, sin cuenta ni llamadas.</p>
      <div className="mt-6 grid items-start gap-4 md:grid-cols-[1.5fr_1fr]">
        <div className="tile">
          <div className="mb-5 flex gap-2" aria-hidden="true">{[1, 2, 3, 4].map((i) => <i key={i} className={`h-[5px] flex-1 rounded-full ${i <= step ? 'bg-hoja' : 'bg-line'}`} />)}</div>

          {step === 1 && <><h2>¿Para quién es la cita?</h2><div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
            {chip(paciente === 'adulto', () => { setPaciente('adulto'); setStep(2) }, <>Adulto<small className="block opacity-75">A partir de 18 años</small></>)}
            {chip(paciente === 'nino', () => { setPaciente('nino'); setStep(2) }, <>Niño o adolescente<small className="block opacity-75">Hasta 17 años</small></>)}</div></>}

          {step === 2 && <><h2>¿Con qué área quieres empezar?</h2><p className="text-soft">Si no lo tienes claro, elige la que más se acerque. Nosotros te orientamos.</p>
            <div className="mt-3.5 grid grid-cols-2 gap-2.5">{AREAS.map((a) => <button key={a.slug} type="button" aria-pressed={slug === a.slug} onClick={() => { setSlug(a.slug); setHora(undefined); setStep(3) }} className={`chip ${slug === a.slug ? a.bg : ''}`}>{a.nombre}<small className="block opacity-75">{a.dimension}</small></button>)}</div></>}

          {step === 3 && <><h2>Elige tu hueco preferido</h2>
            <div className="mt-3.5 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">{dias.map((f) => chip(fecha === f, () => { setFecha(f); setHora(undefined) }, fmtFecha(f)))}</div>
            {fecha && <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(88px,1fr))] gap-2.5">{HORAS.map((h) => chip(hora === h, () => { setHora(h); setStep(4) }, h, 'text-center', ocupadas.includes(h)))}</div>}</>}

          {step === 4 && <form onSubmit={(e) => { e.preventDefault(); void enviar() }} noValidate>
            <h2>Tus datos</h2>
            <p className="text-soft">{paciente === 'nino' ? 'Escribe los datos de la persona que acompaña y la edad del niño o niña.' : 'Solo lo necesario para confirmarte la cita.'}</p>
            {paciente === 'nino' && <><label htmlFor="edad" className="mt-3.5 block text-[.85rem] font-medium">Edad del niño o niña</label><input id="edad" type="number" min={0} max={17} inputMode="numeric" className="field" value={d.edad} onChange={set('edad')} /></>}
            {([['nombre', 'Nombre y apellidos', 'text', 'name'], ['telefono', 'Teléfono', 'tel', 'tel'], ['email', 'Correo electrónico', 'email', 'email']] as const).map(([k, l, t, ac]) => (
              <div key={k}><label htmlFor={k} className="mt-3.5 block text-[.85rem] font-medium">{l}</label><input id={k} type={t} autoComplete={ac} className="field" value={d[k]} onChange={set(k)} /></div>))}
            <label htmlFor="notas" className="mt-3.5 block text-[.85rem] font-medium">¿Quieres contarnos algo? (opcional)</label>
            <textarea id="notas" rows={3} maxLength={500} className="field" value={d.notas} onChange={set('notas')} />
            <input name="web" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" value={d.web} onChange={set('web')} />
            <label className="mt-4 flex items-start gap-2.5 text-[.88rem] font-light"><input type="checkbox" className="mt-1.5" checked={d.ok} onChange={set('ok')} /><span>He leído la <Link to="/privacidad" target="_blank" className="underline">política de privacidad</Link> y acepto el tratamiento de mis datos para gestionar la cita.</span></label>
            <p className="mb-0 mt-2 text-[.78rem] leading-snug text-soft">Responsable: {EMPRESA.razonSocial}. Finalidad: gestionar tu cita. Base legal: tu consentimiento y tu solicitud. No cedemos tus datos salvo obligación legal. Puedes ejercer tus derechos en {EMPRESA.email}. Por favor, no incluyas en las notas detalles de salud que no sean necesarios.</p>
            <p role="alert" className="mt-2 min-h-[1.4em] text-[.88rem] text-[#A5502F]">{err}</p>
            <button className="btn" disabled={sending}>{sending ? 'Enviando…' : 'Reservar cita'}</button></form>}

          {step > 1 && <p className="mb-0 mt-3"><button type="button" className="underline" onClick={() => setStep(step - 1)}>← Volver</button></p>}
          {step < 4 && err && <p role="alert" className="mt-2 text-[.88rem] text-[#A5502F]">{err}</p>}
        </div>
        <aside className="tile md:sticky md:top-24" aria-live="polite"><span className="lab">Tu cita</span>{resumen}
          <p className="mb-0 mt-4 text-[.85rem] text-soft">Eliges un hueco y el equipo te lo confirma. ¿Prefieres llamar? {CONTACTO.telefono}.</p></aside>
      </div>
    </div>
  )
}
