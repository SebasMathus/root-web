# root · guía de diseño, contenido y construcción

Sitio de **root** (goroot.ai): **CRM de WhatsApp con agentes de IA** para equipos comerciales en México, hecho por Nextia.
Sitio estático (Next.js 16, App Router, `output: "export"`), sin CMS. Todo CTA abre WhatsApp.
Fuente de contenido: plan del sitio (posicionamiento, glosario, mapa, diagramas D1–D10, §6 «Qué afirmar y qué no»), `root-actual.md` (hechos del producto) y `verticales-root.md`.

## 1. Posicionamiento y voz

- **Categoría:** «CRM de WhatsApp con agentes de IA» (`CATEGORY` en `src/lib/site.ts`).
- **Lema:** «Que nadie se quede en visto.» (`TAGLINE`).
- **Frase guía:** «Tu agente contesta y califica. Tu equipo cierra. Tú ves todo.» (`GUIDE_PHRASE`). Tres sujetos, tres verbos: guía la portada, el diagrama D2 y la comparativa con otros sistemas.
- **Posición:** entre «autonomía total, cara y con consultoría» y «orden barato con IA de extra»: un equipo comercial que quiere que la IA haga el trabajo pesado sin perder el control de su cartera.
- **Sin marcas de la competencia:** no se nombran marcas de la competencia en ninguna página, metadato, imagen ni documento; se dice «otros sistemas» (o el tipo de herramienta: bot de menús, agente de IA suelto, CRM tradicional…). Las marcas de integraciones y canales (WhatsApp, Meta, Instagram, Salesforce, SAP, HubSpot, Excel) sí se nombran.
- **Voz:** español de México, de **tú**, cercana, frases cortas. Ejemplos locales (Infonavit, enganche, MSI, Narvarte). Sin anglicismos innecesarios.
- **«root» siempre en minúsculas**, también al inicio de oración (reacomoda la frase si hace falta). Excepción: el texto legal de `/docs/*` se publica tal cual («Root»), sin tocar el sentido jurídico.

## 2. Tokens (`src/app/globals.css`)

Tema **claro por defecto**. Los bloques oscuros usan la clase `.theme-dark` (o `Section tone="oscuro"`, `CtaBand`, la franja de Nextia y el pie), que **redefine los mismos tokens**: dentro, `--ink` es claro y `--paper` oscuro. Escribe siempre `text-ink`, `bg-surface`, `border-line`… y el bloque se invierte solo.

| Token | Clase Tailwind | Claro | Oscuro (`.theme-dark`) | Uso |
|---|---|---|---|---|
| `--ink` | `text-ink` `bg-ink` | #0B0B0C | #F5F5F0 | Texto principal, logo |
| `--paper` | `bg-paper` | #FAFAF7 | #0A0A0A | Fondo de página |
| `--surface` | `bg-surface` | #FFFFFF | #141414 | Tarjetas |
| `--surface-2` | `bg-surface-2` | #F1F0EA | #101010 | Sección gris |
| `--line` | `border-line` | #E6E5DF | #262626 | Bordes y retícula |
| `--muted` | `text-muted` | #5E5E5A | #A3A39C | Texto secundario |
| `--lime` | `text-lime` | #3F6212 | #C6F36B | **Agente**, acento de marca |
| `--lime-fill` | `bg-lime-fill` | #C6F36B | #C6F36B | Relleno del botón primario (texto `text-fixed-ink`) |
| `--lime-soft` | `bg-lime-soft` | #EDF7D6 | lima 12 % | Fondos de chip/celda del agente |
| `--sky` / `--sky-soft` | `text-sky` `bg-sky-soft` | #1D5FA8 | #8CC8FF | **Equipo** (humano), enlaces secundarios |
| `--coral` / `--coral-soft` | `text-coral` `bg-coral-soft` | #C2410C | #FF8A65 | **Alerta** / sin respuesta / perdido |
| `--success` / `--success-soft` | `text-success` `bg-success-soft` | #15803D | #4ADE80 | **Ganado** |
| `--grid` | `.grid-bg` | tinta 3.5 % | blanco 4 % | Retícula de fondo cada 64 px |
| `--fixed-ink` | `text-fixed-ink` | #0B0B0C | #0B0B0C | Texto sobre lima (no se invierte) |
| `--shadow` | `shadow-[var(--shadow)]` | | | Sombra de paneles |

**Código de color de diagramas (fijo):** Agente = lima · Equipo = cielo · Alerta = coral · Ganado = verde. No uses azul como acento de marca (es el color típico de otros sistemas de la categoría) ni el verde de WhatsApp.

Tonos de sección: `claro` (papel) · `gris` (superficie 2, con bordes) · `oscuro` (`.theme-dark`). Alterna para que no queden dos secciones seguidas del mismo tono.

## 3. Tipografía

| Rol | Fuente (next/font) | Variable / clase |
|---|---|---|
| Titulares | Plus Jakarta Sans 700/800, tracking −1 a −2 % | `font-display`, `.h-hero` (40→64 px), `.h-section` (30→40 px), `.h-card` |
| Texto | Inter (variable) | `font-sans` (por defecto, cuerpo 17 px), `.lead` (18 px, muted) |
| Datos | JetBrains Mono 500 | `font-mono`, `.mono` (cifras tabulares), `.kicker` (mono, mayúsculas) |

Texto largo: `<Prose>` (`.prose-root`). El wordmark nunca se compone con la fuente: siempre el SVG.

## 4. Logo (`src/components/brand.tsx`)

Refresh del logo anterior (`public/favicon.png` del sitio viejo), sin cambiar el concepto: «root» en minúsculas, sans geométrica heavy, la doble «o» fusionada en un **∞**, «t» con gancho a la derecha, monocromo.

- **Construcción:** retícula con altura de x = 100 u (línea base 130, altura de x 30, asta de la «t» 4). Trazo 25 u (el original medía ~28 u; el plan proponía 22: 25 conserva el peso heavy), barra de la «t» 21 u. El ∞ son dos círculos de radio 29 u con centros a ±46 u unidos por tangentes cruzadas; en el cruce, cuatro cuñas (trampas de tinta) adelgazan el trazo ~8 % para que no se empaste a 20 px. El gancho de la «t» usa el mismo radio del ∞; el brazo de la «r» es una curva continua. Interletraje abierto a 16 u (el original ~13 u) para que a tamaño chico se lea «root» y no «r∞t».
- **Versiones:** positiva (`tone="ink"`), negativa (`tone="paper"`), automática según el bloque (`tone="auto"`, por defecto), con acento (`accent`: ∞ en lima sobre tinta, solo marketing, nunca en la navegación).
- **Isotipo:** el ∞ suelto (`RootMark variant="plain"`) o en cuadrado redondeado de radio 22 % (`variant="tile"`). Es el favicon (`src/app/icon.svg`, `public/favicon.png` 512 px, `src/app/apple-icon.png`), avatar y nodo central de diagramas.
- **Animado:** `RootMarkAnimated`: la pista del ∞ siempre visible, el trazo se dibuja en 1.2 s y un destello lima recorre el bucle cada 6 s. CSS puro; con movimiento reducido queda quieto y completo.
- **Reglas:** área libre = alto de la «o» (≈ 0.65 × altura del wordmark); mínimo 64 px de ancho el wordmark y 16 px el isotipo; nunca en azul, en degradado, estirado ni con sombra.
- **Firma:** «root · a product by Nextia» (`ProductByNextiaSignature`) en el pie y en la franja `<ProductByNextia />`.

## 5. Componentes disponibles (no los dupliques)

Importa con `@/…` (alias a `src/`).

### `@/lib/site`
`SITE_URL`, `SITE_NAME` («root»), `LOCALE`, `CATEGORY`, `TAGLINE`, `GUIDE_PHRASE`, `DEFAULT_DESCRIPTION`, `PARENT` ({name, url} de Nextia), `APP_LOGIN_URL`, `CONTACT_EMAIL`, `ADDRESS`, `ADDRESS_LINE`, `SUPPORT_HOURS`, **`WHATSAPP_URL`** (https://wa.me/15557794199, no acepta texto precargado), `CTA_LABEL` («Escríbenos por WhatsApp»), `PLANS: Plan[]` y `planById(id)`, `PRICE_FROM`, `PRICING_FACTS` {meta, api, billing, iva, cancel, changes, users, start}, `absoluteUrl(path)`.

### `@/lib/seo`
`pageMetadata({ title, description, path, noindex?, absoluteTitle?, type?, publishedTime?, ownOgImage? })` → `Metadata` (canonical con «/» final, OG, Twitter, robots). El título va SIN « | root» (lo agrega `title.template`). `withSlash(path)`. `DEFAULT_OG_IMAGE` (`/og/root.png`).

### `@/lib/og`
`ogCard({ kicker, title, sub?, dark? })` → `ImageResponse` 1200×630 con el wordmark y fuentes de marca; `ogSize`, `ogContentType`. Para una imagen propia de página crea `opengraph-image.tsx` en su carpeta (`export const dynamic = "force-static"`) **y** pasa `ownOgImage: true` a `pageMetadata`.

### `@/lib/routes`
`ROUTES: RouteEntry[]` ({path, label, blurb?, group, index, priority, changeFrequency, owner, phase?, verb?}), `routesIn(group)`, `route(path)`, `routeLabel(path)`, `PRODUCT_PAGES` (5), `SOLUTION_PAGES` (8), `RESOURCE_PAGES`, `LEGAL_PAGES`. Alimenta sitemap, menús y pie: **toda página nueva se registra aquí**.

### `@/components/ui`
- `Container({ size?: "narrow"|"default"|"wide", className? })`
- `Section({ id?, tone?: "claro"|"gris"|"oscuro", grid?, pad?: "md"|"lg"|"none", labelledBy?, container?, className? })`
- `SectionHeader({ kicker?, title, intro?, id?, center? })` (h2)
- `PageHero({ kicker?, title, intro?, breadcrumbs?, cta?, ctaLabel?, ctas?, visual?, tone?, note? })` (h1; con `visual`, dos columnas)
- `CtaButton({ label? = "Escríbenos por WhatsApp", cta = propósito (data-cta), variant?: "primary"|"dark"|"outline"|"ghost", size?: "sm"|"md"|"lg", icon? })`: siempre `<a href={WHATSAPP_URL} target="_blank">`.
- `LinkButton({ href, label, variant?, size?, arrow? })`, `PricesButton({ label? = "Ver precios" })`, `CtaPair({ cta, label?, size?, secondary?: {href,label}|null })`
- `RoleChip({ role: "agente"|"equipo"|"alerta"|"ganado", children? })`, `ExampleTag()` («Datos de ejemplo», obligatoria si un diagrama muestra datos inventados)
- `CheckList({ items, variant?: "check"|"x" })`, `FeatureGrid({ items: Feature[], cols?: 2|3|4 })` con `Feature = { title, text, icon?, href?, tag?, role? }`
- `Breadcrumbs({ items })` + JSON-LD BreadcrumbList (Inicio se agrega solo)
- `Faq({ items: {q, a}[], title?, intro?, id?, tone? })` + JSON-LD FAQPage (details/summary, rastreable sin JS)
- `CtaBand({ title, text?, kicker?, cta?, label?, secondary? })`: cierre oscuro
- `ComparisonTable({ caption, columns: {key, label, sub?, highlight?}[], rows: {label, values: Record<key, Cell>, note?}[], firstColLabel?, footnote?, captionVisible? })`; `Cell` = nodo, `true` (✓), `false` (✗) o `null` (—). Se desplaza dentro de su caja en móvil.
- `Prose({ children })`

### Otros
- `@/components/brand`: `RootLogo({ height?, tone?: "auto"|"ink"|"paper", accent?, title? })`, `RootMark({ size?, variant?: "tile"|"plain", tone?: "auto"|"ink"|"paper"|"accent", title? })`, `RootMarkAnimated({ size?, tile? })`, `NextiaLogo({ dark?, height? })`, `ProductByNextiaSignature({ dark?, size? })`, `INFINITY_PATH`, `WORDMARK_VIEWBOX`, `BRAND`.
- `@/components/chrome`: `SiteHeader`, `SiteFooter`, `WhatsAppFloat` (ya montados en `src/app/(site)/layout.tsx`; no los repitas).
- `@/components/product-by-nextia`: `<ProductByNextia />` — franja oscura con dos filas de logos de clientes **de Nextia** y la firma. **Una por página, a la mitad**, entre dos secciones claras. Nunca la llames «clientes de root».
- `@/components/icons`: `Icon({ name, className?, strokeWidth? })` (`ICON_NAMES`: arrow, check, x, bot, sparkle, inbox, chat, kanban, funnel, send, repeat, plug, chart, target, clock, calendar, user, users, handoff, phone, building, shield, lock, bolt, tag, money, file, book, tool, question, mail, pin, instagram, car, home, bag, tooth, stethoscope, flask, bank, face, rocket…), `WhatsAppGlyph`.
- `@/components/json-ld`: `JsonLd({ data })`.
- `@/components/comparativas/*` (solo `/comparativas`): `CostPerUser` (D8, costo por usuario de los planes de root; nunca precios de terceros), `GuidePhraseScene`, `AskChecklist`, `HonestSplit`, `Steps`, `RelatedLinks`.
- `@/components/legal`: `LegalPage({ title, path, kicker?, updated?, intro?, children })`.
- `@/components/motion/kit` (cliente): ver §6.

## 6. Escenas y diagramas (D1–D10)

Interfaces construidas en código (HTML/SVG), con texto real. Reglas, todas obligatorias:

1. **Nunca vacías.** El HTML del servidor trae el **estado final completo**. Nada arranca en `opacity: 0`; las entradas solo desplazan (`Reveal`).
2. **Sostienen ≥ 2.5 s** su estado al entrar en pantalla antes de animar (`useSceneLoop`, `MIN_HOLD_MS`).
3. **Pausan fuera de pantalla** (`useSceneLoop`/`usePlayable` usan `useInView`; al salir vuelven al estado final).
4. **`prefers-reduced-motion`:** quietas en el estado final (el kit y el CSS global ya lo hacen).
5. **Escala uniforme:** dentro de `<Scene>` mide todo en **em**; el `font-size` sale del ancho del contenedor (`cqw`, `baseWidth` = ancho de diseño en px). No uses px sueltos dentro del lienzo.
6. **Accesibles:** `<figure>` + `<figcaption className="sr-only">` que describe el flujo; el dibujo `aria-hidden` (`<Scene caption>` lo hace).
7. Datos de ejemplo con `<ExampleTag />` visible. Código de color: agente lima, equipo cielo, alerta coral, ganado verde.
8. Sin cifras de resultados (ni «3x», ni «−40 %»): los números de las escenas son del caso de ejemplo (horas, montos, nombres).

Kit (`@/components/motion/kit`, `"use client"`):
- `useSceneLoop<T>(durations: number[], { rest?, firstHold? = 2600, resetOnLeave? = true, paused? })` → `{ ref, step, playing }` (`paused`: congela el paso actual, p. ej. con el cursor encima, como D1)
- `usePlayable<T>(margin?)` → `{ ref, playable, reduce }`
- `<Scene caption baseWidth? = 640 aspect? reveal? = true delay? className? innerClassName?>`
- `<Reveal delay? className?>` (sube 14 px, sin opacidad)
- `<CountUp value run? duration? format?>`, `<Typewriter text run? speed?>` (muestran el valor final sin JS)
- `EASE`, `MIN_HOLD_MS`
- Logo animado: `RootMarkAnimated` (`@/components/brand`).

Patrón: `const { ref, step } = useSceneLoop<HTMLDivElement>([1200, 1200, 1600, 3000]);` y pinta según `step`; el último paso (`rest`) es la escena completa.

## 7. Glosario de conceptos de root (plan §2.1)

Cada concepto retoma una idea del mercado, con nombre propio en español mexicano y sin marcas ajenas.
**Disponibles** (ya las afirma la página de root en el sitio de Nextia): se presentan como funciones. **Cómo trabaja root**: propuestas de producto que se presentan como conceptos, **sin cifras de resultados** ni capturas que parezcan pantallas reales.

| Concepto | Qué es | Cómo presentarlo |
|---|---|---|
| **Agente de root** | El agente de IA que atiende en WhatsApp a nombre de tu empresa; compañero del equipo, no reemplazo | Disponible (planes Pro y Enterprise) |
| **Habilidades** | Responder · Calificar · Agendar · Dar seguimiento · Reactivar · Pasar al equipo | Disponibles |
| **Relevo** | El agente le pasa la conversación al vendedor con una **nota de relevo** (quién es, qué quiere, qué ya se respondió) | Disponible el traspaso con historial; la nota de relevo, como concepto |
| **Carriles** | En cada embudo, qué etapas atiende el agente (carril del agente, lima) y cuáles tu equipo (carril del equipo, cielo) | Concepto de cómo trabaja root |
| **Línea de empresa** | Todo pasa por el número de tu empresa. «La cartera es tuya, no del vendedor» | Disponible |
| **Bandeja compartida** | Donde tu equipo y tus agentes atienden juntos | Disponible |
| **Embudos y etapas** | Término genérico | Disponible; sin «ilimitados» |
| **Ficha viva** | El perfil que el agente llena mientras conversa (presupuesto, zona, fecha, producto) | Concepto (califica con tus preguntas: disponible) |
| **Reglas de pase** | La condición para avanzar o pasar al equipo, en lenguaje natural | Concepto |
| **Cadencias** | Secuencias de seguimiento con días y horarios (día 1, 3, 7, 30) | Concepto (el seguimiento en sí: disponible) |
| **Rescate** | Reactivar a quien dejó de contestar y a clientes de antes | Disponible (reactivación) |
| **Corte de la mañana** | Resumen de lo que hizo el agente mientras tu equipo no estaba | Concepto |
| **Acciones conectadas** | Un evento en root dispara una acción en tu CRM, ERP o Excel | Disponible. «De sistemas de registro a sistemas de acción» |
| **Origen del trato** | Cada prospecto entra con la campaña que lo trajo | Disponible (atribución de campañas) |
| **Recetas** | Paquete por industria: etapas, preguntas, cadencias y respuestas base | Concepto (una por página de Soluciones) |
| **Semana de arranque** | Onboarding: API oficial, configuración, migración, integración | «La mayoría opera en menos de una semana» (nunca garantía) |
| **Precio Meta sin sobreprecio** | Mensajes de WhatsApp a tarifa oficial de Meta, sin sumarles nada | Disponible |

## 8. Qué afirmar y qué no (plan §6 + decisiones del dueño)

**Sí se afirma:** API oficial de WhatsApp Business desde Básico; te ayudamos a tramitarla sin costo extra; agentes que responden en segundos, califican con las preguntas de tu negocio, **agendan**, dan seguimiento y **reactivan** (Pro y Enterprise); conversaciones en el **número de tu empresa**; **traspaso al vendedor con historial**; **atribución de campañas** (origen del trato); contactos, conversaciones y seguimientos en un solo lugar; acciones en tu CRM/ERP ante eventos; integraciones con Salesforce, SAP, HubSpot y Excel; WhatsApp e Instagram; llamadas desde la plataforma (sin detalle técnico); precios Básico $4,999 (3 usuarios), Pro $10,599 (10 usuarios, IA), Enterprise a convenir (IA personalizada, soporte dedicado 24/7) en MXN al mes; facturación mensual, cancelación al final del periodo, 30 días de aviso antes de cambiar precios; mensajes de Meta a tarifa oficial sin sobreprecio; agregar usuarios o subir de plan cuando quieras; la mayoría opera en menos de una semana; soporte lunes a viernes 9–18 h (CDMX), respuesta en menos de 24 h hábiles (24/7 solo Enterprise); aviso de privacidad conforme a la LFPDPPP, ARCO y borrado en 20 días hábiles; hecho por Nextia en la CDMX.

**Como concepto (sin cifras):** Carriles, Ficha viva, Corte de la mañana, Cadencias, Recetas, Reglas de pase, nota de Relevo.

**Por confirmar (no lo publiques como función):** Messenger, correo y «Google» como canales; Zoho, Google Sheets y «cualquier sistema con API»; detalle de llamadas; límite de conversaciones de IA y precio por usuario adicional; si el precio lleva IVA (solo puedes citar los Términos: «incluyen IVA cuando aplique», `PRICING_FACTS.iva`); cuota de implementación; envíos masivos; CFDI; liga de pago y cobranza; API o webhooks públicos.

**PROHIBIDO:**
1. Cifras sin fuente: «+500 empresas», «98 % de retención», «3x», «78 %», «80 %», «2 mil millones», ni ninguna métrica de resultados inventada.
2. Testimonios de partes relacionadas (Nextia, eugenia, Hybridge) como si fueran clientes. Los logos de la franja son clientes **de Nextia**: nunca «clientes de root».
3. Certificaciones o sellos: SOC 2, ISO 27001, Meta Business Partner, BSP oficial, GDPR, «encriptación en tránsito y en reposo», «sin intermediarios».
4. «Prueba gratis», «plan gratuito», «crea tu cuenta», «demo gratis».
5. «Ilimitado» en cualquier forma (Enterprise dice «usuarios a la medida»).
6. Garantías: de resultados, de arranque («en una semana garantizado»), de devolución.
7. **Marcas de la competencia**, en cualquier forma: ni nombres de empresas o productos, ni páginas «root vs …» o «alternativas a …», ni sus precios, ni enlaces o citas a sus páginas. Se dice **«otros sistemas»** o se nombra el tipo de herramienta. Tampoco se usan frases distintivas de otros sistemas (plan §2.2), como «Push Manual», «Embudo Global», «superpoderes», «marcha blanca», «Asesoría gratis», «Atrae / Convierte / Retiene / Escala», «Arma tu vendedor con IA», «Conversaciones que fluyen…», «AI for Growth», «Alma del workspace», «Steering», «Tu mejor vendedor clonado» o «Cada conversación, con un siguiente paso».
8. Afirmar algo de un producto concreto de otro sistema. La comparativa (`/comparativas`) compara **por tipo de herramienta** (bots de menús, agentes de IA sueltos, plataformas de IA autónoma con implementación aparte, CRMs de WhatsApp con IA de complemento, CRMs tradicionales sin WhatsApp), con hechos de root y tono respetuoso: sección honesta de «Cuándo te conviene otro sistema», «Depende» cuando varía según el proveedor, sin afirmar nada de un producto concreto.
9. El estudio de demanda de Nextia no se cita como fuente pública: los volúmenes de búsqueda son para decisiones internas de SEO.

## 9. Mapa de rutas y dueños

Registro en `src/lib/routes.ts`. Legales y soporte se quedan en `/docs/*` (Meta usa `/docs/instrucciones-de-borrado-de-informacion`); `/ayuda` no se crea porque `/docs/soporte` es la página de ayuda.

| Ruta | Nombre | Grupo | Indexa | Dueño |
|---|---|---|---|---|
| `/` | Inicio | principal | sí | portada |
| `/producto` | Producto | producto | sí | producto |
| `/producto/agentes-de-ia` | Agentes de IA | producto | sí | producto |
| `/producto/bandeja-de-whatsapp` | Bandeja de WhatsApp | producto | sí | producto |
| `/producto/crm-y-embudos` | CRM y embudos | producto | sí | producto |
| `/producto/campanas-y-seguimiento` | Campañas y seguimiento | producto | sí | producto |
| `/producto/integraciones` | Integraciones | producto | sí | producto |
| `/soluciones` | Soluciones | soluciones | sí | soluciones |
| `/soluciones/inmobiliarias` | Inmobiliarias | soluciones (fase 1) | sí | soluciones |
| `/soluciones/agencias-de-autos` | Agencias de autos | soluciones (fase 1) | sí | soluciones |
| `/soluciones/clinicas-esteticas` | Clínicas estéticas | soluciones (fase 1) | sí | soluciones |
| `/soluciones/tiendas-en-redes` | Tiendas en redes | soluciones (fase 1) | sí | soluciones |
| `/soluciones/clinicas-dentales` | Clínicas dentales | soluciones (fase 2) | sí | soluciones |
| `/soluciones/consultorios-y-clinicas` | Consultorios y clínicas | soluciones (fase 2) | sí | soluciones |
| `/soluciones/financieras-y-sofom` | Financieras y Sofom | soluciones (fase 2) | sí | soluciones |
| `/soluciones/laboratorios-clinicos` | Laboratorios clínicos | soluciones (fase 2) | sí | soluciones |
| `/precios` | Precios | precios | sí | portada |
| `/comparativas` | Comparativas (root frente a otros sistemas) | comparativas | sí | precios-y-comparativas |
| `/recursos` | Recursos | recursos | sí | recursos |
| `/guias/whatsapp-business-app-vs-api` | WhatsApp Business App o API | recursos | sí | recursos |
| `/guias/cuanto-cuesta-la-api-de-whatsapp` | Cuánto cuesta la API de WhatsApp | recursos | sí | recursos |
| `/guias/chatbot-vs-agente-de-ia-vs-crm` | Chatbot, agente de IA o CRM | recursos | sí | recursos |
| `/herramientas/generador-de-link-de-whatsapp` | Generador de link de WhatsApp | recursos | sí | recursos |
| `/herramientas/calculadora-de-ventas-perdidas` | Calculadora de ventas perdidas | recursos | sí | recursos |
| `/seguridad-y-privacidad` | Seguridad y privacidad | recursos | sí | recursos |
| `/blog` | Blog | blog | sí | cimientos |
| `/blog/como-automatizar-whatsapp` | Cómo automatizar WhatsApp para vender más | blog | sí | cimientos |
| `/nosotros` | Nosotros | empresa | sí | portada |
| `/docs/soporte` | Soporte | empresa | sí | cimientos |
| `/docs/aviso-de-privacidad` | Aviso de privacidad | legal | sí | cimientos |
| `/docs/terminos-y-condiciones` | Términos y condiciones | legal | sí | cimientos |
| `/docs/instrucciones-de-borrado-de-informacion` | Borrado de información | legal | sí | cimientos |

Estado al integrar (27-oct-2026): todas las rutas de la tabla están construidas y en el sitemap. `/precios` y `/nosotros` las hizo el equipo de portada. `/novedades` (changelog, plan §3.6) no se publica hasta tener entradas reales de producto; cuando exista, se registra en `routes.ts` y aparece sola en menús, pie y sitemap.

## 10. Reglas de trabajo

- **Todo CTA es un `<a>` a `WHATSAPP_URL`** (`CtaButton`), con `data-cta` que diga el propósito. Secundario: «Ver precios» (`PricesButton`) u otro enlace interno. No hay formularios.
- Cada página: `export const metadata = pageMetadata({...})`, un solo h1 (`PageHero`), `Breadcrumbs` (salvo portada), `<ProductByNextia />` a la mitad, `Faq` si aplica y `CtaBand` al final.
- Enlaces internos con «/» final (`withSlash`): el sitio usa `trailingSlash: true`.
- Ancho de móvil: gutter de 20 px, nada que desborde la página (las tablas se desplazan dentro de su caja).
- Las páginas viven en `src/app/(site)/…` (encabezado, pie y botón flotante vienen del layout). Componentes propios de una página van en `_components/` de su carpeta.
- Antes de entregar: `npx tsc --noEmit` y `npx eslint <tus archivos>` sin errores; `npm run build` cuando se pida.
- Rutas generadas (`opengraph-image`, `sitemap`, `robots`) llevan `export const dynamic = "force-static"`. Nada que requiera servidor (rutas API, ISR, imágenes optimizadas).
