import { Link } from 'react-router-dom'
import { CONTACTO } from '../services/areas'
import { useWhatsApp } from '../hooks/useWhatsApp'

const VENTAJAS = [
  { titulo: 'Desde donde estés', texto: 'Sesiones desde casa, sin desplazamientos.' },
  { titulo: 'Cita a tu medida', texto: 'Concertamos el momento que mejor te encaje.' },
  { titulo: 'Con Sinestesya', texto: 'Atención de profesionales del centro, cerca de ti.' },
]

export default function Online() {
  const wa = useWhatsApp()
  return (
    <div className="wrap">
      <section className="mt-10 rounded-[40px] bg-azul/30 p-[clamp(28px,6vw,64px)]">
        <span className="lab">Atención online</span>
        <h1 className="mb-3 mt-3">Salud a distancia<span className="sr-only">:</span>{' '}<span className="mt-2 block text-[.42em] font-light italic leading-tight">psicología, logopedia y nutrición online</span></h1>
        <p className="max-w-[62ch] text-[1.15rem]">Atendemos también online para que la distancia, el horario o la falta de tiempo no sean un obstáculo. Cuéntanos qué necesitas y te indicamos qué sesiones se pueden hacer a distancia y cuáles es mejor hacer en el centro.</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <a href={wa} target="_blank" rel="noreferrer" className="btn">Escríbenos por WhatsApp</a>
          <Link to="/quienes-somos" className="btn btn-alt">Cómo trabajamos</Link>
        </div>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        {VENTAJAS.map((v) => (
          <div key={v.titulo} className="rounded-[26px] bg-panel p-6">
            <span className="block h-2.5 w-2.5 rounded-full bg-azul" />
            <h3 className="mt-3 font-serif text-2xl">{v.titulo}</h3>
            <p className="mb-0 mt-2 text-[.92rem] text-soft">{v.texto}</p>
          </div>
        ))}
      </section>

      <section className="mt-20 grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <span className="lab">Antes de empezar</span>
          <h2 className="mt-2">¿Qué se puede hacer online?</h2>
          <p className="text-soft">No todas las sesiones funcionan igual a distancia. En la primera conversación valoramos tu caso y te proponemos el formato más adecuado: online, presencial o una combinación de ambos.</p>
          <p className="text-soft">La atención online está disponible para psicología, logopedia y nutrición, y para el acompañamiento a familias. En fisioterapia valoramos contigo qué partes del proceso pueden hacerse a distancia.</p>
        </div>
        <div className="rounded-[26px] bg-panel p-8">
          <span className="lab">Necesitas</span>
          <ul className="m-0 mt-3 list-none space-y-2 p-0">
            {['Un dispositivo con cámara y micrófono', 'Conexión a internet estable', 'Un espacio tranquilo y privado', 'Ganas de cuidarte con continuidad'].map((x) => (
              <li key={x} className="flex items-start"><span className="mr-3 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-azul" />{x}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-20 rounded-[28px] bg-azul/20 p-8 text-center">
        <p className="mx-auto mb-3 max-w-[34ch] font-serif text-3xl font-light italic">La distancia no tiene por qué separarte de tu bienestar.</p>
        <p className="mx-auto mb-5 max-w-[52ch] text-soft">Escríbenos y te contamos qué sesiones encajan mejor contigo.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={wa} target="_blank" rel="noreferrer" className="btn">WhatsApp · {CONTACTO.telefono}</a>
          <a href={`mailto:${CONTACTO.email}`} className="btn btn-alt">Escribir por email</a>
        </div>
      </section>

      <nav aria-label="Más páginas" className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[.9rem]">
        <Link to="/atencion-temprana" className="text-soft underline hover:text-ink">Atención temprana</Link>
        <Link to="/programas" className="text-soft underline hover:text-ink">Colegios y empresas</Link>
        <Link to="/quienes-somos" className="text-soft underline hover:text-ink">Quiénes somos</Link>
      </nav>
    </div>
  )
}
