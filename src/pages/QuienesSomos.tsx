import { Apple, Brain, PersonStanding, Speech } from "lucide-react";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { AREAS } from "../services/areas";
import { WHATSAPP } from "../config";

const ICONOS = {
  psicologia: Brain,
  logopedia: Speech,
  fisioterapia: PersonStanding,
  nutricion: Apple,
};

const COMO_TRABAJAMOS = [
  { numero: "1", titulo: "Escucha y valoración", descripcion: "Empezamos entendiendo a cada persona y su contexto, sin ideas preconcebidas." },
  { numero: "2", titulo: "Equipo coordinado", descripcion: "Las cuatro disciplinas comparten objetivos y se comunican entre sí." },
  { numero: "3", titulo: "Todas las etapas", descripcion: "Infancia, vida adulta y tercera edad, con un enfoque adaptado a cada una." },
  { numero: "4", titulo: "Cercanía", descripcion: "Un centro de barrio en La Puebla de Alfindén, con atención presencial y online." },
];

const VALORACION = [
  { numero: "1", titulo: "Primer contacto", descripcion: "Nos cuentas qué necesitas por teléfono o WhatsApp." },
  { numero: "2", titulo: "Valoración", descripcion: "Los profesionales implicados valoran a la persona desde su disciplina." },
  { numero: "3", titulo: "Plan coordinado", descripcion: "Ponemos en común lo observado y definimos objetivos compartidos." },
  { numero: "4", titulo: "Seguimiento", descripcion: "Revisamos la evolución y ajustamos el plan con la persona y su familia." },
];

export default function QuienesSomos() {
  useTitle("Quiénes somos");

  return (
    <div className="wrap">
      <section className="min-h-screen bg-[--bg] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          {/* Hero Section */}
          <div className="mb-20 text-center md:mb-24">
            <p className="mb-6 inline-block rounded-full bg-[--line] px-4 py-2 text-xs font-medium uppercase tracking-wider text-[--ink]">
              Salud integral multidisciplinar
            </p>

            <h1 className="mb-6 font-serif text-5xl font-bold leading-[1.1] tracking-tight text-[--ink] md:text-6xl lg:text-7xl">
              Sinestesya
            </h1>

            <p className="mx-auto max-w-2xl text-2xl leading-relaxed text-[--soft] md:text-3xl lg:text-4xl">
              Salud integral, en cada etapa de la vida. Psicología, logopedia, fisioterapia y nutrición bajo un mismo techo.
            </p>
          </div>

          {/* Cómo trabajamos */}
          <section className="mb-20">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold text-[--ink] md:text-4xl">Cómo trabajamos</h2>
            <p className="mb-12 text-center text-soft max-w-2xl mx-auto">Cuatro ideas que guían nuestro trabajo</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {COMO_TRABAJAMOS.map((item) => (
                <div key={item.numero} className="rounded-[28px] bg-panel p-8 border border-line">
                  <span className="block font-serif text-[2.6rem] font-light italic leading-none text-bosque">{item.numero}</span>
                  <h3 className="mt-2 font-serif text-xl text-[--ink]">{item.titulo}</h3>
                  <p className="mt-3 text-soft">{item.descripcion}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Discipline Logos Bar */}
          <div className="mb-16 grid grid-cols-2 justify-center gap-4 md:grid-cols-4">
            {AREAS.map((area) => {
              const Icono = ICONOS[area.slug];
              return (
                <div
                  key={area.slug}
                  className="flex cursor-pointer flex-col items-center gap-2 rounded-xl p-4 transition-colors hover:bg-[--panel]"
                >
                  {Icono && (
                    <div className={`flex items-center justify-center rounded-full p-3 transition-transform hover:scale-110 ${area.soft}`}>
                      <Icono size={32} strokeWidth={1.5} aria-hidden="true" className="text-[--ink]" />
                    </div>
                  )}
                  <p className="text-xs font-medium text-[--soft]">{area.nombre}</p>
                </div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Nuestra Misión */}
            <div className="group rounded-2xl border-l-4 border-[--ink] bg-[--panel] p-6 transition-colors hover:border-[--salvia] md:p-8">
              <h2 className="mb-4 font-serif text-2xl font-bold text-[--ink] transition-colors group-hover:text-[--salvia] md:text-3xl">
                Nuestra Misión
              </h2>
              <p className="mb-6 leading-relaxed text-[--soft]">
                Ofrecer una atención integral que una psicología, logopedia, fisioterapia y nutrición en un solo lugar, facilitando un enfoque holístico del bienestar para adultos y niños.
              </p>
              <ul className="space-y-2 text-[--soft]/90">
                <li className="flex items-start">
                  <span className="mr-3 mt-1 h-3 w-3 shrink-0 rounded-full bg-[--salvia]" />
                  Atención integral en un solo espacio
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 h-3 w-3 shrink-0 rounded-full bg-[--azul]" />
                  Enfoque holístico y personalizado
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 h-3 w-3 shrink-0 rounded-full bg-[--verde]" />
                  Adaptado a cada etapa de la vida
                </li>
              </ul>
            </div>

            {/* Nuestra Visión */}
            <div className="group rounded-2xl border-l-4 border-[--azul] bg-[--panel] p-6 transition-colors hover:border-[--azul]/80 md:p-8">
              <h2 className="mb-4 font-serif text-2xl font-bold text-[--ink] transition-colors group-hover:text-[--azul] md:text-3xl">
                Nuestra Visión
              </h2>
              <p className="mb-6 leading-relaxed text-[--soft]">
                Ser el referente en La Puebla de Alfindén de atención multidisciplinar cercana, profesional y de calidad, donde mente, cuerpo y lenguaje trabajan en armonía.
              </p>
              <ul className="space-y-2 text-[--soft]/90">
                <li className="flex items-start">
                  <span className="mr-3 mt-1 h-3 w-3 shrink-0 rounded-full bg-[--salvia]" />
                  Referente regional en bienestar integrado
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 h-3 w-3 shrink-0 rounded-full bg-[--verde]" />
                  Mente y cuerpo en armonía
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 h-3 w-3 shrink-0 rounded-full bg-[--naranja]" />
                  Acceso universal a calidad
                </li>
              </ul>
            </div>

            {/* Nuestros Valores */}
            <div className="group rounded-2xl border-l-4 border-[--salvia] bg-[--panel] p-6 transition-colors hover:border-[--salvia]/80 md:p-8">
              <h2 className="mb-4 font-serif text-2xl font-bold text-[--ink] transition-colors group-hover:text-[--salvia] md:text-3xl">
                Nuestros Valores
              </h2>
              <p className="mb-6 leading-relaxed text-[--soft]">
                Los pilares que guían cada interacción y decisión en nuestro centro, comprometidos con tu bienestar integral.
              </p>
              <ul className="space-y-2 text-[--soft]/90">
                <li className="flex items-start">
                  <span className="mr-3 mt-1 h-3 w-3 shrink-0 rounded-full bg-[--salvia]" />
                  Confianza y seguridad
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 h-3 w-3 shrink-0 rounded-full bg-[--azul]" />
                  Escucha atenta y empática
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 h-3 w-3 shrink-0 rounded-full bg-[--verde]" />
                  Acompañamiento profesional
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 h-3 w-3 shrink-0 rounded-full bg-[--naranja]" />
                  Excelencia en calidad
                </li>
              </ul>
            </div>

            {/* Valoración conjunta */}
            <div className="group rounded-2xl border-l-4 border-[--verde] bg-[--panel] p-6 transition-colors hover:border-[--verde]/80 md:p-8">
              <h2 className="mb-4 font-serif text-2xl font-bold text-[--ink] transition-colors group-hover:text-[--verde] md:text-3xl">
                Valoración conjunta
              </h2>
              <p className="mb-6 leading-relaxed text-[--soft]">
                Varios profesionales de Sinestesya valoran a la misma persona y trabajan con un único plan coordinado. Una sola puerta de entrada, una mirada completa.
              </p>
              <ul className="space-y-2 text-[--soft]/90">
                <li className="flex items-start">
                  <span className="mr-3 mt-1 h-3 w-3 shrink-0 rounded-full bg-[--salvia]" />
                  Una sola puerta de entrada
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 h-3 w-3 shrink-0 rounded-full bg-[--azul]" />
                                              Un plan coordinado
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 h-3 w-3 shrink-0 rounded-full bg-[--verde]" />
                  Equipo que se escucha y trabaja en la misma dirección
                </li>
              </ul>
            </div>
          </div>

          {/* Valoración conjunta - pasos */}
          <section className="mt-16">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold text-[--ink] md:text-4xl">Valoración conjunta, paso a paso</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {VALORACION.map((item) => (
                <div key={item.numero} className="border-t-2 border-current pt-3.5">
                  <span className="block font-serif text-[2.6rem] font-light italic leading-none">{item.numero}</span>
                  <h3 className="mt-2 font-serif text-xl text-[--ink]">{item.titulo}</h3>
                  <p className="mt-3 text-soft">{item.descripcion}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sección adicional: Por qué elegirnos - ANCHO COMPLETO */}
          <div className="mt-20 bg-gradient-to-r from-[--salvia]/5 to-[--azul]/5">
            <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
              <h2 className="mb-8 text-center font-serif text-3xl font-bold text-[--ink] md:text-4xl">
                ¿Por qué Sinestesya?
              </h2>
              <p className="mb-12 text-center text-soft max-w-2xl mx-auto">
                En la sinestesia los sentidos se mezclan y se complementan. En Sinestesya hacemos lo mismo con la salud: psicología, logopedia, fisioterapia y nutrición se encuentran bajo un mismo techo para cuidar de la persona completa.
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-4 inline-block rounded-full bg-[--salvia]/10 p-4">
                    <Brain size={32} strokeWidth={1.5} className="text-[--salvia]" />
                  </div>
                  <h3 className="mb-2 font-semibold text-[--ink]">Equipo Multidisciplinario</h3>
                  <p className="text-sm text-[--soft]">
                    Cuatro disciplinas que comparten objetivos y se comunican entre sí
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-4 inline-block rounded-full bg-[--azul]/10 p-4">
                    <Speech size={32} strokeWidth={1.5} className="text-[--azul]" />
                  </div>
                  <h3 className="mb-2 font-semibold text-[--ink]">Todas las etapas</h3>
                  <p className="text-sm text-[--soft]">
                    Infancia, vida adulta y tercera edad, con un enfoque adaptado a cada una
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-4 inline-block rounded-full bg-[--verde]/10 p-4">
                    <PersonStanding size={32} strokeWidth={1.5} className="text-[--verde]" />
                  </div>
                  <h3 className="mb-2 font-semibold text-[--ink]">Cercanía</h3>
                  <p className="text-sm text-[--soft]">
                    Centro de barrio en La Puebla de Alfindén, presencial y online
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4">
            {/* Team Section */}
            <div className="mt-20 grid gap-6 md:mt-24 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  nombre: "Psicología",
                  descripcion: "Bienestar emocional",
                  Icono: Brain,
                  color: "--naranja",
                },
                {
                  nombre: "Logopedia",
                  descripcion: "Comunicación y lenguaje",
                  Icono: Speech,
                  color: "--azul",
                },
                {
                  nombre: "Fisioterapia",
                  descripcion: "Movimiento y funcionalidad",
                  Icono: PersonStanding,
                  color: "--verde",
                },
                {
                  nombre: "Nutrición",
                  descripcion: "Salud y equilibrio",
                  Icono: Apple,
                  color: "--salvia",
                },
              ].map(({ nombre, descripcion, Icono, color }) => (
                <div
                  key={nombre}
                  className="rounded-2xl border-l-4 border-[--line] bg-[--panel] p-6 text-center"
                >
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: `var(${color})20` }}
                  >
                    <Icono size={32} strokeWidth={1.5} aria-hidden="true" style={{ color: `var(${color})` }} />
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-bold text-[--ink]">{nombre}</h3>
                  <p className="text-sm text-[--soft]/80">{descripcion}</p>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <section className="mt-24 rounded-3xl border border-[--line]/50 bg-gradient-to-b from-[--salvia]/10 to-[--naranja]/10 p-8 text-center md:mt-32 md:p-12">
              <h2 className="mb-4 font-serif text-3xl font-bold text-[--ink] md:text-4xl">
                ¡Comienza tu camino hoy!
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-[--soft]">
                Escríbenos y te orientamos hacia el profesional o la valoración que mejor encaje contigo.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-[--salvia] px-6 py-3 font-semibold text-[--lino] transition-colors hover:bg-[--salvia]/90"
                >
                  Hablar con el equipo
                </a>
                <Link
                  to="/programas"
                  className="rounded-lg border border-[--salvia] px-6 py-3 font-semibold text-[--salvia] transition-colors hover:bg-[--salvia]/10"
                >
                  Programas a medida
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
