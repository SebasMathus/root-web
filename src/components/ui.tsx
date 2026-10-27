import Link from "next/link";
import { absoluteUrl, COMPETITOR_REVIEW_LABEL, CTA_LABEL, WHATSAPP_URL } from "@/lib/site";
import { withSlash } from "@/lib/seo";
import { Icon, WhatsAppGlyph } from "./icons";
import { JsonLd } from "./json-ld";

/**
 * Los kickers y etiquetas en mayúsculas (`.kicker`, `uppercase`) convertirían «root» en «ROOT». Envuelve la palabra
 * en `normal-case` para que la marca siga en minúsculas (DESIGN.md › Voz).
 */
export function keepRootCase(text: React.ReactNode): React.ReactNode {
  if (typeof text !== "string" || !/\broot\b/.test(text)) return text;
  return text.split(/(\broot\b)/).map((part, i) =>
    part === "root" ? (
      <span key={i} className="normal-case">
        root
      </span>
    ) : (
      part
    ),
  );
}

/* ───────────── Contenedores ───────────── */

/** Ancho del contenido con gutter de 20 px en móvil (16 px mínimo del contrato). */
export function Container({ children, className = "", size = "default" }: { children: React.ReactNode; className?: string; size?: "narrow" | "default" | "wide" }) {
  const max = size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-7xl" : "max-w-6xl";
  return <div className={`${max} mx-auto px-5 md:px-6 ${className}`}>{children}</div>;
}

export type SectionTone = "claro" | "gris" | "oscuro";

/**
 * Sección estándar. tone: "claro" (papel), "gris" (superficie 2, con bordes) u "oscuro" (.theme-dark: los tokens
 * se invierten, así que dentro usa los mismos text-ink, bg-surface, border-line). grid: retícula de 64 px de fondo.
 */
export function Section({
  id,
  tone = "claro",
  grid = false,
  pad = "lg",
  className = "",
  labelledBy,
  children,
  container = true,
}: {
  id?: string;
  tone?: SectionTone;
  grid?: boolean;
  pad?: "md" | "lg" | "none";
  className?: string;
  /** id del h2 que nombra la sección (SectionHeader id). */
  labelledBy?: string;
  children: React.ReactNode;
  /** false si la sección maneja su propio ancho. */
  container?: boolean;
}) {
  const bg = tone === "gris" ? "bg-surface-2 border-y border-line" : tone === "oscuro" ? "theme-dark" : "bg-paper";
  const py = pad === "none" ? "" : pad === "md" ? "py-14 md:py-20" : "py-20 md:py-28";
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${bg} ${grid ? "grid-bg" : ""} ${py} scroll-mt-24 ${className}`}>
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}

/** Encabezado de sección: kicker + h2 + intro. Pasa `id` y úsalo en Section labelledBy. */
export function SectionHeader({
  kicker,
  title,
  intro,
  id,
  center = false,
  className = "",
}: {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl mb-10 md:mb-14 ${center ? "mx-auto text-center" : ""} ${className}`}>
      {kicker ? <p className="kicker">{keepRootCase(kicker)}</p> : null}
      <h2 id={id} className={`h-section text-ink ${kicker ? "mt-3" : ""}`}>
        {title}
      </h2>
      {intro ? <p className="lead mt-5">{intro}</p> : null}
    </div>
  );
}

/**
 * Encabezado de página (h1). Con `visual`, dos columnas en escritorio (texto + escena); sin él, una columna.
 * ctas: por defecto CTA de WhatsApp + «Ver precios». Pasa `ctas={null}` para quitarlos o tu propio nodo.
 */
export function PageHero({
  kicker,
  title,
  intro,
  breadcrumbs,
  cta = "hero",
  ctaLabel,
  ctas,
  visual,
  tone = "claro",
  note,
}: {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  breadcrumbs?: { name: string; href: string }[];
  /** Propósito del CTA (data-cta). */
  cta?: string;
  ctaLabel?: string;
  ctas?: React.ReactNode | null;
  visual?: React.ReactNode;
  tone?: SectionTone;
  /** Línea pequeña bajo los botones (hechos verificables, sin cifras inventadas). */
  note?: React.ReactNode;
}) {
  const bg = tone === "oscuro" ? "theme-dark" : tone === "gris" ? "bg-surface-2" : "bg-paper";
  return (
    <section className={`${bg} grid-bg border-b border-line`}>
      <Container className={`pt-10 pb-16 md:pt-14 md:pb-24 ${visual ? "grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center" : ""}`}>
        <div className={visual ? "" : "max-w-3xl"}>
          {breadcrumbs?.length ? (
            <div className="mb-8">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          ) : null}
          {kicker ? <p className="kicker">{keepRootCase(kicker)}</p> : null}
          <h1 className={`h-hero text-ink ${kicker ? "mt-4" : ""}`}>{title}</h1>
          {intro ? <p className="lead mt-6 md:text-xl max-w-2xl">{intro}</p> : null}
          {ctas === null ? null : <div className="mt-9">{ctas ?? <CtaPair cta={cta} label={ctaLabel} />}</div>}
          {note ? <p className="mt-6 text-sm text-muted">{note}</p> : null}
        </div>
        {visual ? <div className="min-w-0">{visual}</div> : null}
      </Container>
    </section>
  );
}

/* ───────────── Llamados a la acción ───────────── */

export type ButtonVariant = "primary" | "dark" | "outline" | "ghost";
const PAD = { sm: "px-4 py-2 text-sm", md: "px-5 py-3 text-[15px]", lg: "px-7 py-4 text-base" } as const;

/**
 * CTA de WhatsApp. SIEMPRE es un <a> a WHATSAPP_URL en pestaña nueva; `cta` es el propósito (data-cta) para medir
 * clics: "hero", "header", "precios-pro", "cta-final", "flotante"… Etiqueta por defecto «Escríbenos por WhatsApp».
 */
export function CtaButton({
  label = CTA_LABEL,
  cta = "general",
  variant = "primary",
  size = "md",
  icon = true,
  className = "",
}: {
  label?: string;
  cta?: string;
  variant?: ButtonVariant;
  size?: keyof typeof PAD;
  icon?: boolean;
  className?: string;
}) {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-cta={cta} className={`btn btn-${variant} ${PAD[size]} ${className}`}>
      {icon ? <WhatsAppGlyph className={size === "sm" ? "w-4 h-4" : "w-[18px] h-[18px]"} /> : null}
      {label}
    </a>
  );
}

/** Botón interno (Link). Para «Ver precios», «Ver la comparativa», etc. */
export function LinkButton({
  href,
  label,
  variant = "outline",
  size = "md",
  arrow = true,
  className = "",
}: {
  href: string;
  label: string;
  variant?: ButtonVariant;
  size?: keyof typeof PAD;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={withSlash(href)} className={`btn btn-${variant} ${PAD[size]} ${className}`}>
      {label}
      {arrow ? <Icon name="arrow" className="w-4 h-4" /> : null}
    </Link>
  );
}

/** Botón secundario estándar: «Ver precios» → /precios. */
export function PricesButton({ label = "Ver precios", variant = "outline", size = "md", className = "" }: { label?: string; variant?: ButtonVariant; size?: keyof typeof PAD; className?: string }) {
  return <LinkButton href="/precios" label={label} variant={variant} size={size} className={className} />;
}

/** Par de botones estándar: WhatsApp (primario) + «Ver precios» (o el secundario que pases; null para quitarlo). */
export function CtaPair({
  cta = "general",
  label,
  size = "lg",
  secondary,
  className = "",
}: {
  cta?: string;
  label?: string;
  size?: keyof typeof PAD;
  secondary?: { href: string; label: string } | null;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <CtaButton cta={cta} label={label} size={size} />
      {secondary === null ? null : secondary ? (
        <LinkButton href={secondary.href} label={secondary.label} size={size} />
      ) : (
        <PricesButton size={size} />
      )}
    </div>
  );
}

/* ───────────── Etiquetas ───────────── */

export type Role = "agente" | "equipo" | "alerta" | "ganado";
const ROLE_LABEL: Record<Role, string> = { agente: "Agente", equipo: "Equipo", alerta: "Sin respuesta", ganado: "Ganado" };

/** Chip con el código de color de los diagramas: agente = lima, equipo = cielo, alerta = coral, ganado = verde. */
export function RoleChip({ role, children, className = "" }: { role: Role; children?: React.ReactNode; className?: string }) {
  return <span className={`chip chip-${role} ${className}`}>{children ?? ROLE_LABEL[role]}</span>;
}

/** Etiqueta visible obligatoria cuando un diagrama muestra números o nombres de ejemplo (plan §4). */
export function ExampleTag({ className = "", children = "Datos de ejemplo" }: { className?: string; children?: React.ReactNode }) {
  return <span className={`mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] text-muted ${className}`}>● {children}</span>;
}

/* ───────────── Listas y tarjetas ───────────── */

/** Lista con palomitas (check) o tachas (x, para «no incluye»). */
export function CheckList({ items, variant = "check", className = "" }: { items: React.ReactNode[]; variant?: "check" | "x"; className?: string }) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {items.map((t, i) => (
        <li key={i} className={`flex items-start gap-3 leading-relaxed ${variant === "x" ? "text-muted" : "text-ink"}`}>
          <span
            className={`mt-[3px] w-5 h-5 rounded-md grid place-items-center shrink-0 ${variant === "x" ? "bg-surface-2 text-muted border border-line" : "bg-lime-fill text-fixed-ink"}`}
          >
            <Icon name={variant === "x" ? "x" : "check"} className="w-3.5 h-3.5" strokeWidth={2.6} />
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export type Feature = { title: string; text: React.ReactNode; icon?: string; href?: string; tag?: string; role?: Role };

/** Rejilla de tarjetas. Con href, toda la tarjeta es enlace. role colorea el ícono (agente/equipo/alerta/ganado). */
export function FeatureGrid({ items, cols = 3 }: { items: Feature[]; cols?: 2 | 3 | 4 }) {
  const c = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : cols === 2 ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  const iconTone: Record<Role, string> = { agente: "bg-lime-soft text-lime", equipo: "bg-sky-soft text-sky", alerta: "bg-coral-soft text-coral", ganado: "bg-success-soft text-success" };
  return (
    <div className={`grid gap-5 ${c}`}>
      {items.map((it) => {
        const inner = (
          <>
            {it.icon ? (
              <span className={`w-11 h-11 rounded-xl grid place-items-center ${it.role ? iconTone[it.role] : "bg-ink text-paper"}`}>
                <Icon name={it.icon} className="w-5 h-5" />
              </span>
            ) : null}
            {it.tag ? <span className="chip w-fit">{it.tag}</span> : null}
            <h3 className="h-card text-lg text-ink">{it.title}</h3>
            <div className="text-muted leading-relaxed">{it.text}</div>
            {it.href ? (
              <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                Conoce más <Icon name="arrow" className="w-4 h-4" />
              </span>
            ) : null}
          </>
        );
        return it.href ? (
          <Link key={it.title} href={withSlash(it.href)} className="card card-hover p-6 flex flex-col gap-3">
            {inner}
          </Link>
        ) : (
          <article key={it.title} className="card p-6 flex flex-col gap-3">
            {inner}
          </article>
        );
      })}
    </div>
  );
}

/* ───────────── Migas de pan + BreadcrumbList ───────────── */

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  const all = [{ name: "Inicio", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Migas de pan" className="text-[13px] text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="font-medium text-ink">
                  {c.name}
                </span>
              ) : (
                <Link href={withSlash(c.href)} className="hover:text-ink">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.href) })),
        }}
      />
    </>
  );
}

/* ───────────── Preguntas frecuentes (details/summary, rastreables sin JS) + FAQPage ───────────── */

export type FaqItem = { q: string; a: string };

export function Faq({
  items,
  title = "Preguntas frecuentes",
  intro,
  id = "preguntas",
  tone = "gris",
}: {
  items: FaqItem[];
  title?: string;
  intro?: React.ReactNode;
  id?: string;
  tone?: SectionTone;
}) {
  return (
    <Section id={id} tone={tone} labelledBy={`${id}-titulo`}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: "es-MX",
          mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <div className="max-w-3xl mx-auto">
        <h2 id={`${id}-titulo`} className="h-section text-ink">
          {title}
        </h2>
        {intro ? <p className="lead mt-4">{intro}</p> : null}
        <div className="faq mt-10 divide-y divide-line border-y border-line">
          {items.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex items-start justify-between gap-6 cursor-pointer">
                <h3 className="font-semibold text-ink text-base md:text-[17px] leading-snug">{f.q}</h3>
                <span className="plus mt-0.5 shrink-0 w-7 h-7 rounded-full border border-line grid place-items-center text-ink text-lg leading-none" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 pr-2 md:pr-12 text-muted leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ───────────── Cierre con CTA (bloque oscuro) ───────────── */

export function CtaBand({
  title,
  text,
  kicker,
  cta = "cta-final",
  label,
  secondary,
}: {
  title: React.ReactNode;
  text?: React.ReactNode;
  kicker?: string;
  cta?: string;
  label?: string;
  /** Secundario: por defecto «Ver precios»; null para quitarlo. */
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section className="theme-dark grid-bg" aria-labelledby={`${cta}-titulo`}>
      <Container className="py-20 md:py-28">
        <div className="max-w-3xl">
          {kicker ? <p className="kicker text-lime">{keepRootCase(kicker)}</p> : null}
          <h2 id={`${cta}-titulo`} className={`h-section text-ink ${kicker ? "mt-3" : ""}`}>
            {title}
          </h2>
          {text ? <p className="lead mt-5">{text}</p> : null}
          <CtaPair cta={cta} label={label} secondary={secondary} className="mt-9" />
        </div>
      </Container>
    </section>
  );
}

/* ───────────── Tabla comparativa genérica ───────────── */

/** Celda: texto o nodo; true = palomita, false = tacha, null = «—». */
export type Cell = React.ReactNode | boolean | null;
export type ComparisonColumn = { key: string; label: React.ReactNode; sub?: React.ReactNode; highlight?: boolean };
export type ComparisonRow = { label: React.ReactNode; values: Record<string, Cell>; note?: React.ReactNode };

function renderCell(v: Cell) {
  if (v === true)
    return (
      <span className="inline-flex items-center gap-1.5 text-success">
        <Icon name="check" className="w-4 h-4" strokeWidth={2.6} />
        <span className="sr-only">Sí</span>
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex items-center gap-1.5 text-muted">
        <Icon name="x" className="w-4 h-4" strokeWidth={2.4} />
        <span className="sr-only">No</span>
      </span>
    );
  if (v === null || v === undefined) return <span className="text-muted">—</span>;
  return v;
}

/**
 * Tabla semántica (caption, th scope). En móvil se desplaza dentro de su caja, nunca la página.
 * La columna con `highlight` (root) va resaltada. Para competidores: cada dato con enlace a su página pública y
 * una SourceNote debajo con la fecha de revisión.
 */
export function ComparisonTable({
  caption,
  columns,
  rows,
  firstColLabel = "",
  footnote,
  captionVisible = false,
}: {
  caption: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  firstColLabel?: string;
  footnote?: React.ReactNode;
  captionVisible?: boolean;
}) {
  return (
    <div>
      <div className="table-scroll card">
        <table className="w-full min-w-[640px] text-[15px] border-collapse">
          <caption className={captionVisible ? "text-left p-5 pb-0 font-semibold text-ink" : "sr-only"}>{caption}</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="text-left align-bottom p-4 md:p-5 font-medium text-muted text-sm w-[28%]">
                {firstColLabel}
              </th>
              {columns.map((c) => (
                <th key={c.key} scope="col" className={`text-left align-bottom p-4 md:p-5 ${c.highlight ? "bg-lime-soft" : ""}`}>
                  <span className="block font-display font-bold text-ink">{c.label}</span>
                  {c.sub ? <span className="block mt-1 text-xs font-normal text-muted">{c.sub}</span> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-line last:border-b-0 align-top">
                <th scope="row" className="text-left p-4 md:p-5 font-semibold text-ink">
                  {r.label}
                  {r.note ? <span className="block mt-1 text-xs font-normal text-muted">{r.note}</span> : null}
                </th>
                {columns.map((c) => (
                  <td key={c.key} className={`p-4 md:p-5 text-ink/85 leading-relaxed ${c.highlight ? "bg-lime-soft/60" : ""}`}>
                    {renderCell(r.values[c.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote ? <div className="mt-3 text-sm text-muted">{footnote}</div> : null}
    </div>
  );
}

/** Pie de fuentes para datos de competidores: fecha de revisión visible + enlaces a sus páginas públicas. */
export function SourceNote({ sources, date = COMPETITOR_REVIEW_LABEL, className = "" }: { sources: { label: string; href: string }[]; date?: string; className?: string }) {
  return (
    <p className={`text-sm text-muted leading-relaxed ${className}`}>
      <span className="font-semibold text-ink">Última revisión: {date}.</span> Datos tomados de sus páginas públicas:{" "}
      {sources.map((s, i) => (
        <span key={s.href}>
          {i > 0 ? ", " : ""}
          <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" className="underline decoration-line underline-offset-2 hover:text-ink">
            {s.label}
          </a>
        </span>
      ))}
      .
    </p>
  );
}

/* ───────────── Texto largo ───────────── */

/** Envoltura para legales, blog y guías (estilos en globals.css › .prose-root). */
export function Prose({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`prose-root ${className}`}>{children}</div>;
}
