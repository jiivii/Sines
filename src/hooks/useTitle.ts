import { useEffect } from 'react'
export function useTitle(t?: string) {
  useEffect(() => { document.title = (t ? `${t} · ` : '') + 'Sinestesya · Centro de bienestar' }, [t])
}
