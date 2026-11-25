# Sinestesya · Salud integral

Web de Sinestesya (psicología, logopedia, fisioterapia y nutrición; adultos y niños) con reserva online. Las reservas se gestionan desde Órbita (Web1).
Stack: Vite + React + TypeScript + Tailwind · web estática en Cloudflare Pages. La web no tiene base de datos ni claves: los huecos y las solicitudes de cita van directamente a Órbita (función `web-booking` de Supabase).

## Estructura
- `src/pages` · `Home`, `Servicio` (una página por especialidad, con su color), `Reservar`, `Legal` (aviso legal, privacidad y cookies)
- `src/services` · datos de las áreas y llamadas a Órbita (`bookings.ts`)
- `src/config.ts` · ajustes del sitio (`reservasAbiertas`, dirección de la función de reservas) y datos legales de la empresa (`EMPRESA`: CIF, domicilio social…)
- `src/seo.ts` · título, descripción y dominio de cada página (también genera el sitemap)
- `scripts/prerender.mjs` · al compilar crea un HTML por página (`dist/logopedia.html`…), `404.html` y `sitemap.xml`
- `public/` · `og.png` (imagen para redes), `robots.txt` e iconos: `favicon.ico` (16/32/48), `favicon-32.png`, `apple-touch-icon.png` (180), `icon-192/512.png` y `site.webmanifest`. Son la S del logo sobre verde bosque (#3E4A41), recortada de `src/assets/logo-sinestesya.png`; si llega el logo en vectorial, conviene regenerarlos desde él.
- `public/_headers` y `public/_redirects` · cabeceras de seguridad (incluida la Content-Security-Policy), caché y redirecciones de Cloudflare Pages

## Desarrollo
```bash
npm install
npm run dev                      # web en http://localhost:5173 (las reservas usan Órbita en Supabase)
npm run build && npm run preview # web compilada (páginas generadas)
```
`npm run build` comprueba tipos, compila y genera en `dist/` una página HTML por ruta, la 404 y el sitemap.
Para añadir una página: crea la ruta en `src/App.tsx` y su título y descripción en `src/seo.ts`.
Para añadir un artículo: sus datos en `src/content/articulos.ts`, el texto en un componente de `src/content/` y su entrada en `CUERPOS` (`src/pages/Blog.tsx`). Con `revisado: false` se publica sin indexar.
Para añadir una página por problema (p. ej. «suelo pélvico»): añade una entrada en `src/content/problemas.ts`; la ruta, el SEO, los enlaces desde la especialidad y el mensaje de WhatsApp se generan solos. También con `revisado`.

## Reservas online
- Quién decide los huecos: **Órbita**. Primer día con cita (ahora 1 de febrero de 2027), horario, festivos, minutos entre huecos y qué sesiones se pueden reservar están en la tabla `web_booking_settings` y en «Servicios» de Órbita (ver `supabase/reservas_web.sql` en el repositorio de Órbita). La duración de cada sesión es la del tarifario.
- La web solo muestra lo que devuelve Órbita. Si Órbita tiene las reservas paradas o no responde, `/reservar` muestra teléfono y WhatsApp.
- Las solicitudes llegan a Órbita como **pendientes**; Administración las confirma en «Solicitudes web».
- `SITE.reservasAbiertas` (en `src/config.ts`) solo enseña u oculta los botones de reserva de la web.

## Puesta en producción (Cloudflare Pages)
1. Cloudflare → Workers & Pages → Create → Pages → conectar el repositorio `jiivii/Sines`.
2. Build command: `npm run build`; directorio de salida: `dist`. No hace falta ninguna variable de entorno.
3. Dominio: la web se sirve en `www.sinestesya.es` (Custom domains de Cloudflare + CNAME `www` en STRATO). `sinestesya.es` sin www sigue apuntando a Vercel, que solo hace de desvío a `https://www.sinestesya.es` (archivo `vercel.json`; STRATO no tiene certificado, por eso no se usa su redirección). Los DNS y el correo siguen en STRATO.
4. En Supabase (Órbita), la función `web-booking` acepta por defecto `https://sinestesya.es` y `https://www.sinestesya.es`. Para probar en la dirección `*.pages.dev`, añade el secret `WEB_BOOKING_ALLOWED_ORIGINS` con las tres direcciones separadas por comas.
5. No borrar el proyecto de Vercel mientras `sinestesya.es` apunte a él: hace el desvío a www. Sí se puede borrar su base de datos de Supabase antigua (tabla `reservas`).

## Seguridad
- La web no guarda datos ni claves: no hay funciones de servidor ni clave de servicio. Nunca pongas claves con prefijo `VITE_` (acaban en el navegador).
- Órbita repite todas las comprobaciones en el servidor (fecha de inicio, horario, duración, hueco libre con candado por área), limita las solicitudes por conexión y por persona y descarta las que rellenan el campo trampa.
- Si llega spam, se puede añadir un captcha (p. ej. Cloudflare Turnstile).

## Antes de abrir al público
- Sustituir teléfono, dirección y horario (`src/services/areas.ts`, `CONTACTO`; horario en `MainLayout.tsx` y `src/utils/dates.ts`).
- Completar `EMPRESA` en `src/config.ts` (CIF, domicilio social, registro y autorización sanitaria) y, tras la revisión de la asesoría, poner `legalRevisado: true`.
- Revisar con el equipo sanitario los textos de cada especialidad.
