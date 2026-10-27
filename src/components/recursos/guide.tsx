import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Icon } from "@/components/icons";
import { withSlash } from "@/lib/seo";
import { absoluteUrl, PARENT, SITE_NAME, SITE_URL } from "@/lib/site";

/*
 * Piezas de las guías y herramientas de Recursos (equipo «recursos»).
 * Server components: el texto se rastrea sin JS.
 */

/** Fecha de publicación de las guías y herramientas de esta tanda (ISO). */
export const RECURSOS_PUBLISHED = "2026-10-27";
/** Fecha visible de la última revisión de los datos de Meta. */
export const META_REVIEW_LABEL = "27 de octubre de 2026";

/** Páginas oficiales de Meta sobre el cobro de la plataforma de WhatsApp Business. */
export const META_PRICING_SOURCES = [
  { label: "Meta for Developers: precios de la plataforma de WhatsApp Business", href: "https://developers.facebook.com/docs/whatsapp/pricing" },
  { label: "WhatsApp Business: precios de la plataforma y tablas de tarifas", href: "https://business.whatsapp.com/products/platform-pricing" },
];

const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00-06:00`).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Mexico_City" });

/** Article JSON-LD de una guía. */
export function ArticleJsonLd({
  title,
  description,
  path,
  published = RECURSOS_PUBLISHED,
  updated,
  section = "Guías",
}: {
  title: string;
  description: string;
  path: string;
  published?: string;
  updated?: string;
  section?: string;
}) {
  const org = { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/`, logo: absoluteUrl("/favicon.png").replace(/\/$/, ""), parentOrganization: { "@type": "Organization", name: PARENT.name, url: PARENT.url } };
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        articleSection: section,
        datePublished: published,
        dateModified: updated ?? published,
        inLanguage: "es-MX",
        mainEntityOfPage: absoluteUrl(path),
        url: absoluteUrl(path),
        author: org,
        publisher: org,
      }}
    />
  );
}

/** JSON-LD de una herramienta que corre en el navegador. */
export function ToolJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name,
        description,
        url: absoluteUrl(path),
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: "es-MX",
        isAccessibleForFree: true,
        publisher: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` },
      }}
    />
  );
}

/** Línea de autoría y fecha bajo el hero de una guía. */
export function GuideByline({ published = RECURSOS_PUBLISHED, updated, minutes }: { published?: string; updated?: string; minutes: number }) {
  return (
    <>
      Por el equipo de root · Publicada el <time dateTime={published}>{fmtDate(published)}</time>
      {updated ? (
        <>
          {" "}
          · Actualizada el <time dateTime={updated}>{fmtDate(updated)}</time>
        </>
      ) : null}{" "}
      · {minutes} min de lectura
    </>
  );
}

/** Índice de la guía («En esta guía»). Los id deben existir en los h2 del texto. */
export function GuideToc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-labelledby="toc-titulo" className="card p-5 md:p-6">
      <p id="toc-titulo" className="kicker">
        En esta guía
      </p>
      <ol className="mt-3 grid gap-2 text-[15px] list-none! pl-0!">
        {items.map((it, i) => (
          <li key={it.id} className="flex gap-3 mt-0!">
            <span className="mono text-muted w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
            <a href={`#${it.id}`} className="no-underline! text-ink hover:underline!">
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Recuadro destacado dentro de una guía. tone: agente (lima), equipo (cielo), alerta (coral) o neutro. */
export function Callout({ title, children, tone = "neutro" }: { title: string; children: React.ReactNode; tone?: "agente" | "equipo" | "alerta" | "neutro" }) {
  const border = { agente: "border-l-lime", equipo: "border-l-sky", alerta: "border-l-coral", neutro: "border-l-ink" }[tone];
  return (
    <aside className={`card border-l-4 ${border} p-5 md:p-6`}>
      <p className="font-display font-bold text-ink">{title}</p>
      <div className="mt-2 text-[15px] leading-relaxed text-muted">{children}</div>
    </aside>
  );
}

/** Fuentes oficiales con fecha de revisión visible. */
export function OfficialSources({ sources, date = META_REVIEW_LABEL, intro = "Fuentes oficiales" }: { sources: { label: string; href: string }[]; date?: string; intro?: string }) {
  return (
    <div className="card p-5 md:p-6 text-sm leading-relaxed">
      <p className="font-semibold text-ink">
        {intro} · revisadas el {date}
      </p>
      <ul className="mt-3 grid gap-2 list-none! pl-0!">
        {sources.map((s) => (
          <li key={s.href} className="flex items-start gap-2 mt-0!">
            <Icon name="external" className="w-4 h-4 mt-1 shrink-0 text-muted" />
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-2">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export type RelatedItem = { href: string; label: string; text: string; kind?: string };

/** Enlaces a páginas hermanas y a precios, al final de cada guía o herramienta. */
export function RelatedLinks({ items, title = "Sigue leyendo", id = "relacionadas" }: { items: RelatedItem[]; title?: string; id?: string }) {
  return (
    <section className="mt-16 md:mt-20" aria-labelledby={`${id}-titulo`}>
      <h2 id={`${id}-titulo`} className="h-section text-ink text-[1.6rem]!">
        {title}
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={withSlash(it.href)} className="card card-hover p-5 h-full flex flex-col gap-2">
              {it.kind ? <span className="kicker">{it.kind}</span> : null}
              <span className="h-card text-ink text-[17px]">{it.label}</span>
              <span className="text-[15px] text-muted leading-relaxed">{it.text}</span>
              <span className="mt-auto pt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                Ir <Icon name="arrow" className="w-4 h-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Catálogo de enlaces internos de Recursos (texto corto para tarjetas «Sigue leyendo»). */
export const RELATED: Record<string, RelatedItem> = {
  appVsApi: { href: "/guias/whatsapp-business-app-vs-api", label: "WhatsApp Business App o API", text: "Cuál necesita tu equipo según cuántas personas atienden y qué quieres automatizar.", kind: "Guía" },
  costoApi: { href: "/guias/cuanto-cuesta-la-api-de-whatsapp", label: "Cuánto cuesta la API de WhatsApp", text: "Cómo cobra Meta cada mensaje y qué parte del costo es del software.", kind: "Guía" },
  chatbotVsAgente: { href: "/guias/chatbot-vs-agente-de-ia-vs-crm", label: "Chatbot, agente de IA o CRM", text: "Qué resuelve cada uno y cuándo te conviene tenerlos juntos.", kind: "Guía" },
  generador: { href: "/herramientas/generador-de-link-de-whatsapp", label: "Generador de link de WhatsApp", text: "Arma tu link wa.me con mensaje y cópialo en un clic.", kind: "Herramienta" },
  calculadora: { href: "/herramientas/calculadora-de-ventas-perdidas", label: "Calculadora de ventas perdidas", text: "Pon tus números y ve cuánto dejas en la mesa por contestar tarde.", kind: "Herramienta" },
  precios: { href: "/precios", label: "Precios de root", text: "Planes en pesos desde $4,999 MXN al mes. Mensajes de Meta sin sobreprecio.", kind: "Precios" },
  agentes: { href: "/producto/agentes-de-ia", label: "Agentes de IA de root", text: "Contestan, califican, agendan, dan seguimiento y le pasan el prospecto a tu equipo.", kind: "Producto" },
  bandeja: { href: "/producto/bandeja-de-whatsapp", label: "Bandeja de WhatsApp", text: "Todo tu equipo y tus agentes en el número de tu empresa.", kind: "Producto" },
  campanas: { href: "/producto/campanas-y-seguimiento", label: "Campañas y seguimiento", text: "Seguimiento automático y el origen de cada trato.", kind: "Producto" },
};
