import type { Faq } from '../services/faq'

/** Preguntas frecuentes desplegables (funcionan sin JavaScript). */
export default function FaqList({ items, titulo = 'Preguntas frecuentes', className = '' }: { items: Faq[]; titulo?: string; className?: string }) {
  if (!items.length) return null
  return (
    <section id="preguntas" className={className}>
      <span className="lab">Resolvemos tus dudas</span>
      <h2 className="mt-2">{titulo}</h2>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {items.map((f) => (
          <details key={f.q} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 font-serif text-[1.3rem] leading-snug [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden="true" className="shrink-0 text-2xl font-light transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-4 text-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
