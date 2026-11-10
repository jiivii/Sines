// Genera un HTML por ruta (con su título, descripción y contenido), la página 404 y el sitemap.
// Se ejecuta después de `vite build` y `vite build --ssr`.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const ssrDir = path.resolve('dist-ssr')
const { render, RUTAS, NOT_FOUND, getSeo, headHtml, urlCanonica } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const plantilla = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
if (!/<!--seo-->[\s\S]*?<!--\/seo-->/.test(plantilla) || !plantilla.includes('<div id="root"></div>')) {
  throw new Error('index.html no tiene las marcas <!--seo--> o <div id="root"></div>.')
}

const pagina = (url, seo, ruta) =>
  plantilla
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, headHtml(seo, ruta))
    .replace('<div id="root"></div>', () => `<div id="root">${render(url)}</div>`)

for (const ruta of RUTAS) {
  // /logopedia -> dist/logopedia.html (Vercel lo sirve en /logopedia con cleanUrls)
  const archivo = ruta === '/' ? 'index.html' : `${ruta.slice(1)}.html`
  fs.writeFileSync(path.join(dist, archivo), pagina(ruta, getSeo(ruta), ruta))
}
fs.writeFileSync(path.join(dist, '404.html'), pagina('/404', NOT_FOUND, null))

const urls = RUTAS.filter((r) => !getSeo(r).noindex)
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((r) => `  <url><loc>${urlCanonica(r)}</loc></url>`).join('\n')}\n</urlset>\n`,
)

fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`Prerenderizadas ${RUTAS.length} rutas + 404 · sitemap con ${urls.length} URL`)
