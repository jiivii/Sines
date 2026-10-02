import { Link } from 'react-router-dom'
import AreaCard from '../components/AreaCard'
import Logo from '../components/Logo'
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
          <p className="mt-4 text-[#D3D9CF]">Un único equipo que te escucha entera, no por partes. Psicología, logopedia, fisioterapia y nutrición, para adultos y niños.</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link to="/reservar" className="btn !bg-lino !text-bosque">Reservar cita</Link>
            <a href="#servicios" className="btn btn-alt">Ver servicios</a>
          </div>
        </div>
        <div className="grid place-items-center rounded-[40px] bg-panel p-8"><div className="w-full max-w-[420px]"><Logo /></div></div>
      </div>
      <Wave className="mt-16 block h-auto w-full" />

      <section id="servicios" className="mt-12">
        <h2>Cuatro caminos, un mismo propósito</h2>
        <p className="text-soft">Mente, voz, cuerpo y alimento se tratan juntos. Empieza por donde lo necesites; el resto del equipo se une cuando haga falta.</p>
        <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">{AREAS.map((a, i) => <AreaCard key={a.slug} area={a} i={i} />)}</div>
      </section>

      <section className="mt-20 grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] bg-salvia/25 p-8"><span className="lab">Adultos</span><h2 className="mt-2">Para ti</h2><p>Consulta individual con tiempo para escucharte y un plan que encaje con tu día a día.</p></div>
        <div className="rounded-[28px] bg-terracota/25 p-8"><span className="lab">Niños y adolescentes</span><h2 className="mt-2">Para los más pequeños</h2><p>Sesiones adaptadas a su edad, con juego y con las familias siempre dentro del proceso.</p></div>
      </section>

      <section className="mt-20">
        <h2>Cómo empezamos</h2>
        <div className="steps">
          {[['Elige cómo empezar', 'Reserva en la especialidad que más te llame. No hace falta tenerlo claro.'], ['Te escuchamos', 'En la primera sesión conocemos tu historia completa y definimos un plan contigo.'], ['Seguimos juntos', 'Si otra área puede ayudarte, el equipo se coordina. Aquí estamos para lo que venga.']].map(([t, d], i) => (
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
