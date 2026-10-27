import Link from "next/link";
import { RootMarkAnimated } from "@/components/brand";
import { Icon } from "@/components/icons";
import { ProductByNextia } from "@/components/product-by-nextia";
import { CheckList, CtaBand, CtaButton, Faq, PageHero, PricesButton, Section, SectionHeader } from "@/components/ui";
import { ConexionesScene } from "@/components/producto/conexiones-scene";
import { SYSTEMS } from "@/components/producto/integrations-data";
import { RelatedProducts } from "@/components/producto/related";
import { pageMetadata } from "@/lib/seo";
import { planById, PRICING_FACTS } from "@/lib/site";

/*
 * Búsqueda principal: «integración de WhatsApp con Salesforce, SAP y HubSpot» (sin volumen medido; plan §3.2 pide medirla).
 * Solo las integraciones publicadas: Salesforce, SAP, HubSpot y Excel. Sin API ni webhooks públicos hasta confirmarlos.
 */

const PATH = "/producto/integraciones";

export const metadata = pageMetadata({
  title: "Integración de WhatsApp con Salesforce, SAP y HubSpot",
  description:
    "Integración de WhatsApp con Salesforce, SAP, HubSpot y Excel: lo que pasa en una conversación dispara una acción en tu CRM o ERP, sin capturar dos veces.",
  path: PATH,
  ownOgImage: true,
});

const pro = planById("pro");
const basico = planById("basico");

const USE: Record<string, string> = {
  salesforce: "Para equipos que ya trabajan en Salesforce: root atiende la conversación y tu CRM recibe el lead con sus datos.",
  hubspot: "Para equipos de marketing y ventas en HubSpot: lo que pasa en WhatsApp mueve tus contactos y tus tratos.",
  sap: "Para operaciones que facturan y surten en SAP: un trato ganado en WhatsApp se vuelve pedido sin capturarlo otra vez.",
  excel: "Para equipos que reportan en hojas de cálculo: tus tratos y sus etapas, en el archivo de siempre.",
};

const EXAMPLES = [
  { when: "Entra un prospecto nuevo por WhatsApp", then: "Se crea el lead en Salesforce", system: "Salesforce" },
  { when: "Marcas un trato como ganado", then: "Se crea el pedido en SAP", system: "SAP" },
  { when: "Se confirma una cita", then: "El trato avanza de etapa en HubSpot", system: "HubSpot" },
];

const FAQS = [
  {
    q: "¿Con qué sistemas se integra root?",
    a: "Con Salesforce, SAP, HubSpot y Excel. Si tu empresa usa otro sistema, escríbenos por WhatsApp y lo revisamos contigo.",
  },
  {
    q: "¿Tengo que dejar mi CRM para usar root?",
    a: "No. root atiende la conversación de WhatsApp y le manda a tu CRM lo que importa: el lead nuevo, la etapa, la cita o el trato ganado. Tu equipo puede seguir trabajando donde ya trabaja.",
  },
  {
    q: "¿Qué es una acción conectada?",
    a: "Es una regla de «cuando pasa esto en root, haz esto en tu sistema». Por ejemplo: cuando se gana un trato, se crea el pedido en SAP. Así pasas de sistemas que solo registran a sistemas que actúan.",
  },
  {
    q: "¿En qué planes vienen las integraciones?",
    a: `Las integraciones avanzadas vienen en Pro (${pro.priceLabel} MXN al mes) y Enterprise. El plan Básico (${basico.priceLabel} MXN al mes) incluye la bandeja, la API oficial y el CRM, sin integraciones avanzadas.`,
  },
  {
    q: "¿Quién configura la integración?",
    a: `Nosotros, contigo. ${PRICING_FACTS.start}`,
  },
  {
    q: "¿Qué canales se conectan a root?",
    a: "La API oficial de WhatsApp Business y Instagram, en la misma bandeja. Te ayudamos a tramitar la API oficial sin costo extra.",
  },
];

function HeroTiles() {
  return (
    <figure className="mx-auto w-full max-w-[460px]">
      <div aria-hidden="true" className="relative grid grid-cols-2 gap-4">
        {SYSTEMS.map((s) => (
          <div key={s.id} className="card p-5 shadow-[var(--shadow)]">
            <p className="kicker">{s.kind}</p>
            <p className="h-card text-xl text-ink mt-1">{s.name}</p>
            <p className="mt-3 text-sm text-lime font-semibold leading-snug">{s.event}</p>
          </div>
        ))}
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <span className="rounded-[22%] ring-8 ring-paper">
            <RootMarkAnimated size={64} />
          </span>
        </div>
      </div>
      <figcaption className="sr-only">
        root al centro, conectado con cuatro sistemas: Salesforce, HubSpot, SAP y Excel, cada uno con un ejemplo de acción conectada.
      </figcaption>
    </figure>
  );
}

export default function IntegracionesPage() {
  return (
    <>
      <PageHero
        kicker="Integraciones"
        title="Integra WhatsApp con Salesforce, SAP, HubSpot y Excel"
        intro="root se conecta con los sistemas donde ya vive tu operación. Lo que pasa en una conversación de WhatsApp llega a tu CRM, a tu ERP o a tu Excel, sin capturar dos veces."
        breadcrumbs={[
          { name: "Producto", href: "/producto" },
          { name: "Integraciones", href: PATH },
        ]}
        cta="hero-integraciones"
        ctaLabel="Cuéntanos qué sistema usas"
        note="Integraciones avanzadas en Pro y Enterprise · Las configuramos contigo durante el arranque"
        visual={<HeroTiles />}
      />

      <Section tone="oscuro" grid labelledBy="mapa-titulo">
        <SectionHeader
          id="mapa-titulo"
          kicker="Mapa de conexiones"
          title="De sistemas de registro a sistemas de acción"
          intro="Tus canales entran por la izquierda, root atiende en el centro con su bandeja, sus agentes y su CRM, y tus sistemas reciben la acción a la derecha. Elige un sistema para ver sus acciones conectadas."
        />
        <ConexionesScene />
      </Section>

      <Section labelledBy="acciones-titulo">
        <SectionHeader
          id="acciones-titulo"
          kicker="Acciones conectadas"
          title="Acciones conectadas: un evento en WhatsApp, una acción en tu sistema"
          intro="Cuando pasa algo clave en root, tu sistema se entera y actúa. Tres ejemplos:"
        />
        <ol className="grid gap-4">
          {EXAMPLES.map((e, i) => (
            <li key={e.when} className="card p-5 md:p-6 grid gap-4 md:grid-cols-[3rem_1fr_auto_1fr] md:items-center">
              <span className="mono text-sm text-muted">0{i + 1}</span>
              <p className="text-ink">
                <span className="chip chip-agente mr-2">Evento en root</span>
                {e.when}
              </p>
              <Icon name="arrow" className="w-5 h-5 text-muted hidden md:block" />
              <p className="text-ink">
                <span className="chip mr-2">{e.system}</span>
                <strong>{e.then}</strong>
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <ProductByNextia />

      <Section labelledBy="fichas-titulo">
        <SectionHeader id="fichas-titulo" kicker="Integraciones" title="Qué hace root con cada sistema" />
        <div className="grid gap-5 md:grid-cols-2">
          {SYSTEMS.map((s) => (
            <article key={s.id} className="card p-6 md:p-8 flex flex-col gap-4">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="h-card text-2xl text-ink">{s.name}</h3>
                <span className="chip">{s.kind}</span>
              </div>
              <p className="text-muted leading-relaxed">{USE[s.id]}</p>
              <CheckList items={s.examples.map(([when, then]) => `${when}: ${then}.`)} />
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          ¿Ya trabajas con un CRM? Mira cómo se reparten las etapas entre tu agente y tu equipo en{" "}
          <Link href="/producto/crm-y-embudos/" className="text-ink underline decoration-lime decoration-2 underline-offset-2">
            CRM y embudos
          </Link>
          .
        </p>
      </Section>

      <Section tone="gris" labelledBy="otro-sistema-titulo">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="kicker">¿No ves tu sistema?</p>
            <h2 id="otro-sistema-titulo" className="h-section text-ink mt-3">
              Cuéntanos qué usa tu empresa
            </h2>
            <p className="lead mt-5">
              Escríbenos por WhatsApp con el nombre de tu CRM, ERP o sistema interno y lo revisamos contigo. Las integraciones se configuran durante el arranque, junto con tu agente y la migración de tus contactos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton label="Cuéntanos qué sistema usas" cta="otro-sistema" size="lg" />
              <PricesButton size="lg" />
            </div>
          </div>
          <div className="card p-6 md:p-8">
            <p className="kicker">Plan</p>
            <p className="mt-3 text-ink leading-relaxed">
              Las integraciones avanzadas vienen en <strong>Pro</strong> ({pro.priceLabel} MXN al mes, {pro.users}) y <strong>Enterprise</strong>. El plan Básico no las incluye.
            </p>
          </div>
        </div>
      </Section>

      <RelatedProducts current={PATH} />

      <Faq items={FAQS} intro="Lo que más nos preguntan de las integraciones de root." />

      <CtaBand
        kicker="Que nadie se quede en visto"
        title="Conecta tu WhatsApp con el sistema donde ya trabajas"
        text="Escríbenos por WhatsApp, cuéntanos qué sistema usas y te decimos cómo se conectaría con root."
        cta="cta-final-integraciones"
        label="Cuéntanos qué sistema usas"
      />
    </>
  );
}
