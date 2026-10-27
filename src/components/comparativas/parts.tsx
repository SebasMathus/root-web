import Link from "next/link";
import { Icon } from "@/components/icons";
import { withSlash } from "@/lib/seo";

/*
 * Piezas de servidor de /comparativas. La página compara root con «otros sistemas» por tipo de herramienta:
 * nunca se nombran marcas de la competencia ni se citan sus páginas o precios.
 */

/** Dos columnas honestas: cuándo te conviene otro tipo de sistema y cuándo root. */
export function HonestSplit({ other, root }: { other: React.ReactNode[]; root: React.ReactNode[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="card p-6 md:p-8">
        <p className="kicker">Te conviene otro sistema si…</p>
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
        <p className="kicker">
          Te conviene <span className="normal-case">root</span> si…
        </p>
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

/** Lista «Qué preguntar antes de elegir»: la pregunta, por qué importa y la respuesta de root. */
export function AskChecklist({ items }: { items: { q: string; why: React.ReactNode; root: React.ReactNode }[] }) {
  return (
    <ol className="grid gap-5 md:grid-cols-2">
      {items.map((it, i) => (
        <li key={it.q} className="card p-6 md:p-7 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <span className="mono w-8 h-8 rounded-lg grid place-items-center shrink-0 text-sm font-semibold bg-surface-2 border border-line text-ink">
              {i + 1}
            </span>
            <h3 className="h-card text-lg md:text-xl text-ink leading-snug pt-0.5">{it.q}</h3>
          </div>
          <p className="text-muted leading-relaxed">{it.why}</p>
          <p className="mt-auto rounded-xl bg-lime-soft px-4 py-3 text-[15px] text-ink leading-relaxed">
            <span className="font-semibold">
              En <span className="normal-case">root</span>:
            </span>{" "}
            {it.root}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** Enlaces a páginas relacionadas (precios, producto, guías). */
export function RelatedLinks({ items }: { items: { href: string; label: string; text: string }[] }) {
  return (
    <nav aria-label="Páginas relacionadas" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <Link key={it.href} href={withSlash(it.href)} className="card card-hover p-5 flex items-start justify-between gap-4">
          <span>
            <span className="block font-display font-bold text-ink">{it.label}</span>
            <span className="block mt-1 text-sm text-muted leading-relaxed">{it.text}</span>
          </span>
          <Icon name="arrow" className="w-4 h-4 mt-1 shrink-0 text-ink" />
        </Link>
      ))}
    </nav>
  );
}
