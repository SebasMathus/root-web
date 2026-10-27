import { JsonLd } from "@/components/json-ld";
import { CheckList, CtaButton, RoleChip } from "@/components/ui";
import { absoluteUrl, DEFAULT_DESCRIPTION, PARENT, PLANS, PRICING_FACTS, SITE_NAME, SITE_URL, type Plan } from "@/lib/site";

/*
 * Tarjetas de planes (datos de lib/site › PLANS: Básico, Pro, Enterprise tal como están publicados).
 * - <PlanCards />: versión completa de /precios, con lo que incluye y lo que no, y CTA «Hablar con un asesor».
 * - <PlanStrip />: versión corta para la portada (precio, usuarios y si trae agentes de IA).
 * Leyenda de IVA: la de los Términos (PRICING_FACTS.iva) hasta que producto la resuelva.
 */

function Price({ plan, size = "lg" }: { plan: Plan; size?: "lg" | "md" }) {
  if (plan.price === null) {
    return <p className={`font-display font-extrabold tracking-[-0.02em] text-ink ${size === "lg" ? "text-[30px]" : "text-2xl"} leading-tight`}>{plan.priceLabel}</p>;
  }
  return (
    <p className="flex flex-wrap items-baseline gap-x-2">
      <span className={`font-display font-extrabold tracking-[-0.02em] text-ink ${size === "lg" ? "text-[44px]" : "text-[32px]"} leading-none`}>{plan.priceLabel}</span>
      <span className="text-sm text-muted">{plan.period}</span>
    </p>
  );
}

function AiChip({ plan }: { plan: Plan }) {
  return plan.ai ? <RoleChip role="agente">Incluye agentes de IA</RoleChip> : <span className="chip">Sin agentes de IA</span>;
}

export function PlanCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
      {PLANS.map((p) => {
        const hl = !!p.highlight;
        return (
          <article
            key={p.id}
            aria-labelledby={`plan-${p.id}`}
            className={`card relative flex flex-col p-7 md:p-8 ${hl ? "border-ink shadow-[var(--shadow)] lg:-my-3 lg:py-11" : ""}`}
          >
            {hl ? <span className="absolute -top-3 left-7 rounded-full bg-lime-fill px-3 py-1 text-xs font-semibold text-fixed-ink">{p.highlight}</span> : null}
            <h3 id={`plan-${p.id}`} className="h-card text-2xl text-ink">
              {p.name}
            </h3>
            <p className="mt-1 text-sm text-muted">Para {p.audience.toLowerCase()}</p>
            <div className="mt-6">
              <Price plan={p} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="chip">{p.users}</span>
              <AiChip plan={p} />
            </div>
            <CtaButton label="Hablar con un asesor" cta={`precios-${p.id}`} variant={hl ? "primary" : "outline"} className="mt-7 w-full" />
            <div className="mt-7 border-t border-line pt-6">
              <p className="text-sm font-semibold text-ink">Incluye</p>
              <CheckList items={p.includes} className="mt-4 text-[15px]" />
              {p.excludes.length ? (
                <>
                  <p className="mt-6 text-sm font-semibold text-ink">No incluye</p>
                  <CheckList items={p.excludes} variant="x" className="mt-4 text-[15px]" />
                </>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function PlanStrip() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {PLANS.map((p) => (
        <div key={p.id} className={`card flex flex-col gap-3 p-6 ${p.highlight ? "border-ink" : ""}`}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="h-card text-lg text-ink">{p.name}</h3>
            {p.highlight ? <span className="rounded-full bg-lime-fill px-2.5 py-0.5 text-xs font-semibold text-fixed-ink">{p.highlight}</span> : null}
          </div>
          <Price plan={p} size="md" />
          <div className="flex flex-wrap gap-2">
            <span className="chip">{p.users}</span>
            <AiChip plan={p} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Leyenda bajo los precios: IVA según los Términos y mensajes de Meta. */
export function PriceLegend({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm text-muted leading-relaxed ${className}`}>
      Precios mensuales en pesos mexicanos. {PRICING_FACTS.iva} {PRICING_FACTS.meta}
    </p>
  );
}

/** Datos estructurados del producto con sus planes (precio en MXN; Enterprise sin precio publicado). */
export function SoftwareJsonLd({ path }: { path: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: SITE_NAME,
        url: absoluteUrl(path),
        description: DEFAULT_DESCRIPTION,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: "es-MX",
        publisher: { "@id": `${SITE_URL}/#organization` },
        creator: { "@type": "Organization", name: PARENT.name, url: PARENT.url },
        offers: PLANS.filter((p) => p.price !== null).map((p) => ({
          "@type": "Offer",
          name: `Plan ${p.name}`,
          price: p.price,
          priceCurrency: "MXN",
          url: absoluteUrl("/precios"),
          description: `${p.users}. ${p.includes.join(", ")}.`,
        })),
      }}
    />
  );
}
