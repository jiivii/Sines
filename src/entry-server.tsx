import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

export { RUTAS, NOT_FOUND, getSeo, headHtml, urlCanonica } from './seo'

/** HTML de una ruta, para generar las páginas estáticas al compilar. */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
