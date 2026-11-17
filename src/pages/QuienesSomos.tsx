import { Link } from 'react-router-dom'
import AreaCard from '../components/AreaCard'
import { AREAS, CONTACTO } from '../services/areas'
import { SITE } from '../config'
import { useWhatsApp } from '../hooks/useWhatsApp'

const COMO_TRABAJAMOS = [
  { titulo: 'Escucha y valoración', descripcion: 'Empezamos entendiendo a cada persona y su contexto, sin ideas preconcebidas.' },
  { titulo: 'Equipo coordinado', descripcion: 'Las cuatro disciplinas comparten objetivos y se comunican entre sí.' },
  { titulo: 'Todas las etapas', descripcion: 'Infancia, vida adulta y tercera edad, con un enfoque adaptado a cada una.' },
  { titulo: 'Cercanía', descripcion: 'Un centro de barrio en La Puebla de Alfindén, con atención presencial y online.' },
]

const PILARES = [
  {
    titulo: 'Nuestra misión',
    texto: 'Ofrecer una atención integral que una psicología, logopedia, fisioterapia y nutrición en un solo lugar, facilitando un enfoque holístico del bienestar para adultos y niños.',
    puntos: ['Atención integral en un solo espacio', 'Enfoque holístico y personalizado', 'Adaptado a cada etapa de la vida'],
    color: 'bg-amarillo/25',
  },
  {
    titulo: 'Nuestra visión',
    texto: 'Ser el referente en La Puebla de Alfindén de atención multidisciplinar cercana, profesional y de calidad, donde mente, cuerpo y lenguaje trabajan en armonía.',
    puntos: ['Referente regional en bienestar integrado', 'Mente y cuerpo en armonía', 'Acceso universal a calidad'],
    color: 'bg-azul/25',
  },
  {
    titulo: 'Nuestros valores',
    texto: 'Los pilares que guían cada interacción y decisión en nuestro centro, comprometidos con tu bienestar integral.',
    puntos: ['Confianza y seguridad', 'Escucha atenta y empática', 'Acompañamiento profesional', 'Excelencia en calidad'],
    color: 'bg-verde/25',
  },
]

const VALORACION = [
  { titulo: 'Primer contacto', descripcion: 'Nos cuentas qué necesitas por teléfono o WhatsApp.' },
  { titulo: 'Valoración', descripcion: 'Los profesionales implicados valoran a la persona desde su disciplina.' },
  { titulo: 'Plan coordinado', descripcion: 'Ponemos en común lo observado y definimos objetivos compartidos.' },
  { titulo: 'Seguimiento', descripcion: 'Revisamos la evolución y ajustamos el plan con la persona y su familia.' },
]

export default function QuienesSomos() {
  const wa = useWhatsApp()
  return (
    <div className="wrap">
      <section className="mt-10 rounded-[40px] bg-salvia/25 p-[clamp(28px,6vw,64px)]">
        <span className="lab">Quiénes somos</span>
        <h1 className="mb-4 mt-3">
          Sinestesya<span className="sr-only">,</span>{' '}
          <span className="mt-2 block text-[.42em] font-light italic leading-tight">centro multidisciplinar en La Puebla de Alfindén</span>
        </h1>
        <p className="text-[1.15rem]">Salud integral, en cada etapa de la vida. Psicología, logopedia, fisioterapia y nutrición bajo un mismo techo.</p>
        <p className="mb-0 text-soft">
          En la sinestesia los sentidos se mezclan y se complementan. En Sinestesya hacemos lo mismo con la salud: las cuatro disciplinas se encuentran en un mismo centro para cuidar de la persona completa.
        </p>
      </section>

      <section className="mt-20">
        <span className="lab">Cuatro ideas que guían nuestro trabajo</span>
        <h2 className="mt-2">Cómo trabajamos</h2>
        <div className="steps md:!grid-cols-2 lg:!grid-cols-4">
          {COMO_TRABAJAMOS.map((item, i) => (
            <div key={item.titulo} className="border-t-2 border-salvia pt-3.5">
              <span className="block font-serif text-[2.6rem] font-light italic leading-none">{i + 1}</span>
              <h3>{item.titulo}</h3>
              <p>{item.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <span className="lab">Lo que nos mueve</span>
        <h2 className="mt-2">Misión, visión y valores</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {PILARES.map((p) => (
            <div key={p.titulo} className={`${p.color} rounded-[28px] p-7`}>
              <h3>{p.titulo}</h3>
              <p className="mt-3 text-[.95rem]">{p.texto}</p>
              <ul className="m-0 list-none space-y-1.5 p-0 text-[.92rem]">
                {p.puntos.map((x) => (
                  <li key={x} className="relative pl-5 before:absolute before:left-0 before:top-[.6em] before:h-2 before:w-2 before:rounded-full before:bg-hoja before:content-['']">{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-[32px] bg-panel p-[clamp(28px,5vw,56px)]">
        <span className="lab">Una sola puerta de entrada</span>
        <h2 className="mt-2">Valoración conjunta</h2>
        <p className="text-soft">Varios profesionales de Sinestesya valoran a la misma persona y trabajan con un único plan coordinado. Una sola puerta de entrada, una mirada completa: un equipo que se escucha y trabaja en la misma dirección.</p>
        <div className="steps md:!grid-cols-2 lg:!grid-cols-4">
          {VALORACION.map((item, i) => (
            <div key={item.titulo} className="border-t-2 border-current pt-3.5">
              <span className="block font-serif text-[2.6rem] font-light italic leading-none">{i + 1}</span>
              <h3>{item.titulo}</h3>
              <p className="mb-0">{item.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <span className="lab">Cuatro disciplinas</span>
        <h2 className="mt-2">Nuestras especialidades</h2>
        <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">{AREAS.map((a, i) => <AreaCard key={a.slug} area={a} i={i} />)}</div>
      </section>

      <section className="mt-20 rounded-[32px] bg-bosque p-[clamp(28px,5vw,56px)] text-center text-[#F3EEE5]">
        <h2 className="text-lino">¡Comienza tu camino hoy!</h2>
        <p className="mx-auto text-[#D3D9CF]">Escríbenos y te orientamos hacia el profesional o la valoración que mejor encaje contigo.</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {SITE.reservasAbiertas && <Link to="/reservar" className="btn !bg-lino !text-bosque">Reservar cita</Link>}
          <a href={wa} target="_blank" rel="noreferrer" className={SITE.reservasAbiertas ? 'btn btn-alt' : 'btn !bg-lino !text-bosque'}>Hablar con el equipo</a>
          <a href={`tel:+34${CONTACTO.telefono.replace(/\s/g, '')}`} className="btn btn-alt">Llamar al {CONTACTO.telefono}</a>
        </div>
        <Link to="/programas" className="mt-5 inline-block text-[.92rem] text-lino underline">Programas a medida para colegios y empresas</Link>
      </section>
    </div>
  )
}
