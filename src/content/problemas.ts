import type { AreaSlug } from '../types'
import type { Faq } from '../services/faq'

/**
 * Páginas por problema concreto (búsquedas como «suelo pélvico La Puebla de Alfindén»).
 * Contenido sanitario: mientras `revisado` sea false, la página se publica con noindex
 * y queda fuera del sitemap. Ponlo a true cuando la revise el profesional del área.
 */
export interface Problema {
  slug: string
  /** Nombre corto (menú, enlaces y mensaje de WhatsApp). */
  nombre: string
  /** Título visible (h1). */
  titulo: string
  /** Título y descripción para Google. */
  seoTitulo: string
  descripcion: string
  /** Área principal (color) y otras que intervienen. */
  area: AreaSlug
  otras: AreaSlug[]
  intro: string
  paraTi: string[]
  como: { titulo: string; texto: string }[]
  /** Servicios del tarifario que corresponden a la primera visita. */
  primera: { area: AreaSlug; servicio: string }[]
  /** Aviso destacado (p. ej. cuándo acudir a urgencias). */
  aviso?: string
  faq: Faq[]
  revisado: boolean
}

export const PROBLEMAS: Problema[] = [
  {
    slug: 'suelo-pelvico',
    nombre: 'suelo pélvico',
    titulo: 'Fisioterapia de suelo pélvico',
    seoTitulo: 'Fisioterapia de suelo pélvico en La Puebla de Alfindén',
    descripcion: 'Fisioterapia de suelo pélvico en La Puebla de Alfindén: pérdidas de orina, postparto, sensación de peso, dolor pélvico y menopausia. Valoración y tratamiento.',
    area: 'fisioterapia',
    otras: [],
    intro: 'El suelo pélvico es el conjunto de músculos que sostiene la vejiga, el útero y el recto. Embarazo, parto, menopausia, cirugías o el deporte de impacto pueden debilitarlo o tensarlo. Trabajarlo con un fisioterapeuta mejora síntomas muy frecuentes de los que a menudo no se habla.',
    paraTi: [
      'Se te escapa la orina al toser, reír, saltar o hacer deporte, o tienes urgencia por ir al baño.',
      'Has dado a luz y quieres recuperar el suelo pélvico y el abdomen.',
      'Notas sensación de peso o de «bulto» en la zona genital.',
      'Tienes dolor pélvico o dolor en las relaciones sexuales.',
      'Estás en la menopausia y han aparecido molestias nuevas.',
      'Te han operado de próstata y tienes pérdidas de orina.',
    ],
    como: [
      { titulo: 'Valoración', texto: 'Hablamos de tus síntomas, tus embarazos y partos, tus hábitos y tu actividad física, y valoramos la postura, la respiración y el abdomen. Si hace falta una exploración más específica, te la explicamos antes y solo se hace con tu consentimiento.' },
      { titulo: 'Tratamiento', texto: 'Ejercicios de suelo pélvico y de abdomen adaptados a ti, técnicas manuales y pautas para el día a día: cómo hacer esfuerzos, ir al baño o volver al deporte sin molestias.' },
      { titulo: 'Seguimiento', texto: 'Revisamos tu evolución y ajustamos los ejercicios para que puedas mantener los resultados por tu cuenta.' },
    ],
    primera: [{ area: 'fisioterapia', servicio: 'Primera valoración + tratamiento' }],
    faq: [
      { q: '¿Cuándo puedo empezar después del parto?', a: 'Lo habitual es esperar a la revisión de la cuarentena con tu matrona o ginecólogo. Si tienes molestias antes, consúltanos y te orientamos.' },
      { q: '¿Las pérdidas de orina son normales después de tener hijos o con la edad?', a: 'Son frecuentes, pero no hay que resignarse: en muchos casos mejoran con fisioterapia. Merece la pena consultarlo.' },
      { q: '¿Es solo para mujeres?', a: 'No. También tratamos a hombres, por ejemplo con pérdidas de orina después de una cirugía de próstata.' },
    ],
    revisado: false,
  },
  {
    slug: 'tdah-y-tea',
    nombre: 'TDAH y TEA',
    titulo: 'TDAH y TEA en niños y adolescentes',
    seoTitulo: 'TDAH y TEA en niños: psicología y logopedia en La Puebla de Alfindén',
    descripcion: 'Acompañamiento a niños y adolescentes con TDAH o TEA en La Puebla de Alfindén: psicología y logopedia coordinadas, con la familia y el colegio.',
    area: 'psicologia',
    otras: ['logopedia'],
    intro: 'El TDAH (trastorno por déficit de atención e hiperactividad) y el TEA (trastorno del espectro autista) afectan a cómo un niño presta atención, se comunica, se relaciona o regula su conducta. Cada niño es distinto, y lo que más ayuda es un plan adaptado a él, coordinado entre profesionales, familia y colegio.',
    paraTi: [
      'A tu hijo/a le cuesta mucho mantener la atención, se mueve sin parar o actúa sin pensar, y eso le afecta en casa o en clase.',
      'Notas dificultades para comunicarse, para jugar con otros niños o para adaptarse a los cambios.',
      'Ya tiene un diagnóstico de TDAH o TEA y buscáis apoyo terapéutico cerca de casa.',
      'El colegio os ha comentado que vale la pena valorarlo.',
    ],
    como: [
      { titulo: 'Valoración', texto: 'Psicología valora la atención, la conducta y las emociones; logopedia, la comunicación y el lenguaje cuando hace falta. Si el niño ya tiene informes, partimos de ellos.' },
      { titulo: 'Plan coordinado', texto: 'Definimos objetivos comunes entre las dos disciplinas y, con vuestro permiso, nos coordinamos con el pediatra, el neuropediatra o el colegio.' },
      { titulo: 'Familia dentro del plan', texto: 'Os damos pautas para casa y revisamos juntos la evolución, porque los avances se consolidan en el día a día.' },
    ],
    primera: [
      { area: 'psicologia', servicio: 'Primera consulta / sesión individual' },
      { area: 'logopedia', servicio: 'Valoración inicial' },
    ],
    faq: [
      { q: '¿Hacéis el diagnóstico?', a: 'Hacemos una valoración psicológica y logopédica que ayuda a entender qué le pasa al niño. Cuando hace falta, nos coordinamos con el pediatra o el neuropediatra, que intervienen en el diagnóstico médico.' },
      { q: '¿Necesito un diagnóstico para empezar?', a: 'No. Podemos empezar a trabajar con las dificultades que observáis, tenga o no un diagnóstico.' },
      { q: '¿Trabajáis con el colegio?', a: 'Sí, con vuestra autorización compartimos pautas con el tutor o el equipo de orientación para que todos vayamos en la misma dirección.' },
    ],
    revisado: false,
  },
  {
    slug: 'dislexia',
    nombre: 'dislexia',
    titulo: 'Dislexia y dificultades de lectoescritura',
    seoTitulo: 'Dislexia y dificultades de lectura en La Puebla de Alfindén',
    descripcion: 'Logopedia para la dislexia y las dificultades de lectura y escritura en La Puebla de Alfindén: valoración, intervención y coordinación con el colegio.',
    area: 'logopedia',
    otras: ['psicologia'],
    intro: 'La dislexia es una dificultad específica para aprender a leer y escribir con fluidez, que no tiene que ver con la inteligencia ni con el esfuerzo. Detectarla y trabajarla pronto evita que el niño se frustre y se quede atrás en el colegio.',
    paraTi: [
      'A tu hijo/a le cuesta mucho aprender a leer, o lee muy despacio y con errores para su curso.',
      'Confunde, cambia u omite letras de forma persistente al leer o escribir.',
      'Lee pero no entiende bien lo que ha leído, o evita leer.',
      'Las tareas escolares le cuestan mucho más que a sus compañeros y está perdiendo la confianza.',
    ],
    como: [
      { titulo: 'Valoración', texto: 'Evaluamos la lectura, la escritura y las habilidades en las que se apoyan, como la conciencia de los sonidos o la memoria. Después te explicamos los resultados en la devolución.' },
      { titulo: 'Intervención', texto: 'Sesiones con ejercicios y estrategias adaptadas a su edad y a lo que más le cuesta, para ganar precisión, velocidad y comprensión.' },
      { titulo: 'Colegio y familia', texto: 'Proponemos adaptaciones y pautas para el aula y para casa. Si la dificultad afecta a la autoestima, psicología se une al plan.' },
    ],
    primera: [
      { area: 'logopedia', servicio: 'Valoración inicial' },
      { area: 'logopedia', servicio: 'Devolución de resultados' },
    ],
    faq: [
      { q: '¿A qué edad se puede valorar?', a: 'Las dificultades suelen notarse al aprender a leer, en los primeros cursos de primaria. Si ves señales antes, como problemas con los sonidos de las palabras, también se pueden trabajar.' },
      { q: '¿La dislexia se cura?', a: 'Es una forma diferente de procesar la lectura que acompaña a la persona, pero con intervención la lectura y la escritura mejoran mucho y el niño aprende estrategias para compensarla.' },
    ],
    revisado: false,
  },
  {
    slug: 'terapia-de-pareja',
    nombre: 'terapia de pareja',
    titulo: 'Terapia de pareja',
    seoTitulo: 'Terapia de pareja en La Puebla de Alfindén · Psicología',
    descripcion: 'Terapia de pareja en La Puebla de Alfindén: comunicación, conflictos, crisis y decisiones importantes. Sesiones de 60 minutos, presenciales u online.',
    area: 'psicologia',
    otras: [],
    intro: 'Todas las parejas pasan por momentos difíciles. La terapia de pareja es un espacio neutral para entender qué está pasando, comunicaros mejor y decidir juntos cómo queréis seguir.',
    paraTi: [
      'Discutís a menudo por los mismos temas o sentís que ya no os escucháis.',
      'Estáis pasando por una crisis: una infidelidad, la llegada de un hijo, un cambio de trabajo o una pérdida.',
      'Os habéis distanciado y queréis recuperar la relación.',
      'Estáis valorando separaros y queréis hacerlo de la mejor manera posible, sobre todo si hay hijos.',
    ],
    como: [
      { titulo: 'Primera sesión', texto: 'Escuchamos a los dos: cómo veis la relación, qué os ha traído y qué esperáis de la terapia.' },
      { titulo: 'Trabajo en sesión', texto: 'Trabajamos la comunicación, la gestión de los conflictos y los temas concretos que os preocupan. En ocasiones puede haber alguna sesión individual.' },
      { titulo: 'Entre sesiones', texto: 'Os proponemos pequeñas tareas para poner en práctica en casa lo trabajado.' },
    ],
    primera: [{ area: 'psicologia', servicio: 'Terapia de pareja' }],
    faq: [
      { q: '¿Tenemos que venir los dos?', a: 'Lo ideal es que sí, pero si tu pareja no quiere venir, puedes empezar con sesiones individuales para trabajar cómo vives la relación.' },
      { q: '¿Se puede hacer online?', a: 'Sí. La terapia de pareja puede hacerse por videollamada, incluso si cada uno se conecta desde un lugar distinto.' },
    ],
    revisado: false,
  },
  {
    slug: 'tca',
    nombre: 'trastornos de la conducta alimentaria',
    titulo: 'Trastornos de la conducta alimentaria (TCA)',
    seoTitulo: 'Trastornos de la conducta alimentaria (TCA) en La Puebla de Alfindén',
    descripcion: 'Tratamiento de los TCA en La Puebla de Alfindén: psicología y nutrición coordinadas para adolescentes y adultos con anorexia, bulimia o atracones.',
    area: 'psicologia',
    otras: ['nutricion'],
    intro: 'Los trastornos de la conducta alimentaria, como la anorexia, la bulimia o el trastorno por atracón, afectan a la relación con la comida, con el cuerpo y con uno mismo. Se tratan mejor cuando psicología y nutrición trabajan juntas, y con la familia cuando se trata de adolescentes.',
    paraTi: [
      'Tú o tu hijo/a pensáis constantemente en la comida, el peso o la figura.',
      'Hay restricción, saltos de comidas, dietas muy estrictas o ejercicio excesivo para compensar.',
      'Hay episodios de comer mucho sin control, con culpa después, o conductas para «compensar».',
      'Has notado cambios de peso importantes, aislamiento a la hora de comer o malestar con el propio cuerpo.',
    ],
    como: [
      { titulo: 'Valoración conjunta', texto: 'Psicología valora la relación con la comida, las emociones y el contexto; nutrición, los hábitos, el estado nutricional y las pautas necesarias.' },
      { titulo: 'Tratamiento coordinado', texto: 'Las dos disciplinas comparten objetivos y se reúnen para ajustar el plan. Con adolescentes, la familia participa de forma activa.' },
      { titulo: 'Coordinación médica', texto: 'Con tu permiso, nos coordinamos con tu médico de cabecera o con salud mental cuando el caso lo requiere.' },
    ],
    primera: [
      { area: 'psicologia', servicio: 'Primera consulta / sesión individual' },
      { area: 'nutricion', servicio: 'Primera consulta completa' },
    ],
    aviso: 'Si hay una pérdida de peso rápida, desmayos, vómitos frecuentes o pensamientos de hacerse daño, acude a tu médico o a urgencias. En una emergencia, llama al 112. Si tienes pensamientos de suicidio, puedes llamar al 024, la línea de atención a la conducta suicida, gratuita y disponible las 24 horas.',
    faq: [
      { q: '¿Hace falta que la persona quiera venir?', a: 'Ayuda mucho, pero es frecuente que al principio no vea el problema. Si eres familiar, puedes consultarnos tú primero y te orientamos sobre cómo abordarlo.' },
      { q: '¿Por qué psicología y nutrición a la vez?', a: 'Porque un TCA no es solo un problema de comida ni solo emocional. Trabajar ambas partes de forma coordinada da mejores resultados.' },
    ],
    revisado: false,
  },
]

export const getProblema = (slug?: string) => PROBLEMAS.find((p) => p.slug === slug)
