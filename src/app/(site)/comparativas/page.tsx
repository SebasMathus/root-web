import Link from "next/link";
import { ProductByNextia } from "@/components/product-by-nextia";
import { ComparisonTable, CtaBand, Faq, FeatureGrid, PageHero, Section, SectionHeader, SourceNote } from "@/components/ui";
import { CostPerUser } from "@/components/comparativas/cost-per-user";
import { LEADSALES, VAMBE } from "@/components/comparativas/data";
import { Cited, Ext, SiblingLinks } from "@/components/comparativas/parts";
import { pageMetadata } from "@/lib/seo";
import { COMPETITOR_REVIEW_LABEL, GUIDE_PHRASE, planById } from "@/lib/site";

const PATH = "/comparativas";

export const metadata = pageMetadata({
  title: "Comparativa de CRM de WhatsApp con IA en México",
  description:
    "Comparativa de CRM de WhatsApp con IA en México: root, Vambe y Leadsales lado a lado en precio por usuario, IVA, agentes de IA e integraciones, con fuentes.",
  path: PATH,
  ownOgImage: true,
});

const V = VAMBE.src;
const L = LEADSALES.src;
const PRO = planById("pro");
const BASICO = planById("basico");

const FAQS = [
  {
    q: "¿Cuál es el mejor CRM de WhatsApp con IA para México?",
    a: "Depende de tu equipo. Si quieres que la IA lleve casi todo el flujo y te sirven voz, más canales y certificaciones, Vambe es fuerte. Si buscas el precio de entrada más bajo y la IA puede ser un complemento, Leadsales es una buena opción. Si quieres agentes de IA incluidos que contesten, califiquen y agenden, y que tu equipo siga al frente de la venta, root es para ti.",
  },
  {
    q: "¿Qué es un CRM de WhatsApp con agentes de IA?",
    a: "Es un CRM donde tu equipo y tus agentes de IA atienden juntos las conversaciones de WhatsApp. El agente contesta en segundos, califica y da seguimiento; cuando el prospecto está listo, le pasa la conversación al vendedor con el historial completo, y todo queda ordenado en embudos.",
  },
  {
    q: "¿Cómo calculan el costo por usuario?",
    a: "Tomamos la mensualidad del plan de cada uno que trae IA y la dividimos entre los usuarios que incluye. Con IVA, a los precios publicados sin IVA les sumamos 16 %. Es un cálculo nuestro con precios públicos y no incluye los mensajes de WhatsApp.",
  },
  {
    q: "¿Cada cuánto revisan estos datos?",
    a: `Los datos de Vambe y Leadsales se revisaron el ${COMPETITOR_REVIEW_LABEL} en sus páginas públicas, y los revisamos de nuevo antes de cada cambio a esta página. Si ves algo distinto en su sitio, escríbenos por WhatsApp y lo corregimos.`,
  },
];

export default function Comparativas() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Comparativas", href: PATH }]}
        kicker="Comparativas"
        title="Comparativa de CRM de WhatsApp con IA: root, Vambe y Leadsales"
        intro="Tres formas de vender por WhatsApp con IA. Las comparamos con sus precios y páginas públicas, con la fuente de cada dato, y te decimos también dónde nos ganan."
        cta="comparativas-hero"
        note={`Datos de competidores revisados el ${COMPETITOR_REVIEW_LABEL}.`}
      />

      <Section tone="gris" labelledBy="mapa-titulo">
        <SectionHeader
          id="mapa-titulo"
          kicker="El mapa"
          title="IA primero, CRM primero o agentes y CRM juntos"
          intro="Antes de ver precios, conviene saber qué vende primero cada uno."
        />
        <div className="grid gap-5 md:grid-cols-3">
          <article className="card p-6 md:p-7 flex flex-col gap-3">
            <p className="kicker">Vambe</p>
            <h3 className="h-card text-xl text-ink">IA primero</h3>
            <p className="text-muted leading-relaxed">
              Se presenta como un sistema de IA proactivo y omnicanal para todo el flujo comercial. (<Ext src={V.home}>fuente</Ext>)
            </p>
          </article>
          <article className="card p-6 md:p-7 flex flex-col gap-3">
            <p className="kicker">Leadsales</p>
            <h3 className="h-card text-xl text-ink">CRM primero</h3>
            <p className="text-muted leading-relaxed">
              Se presenta como CRM para WhatsApp, Facebook e Instagram, y suma su agente de IA como complemento. (
              <Ext src={L.home}>fuente</Ext>)
            </p>
          </article>
          <article className="card p-6 md:p-7 flex flex-col gap-3 border-ink/30">
            <p className="kicker text-lime normal-case">root</p>
            <h3 className="h-card text-xl text-ink">Agentes y CRM, un solo producto</h3>
            <p className="text-muted leading-relaxed">{GUIDE_PHRASE} Todo en el mismo embudo y en el número de tu empresa.</p>
          </article>
        </div>
      </Section>

      <Section labelledBy="tabla-titulo">
        <SectionHeader
          id="tabla-titulo"
          kicker="Lado a lado"
          title="root vs Vambe vs Leadsales en una tabla"
          intro="Lo esencial de cada uno. Para el detalle, entra a cada comparativa."
        />
        <ComparisonTable
          caption="Comparación de root, Vambe y Leadsales"
          firstColLabel="Tema"
          columns={[
            { key: "root", label: "root", highlight: true },
            { key: "vambe", label: "Vambe" },
            { key: "ls", label: "Leadsales" },
          ]}
          rows={[
            {
              label: "Plan con IA",
              values: {
                root: `${PRO.name}: ${PRO.priceLabel} MXN al mes, 10 usuarios.`,
                vambe: <Cited src={V.pricing}>Standard: $11,480 MXN + IVA, 6 usuarios.</Cited>,
                ls: <Cited src={L.pricing}>Profesional + agente Starter: $5,359.20 MXN, 4 usuarios.</Cited>,
              },
            },
            {
              label: "Plan de entrada",
              values: {
                root: `${BASICO.name}: ${BASICO.priceLabel} MXN al mes, 3 usuarios, sin IA.`,
                vambe: <Cited src={V.pricing}>Standard es su plan de entrada y ya trae IA.</Cited>,
                ls: <Cited src={L.pricing}>Básico: $2,362.92 MXN, sin IA ni API oficial.</Cited>,
              },
            },
            {
              label: "Implementación",
              values: {
                root: "La mayoría opera en menos de una semana.",
                vambe: <Cited src={V.pricing}>$12,000 MXN el mes 1 y $6,000 MXN el mes 2.</Cited>,
                ls: <Cited src={L.api}>Alta de la API acompañada, sin costo de activación.</Cited>,
              },
            },
            {
              label: "La IA",
              values: {
                root: "Incluida en Pro y Enterprise.",
                vambe: <Cited src={V.pricing}>Incluida en sus planes.</Cited>,
                ls: <Cited src={L.consumption}>Complemento aparte; se pausa al 100 % de consumo.</Cited>,
              },
            },
            {
              label: "El agente agenda",
              values: {
                root: true,
                vambe: <Cited src={V.tech}>Sí</Cited>,
                ls: <Cited src={L.escalation}>No: pasa a una persona</Cited>,
              },
            },
            {
              label: "API oficial de WhatsApp",
              values: {
                root: "Desde el plan Básico.",
                vambe: <Cited src={V.salud}>Sí.</Cited>,
                ls: <Cited src={L.pricing}>Desde Profesional; su Básico funciona por Messenger y Web.</Cited>,
              },
            },
            {
              label: "Voz y llamadas",
              values: {
                root: "Tu equipo hace y recibe llamadas desde la plataforma. No publicamos agentes de voz con IA.",
                vambe: <Cited src={V.pricing}>Agentes de voz con IA y telefonía, como complementos aparte.</Cited>,
                ls: null,
              },
            },
            {
              label: "Sellos y certificaciones",
              values: {
                root: "Sin sellos publicados.",
                vambe: <Cited src={V.security}>ISO 27001 y SOC 2 Type II.</Cited>,
                ls: <Cited src={L.home}>Sellos de Meta.</Cited>,
              },
            },
            {
              label: "Prueba",
              values: {
                root: "Te mostramos root por WhatsApp.",
                vambe: <Cited src={V.contact}>Sin prueba; primero una reunión de diagnóstico.</Cited>,
                ls: <Cited src={L.pricing}>14 días.</Cited>,
              },
            },
          ]}
          footnote="«—»: no lo encontramos en sus páginas públicas."
        />
        <SourceNote
          className="mt-5"
          sources={[V.pricing, V.home, V.tech, V.salud, V.security, V.contact, L.pricing, L.home, L.api, L.consumption, L.escalation]}
        />
      </Section>

      <ProductByNextia />

      <Section labelledBy="costo-titulo">
        <SectionHeader
          id="costo-titulo"
          kicker="Precio"
          title="Costo por usuario al mes: root, Vambe y Leadsales"
          intro="El plan de cada uno que trae IA, dividido entre los usuarios que incluye. Cambia a mensualidad o súmale el IVA."
        />
        <CostPerUser id="d8-todos" />
        <p className="mt-6 text-muted leading-relaxed max-w-3xl">
          ¿Quieres ver qué trae cada plan de root? Revisa los{" "}
          <Link href="/precios/" className="underline decoration-line underline-offset-2 hover:decoration-ink">
            precios de root
          </Link>
          .
        </p>
      </Section>

      <Section tone="gris" labelledBy="paginas-titulo">
        <SectionHeader
          id="paginas-titulo"
          kicker="A detalle"
          title="Comparativas y alternativas"
          intro="Cada página trae su tabla completa, la fuente de cada dato y una sección honesta de cuándo te conviene cada opción."
        />
        <FeatureGrid
          cols={2}
          items={[
            {
              title: "root vs Vambe",
              text: "Precio en pesos, implementación, IVA y quién lleva la venta.",
              href: "/comparativas/root-vs-vambe",
              icon: "chart",
            },
            {
              title: "root vs Leadsales",
              text: "IA incluida o IA aparte, agenda, API oficial e integraciones.",
              href: "/comparativas/root-vs-leadsales",
              icon: "chart",
            },
            {
              title: "Alternativas a Vambe",
              text: "Opciones para equipos en México que buscan precio en pesos y arranque en días.",
              href: "/alternativas/vambe",
              icon: "target",
            },
            {
              title: "Alternativas a Leadsales",
              text: "Opciones si buscas un agente de IA incluido que también agende.",
              href: "/alternativas/leadsales",
              icon: "target",
            },
          ]}
        />
        <div className="card p-6 md:p-8 mt-8">
          <h3 className="h-card text-xl md:text-2xl text-ink">Cómo hacemos estas comparativas</h3>
          <ul className="mt-4 flex flex-col gap-2 text-muted leading-relaxed list-disc pl-5">
            <li>Solo usamos datos de sus páginas públicas, con enlace a cada una y la fecha de revisión.</li>
            <li>Comparamos en pesos mexicanos y decimos si el precio trae IVA o no.</li>
            <li>Cuando un cálculo es nuestro, como el costo por usuario, lo decimos.</li>
            <li>Reconocemos lo que ellos hacen mejor. Si un dato cambió, escríbenos y lo corregimos.</li>
          </ul>
        </div>
      </Section>

      <Faq items={FAQS} tone="claro" title="Preguntas frecuentes sobre las comparativas" />

      <Section tone="gris" pad="md" labelledBy="mas-titulo">
        <SectionHeader id="mas-titulo" title="Sigue explorando" className="mb-8 md:mb-10" />
        <SiblingLinks
          current={PATH}
          extra={[
            {
              href: "/producto/agentes-de-ia",
              label: "Agentes de IA de root",
              text: "Contestan, califican, agendan y pasan al vendedor con historial",
            },
          ]}
        />
      </Section>

      <CtaBand
        cta="comparativas-final"
        kicker="Que nadie se quede en visto"
        title="¿Dudas entre root y otra opción? Pregúntanos directo"
        text="Escríbenos por WhatsApp, cuéntanos cómo vende tu equipo y te decimos con honestidad cuál te conviene."
      />
    </>
  );
}
