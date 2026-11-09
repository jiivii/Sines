import { Link } from 'react-router-dom'
import { AREAS, CONTACTO } from '../services/areas'
import { SITE, WHATSAPP } from '../config'
import { useTitle } from '../hooks/useTitle'

type Tarifa = { servicio: string; detalle: string; precio: string }

type Bloque = {
  slug: string
  nombre: string
  dimension: string
  soft: string
  dot: string
  intro: string
  tarifas: Tarifa[]
  bonos: Tarifa[]
  nota?: string
}

const BLOQUES: Bloque[] = [
  {
    slug: 'psicologia',
    nombre: 'Psicología',
    dimension: 'Mente',
    soft: 'bg-amarillo/25',
    dot: 'bg-amarillo',
    intro: 'Acompañamiento emocional para adultos, parejas, familias y menores.',
    tarifas: [
      { servicio: 'Primera consulta / sesión individual', detalle: '45–50 min', precio: '70 €' },
      { servicio: 'Sesión individual', detalle: '45–50 min', precio: '70 €' },
      { servicio: 'Terapia de pareja', detalle: '60 min', precio: '90 €' },
      { servicio: 'Terapia familiar', detalle: '60 min', precio: '90 €' },
      { servicio: 'Informe psicológico', detalle: 'Según complejidad', precio: '70 €' },
    ],
    bonos: [
      { servicio: 'Bono 4 sesiones individuales', detalle: '4 × 45–50 min', precio: '260 €' },
    ],
  },
  {
    slug: 'fisioterapia',
    nombre: 'Fisioterapia',
    dimension: 'Cuerpo',
    soft: 'bg-verde/25',
    dot: 'bg-verde',
    intro: 'Valoración y tratamiento del movimiento, el dolor y la funcionalidad.',
    tarifas: [
      { servicio: 'Primera valoración + tratamiento', detalle: '60 min', precio: '70 €' },
      { servicio: 'Sesión ordinaria', detalle: '50 min', precio: '50 €' },
      { servicio: 'Sesión breve', detalle: '30 min', precio: '35 €' },
    ],
    bonos: [
      { servicio: 'Bono 5 sesiones', detalle: '5 × 50 min', precio: '235 €' },
      { servicio: 'Bono 10 sesiones', detalle: '10 × 50 min', precio: '450 €' },
    ],
  },
  {
    slug: 'logopedia',
    nombre: 'Logopedia',
    dimension: 'Voz',
    soft: 'bg-azul/25',
    dot: 'bg-azul',
    intro: 'Valoración e intervención del lenguaje, el habla, la voz y la deglución.',
    tarifas: [
      { servicio: 'Valoración inicial', detalle: '60 min', precio: '85 €' },
      { servicio: 'Devolución de resultados', detalle: '45 min', precio: '60 €' },
      { servicio: 'Sesión ordinaria', detalle: '45 min', precio: '50 €' },
      { servicio: 'Sesión breve', detalle: '30 min', precio: '35 €' },
    ],
    bonos: [
      { servicio: 'Bono 5 sesiones', detalle: '5 × 45 min', precio: '235 €' },
      { servicio: 'Bono 10 sesiones', detalle: '10 × 45 min', precio: '450 €' },
    ],
    nota: 'La valoración inicial y la devolución de resultados son dos servicios independientes.',
  },
  {
    slug: 'nutricion',
    nombre: 'Nutrición',
    dimension: 'Alimento',
    soft: 'bg-naranja/25',
    dot: 'bg-naranja',
    intro: 'Alimentación personalizada para cada etapa y cada objetivo.',
    tarifas: [
      { servicio: 'Primera consulta completa', detalle: '60–75 min', precio: '110 €' },
      { servicio: 'Seguimiento', detalle: '40–45 min', precio: '50 €' },
      { servicio: 'Valoración antropométrica independiente', detalle: '20–30 min', precio: '40 €' },
    ],
    bonos: [
      { servicio: 'Bono 3 seguimientos', detalle: '3 × 40–45 min', precio: '140 €' },
      { servicio: 'Bono 5 seguimientos', detalle: '5 × 40–45 min', precio: '225 €' },
    ],
    nota: 'La primera consulta incluye historia nutricional, entrevista, antropometría, mediciones, pliegues cuando proceda, valoración de objetivos y planificación nutricional personalizada.',
  },
]

export default function Tarifas() {
  useTitle('Tarifas')

  return (
    <div className="wrap">
      <section className="mt-10 rounded-[40px] bg-ocre/30 p-[clamp(28px,6vw,64px)]">
        <span className="lab">Tarifario · Noviembre 2026</span>
        <h1 className="mb-3 mt-3">Tarifas claras, sin sorpresas.</h1>
        <p className="max-w-[62ch] text-[1.15rem]">
          Consulta aquí los precios de las sesiones y bonos de psicología, fisioterapia, logopedia y nutrición.
          Si no sabes qué servicio necesitas, escríbenos y te orientamos sin compromiso.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {SITE.reservasAbiertas ? (
            <Link to="/reservar" className="btn">Reservar cita</Link>
          ) : (
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn">Hablar con el equipo</a>
          )}
          <a href={`tel:+34${CONTACTO.telefono.replace(/\s/g, '')}`} className="btn btn-alt">
            Llamar al {CONTACTO.telefono}
          </a>
        </div>
        <p className="mb-0 mt-4 text-[.85rem] text-soft">Precios vigentes en noviembre de 2026.</p>
      </section>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {BLOQUES.map((b) => (
          <section key={b.slug} className={`${b.soft} rounded-[28px] p-6 md:p-8`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="lab">{b.dimension}</span>
                <h2 className="mt-1 text-3xl">{b.nombre}</h2>
              </div>
              <span className={`mt-2 h-3 w-3 shrink-0 rounded-full ${b.dot}`} aria-hidden="true" />
            </div>
            <p className="mt-2 text-[.92rem] text-soft">{b.intro}</p>

            <ul className="m-0 mt-4 list-none p-0">
              {b.tarifas.map((t) => (
                <li key={t.servicio} className="flex items-start justify-between gap-4 border-t border-line/80 py-3">
                  <span className="min-w-0">
                    <span className="block text-[.98rem] leading-snug">{t.servicio}</span>
                    <span className="block text-[.8rem] text-soft">{t.detalle}</span>
                  </span>
                  <span className="shrink-0 font-serif text-[1.35rem] leading-none">{t.precio}</span>
                </li>
              ))}
            </ul>

            {b.bonos.length > 0 && (
              <div className="mt-4 rounded-[18px] bg-panel/80 p-4">
                <span className="lab text-[.68rem]">Bonos</span>
                <ul className="m-0 mt-2 list-none space-y-2 p-0">
                  {b.bonos.map((t) => (
                    <li key={t.servicio} className="flex items-start justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block text-[.9rem] leading-snug">{t.servicio}</span>
                        <span className="block text-[.78rem] text-soft">{t.detalle}</span>
                      </span>
                      <span className="shrink-0 font-serif text-[1.2rem] leading-none">{t.precio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {b.nota && <p className="mb-0 mt-3 text-[.8rem] text-soft">{b.nota}</p>}
          </section>
        ))}
      </div>

      <section className="mt-16 rounded-[32px] bg-bosque p-[clamp(28px,5vw,56px)] text-[#F3EEE5]">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <span className="lab text-ocre">¿Hablamos?</span>
            <h2 className="mt-2 text-lino">Te ayudamos a elegir el servicio que necesitas.</h2>
            <p className="text-[#D3D9CF]">
              Si tienes dudas sobre qué profesional o qué modalidad encaja mejor contigo, llámanos o escríbenos
              y te orientamos.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <a href={`tel:+34${CONTACTO.telefono.replace(/\s/g, '')}`} className="font-serif text-3xl text-lino no-underline">
              {CONTACTO.telefono}
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn !bg-lino !text-bosque">
              Escríbenos por WhatsApp
            </a>
            <span className="text-[.9rem] text-[#AEB9B0]">{CONTACTO.web}</span>
          </div>
        </div>
      </section>

      <nav aria-label="Más páginas" className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[.9rem]">
        {AREAS.map((a) => (
          <Link key={a.slug} to={`/${a.slug}`} className="text-soft underline hover:text-ink">
            {a.nombre}
          </Link>
        ))}
        <Link to="/quienes-somos" className="text-soft underline hover:text-ink">Quiénes somos</Link>
      </nav>

      <p className="lab mb-0 mt-8 text-center text-[.68rem] text-soft">
        Sinestesya.es · La Puebla de Alfindén · Zaragoza
      </p>
    </div>
  )
}
