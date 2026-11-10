import { Link } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'
import { CONTACTO } from '../services/areas'
import { useWhatsApp } from '../hooks/useWhatsApp'

const CENTROS = [
  'Charlas para familias y profesorado',
  'Detección de dificultades de lenguaje y aprendizaje',
  'Talleres de hábitos saludables',
  'Programas a medida para el centro educativo',
]

const EMPRESAS = [
  'Charlas y talleres de salud en el trabajo',
  'Gestión del estrés y bienestar emocional',
  'Prevención de lesiones y ergonomía',
  'Alimentación saludable y voz profesional',
]

export default function Programas() {
  const wa = useWhatsApp()
  useTitle('Colegios y empresas')
  return (
    <div className="wrap">
      <section className="mt-10 rounded-[40px] bg-naranja/30 p-[clamp(28px,6vw,64px)]">
        <span className="lab">Programas a medida</span>
        <h1 className="mb-3 mt-3">Salud también en colegios y empresas</h1>
        <p className="max-w-[62ch] text-[1.15rem]">Llevamos la mirada multidisciplinar de Sinestesya a centros educativos y empresas. Cuéntanos qué necesita tu centro o tu empresa y diseñamos el programa contigo.</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <a href={wa} target="_blank" rel="noreferrer" className="btn">Hablemos del programa</a>
          <a href={`mailto:${CONTACTO.email}`} className="btn btn-alt">Escribir por email</a>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] bg-panel p-8">
          <span className="lab">Para centros educativos</span>
          <h2 className="mt-2">Acompañar también en el aula</h2>
          <p className="text-soft">Detección temprana, formación y talleres para que familias y profesorado tengan herramientas compartidas.</p>
          <ul className="m-0 mt-4 list-none space-y-0 p-0">
            {CENTROS.map((x) => (
              <li key={x} className="relative border-t border-line py-3 pl-6 before:absolute before:left-0 before:top-[1.35rem] before:h-2.5 before:w-2.5 before:rounded-full before:bg-naranja before:content-['']">{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[28px] bg-panel p-8">
          <span className="lab">Para empresas</span>
          <h2 className="mt-2">Cuidar a las personas que cuidan el negocio</h2>
          <p className="text-soft">Programas breves y prácticos que encajan en la jornada laboral y mejoran el bienestar del equipo.</p>
          <ul className="m-0 mt-4 list-none space-y-0 p-0">
            {EMPRESAS.map((x) => (
              <li key={x} className="relative border-t border-line py-3 pl-6 before:absolute before:left-0 before:top-[1.35rem] before:h-2.5 before:w-2.5 before:rounded-full before:bg-naranja before:content-['']">{x}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-20 grid gap-8 md:grid-cols-[1.1fr_.9fr] md:items-center">
        <div>
          <span className="lab">Cómo lo hacemos</span>
          <h2 className="mt-2">Un programa pensado con vosotros</h2>
          <p className="text-soft">Escuchamos la necesidad real del centro o de la empresa, proponemos un formato y ajustamos contenidos, duración y horarios. Después revisamos el resultado con vosotros.</p>
        </div>
        <div className="rounded-[26px] bg-naranja/20 p-8">
          <p className="mb-0 font-serif text-2xl font-light italic">Psicología, logopedia, fisioterapia y nutrición también fuera de la consulta.</p>
        </div>
      </section>

      <section className="mt-20 rounded-[28px] bg-naranja/20 p-8 text-center">
        <p className="mx-auto mb-3 max-w-[34ch] font-serif text-3xl font-light italic">Diseñamos el programa contigo.</p>
        <p className="mx-auto mb-5 max-w-[52ch] text-soft">Cuéntanos qué necesita tu centro educativo o tu empresa y te proponemos una propuesta a medida.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={wa} target="_blank" rel="noreferrer" className="btn">WhatsApp · {CONTACTO.telefono}</a>
          <a href={`mailto:${CONTACTO.email}`} className="btn btn-alt">Escribir por email</a>
        </div>
      </section>

      <nav aria-label="Más páginas" className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[.9rem]">
        <Link to="/atencion-temprana" className="text-soft underline hover:text-ink">Atención temprana</Link>
        <Link to="/online" className="text-soft underline hover:text-ink">Atención online</Link>
        <Link to="/quienes-somos" className="text-soft underline hover:text-ink">Quiénes somos</Link>
      </nav>
    </div>
  )
}
