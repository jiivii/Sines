import { Link } from 'react-router-dom'
import AreaCard from '../components/AreaCard'
import Wave from '../components/Wave'
import { AREAS } from '../services/areas'
import { useTitle } from '../hooks/useTitle'

export default function Home() {
  useTitle()
  return (
    <div className="wrap">
      <div className="mt-5 grid gap-4 md:grid-cols-[1.25fr_1fr]">
        <div className="flex flex-col justify-center rounded-[40px] bg-bosque p-[clamp(28px,5vw,56px)] text-[#F3EEE5]">
          <span className="lab mb-4 text-ocre">Centro de bienestar</span>
          <h1>Cuidado integral, <i className="font-light">en cada etapa de la vida.</i></h1>
          <p className="mt-4 text-[#D3D9CF]">Sinestesya nace con una idea sencilla: cuidar de la salud no debería obligarte a ir de puerta en puerta. Somos un centro multidisciplinar sanitario en La Puebla de Alfindén que reúne psicología, logopedia, fisioterapia y nutrición bajo un mismo techo.</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link to="/reservar" className="btn !bg-lino !text-bosque">Reservar cita</Link>
            <a href="#servicios" className="btn btn-alt">Ver servicios</a>
          </div>
        </div>
        <div className="grid place-items-center rounded-[40px] bg-panel p-8">
          <div className="flex flex-col items-center gap-4 text-center p-6">
            <p className="text-3xl font-light text-bosque mt-2">Calle Fuertes, 1</p>
            <p className="text-sm text-[#66726A]">La Puebla de Alfindén, Zaragoza</p>
            <p className="text-xs text-[#788A99]">Código postal 50171</p>
          </div>
        </div>
      </div>
      <Wave className="mt-16 block h-auto w-full" />

      <section id="servicios" className="mt-12">
        <h2>Cuatro caminos, un mismo propósito</h2>
        <p className="text-soft">Psicología, logopedia, fisioterapia y nutrición se encuentran bajo un mismo techo para cuidar de la persona completa. Empieza por donde lo necesites; el resto del equipo se une cuando haga falta.</p>
        <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">{AREAS.map((a, i) => <AreaCard key={a.slug} area={a} i={i} />)}</div>
      </section>

      <section className="mt-20 grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] bg-amarillo/25 p-8"><span className="lab">Adultos</span><h2 className="mt-2">Cada momento vital</h2><p>Ansiedad, estrés y depresión, duelo, autoestima, gestión emocional, relaciones y procesos vitales. También fisioterapia neurológica, nutrición deportiva y control de patologías.</p></div>
        <div className="rounded-[28px] bg-azul/25 p-8"><span className="lab">Infancia y adolescencia</span><h2 className="mt-2">0 – 18 años</h2><p>Dificultades emocionales y de conducta, lenguaje y habla, lectoescritura y dislexia, fisioterapia pediátrica, alimentación infantil y orientación a familias.</p></div>
      </section>

      <section className="mt-20 grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] bg-verde/25 p-8"><span className="lab">Tercera edad</span><h2 className="mt-2">Autonomía y bienestar</h2><p>Acompañamiento emocional, estimulación cognitiva, movilidad y equilibrio, prevención de caídas y alimentación adaptada.</p></div>
        <div className="rounded-[28px] bg-naranja/25 p-8"><span className="lab">Online</span><h2 className="mt-2">Salud a distancia</h2><p>Sesiones desde casa, sin desplazamientos. Cita a tu medida, con los profesionales del centro cerca de ti.</p></div>
      </section>

      <section className="mt-20">
        <h2>Cómo empezamos</h2>
        <div className="steps">
          {[['Escríbenos o llámanos', 'Al 602 533 313, también por WhatsApp.'], ['Cuéntanos tu caso', 'Te orientamos hacia el profesional o la valoración conjunta que mejor encaje.'], ['Primera cita', 'En La Puebla de Alfindén o a distancia, como prefieras.']].map(([t, d], i) => (
            <div key={t} className="border-t-2 border-salvia pt-3.5"><span className="block font-serif text-[2.6rem] font-light italic leading-none">{i + 1}</span><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-[28px] bg-panel p-[clamp(34px,6vw,64px)] text-center">
        <p className="mx-auto mb-5 max-w-[30ch] font-serif text-[clamp(1.5rem,3vw,2.2rem)] font-light italic leading-tight">Elige cómo empezar. El resto del equipo se une cuando lo necesites.</p>
        <Link to="/reservar" className="btn">Reservar cita</Link>
      </section>
    </div>
  )
}
