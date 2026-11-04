import { Brain, PersonStanding, Speech } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'
import { CONTACTO } from '../services/areas'
import { WHATSAPP } from '../config'

const DISCIPLINAS = [
  { nombre: 'Psicología', Icono: Brain, color: 'bg-amarillo/40', texto: 'Emociones, conducta y desarrollo personal del niño y de su familia.' },
  { nombre: 'Logopedia', Icono: Speech, color: 'bg-azul/40', texto: 'Lenguaje, habla y comunicación en los primeros años de vida.' },
  { nombre: 'Fisioterapia', Icono: PersonStanding, color: 'bg-verde/40', texto: 'Desarrollo motor, postura y movimiento adaptados a cada etapa.' },
]

const APORTA = [
  'Una mirada conjunta del desarrollo del niño.',
  'Objetivos compartidos entre los profesionales implicados.',
  'Pautas claras para casa: la familia forma parte del plan.',
  'Cada niño tiene su ritmo: adaptamos el plan a él y a su familia.',
]

export default function AtencionTemprana() {
  useTitle('Atención temprana')
  return (
    <div className="wrap">
      <section className="mt-10 rounded-[40px] bg-verde/30 p-[clamp(28px,6vw,64px)]">
        <span className="lab">Atención temprana</span>
        <h1 className="mb-3 mt-3">De 0 a 6 años</h1>
        <p className="max-w-[62ch] text-[1.15rem]">Intervención coordinada en los primeros años de vida. Psicología, logopedia y fisioterapia trabajan juntas y de la mano de la familia para acompañar el desarrollo del niño.</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn">Hablar con el equipo</a>
          <Link to="/quienes-somos" className="btn btn-alt">Cómo trabajamos</Link>
        </div>
      </section>

      <section className="mt-16">
        <h2>Tres disciplinas, un mismo niño</h2>
        <p className="text-soft">Cuando varias áreas trabajan a la vez, el plan deja de ser una suma de citas y pasa a ser un acompañamiento coherente.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {DISCIPLINAS.map(({ nombre, Icono, color, texto }) => (
            <div key={nombre} className="rounded-[26px] bg-panel p-6">
              <div className={`flex h-14 w-14 items-center justify-center rounded-full ${color}`}>
                <Icono size={28} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-serif text-2xl">{nombre}</h3>
              <p className="mb-0 mt-2 text-[.92rem] text-soft">{texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-center">
        <div>
          <span className="lab">Qué aporta</span>
          <h2 className="mt-2">Una mirada completa del desarrollo</h2>
          <p className="text-soft">No se trata de que el niño vaya de profesional en profesional, sino de que los profesionales se coordinen alrededor de él y de su familia.</p>
        </div>
        <ul className="m-0 list-none space-y-0 p-0">
          {APORTA.map((x) => (
            <li key={x} className="relative border-t border-line py-3 pl-6 before:absolute before:left-0 before:top-[1.35rem] before:h-2.5 before:w-2.5 before:rounded-full before:bg-verde before:content-['']">{x}</li>
          ))}
        </ul>
      </section>

      <section className="mt-20 rounded-[28px] bg-verde/20 p-8 text-center">
        <p className="mx-auto mb-3 max-w-[34ch] font-serif text-3xl font-light italic">Cuéntanos cómo es tu hijo o hija.</p>
        <p className="mx-auto mb-5 max-w-[52ch] text-soft">Te orientamos sobre si conviene una valoración conjunta y qué profesionales deberían participar.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn">Escríbenos por WhatsApp</a>
          <a href={`tel:+34${CONTACTO.telefono.replace(/\s/g, '')}`} className="btn btn-alt">Llamar al {CONTACTO.telefono}</a>
        </div>
      </section>

      <nav aria-label="Más páginas" className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[.9rem]">
        <Link to="/online" className="text-soft underline hover:text-ink">Atención online</Link>
        <Link to="/programas" className="text-soft underline hover:text-ink">Colegios y empresas</Link>
        <Link to="/quienes-somos" className="text-soft underline hover:text-ink">Quiénes somos</Link>
      </nav>
    </div>
  )
}
