import Link from "next/link";
import { Icon } from "@/components/icons";
import { ProductByNextia } from "@/components/product-by-nextia";
import { CheckList, CtaBand, CtaButton, ExampleTag, Faq, FeatureGrid, PageHero, PricesButton, Section, SectionHeader } from "@/components/ui";
import { route } from "@/lib/routes";
import { withSlash } from "@/lib/seo";
import { planById, PRICING_FACTS } from "@/lib/site";
import { RecipeBoard } from "./recipe";
import type { VerticalData } from "./types";

/**
 * Plantilla de las páginas de Soluciones de fase 2 (plan §3.3). Orden y tonos (alternados):
 * hero (escena) → dolor (gris) → cómo trabaja root (claro) → franja de Nextia (oscuro, a la mitad) →
 * Receta (claro) → casos de uso (gris) → métricas y tu sistema (claro) → plan y otras industrias (gris) →
 * preguntas (claro) → cierre (oscuro).
 */
export function VerticalPage({ data, scene }: { data: VerticalData; scene: React.ReactNode }) {
  const pro = planById("pro");
  const basico = planById("basico");
  const siblings = data.siblings.map((p) => route(p)).filter((r) => r !== undefined);
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Soluciones", href: "/soluciones" },
          { name: data.label, href: data.path },
        ]}
        kicker={data.kicker}
        title={data.h1}
        intro={data.intro}
        cta={`${data.cta}-hero`}
        note={data.heroNote}
        visual={scene}
      />

      {/* Dolor: tres preguntas */}
      <Section tone="gris" labelledBy="dolor-titulo">
        <SectionHeader id="dolor-titulo" kicker="El problema" title={data.pains.title} intro={data.pains.intro} />
        <FeatureGrid items={data.pains.items} cols={3} />
      </Section>

      {/* Cómo trabaja root */}
      <Section labelledBy="como-titulo">
        <SectionHeader id="como-titulo" kicker="Cómo trabaja root" title={data.how.title} intro={data.how.intro} />
        <FeatureGrid items={data.how.items} cols={3} />
        <p className="mt-8 text-muted leading-relaxed max-w-3xl">
          Todo pasa por el <strong className="text-ink">número de tu empresa</strong>, con la API oficial de WhatsApp Business. Si alguien de tu equipo se va, las
          conversaciones se quedan contigo.
        </p>
      </Section>

      <ProductByNextia />

      {/* Receta */}
      <Section id="receta" labelledBy="receta-titulo">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-14">
          <SectionHeader id="receta-titulo" kicker="La Receta" title={data.recipe.title} intro={data.recipe.intro} className="mb-0! md:mb-0!" />
          <ExampleTag>Receta de ejemplo · la ajustamos contigo</ExampleTag>
        </div>
        <RecipeBoard recipe={data.recipe} />
      </Section>

      {/* Casos de uso */}
      <Section tone="gris" labelledBy="casos-titulo">
        <SectionHeader id="casos-titulo" kicker="Casos de uso" title={data.useCases.title} intro={data.useCases.intro} />
        <FeatureGrid items={data.useCases.items} cols={3} />
      </Section>

      {/* Métricas + convivencia con su sistema */}
      <Section labelledBy="metricas-titulo">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeader id="metricas-titulo" kicker="Lo que vas a ver" title={data.metrics.title} intro={data.metrics.intro} />
            <dl className="grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2">
              {data.metrics.items.map((m) => (
                <div key={m.name} className="bg-surface p-5">
                  <dt className="font-semibold text-ink flex items-center gap-2">
                    <Icon name="chart" className="w-4 h-4 text-lime" />
                    {m.name}
                  </dt>
                  <dd className="mt-1.5 text-sm text-muted leading-relaxed">{m.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <aside className="card p-6 md:p-8 lg:mt-24" aria-labelledby="sistema-titulo">
            <h3 id="sistema-titulo" className="h-card text-xl text-ink">
              {data.fit.title}
            </h3>
            <p className="mt-3 text-muted leading-relaxed">{data.fit.text}</p>
            <CheckList items={data.fit.points} className="mt-6" />
            <Link href={withSlash("/producto/integraciones")} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4">
              Ver integraciones <Icon name="arrow" className="w-4 h-4" />
            </Link>
          </aside>
        </div>
      </Section>

      {/* Plan + otras industrias */}
      <Section tone="gris" labelledBy="plan-titulo">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="card p-6 md:p-8">
            <p className="kicker">Qué plan necesitas</p>
            <h2 id="plan-titulo" className="h-section text-ink mt-3">
              Los agentes de IA vienen en {pro.name} y Enterprise
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              El plan {pro.name} cuesta <strong className="text-ink">{pro.priceLabel} {pro.period}</strong> e incluye {pro.users} y agentes de IA. Si tu
              operación es más grande, Enterprise se cotiza a la medida. El plan {basico.name} ({basico.priceLabel} {basico.period}) trae la API oficial y
              el CRM, sin agentes de IA.
            </p>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              {PRICING_FACTS.meta} {PRICING_FACTS.cancel}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PricesButton label="Ver todos los precios" />
              <CtaButton cta={`${data.cta}-plan`} label="Pregúntanos por WhatsApp" variant="ghost" />
            </div>
          </div>
          <div>
            <h3 className="h-card text-xl text-ink">root en otras industrias</h3>
            <ul className="mt-5 grid gap-3">
              {siblings.map((r) => (
                <li key={r.path}>
                  <Link href={withSlash(r.path)} className="card card-hover flex items-center justify-between gap-4 p-5">
                    <span>
                      <span className="block font-semibold text-ink">{r.label}</span>
                      {r.blurb ? <span className="block text-sm text-muted mt-0.5">{r.blurb}</span> : null}
                    </span>
                    <Icon name="arrow" className="w-4 h-4 shrink-0 text-ink" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href={withSlash("/soluciones")} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink mt-1">
                  Ver todas las soluciones <Icon name="arrow" className="w-4 h-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Faq items={data.faq} tone="claro" />

      <CtaBand kicker="Que nadie se quede en visto." title={data.close.title} text={data.close.text} cta={`${data.cta}-final`} />
    </>
  );
}
