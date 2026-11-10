import { Link } from 'react-router-dom'
import AreaCard from '../components/AreaCard'
import Wave from '../components/Wave'
import { AREAS, CONTACTO } from '../services/areas'
import { SITE, whatsappLink } from '../config'
import { useWhatsApp } from '../hooks/useWhatsApp'

const EXTRAS = [
  { to: '/atencion-temprana', label: 'Atención temprana', texto: 'Intervención coordinada de 0 a 6 años, con la familia dentro del plan.' },
  { to: '/online', label: 'Atención online', texto: 'Sesiones desde casa para que la distancia o el horario no sean un obstáculo.' },
  { to: '/programas', label: 'Colegios y empresas', texto: 'Charlas, talleres y programas de salud a medida para tu centro o empresa.' },
]

const EMPEZAR = [
  { si: 'A mi hijo/a le cuesta hablar, pronunciar o leer', to: '/logopedia', destino: 'Logopedia', color: 'bg-azul' },
  { si: 'Me siento con ansiedad, triste o desbordado/a', to: '/psicologia', destino: 'Psicología', color: 'bg-amarillo' },
  { si: 'Me duele la espalda, tengo una lesión o me han operado', to: '/fisioterapia', destino: 'Fisioterapia', color: 'bg-verde' },
  { si: 'Quiero comer mejor, controlar el peso o tengo colesterol o diabetes', to: '/nutricion', destino: 'Nutrición', color: 'bg-naranja' },
  { si: 'Mi bebé o niño pequeño (0–6 años) va más despacio en su desarrollo', to: '/atencion-temprana', destino: 'Atención temprana', color: 'bg-salvia' },
]
const ORIENTAME = whatsappLink('Hola, no sé por dónde empezar, ¿me orientáis?')

export default function Home() {
  const wa = useWhatsApp()
  return (
    <div className="wrap">
      <section className="mt-5 grid items-center gap-10 rounded-[40px] bg-bosque p-[clamp(28px,5vw,56px)] text-[#F3EEE5] lg:grid-cols-[1.5fr_1fr]">
        <div>
        <span className="lab mb-4 block text-ocre">Centro sanitario en La Puebla de Alfindén</span>
        <h1 className="max-w-[20ch] text-[clamp(2.1rem,5vw,3.6rem)]">Psicología, logopedia, fisioterapia y nutrición en La Puebla de Alfindén</h1>
        <p className="mt-4 font-serif text-[clamp(1.3rem,2.4vw,1.7rem)] font-light italic text-lino">Cuidado integral, en cada etapa de la vida.</p>
        <p className="text-[#D3D9CF]">Un mismo equipo para niños, adultos y mayores. Cuéntanos qué te pasa y te orientamos sobre por dónde empezar.</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {SITE.reservasAbiertas && <Link to="/reservar" className="btn !bg-lino !text-bosque">Reservar cita</Link>}
          <a href={`tel:+34${CONTACTO.telefono.replace(/\s/g, '')}`} className={`btn ${SITE.reservasAbiertas ? 'btn-alt' : '!bg-lino !text-bosque'}`}>Llamar al {CONTACTO.telefono}</a>
          <a href={wa} target="_blank" rel="noreferrer" className="btn btn-alt">Escribir por WhatsApp</a>
        </div>
        <p className="mb-0 mt-6 text-[.9rem] text-[#AEB9B0]">Presencial y online · {CONTACTO.horario.charAt(0).toUpperCase() + CONTACTO.horario.slice(1)} · {CONTACTO.direccion.split('\n')[0]}</p>
        </div>
        <div aria-hidden="true" className="hidden grid-cols-2 gap-3 lg:grid">
          {AREAS.map((a, i) => (
            <div key={a.slug} className={`${a.bg} flex aspect-square items-end p-5 text-tinta ${['rounded-[48px_48px_12px_48px]', 'rounded-[48px_48px_48px_12px]', 'rounded-[48px_12px_48px_48px]', 'rounded-[12px_48px_48px_48px]'][i]}`}>
              <span className="lab text-[.7rem]">{a.dimension}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="por-donde-empiezo" className="mt-16">
        <span className="lab">Te orientamos</span>
        <h2 className="mt-2">¿Por dónde empiezo?</h2>
        <p className="text-soft">Elige la situación que más se parezca a la tuya. Si no lo tienes claro, escríbenos y te ayudamos a decidir.</p>
        <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {EMPEZAR.map((e) => (
            <Link key={e.to} to={e.to} className="group flex flex-col rounded-[26px] border border-line bg-panel p-6 no-underline transition-transform hover:-translate-y-1">
              <span className="text-[.82rem] text-soft">Si…</span>
              <span className="mt-1 font-serif text-[1.4rem] leading-snug">{e.si}</span>
              <span className="mt-auto flex items-center gap-2 pt-4 text-[.92rem] font-medium"><i className={`h-2.5 w-2.5 rounded-full ${e.color}`} />{e.destino} →</span>
            </Link>
          ))}
          <a href={ORIENTAME} target="_blank" rel="noreferrer" className="flex flex-col rounded-[26px] bg-hoja p-6 text-lino no-underline transition-transform hover:-translate-y-1">
            <span className="text-[.82rem] text-[#D3D9CF]">Si…</span>
            <span className="mt-1 font-serif text-[1.4rem] leading-snug">No lo tengo claro</span>
            <span className="mt-auto pt-4 text-[.92rem] font-medium">Escríbenos por WhatsApp y te orientamos →</span>
          </a>
        </div>
      </section>
      <Wave className="mt-16 block h-auto w-full" />

      <section id="servicios" className="mt-12">
        <span className="lab">Cuatro caminos, un mismo propósito</span>
        <h2 className="mt-2">Nuestras especialidades</h2>
        <p className="text-soft">Psicología, logopedia, fisioterapia y nutrición se encuentran bajo un mismo techo para cuidar de la persona completa. Empieza por donde lo necesites; el resto del equipo se une cuando haga falta.</p>
        <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">{AREAS.map((a, i) => <AreaCard key={a.slug} area={a} i={i} />)}</div>
      </section>

      <section className="mt-20 grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] bg-amarillo/25 p-8"><span className="lab">Adultos</span><h2 className="mt-2">Cada momento vital</h2><p>Ansiedad, estrés y depresión, duelo, autoestima, gestión emocional, relaciones y procesos vitales. También fisioterapia neurológica, nutrición deportiva y control de patologías.</p></div>
        <div className="rounded-[28px] bg-azul/25 p-8"><span className="lab">Infancia y adolescencia</span><h2 className="mt-2">0 – 18 años</h2><p>Dificultades emocionales y de conducta, lenguaje y habla, lectoescritura y dislexia, fisioterapia pediátrica, alimentación infantil y orientación a familias.</p></div>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] bg-verde/25 p-8"><span className="lab">Tercera edad</span><h2 className="mt-2">Autonomía y bienestar</h2><p>Acompañamiento emocional, estimulación cognitiva, movilidad y equilibrio, prevención de caídas y alimentación adaptada.</p></div>
        <div className="rounded-[28px] bg-naranja/25 p-8"><span className="lab">Atención temprana</span><h2 className="mt-2">De 0 a 6 años</h2><p>Psicología, logopedia y fisioterapia trabajan juntas y de la mano de la familia para acompañar el desarrollo del niño.</p></div>
      </section>

      <section className="mt-20">
        <span className="lab">Más formas de cuidarte</span>
        <h2 className="mt-2">Salud también donde tú estás</h2>
        <p className="text-soft">Además de la consulta en el centro, llevamos nuestro acompañamiento a casa, a los colegios y a las empresas.</p>
        <div className="mt-6 grid gap-3.5 md:grid-cols-3">
          {EXTRAS.map((e) => (
            <Link key={e.to} to={e.to} className="rounded-[26px] bg-panel p-6 no-underline transition-transform hover:-translate-y-1">
              <h3 className="font-serif text-2xl">{e.label}</h3>
              <p className="mb-0 mt-2 text-[.92rem] text-soft">{e.texto}</p>
              <span className="mt-4 inline-block text-[.9rem] font-medium">Conocer más →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2>Cómo empezamos</h2>
        <div className="steps">
          {[['Escríbenos o llámanos', 'Al 602 533 313, también por WhatsApp.'], ['Cuéntanos tu caso', 'Te orientamos hacia el profesional o la valoración conjunta que mejor encaje.'], ['Primera cita', 'En La Puebla de Alfindén o a distancia, como prefieras.']].map(([t, d], i) => (
            <div key={t} className="border-t-2 border-salvia pt-3.5"><span className="block font-serif text-[2.6rem] font-light italic leading-none">{i + 1}</span><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-[32px] bg-bosque p-[clamp(28px,5vw,56px)] text-[#F3EEE5]">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <span className="lab text-ocre">Contacto</span>
            <h2 className="mt-2 text-lino">Te esperamos en La Puebla de Alfindén</h2>
            <p className="text-[#D3D9CF]">Calle Fuertes, 1 · 50171 La Puebla de Alfindén (Zaragoza)</p>
            <p className="mb-0 text-[#D3D9CF]">Atención {CONTACTO.horario} · Presencial y online.</p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <a href={`tel:+34${CONTACTO.telefono.replace(/\s/g, '')}`} className="font-serif text-3xl text-lino no-underline">{CONTACTO.telefono}</a>
            <a href={wa} target="_blank" rel="noreferrer" className="btn !bg-lino !text-bosque">Escríbenos por WhatsApp</a>
            <span className="text-[.9rem] text-[#AEB9B0]">{CONTACTO.web}</span>
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-[28px] bg-panel p-[clamp(34px,6vw,64px)] text-center">
        <p className="mx-auto mb-5 max-w-[30ch] font-serif text-[clamp(1.5rem,3vw,2.2rem)] font-light italic leading-tight">Elige cómo empezar. El resto del equipo se une cuando lo necesites.</p>
        {SITE.reservasAbiertas ? (
          <Link to="/reservar" className="btn">Reservar cita</Link>
        ) : (
          <a href={wa} target="_blank" rel="noreferrer" className="btn">Hablar con el equipo</a>
        )}
      </section>
    </div>
  )
}
