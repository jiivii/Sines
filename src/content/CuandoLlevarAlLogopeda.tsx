import { Link } from 'react-router-dom'
import { getTarifas } from '../services/tarifas'

const HITOS = [
  { edad: 'Hacia los 12 meses', texto: 'Balbucea con sílabas («papapa», «tatata»), responde a su nombre, señala lo que quiere y entiende palabras como «no» o «adiós». Pueden aparecer las primeras palabras.' },
  { edad: 'Hacia los 18 meses', texto: 'Dice varias palabras con intención, aunque no las pronuncie bien, y entiende órdenes sencillas como «dame la pelota».' },
  { edad: 'Hacia los 2 años', texto: 'Tiene un vocabulario de unas 50 palabras o más y empieza a juntar dos: «más agua», «papá no está».' },
  { edad: 'Hacia los 3 años', texto: 'Hace frases de tres o cuatro palabras, pregunta («¿qué es eso?») y las personas cercanas le entienden la mayor parte del tiempo.' },
  { edad: 'Hacia los 4 años', texto: 'Cuenta lo que ha hecho y se le entiende casi todo, también quien no le conoce. Algunos sonidos, como la «r» y la «rr», todavía pueden costarle.' },
  { edad: 'De 5 a 6 años', texto: 'Pronuncia la mayoría de los sonidos, incluida la «rr», mantiene una conversación y empieza a interesarse por letras y palabras escritas.' },
]

const SENALES = [
  'A los 12 meses no balbucea, no señala ni responde a su nombre.',
  'A los 18 meses no dice ninguna palabra.',
  'A los 2 años dice muy pocas palabras o no junta dos.',
  'A los 3 años las personas de fuera de la familia no le entienden.',
  'Pierde palabras o habilidades que ya tenía. En este caso, coméntalo también con el pediatra.',
  'Tartamudea durante más de unos meses, con tensión o con señales de que le hace sufrir.',
  'Tiene la voz ronca durante semanas sin estar resfriado.',
  'Le cuesta masticar o tragar, se atraganta a menudo o respira casi siempre por la boca.',
  'Ya en primaria, le cuesta mucho aprender a leer, confunde letras de forma persistente o lee mucho más despacio que sus compañeros.',
]

const CASA = [
  { t: 'Háblale mucho y escúchale', d: 'Pon palabras a lo que hacéis juntos y dale tiempo para responder, aunque tarde.' },
  { t: 'No le corrijas, repítelo bien', d: 'Si dice «mira, un tote», responde «sí, ¡un coche rojo!». Así oye el modelo correcto sin sentirse corregido.' },
  { t: 'Leed cuentos juntos', d: 'Señala dibujos, pregúntale qué pasa y deja que termine frases que ya conoce.' },
  { t: 'Menos pantallas, más juego', d: 'El lenguaje se aprende en la conversación con otras personas, no viendo vídeos.' },
]

const h2 = 'mt-12 text-[clamp(1.6rem,3.4vw,2.2rem)]'

export default function CuandoLlevarAlLogopeda() {
  const t = getTarifas('logopedia')
  const valoracion = t?.tarifas.find((x) => x.servicio === 'Valoración inicial')
  const devolucion = t?.tarifas.find((x) => x.servicio === 'Devolución de resultados')
  return (
    <>
      <p className="text-[1.15rem]">Cada niño tiene su ritmo para empezar a hablar, y comparar con el hijo de una amiga o con el hermano mayor suele generar más dudas que respuestas. Aun así, hay referencias que ayudan a saber cuándo todo va bien y cuándo merece la pena que lo vea un logopeda.</p>
      <p>Esta guía resume qué se espera a cada edad, qué señales indican que conviene consultar y qué pasa en una primera visita.</p>

      <h2 className={h2}>Qué se espera a cada edad</h2>
      <p className="text-soft">Las edades son orientativas: hay un margen normal de unos meses arriba o abajo.</p>
      <ol className="m-0 mt-5 list-none space-y-3 p-0">
        {HITOS.map((h) => (
          <li key={h.edad} className="rounded-[22px] bg-azul/20 p-5">
            <span className="block font-serif text-[1.35rem]">{h.edad}</span>
            <span className="mt-1 block">{h.texto}</span>
          </li>
        ))}
      </ol>

      <h2 className={h2}>Señales para consultar sin esperar</h2>
      <p>Si reconoces alguna de estas situaciones, pide una valoración:</p>
      <ul className="mb-4 list-disc space-y-2 pl-5">
        {SENALES.map((s) => <li key={s}>{s}</li>)}
      </ul>
      <p>Si tu hijo tarda en hablar o parece no oír bien, coméntalo también con el pediatra para descartar un problema de audición.</p>

      <h2 className={h2}>«Ya hablará»: por qué no conviene esperar</h2>
      <p>Muchos niños que empiezan tarde se ponen al día solos, pero no todos. Cuando hay una dificultad de lenguaje, trabajarla pronto facilita el aprendizaje, la relación con otros niños y, más adelante, la lectura y la escritura.</p>
      <p>Pedir una valoración no compromete a nada. Si todo va bien, te quedas tranquilo y con pautas para casa; si hay algo que trabajar, empezáis antes.</p>

      <h2 className={h2}>Qué pasa en la primera visita</h2>
      <p>
        En la <strong className="font-medium">valoración inicial</strong>{valoracion && <> ({valoracion.detalle} · {valoracion.precio})</>} hablamos con la familia sobre el desarrollo del niño y observamos cómo se comunica a través del juego y de pruebas adaptadas a su edad. Si tienes informes del pediatra, del colegio o de otros profesionales, tráelos.
      </p>
      <p>
        Después, en la <strong className="font-medium">devolución de resultados</strong>{devolucion && <> ({devolucion.detalle} · {devolucion.precio})</>}, te explicamos lo que hemos visto, si hace falta intervención y cómo sería el plan de trabajo. Si el caso lo necesita, coordinamos la valoración con psicología o fisioterapia dentro del mismo equipo.
      </p>

      <h2 className={h2}>Cómo ayudar en casa desde hoy</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {CASA.map((c) => (
          <div key={c.t} className="tile !p-6">
            <h3 className="text-[1.35rem]">{c.t}</h3>
            <p className="mb-0 mt-2 text-soft">{c.d}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-[.9rem] text-soft">
        Este artículo es informativo y no sustituye una valoración profesional. Más información en nuestra página de{' '}
        <Link to="/logopedia" className="underline">logopedia</Link>.
      </p>
    </>
  )
}
