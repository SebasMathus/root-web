import Link from "next/link";
import { ProductByNextia } from "@/components/product-by-nextia";
import {
  ComparisonTable,
  CtaPair,
  CtaBand,
  Faq,
  FeatureGrid,
  LinkButton,
  PageHero,
  Section,
  SectionHeader,
  SourceNote,
} from "@/components/ui";
import { CostPerUser } from "@/components/comparativas/cost-per-user";
import { LEADSALES, ROOT_SRC } from "@/components/comparativas/data";
import { GuidePhraseScene } from "@/components/comparativas/guide-scene";
import { Cited, Ext, HonestSplit, SiblingLinks, Steps, SummaryCard } from "@/components/comparativas/parts";
import { pageMetadata } from "@/lib/seo";
import { COMPETITOR_REVIEW_LABEL, PRICING_FACTS, planById } from "@/lib/site";

const PATH = "/comparativas/root-vs-leadsales";

export const metadata = pageMetadata({
  title: "root vs Leadsales: IA incluida o IA aparte",
  description:
    "root vs Leadsales: compara el agente de IA, la API oficial, las integraciones y el precio por usuario en pesos. Datos públicos revisados en octubre de 2026.",
  path: PATH,
  ownOgImage: true,
});

const L = LEADSALES.src;
const PRO = planById("pro");
const BASICO = planById("basico");

const FAQS = [
  {
    q: "¿Cuánto cuesta root comparado con Leadsales?",
    a: `El plan Básico de Leadsales cuesta $2,362.92 MXN al mes con IVA y es más barato que el Básico de root (${BASICO.priceLabel} MXN). Con IA la cuenta cambia: root Pro cuesta ${PRO.priceLabel} MXN al mes con 10 usuarios, y Leadsales Profesional más su agente Starter suma $5,359.20 MXN con 4 usuarios. Por usuario, root Pro sale en $1,059.90 y Leadsales en $1,339.80, con datos revisados el ${COMPETITOR_REVIEW_LABEL}.`,
  },
  {
    q: "¿La IA de root se cobra aparte?",
    a: "No. Los agentes de IA vienen en los planes Pro y Enterprise de root. En Leadsales el agente de IA es un complemento con precio propio, que se mide por consumo y, según su centro de ayuda, se pausa al llegar al 100 % de su capacidad del mes.",
  },
  {
    q: "¿El agente de root agenda citas?",
    a: "Sí. El agente de root contesta, califica, agenda citas y visitas, da seguimiento y reactiva a quien dejó de contestar. Según el centro de ayuda de Leadsales, cuando un cliente pide una cita su agente pasa la conversación a una persona.",
  },
  {
    q: "¿root usa la API oficial de WhatsApp desde el plan de entrada?",
    a: `Sí, desde el plan Básico. ${PRICING_FACTS.api} En Leadsales la API oficial empieza en el plan Profesional; su Básico funciona con Messenger y Web, según su página de precios.`,
  },
  {
    q: "¿root tiene prueba de 14 días como Leadsales?",
    a: "No tenemos periodo de prueba. Te mostramos root por WhatsApp con tus propios casos y, si decides arrancar, la mayoría de los equipos opera en menos de una semana. La facturación es mensual y cancelas cuando quieras, con efecto al final del periodo.",
  },
  {
    q: "¿Puedo cambiarme de Leadsales a root?",
    a: "Sí. Te ayudamos con la API oficial de WhatsApp Business, migramos tus contactos y configuramos tus embudos y tu agente. La implementación incluye configuración, migración e integración.",
  },
  {
    q: "¿De dónde salen los datos de Leadsales?",
    a: `De sus páginas públicas: leadsales.io, su página de precios, la de su agente de IA y su centro de ayuda. Los revisamos el ${COMPETITOR_REVIEW_LABEL} y cada dato lleva el enlace a su fuente. Si algo cambió, avísanos por WhatsApp y lo corregimos.`,
  },
];

export default function RootVsLeadsales() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Comparativas", href: "/comparativas" },
          { name: "root vs Leadsales", href: PATH },
        ]}
        kicker="Comparativa"
        title="root vs Leadsales: CRM de WhatsApp con IA incluida o con IA aparte"
        intro="Los dos ordenan las conversaciones de tu equipo en embudos. La diferencia está en el agente de IA: qué hace, cuánto cuesta y qué pasa cuando el cliente pide una cita."
        ctas={<CtaPair cta="vs-leadsales-hero" secondary={{ href: "/precios", label: "Ver precios de root" }} />}
        note={`Datos de Leadsales revisados el ${COMPETITOR_REVIEW_LABEL} en sus páginas públicas.`}
        visual={
          <SummaryCard
            items={[
              {
                label: "La IA",
                role: "root",
                text: (
                  <>
                    root Pro trae agentes de IA y 10 usuarios por {PRO.priceLabel} MXN al mes. En Leadsales el agente es un complemento que
                    se cobra aparte, por consumo (<Ext src={L.consumption}>fuente</Ext>).
                  </>
                ),
              },
              {
                label: "El agente",
                role: "root",
                text: (
                  <>
                    El de root agenda y da seguimiento. Según su centro de ayuda, el de Leadsales pasa a una persona cuando el cliente pide
                    una cita (<Ext src={L.escalation}>fuente</Ext>).
                  </>
                ),
              },
              {
                label: "Dónde gana Leadsales",
                text: (
                  <>
                    Precio de entrada más bajo y prueba de 14 días (<Ext src={L.pricing}>fuente</Ext>), campañas masivas y sellos de Meta en
                    su sitio (<Ext src={L.home}>fuente</Ext>).
                  </>
                ),
              },
            ]}
          />
        }
      />

      <Section tone="gris" labelledBy="tabla-titulo">
        <SectionHeader
          id="tabla-titulo"
          kicker="Lado a lado"
          title="root o Leadsales: la comparación completa"
          intro="Lo que dice cada uno en su sitio. En la columna de Leadsales, cada dato enlaza a la página de donde sale."
        />
        <ComparisonTable
          caption="Comparación de root y Leadsales por tema"
          firstColLabel="Tema"
          columns={[
            { key: "root", label: "root", sub: "CRM de WhatsApp con agentes de IA", highlight: true },
            { key: "ls", label: "Leadsales", sub: `Revisado el ${COMPETITOR_REVIEW_LABEL}` },
          ]}
          rows={[
            {
              label: "Qué es",
              values: {
                root: "CRM de WhatsApp con agentes de IA: el agente atiende y califica, tu equipo cierra.",
                ls: <Cited src={L.home}>CRM para WhatsApp, Facebook e Instagram; su agente de IA es una capa nueva encima.</Cited>,
              },
            },
            {
              label: "Plan de entrada",
              values: {
                root: `${BASICO.name}: ${BASICO.priceLabel} MXN al mes, 3 usuarios, con API oficial.`,
                ls: <Cited src={L.pricing}>Básico: $2,362.92 MXN al mes con IVA, 3 usuarios, por Messenger y Web, sin API oficial.</Cited>,
              },
            },
            {
              label: "API oficial de WhatsApp",
              values: {
                root: "Desde el plan Básico. Te ayudamos a tramitarla sin costo extra.",
                ls: <Cited src={L.pricing}>Desde el plan Profesional.</Cited>,
              },
            },
            {
              label: "Agentes de IA",
              values: {
                root: "Incluidos en Pro y Enterprise.",
                ls: (
                  <Cited src={L.pricing}>
                    Complemento aparte en Profesional y Avanzado, desde $2,119.32 MXN al mes; el primer mes no tiene costo.
                  </Cited>
                ),
              },
            },
            {
              label: "Plan con IA",
              values: {
                root: `${PRO.name}: ${PRO.priceLabel} MXN al mes, 10 usuarios.`,
                ls: <Cited src={L.pricing}>Profesional ($3,239.88) + agente Starter ($2,119.32) = $5,359.20 MXN al mes, 4 usuarios.</Cited>,
              },
            },
            {
              label: "Límite de la IA",
              values: {
                root: "Por publicar.",
                ls: (
                  <span>
                    <Cited src={L.agent}>Starter: hasta 500 conversaciones al mes según su página del agente.</Cited>{" "}
                    <Cited src={L.consumption}>Unas 900 según su centro de ayuda; se mide por tokens y el agente se pausa al 100 %.</Cited>
                  </span>
                ),
              },
            },
            {
              label: "El agente agenda",
              values: {
                root: "Sí: agenda citas y visitas, da seguimiento y reactiva.",
                ls: <Cited src={L.escalation}>No: si el cliente pide cita, la conversación pasa a una persona.</Cited>,
              },
            },
            {
              label: "Paso a una persona",
              values: {
                root: "Traspaso al vendedor con el historial completo, en el número de tu empresa.",
                ls: <Cited src={L.escalation}>Deja un resumen interno y el chat queda en la bandeja del embudo.</Cited>,
              },
            },
            {
              label: "Integraciones",
              values: {
                root: "Salesforce, SAP, HubSpot y Excel. Un evento en root dispara una acción en tu CRM o ERP.",
                ls: (
                  <Cited src={L.integrations}>
                    No encontramos página de integraciones; su sección de ayuda trata la conexión con Meta.
                  </Cited>
                ),
              },
            },
            {
              label: "Canales",
              values: {
                root: "WhatsApp e Instagram. Llamadas desde la plataforma.",
                ls: <Cited src={L.home}>WhatsApp, Messenger e Instagram.</Cited>,
              },
            },
            {
              label: "Campañas",
              values: {
                root: "Cada prospecto entra con la campaña que lo trajo y el agente le da seguimiento.",
                ls: <Cited src={L.home}>Envíos masivos por API oficial con plantillas aprobadas, desde Profesional.</Cited>,
              },
            },
            {
              label: "Mensajes de WhatsApp",
              values: {
                root: "Aparte, a tarifa oficial de Meta, sin sobreprecio.",
                ls: <Cited src={L.pricing}>Saldo incluido de $10 USD (Profesional) o $20 USD (Avanzado); el resto se recarga.</Cited>,
              },
            },
            {
              label: "Prueba",
              values: {
                root: "Sin periodo de prueba: te mostramos root por WhatsApp con tus casos.",
                ls: (
                  <span>
                    <Cited src={L.pricing}>14 días.</Cited> Su blog menciona que cuesta US$7 (<Ext src={L.trialBlog}>fuente</Ext>).
                  </span>
                ),
              },
            },
            {
              label: "Forma de pago",
              values: {
                root: "Mensual. Cancelas cuando quieras, al final del periodo.",
                ls: <Cited src={L.pricing}>Mensual, o con 10 %, 15 % o 20 % de descuento pagando 3, 6 o 12 meses por adelantado.</Cited>,
              },
            },
            {
              label: "Sellos",
              values: {
                root: "Sin sellos publicados.",
                ls: <Cited src={L.home}>Muestra sellos de Meta Business Partner y WhatsApp Solution Partner.</Cited>,
              },
            },
            {
              label: "Dónde están",
              values: {
                root: "Ciudad de México. Hecho por Nextia.",
                ls: <Cited src={L.jobs}>Querétaro, México.</Cited>,
              },
            },
          ]}
        />
        <SourceNote className="mt-5" sources={Object.values(L)} />
      </Section>

      <Section labelledBy="diferencias-titulo">
        <SectionHeader
          id="diferencias-titulo"
          kicker="Diferencias de fondo"
          title="Agente de IA de root vs Leadsales: cuatro diferencias"
          intro="Lo que más cambia en el día a día de tu equipo."
        />
        <FeatureGrid
          cols={2}
          items={[
            {
              title: "IA incluida, no complemento",
              icon: "bot",
              role: "agente",
              text: (
                <>
                  En root Pro los agentes vienen en el plan. En Leadsales el agente se contrata aparte y se mide por consumo; al llegar al
                  100 % se pausa hasta el siguiente ciclo (<Ext src={L.consumption}>su centro de ayuda</Ext>).
                </>
              ),
            },
            {
              title: "Un agente que agenda",
              icon: "calendar",
              role: "agente",
              text: (
                <>
                  El agente de root agenda citas y visitas. Según <Ext src={L.escalation}>la ayuda de Leadsales</Ext>, cuando el cliente
                  pide una cita su agente pasa la conversación a una persona.
                </>
              ),
            },
            {
              title: "API oficial desde el plan de entrada",
              icon: "shield",
              text: (
                <>
                  El Básico de root ya usa la API oficial de WhatsApp Business. En Leadsales empieza en Profesional; su Básico funciona por
                  Messenger y Web (<Ext src={L.pricing}>precios de Leadsales</Ext>).
                </>
              ),
            },
            {
              title: "Conectado a tus sistemas",
              icon: "plug",
              text: (
                <>
                  root se conecta con Salesforce, SAP, HubSpot y Excel, y un evento dispara una acción en tu CRM o ERP. Mira{" "}
                  <Link href="/producto/integraciones/" className="underline decoration-line underline-offset-2">
                    las integraciones de root
                  </Link>
                  .
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section tone="gris" labelledBy="precio-titulo">
        <SectionHeader
          id="precio-titulo"
          kicker="Precio"
          title="Precio por usuario de root vs Leadsales"
          intro="Comparamos el plan de cada uno que trae IA. Leadsales es más barato al mes; por usuario, root Pro sale más bajo porque trae 10 usuarios."
        />
        <CostPerUser only={["leadsales"]} id="d8-leadsales" />
        <p className="mt-6 text-muted leading-relaxed max-w-3xl">
          Si no necesitas IA, el plan Básico de Leadsales cuesta menos que el de root. Revisa qué trae cada plan en los{" "}
          <Link href="/precios/" className="underline decoration-line underline-offset-2 hover:decoration-ink">
            precios de root
          </Link>
          .
        </p>
      </Section>

      <Section labelledBy="agente-titulo">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeader
              id="agente-titulo"
              kicker="Cómo trabaja root"
              title="El agente califica, agenda y le pasa la venta a tu equipo"
              className="mb-6 md:mb-8"
            />
            <div className="flex flex-col gap-4 text-ink/85 leading-relaxed text-[17px]">
              <p>
                El agente de root contesta en segundos desde el número de tu empresa y califica con las preguntas de tu negocio. Si el
                prospecto quiere visita o cita, la agenda.
              </p>
              <p>
                Cuando toca cerrar, le pasa la conversación al vendedor con todo el historial: quién es, qué quiere y qué ya se le
                respondió. Tu equipo cierra y tú ves cada etapa del embudo.
              </p>
            </div>
            <div className="mt-8">
              <LinkButton href="/producto/agentes-de-ia" label="Conoce los agentes de IA" />
            </div>
          </div>
          <GuidePhraseScene className="w-full max-w-[520px] lg:justify-self-end" />
        </div>
      </Section>

      <ProductByNextia />

      <Section labelledBy="conviene-titulo">
        <SectionHeader
          id="conviene-titulo"
          kicker="Con honestidad"
          title="Cuándo te conviene Leadsales y cuándo root"
          intro="No hay una opción mejor para todos. Esto es lo que vemos en sus páginas públicas y en lo que hacemos nosotros."
        />
        <HonestSplit
          otherName="Leadsales"
          other={[
            <>
              Buscas el precio de entrada más bajo y no necesitas IA ni API oficial (<Ext src={L.pricing}>precios de Leadsales</Ext>).
            </>,
            <>
              Quieres probar 14 días antes de decidir (<Ext src={L.pricing}>precios de Leadsales</Ext>).
            </>,
            <>
              Haces envíos masivos con plantillas, quieres medirlos desde el embudo o atiendes también por Messenger (
              <Ext src={L.home}>leadsales.io</Ext>).
            </>,
            <>
              Para ti pesan los sellos de Meta que muestra en su sitio (<Ext src={L.home}>leadsales.io</Ext>).
            </>,
          ]}
          root={[
            <>Quieres agentes de IA incluidos en el plan, sin pagar un complemento aparte.</>,
            <>Necesitas que el agente agende citas y visitas, no solo que filtre.</>,
            <>Tu equipo es de más de 4 personas: root Pro trae 10 usuarios.</>,
            <>Conectas root con Salesforce, SAP, HubSpot o Excel.</>,
            <>Quieres la API oficial de WhatsApp desde el primer plan.</>,
          ]}
        />
      </Section>

      <Section tone="gris" labelledBy="cambio-titulo">
        <SectionHeader
          id="cambio-titulo"
          kicker="Cambio"
          title="Cómo cambiarte de Leadsales a root"
          intro="Sin pausar la operación: armamos root mientras tu equipo sigue vendiendo."
        />
        <Steps
          items={[
            { title: "Escríbenos por WhatsApp", text: "Cuéntanos cómo están tus embudos y qué etapas quieres que atienda el agente." },
            { title: "API oficial", text: "Tramitamos o conectamos contigo la API oficial de WhatsApp Business, sin costo extra." },
            {
              title: "Embudos, agente y contactos",
              text: "Configuramos tus etapas y las preguntas para calificar, y migramos tus contactos.",
            },
            { title: "Conecta y arranca", text: "Integramos tus sistemas y tu equipo empieza. La mayoría opera en menos de una semana." },
          ]}
        />
        <p className="mt-6 text-sm text-muted">
          Nuestros compromisos de cobro están en los{" "}
          <Link href={ROOT_SRC.terms.href} className="underline decoration-line underline-offset-2">
            Términos y condiciones
          </Link>
          .
        </p>
      </Section>

      <Faq items={FAQS} tone="claro" title="Preguntas frecuentes sobre root y Leadsales" />

      <Section tone="gris" pad="md" labelledBy="mas-titulo">
        <SectionHeader id="mas-titulo" title="Sigue comparando" className="mb-8 md:mb-10" />
        <SiblingLinks current={PATH} />
      </Section>

      <CtaBand
        cta="vs-leadsales-final"
        kicker="Que nadie se quede en visto"
        title="Escríbenos por WhatsApp y te mostramos root con tus propios casos"
        text="Si hoy usas Leadsales o lo estás evaluando, te decimos con claridad en qué te conviene cada uno."
      />
    </>
  );
}
