import Link from "next/link";
import { Icon } from "@/components/icons";
import { COMPARISON_PAGES, route } from "@/lib/routes";
import { withSlash } from "@/lib/seo";
import { COMPETITOR_REVIEW_LABEL } from "@/lib/site";
import type { Source } from "./data";

/* Piezas de servidor de las comparativas (equipo «comparativas»). */

/** Enlace a una página pública de un competidor: pestaña nueva y nofollow. */
export function Ext({ src, children }: { src: Source; children?: React.ReactNode }) {
  return (
    <a
      href={src.href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="underline decoration-line underline-offset-2 hover:decoration-ink"
    >
      {children ?? src.label}
      {/* «fuente» suelto no dice a dónde lleva: el lector de pantalla escucha también la página citada. */}
      {typeof children === "string" && children.toLowerCase() === "fuente" ? <span className="sr-only">: {src.label}</span> : null}
    </a>
  );
}

/** Celda de tabla con dato del competidor + enlace corto a su fuente. */
export function Cited({ children, src }: { children: React.ReactNode; src: Source }) {
  return (
    <span>
      {children}{" "}
      <a
        href={src.href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="whitespace-nowrap text-xs text-muted underline decoration-line underline-offset-2 hover:text-ink"
        title={src.label}
      >
        Fuente
        <span className="sr-only">: {src.label}</span>
      </a>
    </span>
  );
}

/** Tarjeta «Resumen en 30 segundos» para el hero (visual de PageHero). */
export function SummaryCard({
  title = "En 30 segundos",
  items,
  footer,
}: {
  title?: string;
  items: { label: string; text: React.ReactNode; role?: "root" | "otro" }[];
  footer?: React.ReactNode;
}) {
  return (
    <aside className="card p-6 md:p-8 shadow-[var(--shadow)]" aria-label={title}>
      <p className="kicker">{title}</p>
      <ol className="mt-5 flex flex-col gap-5">
        {items.map((it, i) => (
          <li key={it.label} className="grid grid-cols-[2rem_1fr] gap-3">
            <span
              className={`mono w-8 h-8 rounded-lg grid place-items-center text-sm font-semibold ${it.role === "root" ? "bg-lime-fill text-fixed-ink" : "bg-surface-2 text-ink border border-line"}`}
            >
              {i + 1}
            </span>
            <div>
              <p className="font-display font-bold text-ink leading-snug">{it.label}</p>
              <p className="mt-1 text-[15px] text-muted leading-relaxed">{it.text}</p>
            </div>
          </li>
        ))}
      </ol>
      {footer ? (
        <div className="mt-6 border-t border-line pt-4 text-sm text-muted">{footer}</div>
      ) : (
        <p className="mt-6 border-t border-line pt-4 text-sm text-muted">Datos de competidores revisados el {COMPETITOR_REVIEW_LABEL}.</p>
      )}
    </aside>
  );
}

/** Dos columnas honestas: lo que hace mejor el otro y lo que cambia con root. */
export function HonestSplit({ otherName, other, root }: { otherName: string; other: React.ReactNode[]; root: React.ReactNode[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="card p-6 md:p-8">
        <p className="kicker">Te conviene {otherName} si…</p>
        <ul className="mt-5 flex flex-col gap-4">
          {other.map((t, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-ink">
              <span className="mt-[3px] w-5 h-5 rounded-md grid place-items-center shrink-0 bg-surface-2 border border-line text-ink">
                <Icon name="check" className="w-3.5 h-3.5" strokeWidth={2.4} />
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="card p-6 md:p-8 border-ink/30">
        <p className="kicker">Te conviene <span className="normal-case">root</span> si…</p>
        <ul className="mt-5 flex flex-col gap-4">
          {root.map((t, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-ink">
              <span className="mt-[3px] w-5 h-5 rounded-md grid place-items-center shrink-0 bg-lime-fill text-fixed-ink">
                <Icon name="check" className="w-3.5 h-3.5" strokeWidth={2.6} />
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Pasos numerados (cómo cambiarte a root). */
export function Steps({ items }: { items: { title: string; text: React.ReactNode }[] }) {
  return (
    <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <li key={s.title} className="card p-6 flex flex-col gap-3">
          <span className="mono text-sm text-muted">Paso {i + 1}</span>
          <h3 className="h-card text-lg text-ink">{s.title}</h3>
          <p className="text-muted leading-relaxed">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/**
 * Enlaces a páginas hermanas + precios. `exclude`: la ruta actual. Toma etiquetas y descripciones de lib/routes.
 */
export function SiblingLinks({ current, extra = [] }: { current: string; extra?: { href: string; label: string; text: string }[] }) {
  const siblings = [route("/comparativas"), ...COMPARISON_PAGES]
    .filter((r): r is NonNullable<typeof r> => !!r && r.path !== current)
    .map((r) => ({
      href: r.path,
      label: r.label,
      text: r.blurb ?? (r.group === "alternativas" ? "Opciones si estás buscando cambiarte" : ""),
    }));
  const items = [
    { href: "/precios", label: "Precios de root", text: "Planes en pesos: Básico, Pro con IA y Enterprise" },
    ...extra,
    ...siblings,
  ];
  return (
    <nav aria-label="Más comparativas" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <Link key={it.href} href={withSlash(it.href)} className="card card-hover p-5 flex items-start justify-between gap-4">
          <span>
            <span className="block font-display font-bold text-ink">{it.label}</span>
            {it.text ? <span className="block mt-1 text-sm text-muted leading-relaxed">{it.text}</span> : null}
          </span>
          <Icon name="arrow" className="w-4 h-4 mt-1 shrink-0 text-ink" />
        </Link>
      ))}
    </nav>
  );
}

/** Tarjeta de una alternativa (páginas /alternativas/*). root va primero y resaltada. */
export function AlternativeCard({
  rank,
  name,
  forWho,
  points,
  links,
  highlight = false,
  cta,
}: {
  rank: number;
  name: string;
  forWho: string;
  points: React.ReactNode[];
  links?: { href: string; label: string }[];
  highlight?: boolean;
  /** Nodo extra al pie (ej. el CTA de WhatsApp en la tarjeta de root). */
  cta?: React.ReactNode;
}) {
  return (
    <article className={`card p-6 md:p-8 flex flex-col gap-4 ${highlight ? "border-ink/40 shadow-[var(--shadow)]" : ""}`}>
      <div className="flex items-center gap-3">
        <span
          className={`mono w-9 h-9 rounded-lg grid place-items-center font-semibold ${highlight ? "bg-lime-fill text-fixed-ink" : "bg-surface-2 border border-line text-ink"}`}
        >
          {rank}
        </span>
        <h3 className="h-card text-2xl text-ink">{name}</h3>
      </div>
      <p className="font-semibold text-ink leading-snug">{forWho}</p>
      <ul className="flex flex-col gap-2.5 text-muted leading-relaxed">
        {points.map((p, i) => (
          <li key={i} className="flex gap-2.5">
            <span aria-hidden="true" className={`mt-[9px] w-1.5 h-1.5 rounded-full shrink-0 ${highlight ? "bg-lime" : "bg-muted"}`} />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      {links?.length || cta ? (
        <div className="mt-auto pt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
          {cta}
          {links?.map((l) => (
            <Link
              key={l.href}
              href={withSlash(l.href)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
            >
              {l.label} <Icon name="arrow" className="w-4 h-4" />
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  );
}
