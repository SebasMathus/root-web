import Link from "next/link";
import { Icon } from "@/components/icons";
import { ProductByNextia } from "@/components/product-by-nextia";
import { CheckList, CtaBand, CtaPair, ExampleTag, Faq, FeatureGrid, LinkButton, PageHero, RoleChip, Section, SectionHeader } from "@/components/ui";
import { route } from "@/lib/routes";
import { withSlash } from "@/lib/seo";
import { GUIDE_PHRASE, planById } from "@/lib/site";
import { HERO_NOTE, PAGE_ICONS, PLAN_AI_TEXT, PLAN_TERMS } from "./shared";
import type { Lane, Vertical, VerticalRecipe, VerticalSceneData, VerticalStep } from "./types";
import { VerticalScene } from "./vertical-scene";

/*
 * Plantilla de las páginas de Soluciones (plan §3.3). Uso en src/app/(site)/soluciones/<slug>/page.tsx:
 *   import { VerticalPage } from "@/components/soluciones/vertical-page";
 *   import { vertical } from "./_data";
 *   export default function Page() { return <VerticalPage v={vertical} />; }
 * Orden y tonos (sin dos tonos iguales seguidos; la franja de Nextia a la mitad, entre dos secciones claras):
 *   Hero (claro) → Dolores (gris) → Cómo trabaja (claro) → Receta (oscuro) → Casos de uso (claro)
 *   → <ProductByNextia /> → Lo que vas a ver (claro) → Precio y hermanas (gris) → FAQ (claro) → CtaBand.
 * Las piezas también se exportan sueltas por si una página necesita otro orden.
 */

export function VerticalPage({ v }: { v: Vertical }) {
  const id = v.ctaId;
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Soluciones", href: "/soluciones" },
          { name: v.label, href: v.path },
        ]}
        kicker={v.kicker}
        title={v.h1}
        intro={v.intro}
        cta={`${id}-hero`}
        ctaLabel={v.heroCtaLabel}
        note={HERO_NOTE}
        visual={<VerticalSceneBlock data={v.scene} caption={v.sceneCaption} />}
      />

      <PainCards id={`${id}-dolores`} {...v.pains} />
      <HowSteps id={`${id}-como`} {...v.how} />
      <RecipeBlock id={`${id}-receta`} recipe={v.recipe} />
      <Section tone="claro" labelledBy={`${id}-casos-titulo`}>
        <SectionHeader id={`${id}-casos-titulo`} kicker="Casos de uso" title={v.useCases.title} intro={v.useCases.intro} />
        <FeatureGrid items={v.useCases.items} cols={3} />
      </Section>

      <ProductByNextia />

      <MetricsBlock id={`${id}-metricas`} metrics={v.metrics} systems={v.systems} />
      <PlanAndSiblings id={`${id}-precio`} cta={`${id}-precio`} siblings={v.siblings} planText={v.planText} />
      <Faq id={`${id}-preguntas`} title={v.faq.title} items={v.faq.items} tone="claro" />
      <CtaBand cta={v.closing.cta ?? `${id}-final`} kicker="Que nadie se quede en visto" title={v.closing.title} text={v.closing.text} label={v.closing.label} />
    </>
  );
}

/* ───────────── Escena del hero con su etiqueta de ejemplo (visible, fuera del dibujo aria-hidden) ───────────── */

export function VerticalSceneBlock({ data, caption }: { data: VerticalSceneData; caption: string }) {
  return (
    <div>
      <VerticalScene data={data} caption={caption} />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <ExampleTag />
        <span className="text-xs text-muted">Escena ilustrativa · negocio y prospecto ficticios</span>
      </div>
    </div>
  );
}

/* ───────────── Dolores en formato pregunta ───────────── */

export function PainCards({ id, kicker = "El problema", title, intro, items }: { id: string } & Vertical["pains"]) {
  return (
    <Section tone="gris" labelledBy={`${id}-titulo`}>
      <SectionHeader id={`${id}-titulo`} kicker={kicker} title={title} intro={intro} />
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((p) => (
          <article key={p.q} className="card flex flex-col gap-3 p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-coral-soft text-coral">
              <Icon name={p.icon} className="h-5 w-5" />
            </span>
            <h3 className="h-card text-lg text-ink">{p.q}</h3>
            <p className="leading-relaxed text-muted">{p.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ───────────── Cómo trabaja root en la industria ───────────── */

export function HowSteps({ id, title, intro, steps }: { id: string; title: string; intro?: string; steps: VerticalStep[] }) {
  const cols = steps.length >= 5 ? "lg:grid-cols-5" : steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <Section tone="claro" labelledBy={`${id}-titulo`}>
      <SectionHeader id={`${id}-titulo`} kicker="Cómo trabaja root" title={title} intro={intro} />
      <ol className={`grid gap-4 sm:grid-cols-2 ${cols}`}>
        {steps.map((s, i) => (
          <li key={s.title} className={`card flex flex-col gap-3 p-5 border-t-4 ${s.role === "equipo" ? "border-t-sky" : "border-t-lime-fill"}`}>
            <div className="flex items-center justify-between gap-2">
              <span className="mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              <RoleChip role={s.role} />
            </div>
            <span className={`grid h-10 w-10 place-items-center rounded-xl ${s.role === "equipo" ? "bg-sky-soft text-sky" : "bg-lime-soft text-lime"}`}>
              <Icon name={s.icon} className="h-5 w-5" />
            </span>
            <h3 className="h-card text-base text-ink">{s.title}</h3>
            <p className="text-[15px] leading-relaxed text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 font-display text-xl font-extrabold tracking-[-0.01em] text-ink md:text-2xl">{GUIDE_PHRASE}</p>
    </Section>
  );
}

/* ───────────── Receta de la industria: etapas con carriles, preguntas, regla de pase y cadencia ───────────── */

const LANE_LABEL: Record<Lane, string> = { agente: "Carril del agente", equipo: "Carril del equipo" };

/** Etapas del embudo con su carril. Marca el relevo donde el trato pasa del agente al equipo. */
export function StageLanes({ stages }: { stages: { name: string; lane: Lane }[] }) {
  const cols = stages.length >= 6 ? "md:grid-cols-6" : stages.length === 5 ? "md:grid-cols-5" : stages.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3";
  return (
    <ol className={`grid gap-3 ${cols}`}>
      {stages.map((s, i) => {
        const relevo = i > 0 && stages[i - 1].lane === "agente" && s.lane === "equipo";
        const back = i > 0 && stages[i - 1].lane === "equipo" && s.lane === "agente";
        return (
          <li key={s.name} className={`rounded-xl border border-line bg-surface p-4 border-t-4 ${s.lane === "agente" ? "border-t-lime-fill" : "border-t-sky"}`}>
            <div className="flex items-center justify-between gap-2">
              <span className="mono text-xs text-muted">Etapa {i + 1}</span>
              {relevo ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky">
                  <Icon name="handoff" className="h-3.5 w-3.5" /> Relevo
                </span>
              ) : back ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-lime">
                  <Icon name="repeat" className="h-3.5 w-3.5" /> Vuelve al agente
                </span>
              ) : null}
            </div>
            <p className="mt-2 font-semibold leading-snug text-ink">{s.name}</p>
            <p className={`mt-1 text-xs font-medium ${s.lane === "agente" ? "text-lime" : "text-sky"}`}>{LANE_LABEL[s.lane]}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function RecipeBlock({ id, recipe }: { id: string; recipe: VerticalRecipe }) {
  return (
    <Section tone="oscuro" grid labelledBy={`${id}-titulo`}>
      <SectionHeader id={`${id}-titulo`} kicker="La Receta de tu industria" title={recipe.title} intro={recipe.intro} />

      <div className="card p-5 md:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="h-card text-lg text-ink">Etapas del embudo</h3>
          <div className="flex flex-wrap gap-2">
            <RoleChip role="agente">{LANE_LABEL.agente}</RoleChip>
            <RoleChip role="equipo">{LANE_LABEL.equipo}</RoleChip>
          </div>
        </div>
        <StageLanes stages={recipe.stages} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="card flex flex-col p-6 md:p-7">
          <h3 className="h-card text-lg text-ink">Preguntas de calificación</h3>
          <p className="mt-1 text-[15px] text-muted">Tu agente las hace en la conversación y llena con ellas la Ficha viva del prospecto.</p>
          <ol className="mt-5 flex flex-col gap-3">
            {recipe.questions.map((q, i) => (
              <li key={q} className="flex items-start gap-3">
                <span className="mono mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-lime-soft text-xs text-lime">{i + 1}</span>
                <span className="leading-relaxed text-ink">{q}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6 rounded-xl border border-dashed border-line p-4 md:mt-auto">
            <p className="kicker">Regla de pase</p>
            <p className="mt-2 leading-relaxed text-ink">{recipe.passRule}</p>
          </div>
        </div>

        <div className="card p-6 md:p-7">
          <h3 className="h-card text-lg text-ink">Cadencia de seguimiento</h3>
          <p className="mt-1 text-[15px] text-muted">Si el prospecto deja de contestar, tu agente retoma la conversación. Cuando responde, la cadencia se detiene.</p>
          <ol className="relative mt-5 flex flex-col gap-4 border-l border-line pl-5">
            {recipe.cadence.map((c) => (
              <li key={c.day} className="relative">
                <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-lime-fill ring-4 ring-[var(--surface)]" aria-hidden="true" />
                <span className="mono text-xs uppercase tracking-[0.1em] text-lime">{c.day}</span>
                <p className="mt-1.5 w-fit max-w-full rounded-2xl rounded-bl-md bg-lime-soft px-4 py-2.5 text-[15px] leading-relaxed text-ink">{c.text}</p>
              </li>
            ))}
          </ol>
          <ExampleTag className="mt-5">Mensajes de ejemplo</ExampleTag>
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
        La Receta es el punto de partida, no una plantilla rígida: durante el arranque la ajustamos contigo a tus etapas, tus preguntas, tu tono y los
        días de seguimiento que funcionan en tu negocio.
      </p>
    </Section>
  );
}

/* ───────────── Lo que vas a ver + cómo convive con los sistemas de la industria ───────────── */

export function MetricsBlock({ id, metrics, systems }: { id: string; metrics: Vertical["metrics"]; systems: Vertical["systems"] }) {
  return (
    <Section tone="claro" labelledBy={`${id}-titulo`}>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div>
          <SectionHeader id={`${id}-titulo`} kicker="Tú ves todo" title={metrics.title} intro={metrics.intro} className="mb-8 md:mb-10" />
          <CheckList items={metrics.items} />
          <p className="mt-8 text-[15px] leading-relaxed text-muted">
            Cada mañana, un corte con lo que tu agente atendió mientras tu equipo no estaba: quién escribió, quién quedó calificado y quién espera a una
            persona.
          </p>
        </div>
        <div className="card flex flex-col gap-4 p-6 md:p-8 lg:self-start">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-paper">
            <Icon name="plug" className="h-5 w-5" />
          </span>
          <h3 className="h-card text-xl text-ink">{systems.title}</h3>
          <p className="leading-relaxed text-muted">{systems.text}</p>
          <Link href={withSlash("/producto/integraciones")} className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:underline">
            Ver integraciones <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ───────────── Precio (plan Pro) + páginas hermanas ───────────── */

export function PlanCard({ cta, text = PLAN_AI_TEXT }: { cta: string; text?: string }) {
  const pro = planById("pro");
  return (
    <div className="card flex flex-col p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <p className="kicker">Plan {pro.name}</p>
        {pro.highlight ? <span className="chip chip-agente">{pro.highlight}</span> : null}
      </div>
      <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
        <span className="mono text-4xl font-semibold tracking-[-0.03em] text-ink md:text-5xl">{pro.priceLabel}</span>
        <span className="text-muted">{pro.period}</span>
      </p>
      <p className="mt-1 text-sm text-muted">
        {pro.users} · agentes de IA incluidos
      </p>
      <p className="mt-5 leading-relaxed text-ink">{text}</p>
      <ul className="mt-4 flex flex-col gap-1.5 text-sm text-muted">
        {PLAN_TERMS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <CtaPair cta={cta} size="md" secondary={{ href: "/precios", label: "Ver todos los planes" }} className="mt-7" />
    </div>
  );
}

export function SiblingLinks({ paths, title = "Otras industrias", showAll = true }: { paths: string[]; title?: string; showAll?: boolean }) {
  return (
    <div>
      <h3 className="h-card text-xl text-ink">{title}</h3>
      <ul className="mt-5 flex flex-col gap-3">
        {paths.map((p) => {
          const r = route(p);
          if (!r) return null;
          return (
            <li key={p}>
              <Link href={withSlash(p)} className="card card-hover flex items-center gap-4 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-ink">
                  <Icon name={PAGE_ICONS[p] ?? "sparkle"} className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink">{r.label}</span>
                  {r.blurb ? <span className="block text-sm text-muted">{r.blurb}</span> : null}
                </span>
                <Icon name="arrow" className="h-4 w-4 shrink-0 text-muted" />
              </Link>
            </li>
          );
        })}
      </ul>
      {showAll ? <LinkButton href="/soluciones" label="Ver todas las industrias" variant="ghost" size="sm" className="mt-4 -ml-4" /> : null}
    </div>
  );
}

export function PlanAndSiblings({
  id,
  cta,
  siblings,
  planText,
  siblingsTitle,
  showAll,
}: {
  id: string;
  cta: string;
  siblings: string[];
  planText?: string;
  siblingsTitle?: string;
  showAll?: boolean;
}) {
  return (
    <Section tone="gris" labelledBy={`${id}-titulo`}>
      <SectionHeader id={`${id}-titulo`} kicker="Precio en pesos" title="Cuánto cuesta tener un agente de root" />
      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <PlanCard cta={cta} text={planText} />
        <SiblingLinks paths={siblings} title={siblingsTitle} showAll={showAll} />
      </div>
    </Section>
  );
}
