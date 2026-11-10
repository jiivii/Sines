import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { EMPRESA } from '../config'
import { CONTACTO } from '../services/areas'

const pendiente = <em className="text-soft">pendiente de completar</em>
const dato = (v: string | null) => v ?? pendiente
const centro = CONTACTO.direccion.replace('\n', ', ')

function LegalLayout({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="wrap mt-14">
      <article className="mx-auto max-w-[760px] [&_h2]:mt-10 [&_h2]:text-[clamp(1.5rem,3vw,2rem)] [&_li]:mb-1.5 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5">
        <span className="lab">Información legal</span>
        <h1 className="mb-2 mt-2 text-[clamp(2.2rem,5vw,3.2rem)]">{titulo}</h1>
        <p className="text-[.9rem] text-soft">Última actualización: {EMPRESA.revisionLegal}</p>
        {!EMPRESA.legalRevisado && (
          <p role="note" className="rounded-2xl bg-ocre p-4 text-[.9rem] text-tinta">
            <strong className="font-medium">Borrador pendiente de revisión por la asesoría.</strong> Este texto puede cambiar antes de la apertura del centro.
          </p>
        )}
        {children}
        <p className="mt-12 text-[.9rem] text-soft">
          Ver también: <Link to="/aviso-legal">Aviso legal</Link> · <Link to="/privacidad">Política de privacidad</Link> · <Link to="/cookies">Política de cookies</Link>
        </p>
      </article>
    </div>
  )
}

function Titular() {
  return (
    <ul>
      <li><strong className="font-medium">Titular:</strong> {EMPRESA.razonSocial}</li>
      <li><strong className="font-medium">CIF:</strong> {dato(EMPRESA.cif)}</li>
      <li><strong className="font-medium">Domicilio social:</strong> {dato(EMPRESA.domicilioSocial)}</li>
      <li><strong className="font-medium">Centro:</strong> {centro}</li>
      <li><strong className="font-medium">Correo electrónico:</strong> <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a></li>
      <li><strong className="font-medium">Teléfono:</strong> {EMPRESA.telefono}</li>
    </ul>
  )
}

export function AvisoLegal() {
  return (
    <LegalLayout titulo="Aviso legal">
      <h2>1. Datos identificativos</h2>
      <p>En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), te informamos de los datos del titular de este sitio web:</p>
      <Titular />
      <ul>
        <li><strong className="font-medium">Datos registrales:</strong> {dato(EMPRESA.registroMercantil)}</li>
        <li><strong className="font-medium">Autorización sanitaria:</strong> {dato(EMPRESA.autorizacionSanitaria)}</li>
      </ul>
      <p>Los profesionales sanitarios del centro están colegiados en sus respectivos colegios profesionales. Los datos de colegiación de cada profesional están a tu disposición en el centro.</p>

      <h2>2. Objeto</h2>
      <p>Este sitio web informa sobre los servicios de psicología, logopedia, fisioterapia y nutrición del centro y permite ponerse en contacto con el equipo. La información publicada es general y no sustituye a una valoración profesional individual.</p>

      <h2>3. Condiciones de uso</h2>
      <p>Al navegar por este sitio aceptas usarlo de forma lícita, sin dañar su funcionamiento ni los derechos de terceros. Podemos modificar los contenidos y estas condiciones en cualquier momento; la versión vigente es la publicada en esta página.</p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>Los textos, imágenes, logotipos y diseño de este sitio pertenecen a {EMPRESA.razonSocial} o a sus legítimos titulares. No está permitida su reproducción, distribución o transformación sin autorización expresa, salvo para uso personal y privado.</p>

      <h2>5. Responsabilidad</h2>
      <p>Procuramos que la información sea correcta y esté actualizada, pero no garantizamos la ausencia de errores ni la disponibilidad continua del sitio. Los enlaces a sitios de terceros (por ejemplo, WhatsApp) se ofrecen por comodidad; no somos responsables de sus contenidos ni de sus políticas.</p>
      <p>Este sitio no presta atención sanitaria urgente. Si se trata de una urgencia, llama al <strong className="font-medium">112</strong>.</p>

      <h2>6. Legislación aplicable</h2>
      <p>Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la normativa vigente, y en particular a la de consumidores y usuarios cuando resulte aplicable.</p>
    </LegalLayout>
  )
}

export function Privacidad() {
  return (
    <LegalLayout titulo="Política de privacidad">
      <p>En Sinestesya tratamos datos personales de adultos, niños y familias, incluidos datos de salud. Por eso queremos explicarte con claridad qué hacemos con ellos, conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).</p>

      <h2>1. Responsable del tratamiento</h2>
      <Titular />

      <h2>2. Qué datos tratamos</h2>
      <ul>
        <li><strong className="font-medium">Contacto:</strong> nombre, teléfono, correo electrónico y el contenido de tu mensaje cuando nos llamas, escribes por WhatsApp o correo, o rellenas un formulario.</li>
        <li><strong className="font-medium">Cita:</strong> especialidad, día y hora, si la cita es para un adulto o para un menor y, en ese caso, su edad.</li>
        <li><strong className="font-medium">Salud:</strong> la información que nos cuentes sobre el motivo de consulta y, si eres paciente, la que forme parte de tu historia clínica.</li>
      </ul>
      <p>Te pedimos que en los mensajes previos a la cita compartas solo lo imprescindible. Los detalles de salud se recogen en consulta.</p>

      <h2>3. Para qué y con qué base legal</h2>
      <ul>
        <li><strong className="font-medium">Responder a tus consultas y gestionar citas:</strong> por tu solicitud y la aplicación de medidas precontractuales (art. 6.1.b RGPD) y por tu consentimiento (art. 6.1.a).</li>
        <li><strong className="font-medium">Prestar la asistencia sanitaria y llevar la historia clínica:</strong> por la relación asistencial y la obligación legal (arts. 6.1.b y 6.1.c RGPD), y para los datos de salud, por tratarse de asistencia sanitaria prestada por profesionales sujetos a secreto profesional (art. 9.2.h RGPD).</li>
        <li><strong className="font-medium">Avisarte de la apertura del centro u otras novedades:</strong> solo si das tu consentimiento expreso y por separado (art. 6.1.a RGPD). Puedes retirarlo en cualquier momento.</li>
        <li><strong className="font-medium">Cumplir obligaciones fiscales y contables:</strong> por obligación legal (art. 6.1.c RGPD).</li>
      </ul>

      <h2>4. Menores de edad</h2>
      <p>Los datos de menores de 14 años nos los facilita su padre, madre o tutor legal, que es quien da el consentimiento y ejerce sus derechos. A partir de los 14 años, el menor puede consentir por sí mismo el tratamiento de sus datos, sin perjuicio de lo que establezca la normativa sanitaria sobre el consentimiento informado para la atención.</p>

      <h2>5. Cuánto tiempo los conservamos</h2>
      <ul>
        <li>Consultas y solicitudes que no terminan en cita: hasta resolverlas y, como máximo, un año.</li>
        <li>Historia clínica: el tiempo exigido por la Ley 41/2002 de autonomía del paciente (como mínimo, cinco años desde el alta de cada proceso asistencial) y la normativa sanitaria de Aragón.</li>
        <li>Datos de facturación: los plazos que fija la normativa fiscal y mercantil.</li>
        <li>Avisos y novedades: hasta que retires tu consentimiento.</li>
      </ul>

      <h2>6. A quién se comunican</h2>
      <p>No vendemos ni cedemos tus datos. Solo se comunican a terceros cuando una ley lo exige (por ejemplo, a autoridades sanitarias o a la Agencia Tributaria) o con tu consentimiento.</p>
      <p>Algunos proveedores tratan datos por cuenta nuestra, con contrato de encargo y las garantías que exige el RGPD: alojamiento web, base de datos, envío de correo y programa de gestión del centro. Algunos de ellos pueden tratar datos fuera del Espacio Económico Europeo; en ese caso lo hacen con garantías adecuadas, como las cláusulas contractuales tipo de la Comisión Europea o el Marco de Privacidad de Datos UE–EE. UU.</p>
      <p>Si eliges escribirnos por WhatsApp, ese servicio lo presta Meta Platforms conforme a sus propias condiciones y política de privacidad.</p>

      <h2>7. Tus derechos</h2>
      <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, y retirar tu consentimiento en cualquier momento, escribiendo a <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a> o en el centro. Te pediremos que acredites tu identidad.</p>
      <p>Si consideras que no hemos atendido bien tu solicitud, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noreferrer">www.aepd.es</a>).</p>

      <h2>8. Seguridad</h2>
      <p>Aplicamos medidas técnicas y organizativas adecuadas a datos de salud: conexión cifrada, acceso restringido al personal autorizado y deber de secreto profesional de todo el equipo.</p>
    </LegalLayout>
  )
}

export function Cookies() {
  return (
    <LegalLayout titulo="Política de cookies">
      <h2>1. Qué son las cookies</h2>
      <p>Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar información sobre tu visita.</p>

      <h2>2. Cookies que usa este sitio</h2>
      <p>Este sitio <strong className="font-medium">no instala cookies propias ni de terceros</strong> con fines analíticos, publicitarios o de seguimiento. Por eso no te mostramos un aviso para aceptarlas.</p>
      <p>Para mostrar las tipografías, el sitio carga fuentes desde Google Fonts. Al hacerlo, tu navegador se conecta a servidores de Google, que recibe tu dirección IP. Google Fonts no instala cookies.</p>
      <p>Si pulsas un enlace a WhatsApp u otro servicio externo, ese servicio puede usar sus propias cookies según su política.</p>

      <h2>3. Cambios</h2>
      <p>Si en el futuro incorporamos herramientas de medición u otras cookies no necesarias, actualizaremos esta política y te pediremos tu consentimiento antes de instalarlas.</p>

      <h2>4. Cómo gestionarlas en tu navegador</h2>
      <p>Puedes consultar, bloquear o borrar las cookies desde la configuración de tu navegador (Chrome, Safari, Firefox, Edge…), normalmente en el apartado de privacidad.</p>
    </LegalLayout>
  )
}
