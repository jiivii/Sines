import logo from '../assets/logo.jpg'

/** Logotipo original sin modificar, siempre sobre lino. */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div role="img" aria-label="Logotipo de Sinestesya"
      className={`block aspect-[940/790] w-full bg-lino bg-no-repeat ${className}`}
      style={{ backgroundImage: `url(${logo})`, backgroundPosition: '50.96% 51.7%', backgroundSize: '133.4% auto' }} />
  )
}
