import Link from "next/link";
import { Icon } from "@/components/icons";
import { ProductByNextia } from "@/components/product-by-nextia";
import { CheckList, CtaBand, Faq, FeatureGrid, PageHero, PricesButton, Section, SectionHeader } from "@/components/ui";
import { GuideTriad } from "@/components/producto/guide-triad";
import { PRODUCT_ICONS } from "@/components/producto/related";
import { ConceptTag, SceneNote } from "@/components/producto/scene-frame";
import { PRODUCT_PAGES } from "@/lib/routes";
import { pageMetadata, withSlash } from "@/lib/seo";
import { GUIDE_PHRASE, PLANS, PRICING_FACTS, TAGLINE } from "@/lib/site";

/* Búsqueda principal: «crm de whatsapp con agentes de ia» (categoría del plan §1.3). Índice de las 5 páginas de producto. */

const PATH = "/producto";

export const metadata = pageMetadata({
  title: "CRM de WhatsApp con agentes de IA: el producto",
  description:
    "CRM de WhatsApp con agentes de IA: bandeja compartida, embudos, seguimiento automático e integraciones con Salesforce, SAP, HubSpot y Excel en un solo producto.",
  path: PATH,
  ownOgImage: true,
});

/** Lo principal de cada página de producto (hechos publicables; los conceptos van marcados en su página). */
const PILLAR_POINTS: Record<string, string[]> = {
  "/producto/agentes-de-ia": ["Contestan en segundos, las 24 horas", "Califican con las preguntas de tu negocio", "Agendan, dan seguimiento y reactivan"],
  "/producto/bandeja-de-whatsapp": ["API oficial de WhatsApp Business", "Equipo y agentes en la misma bandeja", "WhatsApp e Instagram juntos"],
  "/producto/crm-y-embudos": ["Embudos con etapas para cada proceso", "Cada prospecto con dueño y siguiente paso", "Traspaso al vendedor con historial"],
  "/producto/campanas-y-seguimiento": ["Seguimiento automático por WhatsApp", "Rescate de quien dejó de contestar", "La campaña de origen de cada trato"],
  "/producto/integraciones": ["Salesforce, SAP, HubSpot y Excel", "Acciones en tu CRM o ERP ante cada evento", "Se configuran durante el arranque"],
};

const GLOSSARY: { term: string; text: string; href: string; concept?: boolean }[] = [
  { term: "Agente de root", text: "El agente de IA que atiende en WhatsApp a nombre de tu empresa. Compañero de tu equipo, no reemplazo.", href: "/producto/agentes-de-ia" },
  { term: "Habilidades", text: "Lo que hace tu agente: responder, calificar, agendar, dar seguimiento, reactivar y pasar al equipo.", href: "/producto/agentes-de-ia" },
  { term: "Bandeja compartida", text: "Donde tu equipo y tus agentes atienden juntos, con el historial de cada conversación.", href: "/producto/bandeja-de-whatsapp" },
  { term: "Línea de empresa", text: "Todo pasa por el número de tu empresa. La cartera es tuya, no del vendedor.", href: "/producto/bandeja-de-whatsapp" },
  { term: "Relevo", text: "El momento en que tu agente le pasa la conversación a tu vendedor, con una nota de quién es, qué quiere y qué ya se respondió.", href: "/producto/bandeja-de-whatsapp", concept: true },
  { term: "Carriles", text: "En cada embudo, qué etapas atiende tu agente y cuáles tu equipo.", href: "/producto/crm-y-embudos", concept: true },
  { term: "Ficha viva", text: "El perfil del prospecto que se llena mientras tu agente conversa: presupuesto, zona, fecha, producto.", href: "/producto/crm-y-embudos", concept: true },
  { term: "Reglas de pase", text: "La condición para avanzar de etapa o pasar al equipo, escrita como la dirías tú.", href: "/producto/crm-y-embudos", concept: true },
  { term: "Corte de la mañana", text: "El resumen de lo que hizo tu agente mientras tu equipo no estaba.", href: "/producto/agentes-de-ia", concept: true },
  { term: "Cadencias", text: "Secuencias de seguimiento con días y horarios: por ejemplo, días 1, 3, 7 y 30.", href: "/producto/campanas-y-seguimiento", concept: true },
  { term: "Rescate", text: "Reactivar a quien dejó de contestar y a clientes de antes.", href: "/producto/campanas-y-seguimiento" },
  { term: "Origen del trato", text: "Cada prospecto entra con la campaña que lo trajo, para que sepas qué anuncio vende.", href: "/producto/campanas-y-seguimiento" },
  { term: "Acciones conectadas", text: "Un evento en root dispara una acción en tu CRM, ERP o Excel.", href: "/producto/integraciones" },
];

const FAQS = [
  {
    q: "¿Qué es root?",
    a: "root es un CRM de WhatsApp con agentes de IA para equipos comerciales en México, hecho por Nextia. Tus agentes contestan en segundos, califican y dan seguimiento desde el número de tu empresa, y tu equipo recibe cada prospecto con el historial completo.",
  },
  {
    q: "¿Necesito contratar todo por separado?",
    a: "No. La bandeja, el CRM, los agentes de IA y las integraciones son un solo producto. Lo que cambia entre planes es el número de usuarios, si incluye agentes de IA y las integraciones avanzadas.",
  },
  {
    q: "¿Qué plan incluye agentes de IA?",
    a: "Pro y Enterprise. El plan Básico trae la API oficial de WhatsApp Business, la bandeja y el CRM, sin agentes.",
  },
  { q: "¿Cuánto tarda en arrancar?", a: PRICING_FACTS.start },
  { q: "¿Los mensajes de WhatsApp se cobran aparte?", a: PRICING_FACTS.meta },
];

export default function ProductoPage() {
  return (
    <>
      <PageHero
        kicker="Producto"
        title="El CRM de WhatsApp con agentes de IA, pieza por pieza"
        intro="Una bandeja para todo tu equipo, agentes de IA que contestan y califican, embudos donde nada se pierde, seguimiento que no depende de la memoria de nadie e integraciones con tus sistemas. Todo en un solo producto."
        breadcrumbs={[{ name: "Producto", href: PATH }]}
        cta="hero-producto"
        note={`${TAGLINE} · API oficial de WhatsApp Business desde el plan Básico`}
        visual={
          <div className="mx-auto w-full max-w-[500px]">
            <GuideTriad />
            <SceneNote />
          </div>
        }
      />

      <Section tone="gris" labelledBy="piezas-titulo">
        <SectionHeader id="piezas-titulo" kicker="Cinco piezas, un producto" title="Qué hace root por tu equipo comercial" intro={GUIDE_PHRASE} />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_PAGES.map((r, i) => (
            <li key={r.path} className={i === 0 ? "lg:row-span-2" : ""}>
              <Link href={withSlash(r.path)} className="card card-hover p-6 md:p-7 flex flex-col gap-4 h-full">
                <span className="flex items-center justify-between">
                  <span className={`w-11 h-11 rounded-xl grid place-items-center ${i === 0 ? "bg-lime-fill text-fixed-ink" : "bg-ink text-paper"}`}>
                    <Icon name={PRODUCT_ICONS[r.path]} className="w-5 h-5" />
                  </span>
                  <span className="kicker">{r.verb}</span>
                </span>
                <span className="h-card text-xl text-ink">{r.label}</span>
                <span className="text-muted leading-relaxed">{r.blurb}</span>
                <CheckList items={PILLAR_POINTS[r.path] ?? []} className="mt-1 text-[15px]" />
                <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  Conoce más <Icon name="arrow" className="w-4 h-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="juntos-titulo">
        <SectionHeader
          id="juntos-titulo"
          kicker="Por qué juntos"
          title="Agentes de IA y CRM de WhatsApp en el mismo lugar"
          intro="Un bot suelto contesta, pero no sabe qué pasa después. Un CRM sin IA ordena, pero alguien tiene que contestar a las 11 de la noche. root junta las dos cosas."
        />
        <FeatureGrid
          cols={3}
          items={[
            { icon: "bot", title: "Tu agente contesta y califica", text: "En segundos, desde el número de tu empresa, con las preguntas de tu negocio.", role: "agente" },
            { icon: "handoff", title: "Tu equipo cierra", text: "Recibe cada prospecto con el historial completo y se dedica a vender.", role: "equipo" },
            { icon: "chart", title: "Tú ves todo", text: "En qué etapa va cada prospecto, quién lo atiende y qué sigue, en un solo tablero." },
          ]}
        />
      </Section>

      <ProductByNextia />

      <Section labelledBy="glosario-titulo">
        <SectionHeader
          id="glosario-titulo"
          kicker="Las palabras de root"
          title="Cómo hablamos de tu WhatsApp comercial"
          intro={
            <>
              Nombres cortos para las piezas de root. Las que llevan la marca <ConceptTag className="align-middle" /> describen cómo trabaja root con tu equipo.
            </>
          }
        />
        <dl className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {GLOSSARY.map((g) => (
            <div key={g.term} className="border-t border-line pt-5">
              <dt className="flex flex-wrap items-center gap-3">
                <Link href={withSlash(g.href)} className="h-card text-lg text-ink hover:underline decoration-lime decoration-2 underline-offset-4">
                  {g.term}
                </Link>
                {g.concept ? <ConceptTag /> : null}
              </dt>
              <dd className="mt-2 text-muted leading-relaxed">{g.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="gris" labelledBy="planes-titulo">
        <SectionHeader id="planes-titulo" kicker="Planes" title="Qué incluye cada plan de root" intro="Precios en pesos mexicanos, al mes. Mensajes de WhatsApp a tarifa oficial de Meta, sin sobreprecio." />
        <div className="grid gap-5 md:grid-cols-3">
          {PLANS.map((p) => (
            <article key={p.id} className={`card p-6 md:p-7 flex flex-col gap-3 ${p.highlight ? "ring-2 ring-lime" : ""}`}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="h-card text-xl text-ink">{p.name}</h3>
                {p.highlight ? <span className="chip chip-agente">{p.highlight}</span> : null}
              </div>
              <p>
                <span className="font-display font-extrabold text-3xl text-ink">{p.priceLabel}</span> <span className="text-sm text-muted">{p.period}</span>
              </p>
              <p className="text-sm text-muted">
                {p.audience} · {p.users}
              </p>
              <p className={`text-sm font-semibold ${p.ai ? "text-lime" : "text-muted"}`}>{p.ai ? "Con agentes de IA" : "Sin agentes de IA"}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <PricesButton label="Ver precios y qué incluye cada plan" />
          <p className="text-sm text-muted">{PRICING_FACTS.iva}</p>
        </div>
      </Section>

      <Faq items={FAQS} tone="claro" intro="Lo básico de root, en corto." />

      <CtaBand
        kicker="Que nadie se quede en visto"
        title="Te mostramos root con los casos de tu equipo"
        text="Escríbenos por WhatsApp y cuéntanos cómo vendes hoy. Te decimos qué pieza de root te sirve primero."
        cta="cta-final-producto"
      />
    </>
  );
}
