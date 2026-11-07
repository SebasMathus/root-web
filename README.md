# root-web

Sitio de **root** (https://goroot.ai): CRM de WhatsApp con agentes de IA para equipos comerciales en México, hecho por Nextia.

Es un **sitio estático**: Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + motion, exportado a HTML con `output: "export"`.
**Ya no hay Payload CMS** ni base de datos, S3, Docker o rutas API: el contenido vive en el código (`src/lib/*`, `src/app/(site)/*`).
Guía de marca, componentes, reglas de contenido y mapa de rutas: [`DESIGN.md`](./DESIGN.md).

## Cómo correrlo

Requisitos: Node 20 o superior y npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

Variables de entorno (opcionales):

| Variable | Para qué | Por defecto |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Dominio para canonical, sitemap, robots y datos estructurados | `https://goroot.ai` |

## Revisar antes de entregar

```bash
npx tsc --noEmit   # tipos
npm run lint       # eslint
npm run build      # exportación estática a out/
```

## Exportación estática

`npm run build` genera la carpeta **`out/`** con todo el sitio en HTML, CSS, JS e imágenes (`trailingSlash: true`: cada ruta es `ruta/index.html`).
Se publica copiando `out/` a cualquier hosting de archivos estáticos (S3 + CloudFront, Netlify, Vercel, etc.). Para verla en local:

```bash
npx serve out      # o: npm start
```

Notas:
- `out/404.html` es la página de error; configura el hosting para servirla en 404.
- Las imágenes para compartir de cada ruta (`opengraph-image`) se generan sin extensión: el hosting debe servirlas como `image/png`.
- La imagen para compartir por defecto es `public/og/root.png`. Se genera con `src/app/opengraph-image.tsx`: si cambias su diseño, corre `npm run build` y copia `out/opengraph-image` a `public/og/root.png`.
- No hay funciones de servidor: nada de rutas API, ISR ni optimización de imágenes.

## Estructura

```
src/
  app/
    layout.tsx            html, fuentes, datos estructurados de la organización
    globals.css           tokens de marca, tipografía, botones, escenas
    (site)/               páginas con encabezado y pie
      page.tsx            portada
      blog/               blog (artículos en src/lib/blog.ts)
      docs/               aviso de privacidad, términos, soporte, borrado de información
    sitemap.ts, robots.ts, icon.svg, apple-icon.png, opengraph-image.tsx, not-found.tsx
  components/             ui, chrome (encabezado y pie), brand (logo), product-by-nextia, motion/kit
  lib/                    site (datos, precios, CTA), routes (mapa del sitio), seo, og, blog, clients
  assets/fonts/           TTF para las imágenes de Open Graph
public/                   favicon, og/, logos de Nextia y de sus clientes (clientes/)
```

## Contenido

- **No se nombran marcas de la competencia**: ni en páginas, metadatos, imágenes para compartir ni documentación. Se dice «otros sistemas» o el tipo de herramienta. La comparativa vive en una sola página, `/comparativas`, y compara por tipo de herramienta. Las marcas de integraciones y canales (WhatsApp, Meta, Instagram, Salesforce, SAP, HubSpot, Excel) sí se nombran.
- Reglas completas de lo que se afirma y lo que no: [`DESIGN.md`](./DESIGN.md) › «Qué afirmar y qué no».

## Contacto y CTA

Todos los CTA llevan al formulario «Contacto root» (`#contacto`, al cierre de cada página comercial, o `/contacto/`); al enviarlo, el formulario se reemplaza por la página de reservas «Demo root AI» de Google Calendar para elegir el horario de la demo. Debajo de la agenda va el único botón de WhatsApp del sitio («Escríbenos por WhatsApp», línea de root `WA_PHONE` en `src/lib/site.ts`, con mensaje prellenado), como en eugenia.ai y rhali.ai; antes de enviar el formulario ningún botón ni enlace lleva a WhatsApp. El tag de root (`data-org="root-ai"`, el slug de la organización Root AI) captura el envío con form_id `contacto-root`. La medición de Google (GA4 y Google Ads) vive en Google Tag Manager (`GTM-PCXDHXNC`, snippet en `src/app/layout.tsx`); al mostrarse la agenda, el formulario manda una sola vez `generate_lead` al dataLayer con `form_id`, `origen`, `page_path`, `equipo_ventas` y `herramienta_actual` (nunca nombre, correo ni teléfono).
