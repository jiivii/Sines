import { useEffect } from 'react'
export function useTitle(t?: string) {
  useEffect(() => { document.title = (t ? `${t} · ` : '') + 'Sinestesya · Salud integral' }, [t])
}
