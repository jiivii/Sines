# Plan de mejoras · Sinestesya

Leyenda: ⬜ pendiente · 🟨 en curso · ✅ hecho · ⏸ bloqueado (falta un dato)
Prioridad: A = imprescindible · B = importante · C = si hay tiempo

## Datos confirmados
- Razón social: **Sinestesya Villarroya S.L.**
- CIF: B05747308 · Domicilio social: C/ Fuertes, 1 Bis, 50171 La Puebla de Alfindén (Zaragoza).
- Pendientes: nº de registro mercantil y de autorización sanitaria.
- Precios: según `TARIFARIO_2027.pdf` (coincide con `src/services/tarifas.ts`). Sustituye al «70 € para todo».
- Horario: de lunes a viernes, de 9 h a 21 h.
- Reservas online: cerradas. Botón de cabecera «Pedir cita» → WhatsApp.
- Hosting en producción: **Vercel**.
- Mutuas / aseguradoras: **no**.
- `/admin`: se elimina; la gestión se hace desde Órbita. `/api/disponibilidad` se mantiene.
- Equipo: datos del personal más adelante.

## Fase 1 · Quitar riesgos
| # | Prio | Tarea | Estado |
|---|---|---|---|
| 1.1 | A | Registro del plan (`docs/PLAN.md`) | ✅ |
| 1.2 | A | Pie: razón social, CIF, domicilio social y enlaces legales (`EMPRESA`, `src/config.ts`) | ✅ |
| 1.3 | A | Páginas Privacidad, Aviso legal y Cookies (borrador para la asesoría) y enlace en el formulario | ✅ pendiente revisión asesoría |
| 1.4 | A | Quiénes somos: variables de color inexistentes sustituidas por colores de marca | ✅ |
| 1.5 | A | Contraste en modo oscuro: aviso «Web en construcción» (texto y teléfono ilegibles), botones de selección y color de barra del navegador | ✅ |
| 1.6 | A | Quitar `/admin` (ruta, panel, login y cliente Supabase en el navegador) | ✅ |
| 1.7 | B | Cambiar «el mismo día laborable» por «48 horas laborables» | ✅ |

## Fase 2 · Contacto (portada, móvil, WhatsApp)
| # | Prio | Tarea | Estado |
|---|---|---|---|
| 2.1 | A | Botón «Pedir cita» siempre visible en la cabecera (móvil incluido) | ✅ |
| 2.2 | A | Barra fija Llamar / WhatsApp en móvil | ✅ |
| 2.3 | A | WhatsApp con mensaje predefinido por especialidad (`src/hooks/useWhatsApp.ts`) | ✅ |
| 2.4 | A | Nuevo bloque principal de portada | ✅ |
| 2.5 | A | Bloque «¿Por dónde empiezo?» | ✅ |

## Fase 3 · SEO técnico
| # | Prio | Tarea | Estado |
|---|---|---|---|
| 3.1 | A | Título y descripción propios por página (servicio + La Puebla de Alfindén) — `src/seo.ts` | ✅ |
| 3.2 | A | Prerenderizado de cada ruta (`scripts/prerender.mjs`) | ✅ |
| 3.3 | A | 404 real en Vercel (sin devolver la portada con 200) | ✅ comprobar tras desplegar |
| 3.4 | A | Sitemap completo, canonical y og:image | ✅ |
| 3.5 | B | Datos estructurados `MedicalClinic` (`CENTRO_JSONLD` en `src/seo.ts`) | ✅ |
| 3.6 | B | Encabezados descriptivos y refuerzo «Sinestesya + La Puebla» | ✅ |
| 3.7 | — | Search Console y ficha de Google Business (fuera del código) | ⬜ |

## Fase 4 · Contenido de servicios
| # | Prio | Tarea | Estado |
|---|---|---|---|
| 4.1 | B | Servicios con «Es para ti si…» y «La primera sesión» (borradores abajo) | ⏸ aparcado |
| 4.2 | B | Precio y duración en cada servicio; tarifario único en `src/services/tarifas.ts` | ✅ |
| 4.3 | B | Formulario «Avísame cuando abráis» con consentimiento separado | ⬜ |

## Fase 5 · Confianza y contenido
| # | Prio | Tarea | Estado |
|---|---|---|---|
| 5.1 | A | Página Equipo | ⏸ datos del personal |
| 5.2 | B | Preguntas frecuentes en inicio y servicios + FAQPage (`src/services/faq.ts`) | ✅ revisar con el equipo |
| 5.3 | B | Artículo «¿Cuándo llevar a mi hijo al logopeda?» | ⬜ |

## Historial
- **Paso 1** — 1.1, 1.4 y 1.5 hechos.
- **Paso 2** — 1.3, 1.6 y 1.7 hechos; 1.2 a falta de domicilio social y CIF.
- **Paso 3** — 2.1, 2.2 y 2.3 hechos. En móvil la cabecera deja de ser fija (la barra inferior cubre el contacto).
- **Paso 4** — 2.4 y 2.5 hechos. Fase 2 completa.
- **Paso 5** — 3.1 a 3.4 hechos. Dominio canónico: `https://sinestesya.es` (sin www).
- **Paso 6** — 3.5 y 3.6 hechos. Horario «de lunes a viernes» en toda la web. Pendiente: añadir redes sociales y ficha de Google a `sameAs` cuando existan.
- **Paso 8** — 5.2 hecho: 6 preguntas en la portada y 6 por servicio, con datos estructurados FAQPage. Corregida la forma SVG de Psicología.
- **Paso 7** — 4.2 hecho con el tarifario oficial; CIF y domicilio social en el pie y páginas legales (1.2 cerrado).

## Comprobar tras desplegar en Vercel
- `/logopedia` responde 200 con su propio título; `/cualquier-cosa` responde 404.
- Compartir un enlace por WhatsApp muestra la imagen y el título de la página.
- Que `www.sinestesya.es` redirija a `sinestesya.es` (Vercel › Settings › Domains).
- Enviar `https://sinestesya.es/sitemap.xml` en Google Search Console.

## Pendiente de confirmar
- ¿La dirección del centro es también C/ Fuertes, 1 **Bis**? (la web muestra «Calle Fuertes, 1»)
- Vigencia del tarifario: la web dice «noviembre de 2026» y el PDF se llama TARIFARIO_2027.

## Borradores 4.1 (pendientes de revisión del equipo sanitario)
**Psicología** — Es para ti si… llevas tiempo con ansiedad, estrés o tristeza que no se van · estás pasando por un duelo, una separación o un cambio importante · tu hijo/a tiene miedos, rabietas o problemas de conducta que os desbordan.
La primera sesión (45–50 min · 70 €): hablamos de lo que te trae y de cómo te afecta; al terminar te proponemos un plan y una frecuencia. Con menores, una parte es solo con la familia.

**Logopedia** — Es para ti si… tu hijo/a habla poco para su edad, no se le entiende o le cuesta leer y escribir · notas ronquera, cansancio de voz o tartamudez · tú o un familiar tenéis dificultad para tragar o para hablar tras un ictus.
La primera sesión: valoración inicial (60 min · 85 €) con pruebas y observación; después, devolución de resultados (45 min · 60 €). Trae informes del pediatra o del colegio si los tienes.

**Fisioterapia** — Es para ti si… tienes dolor de espalda, cuello u hombro que no mejora · te has lesionado o te han operado y quieres recuperar movilidad · tu bebé o hijo/a va más lento en su desarrollo motor o tiene una postura que te preocupa.
La primera sesión (60 min · 70 €): valoramos tu dolor y cómo te mueves, y ese mismo día empezamos el tratamiento. Ropa cómoda e informes si los tienes.

**Nutrición** — Es para ti si… quieres perder o ganar peso sin dietas imposibles · tienes colesterol, diabetes o hipertensión · estás embarazada, haces deporte o tu hijo/a come muy pocos alimentos.
La primera sesión (60–75 min · 110 €): historia nutricional, mediciones y objetivos; sales con un plan personalizado. Trae análisis recientes si los tienes.

## Para la asesoría
- Revisar `/privacidad`, `/aviso-legal` y `/cookies` (textos en `src/pages/Legal.tsx`).
- Confirmar proveedores encargados del tratamiento (Vercel, Supabase, Resend, Órbita) y sus contratos.
- Al validarlos, poner `legalRevisado: true` en `src/config.ts`.
