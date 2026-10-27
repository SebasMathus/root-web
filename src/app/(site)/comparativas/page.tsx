import Link from "next/link";
import { ProductByNextia } from "@/components/product-by-nextia";
import { ComparisonTable, CtaBand, Faq, LinkButton, PageHero, Section, SectionHeader, type ComparisonRow, type FaqItem } from "@/components/ui";
import { CostPerUser, perUserCost } from "@/components/comparativas/cost-per-user";
import { GuidePhraseScene } from "@/components/comparativas/guide-scene";
import { AskChecklist, HonestSplit, RelatedLinks, Steps } from "@/components/comparativas/parts";
import { Icon } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { CATEGORY, GUIDE_PHRASE, PRICING_FACTS, SUPPORT_HOURS, planById } from "@/lib/site";

/*
 * Comparativas (plan §3.5), por decisión del dueño: UNA página, «root frente a otros sistemas».
 * Búsqueda principal: «crm para whatsapp comparativa» / «alternativas de crm para whatsapp».
 * Compara por TIPO de herramienta: no se nombran marcas de la competencia ni se citan sus precios o páginas.
 * De root solo se afirma lo publicado (lib/site, DESIGN.md › Qué afirmar).
 */

const PATH = "/comparativas";

export const metadata = pageMetadata({
  title: "CRM para WhatsApp: comparativa con otros sistemas",
  description:
    "Comparativa de CRM para WhatsApp en México: root frente a bots, agentes de IA sueltos y otros sistemas en precio total, IA incluida, API oficial y relevo.",
  path: PATH,
  ownOgImage: true,
});

const BASICO = planById("basico");
const PRO = planById("pro");
const PRO_PER_USER = perUserCost("pro");
const BASICO_PER_USER = perUserCost("basico");

/* ───────────── Los cinco tipos de sistema ───────────── */

const TYPES: { name: string; icon: string; what: string; short: string }[] = [
  {
    name: "Bots de menús",
    icon: "repeat",
    what: "Contestan al instante con opciones fijas: «marca 1, 2 o 3».",
    short: "No entienden lo que el cliente escribe con sus palabras, ni ordenan a tu equipo.",
  },
  {
    name: "Agentes de IA sueltos",
    icon: "bot",
    what: "Conversan con lenguaje natural y resuelven dudas.",
    short: "Viven aparte de tu embudo: tu equipo no ve en qué etapa va cada prospecto.",
  },
  {
    name: "Plataformas de IA autónoma",
    icon: "sparkle",
    what: "Buscan que la IA lleve casi todo el flujo, del primer mensaje al cierre.",
    short: "Suelen venir con implementación y consultoría aparte, y tu equipo queda en segundo plano.",
  },
  {
    name: "CRMs de WhatsApp con IA de complemento",
    icon: "kanban",
    what: "Ordenan las conversaciones en embudos y suman la IA como extra.",
    short: "La IA suele cobrarse aparte, con su propio precio o por consumo.",
  },
  {
    name: "CRMs tradicionales sin WhatsApp",
    icon: "file",
    what: "Ordenan contactos, etapas y responsables.",
    short: "No atienden WhatsApp: tu equipo copia y pega, y contesta a mano.",
  },
];

/* ───────────── Tabla por tipo de herramienta ───────────── */

const COLUMNS = [
  { key: "bot", label: "Bot de menús" },
  { key: "agente", label: "Agente de IA suelto" },
  { key: "autonoma", label: "IA autónoma", sub: "Con implementación y consultoría aparte" },
  { key: "crmwa", label: "CRM de WhatsApp", sub: "Con la IA como complemento" },
  { key: "crm", label: "CRM tradicional", sub: "Sin WhatsApp" },
  { key: "root", label: "root", sub: CATEGORY, highlight: true },
];

const ROWS: ComparisonRow[] = [
  {
    label: "Contesta al instante y entiende lo que escribe el cliente",
    values: { bot: "Contesta con menús", agente: true, autonoma: true, crmwa: "Si contratas la IA", crm: false, root: "Sí, con agentes de IA en Pro y Enterprise" },
  },
  {
    label: "La IA viene en el plan",
    values: {
      bot: null,
      agente: "Es todo el producto",
      autonoma: "Sí, con implementación aparte",
      crmwa: "Suele ser un extra",
      crm: "Depende",
      root: `Incluida desde Pro (${PRO.priceLabel} MXN al mes)`,
    },
  },
  {
    label: "Cada prospecto con etapa, responsable y próxima acción",
    values: { bot: false, agente: false, autonoma: true, crmwa: true, crm: true, root: true },
  },
  {
    label: "Pasa la conversación al vendedor con el historial",
    values: { bot: false, agente: "Depende", autonoma: "Depende", crmwa: "Depende", crm: null, root: true },
  },
  {
    label: "Tu equipo sigue al frente de la venta",
    values: { bot: true, agente: "Depende", autonoma: "La IA lleva casi todo", crmwa: true, crm: true, root: "Tu agente califica, tu equipo cierra" },
  },
  {
    label: "Todo en el número de tu empresa, con la API oficial",
    values: { bot: "Depende", agente: "Depende", autonoma: "Depende", crmwa: "Depende", crm: null, root: "Sí, API oficial desde Básico" },
  },
  {
    label: "Acciones en tu CRM o ERP cuando pasa algo",
    values: { bot: false, agente: "Depende", autonoma: "Depende", crmwa: "Depende", crm: "Es el sistema", root: "Salesforce, SAP, HubSpot y Excel" },
  },
  {
    label: "Cómo se cobra",
    values: {
      bot: "Depende",
      agente: "Depende",
      autonoma: "Mensualidad más implementación",
      crmwa: "Mensualidad más la IA",
      crm: "Suele ser por usuario",
      root: `Precio publicado: ${BASICO.name} ${BASICO.priceLabel} y ${PRO.name} ${PRO.priceLabel} MXN al mes`,
    },
  },
  {
    label: "Arranque",
    values: { bot: "Rápido", agente: "Depende", autonoma: "Proyecto de implementación", crmwa: "Depende", crm: "Depende", root: "La mayoría opera en menos de una semana" },
  },
];

/* ───────────── Qué preguntar antes de elegir ───────────── */

const ASK: { q: string; why: React.ReactNode; root: React.ReactNode }[] = [
  {
    q: "¿Cuánto pago en total, no solo la mensualidad?",
    why: "Suma la mensualidad, la implementación o consultoría, los mensajes de Meta, el IVA y lo que cuesta cada usuario extra. Pide el total del primer año por escrito.",
    root: (
      <>
        {BASICO.name} {BASICO.priceLabel} y {PRO.name} {PRO.priceLabel} MXN al mes, publicados. {PRICING_FACTS.meta} {PRICING_FACTS.iva}
      </>
    ),
  },
  {
    q: "¿La IA viene en el plan o se cobra aparte?",
    why: "En muchos sistemas el agente de IA es un complemento con su propio precio o se cobra por consumo. Pregunta qué pasa cuando se acaba lo contratado.",
    root: <>Los agentes de IA vienen incluidos en los planes {PRO.name} y Enterprise.</>,
  },
  {
    q: "¿La conversación queda en el número de la empresa?",
    why: "Si cada vendedor atiende desde su celular, cuando se va se lleva la cartera. Pregunta de quién es el número y si usan la API oficial de WhatsApp Business.",
    root: (
      <>
        Todo pasa por el número de tu empresa, con la API oficial desde {BASICO.name}. La cartera es tuya, no del vendedor. {PRICING_FACTS.api}
      </>
    ),
  },
  {
    q: "¿Hay relevo al vendedor con historial?",
    why: "Cuando la IA ya calificó, tu vendedor tiene que saber quién es, qué quiere y qué ya se le respondió. Si no, el cliente repite todo.",
    root: <>El agente le pasa la conversación al vendedor con todo el historial, y tú ves cada etapa del embudo.</>,
  },
  {
    q: "¿Se conecta con los sistemas que ya usas?",
    why: "Si el CRM de WhatsApp no habla con tu CRM, tu ERP o tu Excel, alguien termina capturando a mano.",
    root: (
      <>
        Se conecta con Salesforce, SAP, HubSpot y Excel, y un evento en root dispara una acción en tu CRM o ERP. Mira{" "}
        <Link href="/producto/integraciones/" className="underline decoration-line underline-offset-2 hover:decoration-ink">
          las integraciones
        </Link>
        .
      </>
    ),
  },
  {
    q: "¿Hay soporte en México, en tu horario y en pesos?",
    why: "Pregunta quién te atiende, en qué horario y en qué moneda te cobran. También cuánto tardas en arrancar y quién hace la configuración.",
    root: (
      <>
        Hecho por Nextia en la Ciudad de México. {SUPPORT_HOURS} El 24/7 es de Enterprise. {PRICING_FACTS.start}
      </>
    ),
  },
];

const FAQS: FaqItem[] = [
  {
    q: "¿Cuál es el mejor CRM para WhatsApp en México?",
    a: "Depende de cómo vende tu equipo. Si solo necesitas un menú de opciones, un bot te basta. Si quieres que la IA lleve casi todo el flujo y te sirve un proyecto con consultoría, hay plataformas de IA autónoma. Si quieres agentes de IA incluidos que contesten, califiquen y agenden, y que tu equipo siga al frente de la venta en el número de tu empresa, root es para ti.",
  },
  {
    q: "¿Qué alternativas de CRM para WhatsApp hay?",
    a: "Hay cinco tipos: bots de menús, agentes de IA sueltos, plataformas de IA autónoma con implementación y consultoría aparte, CRMs de WhatsApp con la IA como complemento y CRMs tradicionales sin WhatsApp. root junta agentes de IA y CRM en un solo producto: tu agente contesta y califica, tu equipo cierra y tú ves todo.",
  },
  {
    q: "¿Por qué no comparan root con marcas concretas?",
    a: "Porque cada sistema cambia sus planes y sus precios, y una tabla con nombres se vuelve vieja muy rápido. Preferimos comparar por tipo de herramienta y darte las preguntas que conviene hacerle a cualquier proveedor, incluidos nosotros.",
  },
  {
    q: "¿Cuánto cuesta root por usuario?",
    a: `El plan ${PRO.name} cuesta ${PRO.priceLabel} MXN al mes con 10 usuarios y agentes de IA: ${PRO_PER_USER} por usuario. El plan ${BASICO.name} cuesta ${BASICO.priceLabel} MXN al mes con 3 usuarios, sin IA: ${BASICO_PER_USER} por usuario. Los mensajes de WhatsApp se pagan aparte, a la tarifa oficial de Meta, sin sobreprecio de root.`,
  },
  {
    q: "¿La IA de root se cobra aparte?",
    a: `No. Los agentes de IA vienen incluidos en los planes ${PRO.name} y Enterprise. El plan ${BASICO.name} trae la API oficial, el CRM básico y automatizaciones simples para tu equipo.`,
  },
  {
    q: "¿Puedo cambiarme de otro sistema a root sin perder mis contactos?",
    a: `Sí. En el arranque configuramos tus embudos, migramos tus contactos e integramos tus sistemas, sin pausar tu operación. ${PRICING_FACTS.start}`,
  },
];

export default function Comparativas() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Comparativas", href: PATH }]}
        kicker="Comparativa"
        title="CRM para WhatsApp: root frente a otros sistemas"
        intro="Bots, agentes de IA sueltos, plataformas de IA autónoma y CRMs: qué hace cada tipo de sistema, en qué se queda corto y qué preguntar antes de elegir. Sin letra chica y con precios en pesos."
        cta="comparativas-hero"
        note={GUIDE_PHRASE}
      />

      {/* El mapa: cinco tipos de sistema y root */}
      <Section tone="gris" labelledBy="mapa-titulo">
        <SectionHeader
          id="mapa-titulo"
          kicker="Alternativas de CRM para WhatsApp"
          title="Cinco tipos de sistema y dónde entra root"
          intro="Antes de ver precios, conviene saber qué resuelve cada tipo de herramienta y qué te deja pendiente."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TYPES.map((t) => (
            <article key={t.name} className="card p-6 md:p-7 flex flex-col gap-3">
              <span className="w-10 h-10 rounded-lg grid place-items-center bg-surface-2 border border-line text-ink">
                <Icon name={t.icon} className="w-5 h-5" />
              </span>
              <h3 className="h-card text-xl text-ink">{t.name}</h3>
              <p className="text-ink/85 leading-relaxed">{t.what}</p>
              <p className="text-muted leading-relaxed">{t.short}</p>
            </article>
          ))}
          <article className="card p-6 md:p-7 flex flex-col gap-3 border-ink/30 shadow-[var(--shadow)]">
            <span className="w-10 h-10 rounded-lg grid place-items-center bg-lime-fill text-fixed-ink">
              <Icon name="handoff" className="w-5 h-5" />
            </span>
            <h3 className="h-card text-xl text-ink">
              <span className="normal-case">root</span>: agentes y CRM en un solo producto
            </h3>
            <p className="text-ink/85 leading-relaxed">{GUIDE_PHRASE}</p>
            <p className="text-muted leading-relaxed">Todo en el mismo embudo y en el número de tu empresa, con la IA incluida desde {PRO.name}.</p>
          </article>
        </div>
      </Section>

      {/* Tabla genérica */}
      <Section labelledBy="tabla-titulo">
        <SectionHeader
          id="tabla-titulo"
          kicker="Lado a lado"
          title="Comparativa de CRM para WhatsApp por tipo de sistema"
          intro="Lo que suele hacer cada tipo de herramienta. Cada producto es distinto: usa la tabla para saber qué preguntar."
        />
        <ComparisonTable
          caption="Comparación por tipo de sistema: bot de menús, agente de IA suelto, plataforma de IA autónoma, CRM de WhatsApp con IA de complemento, CRM tradicional y root"
          firstColLabel="Tema"
          columns={COLUMNS}
          rows={ROWS}
          footnote="Comparación por tipo de herramienta, sin marcas. «Depende»: varía según el proveedor; «—»: no aplica."
        />
      </Section>

      {/* Frase guía */}
      <Section tone="gris" labelledBy="guia-titulo">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeader id="guia-titulo" kicker="Cómo trabaja root" title={GUIDE_PHRASE} className="mb-6 md:mb-8" />
            <ul className="flex flex-col gap-4 text-ink/85 leading-relaxed text-[17px]">
              <li>
                <span className="font-semibold text-ink">Tu agente contesta y califica.</span> Contesta en segundos desde el número de tu
                empresa, califica con las preguntas de tu negocio, agenda, da seguimiento y reactiva a quien dejó de contestar.
              </li>
              <li>
                <span className="font-semibold text-ink">Tu equipo cierra.</span> Cuando toca, el agente le pasa la conversación al vendedor
                con todo el historial: quién es, qué quiere y qué ya se le respondió.
              </li>
              <li>
                <span className="font-semibold text-ink">Tú ves todo.</span> Cada prospecto con etapa, responsable y origen del trato, en una
                bandeja compartida por tu equipo y tus agentes.
              </li>
            </ul>
            <div className="mt-8">
              <LinkButton href="/producto/agentes-de-ia" label="Conoce los agentes de IA" />
            </div>
          </div>
          <GuidePhraseScene className="w-full max-w-[520px] lg:justify-self-end" />
        </div>
      </Section>

      {/* Qué preguntar antes de elegir */}
      <Section labelledBy="preguntar-titulo">
        <SectionHeader
          id="preguntar-titulo"
          kicker="Checklist"
          title="Qué preguntar antes de elegir"
          intro="Hazle estas seis preguntas a cualquier proveedor, incluidos nosotros. Abajo de cada una, la respuesta de root."
        />
        <AskChecklist items={ASK} />
      </Section>

      <ProductByNextia />

      {/* D8 · Costo por usuario (solo root) */}
      <Section labelledBy="costo-titulo">
        <SectionHeader
          id="costo-titulo"
          kicker="Precio"
          title="Cuánto cuesta root por usuario"
          intro={`Para comparar con otros sistemas, divide la mensualidad entre los usuarios incluidos. En root ${PRO.name} sale en ${PRO_PER_USER} por usuario, con la IA incluida.`}
        />
        <CostPerUser id="d8-root" />
        <p className="mt-6 text-muted leading-relaxed max-w-3xl">
          ¿Quieres ver qué trae cada plan? Revisa los{" "}
          <Link href="/precios/" className="underline decoration-line underline-offset-2 hover:decoration-ink">
            precios de root
          </Link>
          .
        </p>
      </Section>

      {/* Con honestidad */}
      <Section tone="gris" labelledBy="conviene-titulo">
        <SectionHeader
          id="conviene-titulo"
          kicker="Con honestidad"
          title="Cuándo te conviene otro sistema y cuándo root"
          intro="No hay una opción mejor para todos: depende de cuántos mensajes te llegan y de cómo vende tu equipo."
        />
        <HonestSplit
          other={[
            <>Te llegan pocos mensajes y un menú de opciones fijas resuelve casi todo.</>,
            <>Quieres que la IA lleve todo el flujo, casi sin vendedores, y te sirve un proyecto con consultoría.</>,
            <>Tu venta no pasa por WhatsApp: un CRM tradicional puede bastarte.</>,
            <>Tu área de compras pide certificaciones que root hoy no publica.</>,
          ]}
          root={[
            <>Quieres agentes de IA incluidos en el plan, sin pagar un complemento aparte.</>,
            <>Tu agente contesta y califica, pero quieres que tu equipo siga al frente de la venta.</>,
            <>Necesitas que todo quede en el número de tu empresa, con la API oficial.</>,
            <>Conectas tu venta con Salesforce, SAP, HubSpot o Excel.</>,
            <>Quieres precio publicado en pesos y arrancar en días, no en meses.</>,
          ]}
        />
      </Section>

      {/* Cambio */}
      <Section labelledBy="cambio-titulo">
        <SectionHeader
          id="cambio-titulo"
          kicker="Cambio"
          title="Cómo cambiarte de otro sistema a root"
          intro="Sin pausar la operación: armamos root mientras tu equipo sigue vendiendo."
        />
        <Steps
          items={[
            { title: "Escríbenos por WhatsApp", text: "Cuéntanos cómo vende tu equipo y qué etapas quieres que atienda el agente." },
            { title: "API oficial", text: "Tramitamos o conectamos contigo la API oficial de WhatsApp Business, sin costo extra." },
            { title: "Embudos, agente y contactos", text: "Configuramos tus etapas y las preguntas para calificar, y migramos tus contactos." },
            { title: "Conecta y arranca", text: "Integramos tus sistemas y tu equipo empieza. La mayoría opera en menos de una semana." },
          ]}
        />
        <p className="mt-6 text-sm text-muted">
          Nuestros compromisos de cobro están en los{" "}
          <Link href="/docs/terminos-y-condiciones/" className="underline decoration-line underline-offset-2">
            Términos y condiciones
          </Link>
          . {PRICING_FACTS.cancel}
        </p>
      </Section>

      <Faq items={FAQS} tone="gris" title="Preguntas frecuentes sobre la comparativa" />

      <Section pad="md" labelledBy="mas-titulo">
        <SectionHeader id="mas-titulo" title="Sigue explorando" className="mb-8 md:mb-10" />
        <RelatedLinks
          items={[
            { href: "/precios", label: "Precios de root", text: "Planes en pesos: Básico, Pro con IA y Enterprise" },
            { href: "/producto/agentes-de-ia", label: "Agentes de IA", text: "Contestan, califican, agendan y pasan al vendedor con historial" },
            { href: "/guias/chatbot-vs-agente-de-ia-vs-crm", label: "Chatbot, agente de IA o CRM", text: "Qué necesita tu WhatsApp de ventas" },
            { href: "/guias/cuanto-cuesta-la-api-de-whatsapp", label: "Cuánto cuesta la API de WhatsApp", text: "En pesos, con la tarifa de Meta" },
            { href: "/guias/whatsapp-business-app-vs-api", label: "WhatsApp Business App o API", text: "Cuál necesita tu equipo" },
            { href: "/producto/integraciones", label: "Integraciones", text: "Salesforce, SAP, HubSpot y Excel" },
          ]}
        />
      </Section>

      <CtaBand
        cta="comparativas-final"
        kicker="Que nadie se quede en visto"
        title="¿Dudas entre root y otro sistema? Pregúntanos directo"
        text="Escríbenos por WhatsApp, cuéntanos cómo vende tu equipo y te decimos con honestidad si root te conviene."
      />
    </>
  );
}
