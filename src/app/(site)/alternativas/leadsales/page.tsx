import { ProductByNextia } from "@/components/product-by-nextia";
import { CtaBand, CtaButton, CtaPair, Faq, PageHero, Section, SectionHeader, SourceNote } from "@/components/ui";
import { LEADSALES, VAMBE } from "@/components/comparativas/data";
import { AlternativeCard, Cited, Ext, HonestSplit, SiblingLinks } from "@/components/comparativas/parts";
import { pageMetadata } from "@/lib/seo";
import { COMPETITOR_REVIEW_LABEL, planById } from "@/lib/site";

const PATH = "/alternativas/leadsales";

export const metadata = pageMetadata({
  title: "Alternativas a Leadsales para vender por WhatsApp",
  description:
    "Alternativas a Leadsales en México: root, Vambe y la app de WhatsApp Business, comparados en IA incluida, agenda y precio en pesos. Revisado en octubre de 2026.",
  path: PATH,
  ownOgImage: true,
});

const V = VAMBE.src;
const L = LEADSALES.src;
const PRO = planById("pro");

const FAQS = [
  {
    q: "¿Cuál es la mejor alternativa a Leadsales en México?",
    a: "Depende de lo que busques. Si quieres agentes de IA incluidos que también agenden, y conectar tus sistemas, root. Si buscas IA en todo el flujo, voz y atribución de pauta, y tienes presupuesto para implementación, Vambe. Si eres una o dos personas y aún no necesitas IA ni embudos, la app de WhatsApp Business.",
  },
  {
    q: "¿Qué alternativa a Leadsales trae la IA incluida?",
    a: `root trae agentes de IA en los planes Pro y Enterprise. El plan Pro cuesta ${PRO.priceLabel} MXN al mes con 10 usuarios. En Leadsales el agente de IA es un complemento aparte, desde $2,119.32 MXN al mes, según su página de precios revisada el ${COMPETITOR_REVIEW_LABEL}.`,
  },
  {
    q: "¿Qué alternativa a Leadsales agenda citas por WhatsApp?",
    a: "El agente de root agenda citas y visitas, da seguimiento y reactiva a quien dejó de contestar. Según el centro de ayuda de Leadsales, cuando un cliente pide una cita su agente pasa la conversación a una persona.",
  },
  {
    q: "¿Puedo pasar mis contactos de Leadsales a root?",
    a: "Sí. La implementación de root incluye configuración, migración de contactos e integración con tus sistemas, y te ayudamos con la API oficial de WhatsApp Business sin costo extra. La mayoría de los equipos opera en menos de una semana.",
  },
  {
    q: "¿Qué hace Leadsales mejor que root?",
    a: "Según sus páginas públicas, Leadsales tiene un plan de entrada más barato, prueba de 14 días, campañas masivas con plantillas desde su plan Profesional, Messenger como canal y sellos de Meta en su sitio. Si eso es lo que más pesa para ti, Leadsales es una buena opción.",
  },
];

export default function AlternativasLeadsales() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Comparativas", href: "/comparativas" },
          { name: "Alternativas a Leadsales", href: PATH },
        ]}
        kicker="Alternativas"
        title="Alternativas a Leadsales para equipos comerciales en México"
        intro="Si usas Leadsales o lo estás evaluando, aquí tienes tres opciones con precio en pesos y la fuente de cada dato. Ponemos root primero porque es lo nuestro, y te decimos también cuándo quedarte con Leadsales."
        ctas={<CtaPair cta="alt-leadsales-hero" secondary={{ href: "/comparativas/root-vs-leadsales", label: "Ver root vs Leadsales" }} />}
        note={`Datos de competidores revisados el ${COMPETITOR_REVIEW_LABEL}.`}
      />

      <Section tone="gris" labelledBy="pesa-titulo">
        <SectionHeader
          id="pesa-titulo"
          kicker="Antes de decidir"
          title="Qué revisar al buscar una alternativa a Leadsales"
          intro="Cuatro datos de sus páginas públicas que conviene poner junto a cualquier otra opción."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "La IA va aparte",
              d: <Cited src={L.pricing}>Su agente de IA es un complemento desde $2,119.32 MXN al mes, en Profesional y Avanzado.</Cited>,
            },
            {
              t: "El límite de la IA",
              d: <Cited src={L.consumption}>Se mide por tokens; al llegar al 100 % el agente se pausa hasta el siguiente ciclo.</Cited>,
            },
            {
              t: "Las citas",
              d: <Cited src={L.escalation}>Si el cliente pide una cita, su agente pasa la conversación a una persona.</Cited>,
            },
            { t: "La API oficial", d: <Cited src={L.pricing}>Empieza en Profesional; su Básico funciona por Messenger y Web.</Cited> },
          ].map((c) => (
            <article key={c.t} className="card p-6 flex flex-col gap-3">
              <h3 className="h-card text-lg text-ink">{c.t}</h3>
              <p className="text-muted leading-relaxed">{c.d}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section labelledBy="opciones-titulo">
        <SectionHeader id="opciones-titulo" kicker="Tres opciones" title="Tres alternativas a Leadsales en México" />
        <div className="grid gap-5 lg:grid-cols-3">
          <AlternativeCard
            rank={1}
            highlight
            name="root"
            forWho="Para equipos que quieren agentes de IA incluidos que también agenden."
            points={[
              `${PRO.name}: ${PRO.priceLabel} MXN al mes con 10 usuarios y agentes de IA.`,
              "Los agentes contestan, califican, agendan, dan seguimiento y reactivan, desde el número de tu empresa.",
              "API oficial de WhatsApp Business desde el plan Básico.",
              "Se conecta con Salesforce, SAP, HubSpot y Excel.",
              "Traspaso al vendedor con el historial completo.",
            ]}
            cta={<CtaButton cta="alt-leadsales-root" size="sm" />}
            links={[{ href: "/comparativas/root-vs-leadsales", label: "root vs Leadsales" }]}
          />
          <AlternativeCard
            rank={2}
            name="Vambe"
            forWho="Para operaciones grandes que quieren IA en todo el flujo, voz y atribución de pauta."
            points={[
              <Cited key="a" src={V.pricing}>
                Standard: $11,480 MXN al mes más IVA, 6 usuarios y 3,000 conversaciones.
              </Cited>,
              <Cited key="b" src={V.pricing}>
                Implementación de $12,000 MXN el mes 1 y $6,000 MXN el mes 2.
              </Cited>,
              <Cited key="c" src={V.ads}>
                Producto de anuncios con eventos hacia Meta, Google y TikTok, aparte.
              </Cited>,
              <Cited key="d" src={V.security}>
                Publica ISO 27001 y SOC 2 Type II.
              </Cited>,
            ]}
            links={[{ href: "/comparativas/root-vs-vambe", label: "root vs Vambe" }]}
          />
          <AlternativeCard
            rank={3}
            name="App de WhatsApp Business"
            forWho="Para una o dos personas que todavía no necesitan IA ni embudos."
            points={[
              "Es la app de Meta para negocios: contestas desde el teléfono, con etiquetas y respuestas rápidas.",
              "Funciona bien con pocas conversaciones y una sola persona al frente.",
              "Si tu equipo crece y quieres embudos y agentes de IA, lo que sigue es la API oficial.",
            ]}
            links={[{ href: "/guias/whatsapp-business-app-vs-api", label: "App o API: cuál necesitas" }]}
          />
        </div>
        <SourceNote className="mt-6" sources={[L.pricing, L.consumption, L.escalation, V.pricing, V.ads, V.security]} />
      </Section>

      <ProductByNextia />

      <Section labelledBy="quedarte-titulo">
        <SectionHeader
          id="quedarte-titulo"
          kicker="Con honestidad"
          title="Cuándo quedarte con Leadsales"
          intro="Cambiar no siempre conviene. Esto es lo que Leadsales hace bien, según sus páginas públicas."
        />
        <HonestSplit
          otherName="Leadsales"
          other={[
            <>
              Te basta el plan de entrada más barato, sin IA (<Ext src={L.pricing}>precios de Leadsales</Ext>).
            </>,
            <>
              Haces envíos masivos con plantillas, los mides desde el embudo o atiendes también por Messenger (
              <Ext src={L.home}>leadsales.io</Ext>).
            </>,
            <>
              Para ti pesan los sellos de Meta que muestra en su sitio (<Ext src={L.home}>leadsales.io</Ext>).
            </>,
          ]}
          root={[
            <>Quieres agentes de IA incluidos en el plan, sin un complemento que se pause.</>,
            <>Necesitas que el agente agende citas y visitas.</>,
            <>Tu equipo es de más de 4 personas: root Pro trae 10 usuarios.</>,
            <>Conectas tu operación con Salesforce, SAP, HubSpot o Excel.</>,
          ]}
        />
      </Section>

      <Faq items={FAQS} title="Preguntas frecuentes sobre alternativas a Leadsales" />

      <Section pad="md" labelledBy="mas-titulo">
        <SectionHeader id="mas-titulo" title="Sigue comparando" className="mb-8 md:mb-10" />
        <SiblingLinks current={PATH} />
      </Section>

      <CtaBand
        cta="alt-leadsales-final"
        kicker="Que nadie se quede en visto"
        title="Escríbenos por WhatsApp y te mostramos root con tus propios casos"
        text="Te decimos con claridad si root te conviene más que Leadsales, o si no."
      />
    </>
  );
}
