import Link from "next/link";
import { CarteraEsTuya } from "@/components/portada-precios-nosotros/cartera-es-tuya";
import { Carriles } from "@/components/portada-precios-nosotros/carriles";
import { DelAnuncioAlCierre } from "@/components/portada-precios-nosotros/del-anuncio-al-cierre";
import { MapaDeConexiones } from "@/components/portada-precios-nosotros/mapa-de-conexiones";
import { PlanStrip, PriceLegend, SoftwareJsonLd } from "@/components/portada-precios-nosotros/planes";
import { SemanaDeArranque } from "@/components/portada-precios-nosotros/semana-de-arranque";
import { Icon } from "@/components/icons";
import { ProductByNextia } from "@/components/product-by-nextia";
import {
  CheckList,
  ComparisonTable,
  Container,
  CtaBand,
  CtaPair,
  ExampleTag,
  Faq,
  FeatureGrid,
  LinkButton,
  RoleChip,
  Section,
  SectionHeader,
  type ComparisonRow,
  type FaqItem,
  type Feature,
} from "@/components/ui";
import { PRODUCT_PAGES, SOLUTION_PAGES } from "@/lib/routes";
import { pageMetadata, withSlash } from "@/lib/seo";
import { CATEGORY, PRICE_FROM, PRICING_FACTS, TAGLINE } from "@/lib/site";

/*
 * Portada (plan §3.1). Búsqueda principal: «crm para whatsapp»; secundarias «crm de whatsapp», «crm con whatsapp»,
 * «mejor crm para whatsapp» y «agente de ia para whatsapp».
 * Orden: hero con D1 · el problema · D2 Carriles · producto en 5 verbos · D3 La cartera es tuya · industrias ·
 * franja de Nextia · D5 conexiones · precio claro · ¿Bot, CRM o root? · D10 Semana de arranque · FAQ · cierre.
 * La imagen para compartir es la del sitio (src/app/opengraph-image.tsx → public/og/root.png).
 */

export const metadata = pageMetadata({
  title: "CRM para WhatsApp con agentes de IA para ventas | root",
  description:
    "CRM para WhatsApp con agentes de IA que contestan en segundos, califican y dan seguimiento desde el número de tu empresa. Tu equipo cierra. Desde $4,999 MXN.",
  path: "/",
  absoluteTitle: true,
});

/* ───────────── Contenido ───────────── */

const PROBLEM_ROWS: ComparisonRow[] = [
  {
    label: "Mensajes fuera de horario",
    values: {
      hoy: "Te escriben a las 11 de la noche y contestas al día siguiente, cuando ya le respondió alguien más.",
      root: "Tu agente contesta en segundos, a cualquier hora, y deja al prospecto calificado para tu equipo.",
    },
  },
  {
    label: "La cartera",
    values: {
      hoy: "Cada vendedor atiende desde su WhatsApp personal. Si se va, se lleva sus chats.",
      root: "Todo pasa por el número de tu empresa. La cartera es tuya, no del vendedor.",
    },
  },
  {
    label: "El seguimiento",
    values: {
      hoy: "Depende de que alguien se acuerde de volver a escribir.",
      root: "El agente da seguimiento y reactiva a quien dejó de contestar.",
    },
  },
  {
    label: "Tus sistemas",
    values: {
      hoy: "El CRM, el Excel y el WhatsApp no se hablan. Alguien captura todo dos veces.",
      root: "root se conecta con Salesforce, SAP, HubSpot y Excel, y dispara acciones cuando pasa algo importante.",
    },
  },
];

/** Las 5 tarjetas de producto, en el orden de verbos del plan: Atiende · Ordena · Da seguimiento · Conecta · Mide. */
const VERB_ORDER = ["Atiende", "Ordena", "Da seguimiento", "Conecta", "Mide"];
const PRODUCT_ICON: Record<string, string> = {
  "/producto/agentes-de-ia": "bot",
  "/producto/bandeja-de-whatsapp": "inbox",
  "/producto/crm-y-embudos": "kanban",
  "/producto/campanas-y-seguimiento": "chart",
  "/producto/integraciones": "plug",
};
const PRODUCT_TEXT: Record<string, string> = {
  "/producto/agentes-de-ia": "Tus agentes de IA contestan en segundos, califican con tus preguntas, agendan, dan seguimiento y reactivan.",
  "/producto/bandeja-de-whatsapp": "Una bandeja compartida para todo tu equipo, en el número de tu empresa. WhatsApp e Instagram en un solo lugar.",
  "/producto/crm-y-embudos": "Cada prospecto con su etapa, su responsable y su próxima acción. Contactos, conversaciones y seguimientos juntos.",
  "/producto/integraciones": "Salesforce, SAP, HubSpot y Excel. Un evento en root dispara una acción en tus sistemas.",
  "/producto/campanas-y-seguimiento": "Cada prospecto entra con la campaña que lo trajo, para que sepas qué anuncio sí vende.",
};
const PRODUCT_CARDS: Feature[] = [...PRODUCT_PAGES]
  .sort((a, b) => VERB_ORDER.indexOf(a.verb ?? "") - VERB_ORDER.indexOf(b.verb ?? ""))
  .map((r) => ({
    title: `${r.verb} · ${r.label}`,
    text: PRODUCT_TEXT[r.path] ?? r.blurb ?? "",
    href: r.path,
    icon: PRODUCT_ICON[r.path],
    role: r.path === "/producto/agentes-de-ia" ? "agente" : undefined,
  }));

const SOLUTION_ICON: Record<string, string> = {
  "/soluciones/inmobiliarias": "home",
  "/soluciones/agencias-de-autos": "car",
  "/soluciones/clinicas-esteticas": "face",
  "/soluciones/tiendas-en-redes": "bag",
  "/soluciones/clinicas-dentales": "tooth",
  "/soluciones/consultorios-y-clinicas": "stethoscope",
  "/soluciones/financieras-y-sofom": "bank",
  "/soluciones/laboratorios-clinicos": "flask",
};

const CATEGORY_COLUMNS = [
  { key: "bot", label: "Bot de menús", sub: "Opciones fijas: «marca 1, 2 o 3»" },
  { key: "agente", label: "Agente de IA suelto", sub: "Conversa, pero vive aparte" },
  { key: "crm", label: "CRM sin IA", sub: "Ordena, pero contesta tu equipo" },
  { key: "root", label: "root", sub: CATEGORY, highlight: true },
];
const CATEGORY_ROWS: ComparisonRow[] = [
  { label: "Contesta al instante, a cualquier hora", values: { bot: true, agente: true, crm: false, root: true } },
  { label: "Entiende lo que el cliente escribe con sus palabras", values: { bot: false, agente: true, crm: null, root: true } },
  { label: "Califica con las preguntas de tu negocio", values: { bot: "Con menús", agente: true, crm: "A mano", root: true } },
  { label: "Cada prospecto con etapa, responsable y próxima acción", values: { bot: false, agente: false, crm: true, root: true } },
  { label: "Pasa la conversación al vendedor con el historial", values: { bot: false, agente: "Depende", crm: null, root: true } },
  { label: "Da seguimiento y reactiva", values: { bot: false, agente: "Depende", crm: "A mano", root: true } },
  { label: "Todo en el número de tu empresa", values: { bot: "Depende", agente: "Depende", crm: "Depende", root: true } },
  { label: "Tú ves a tu equipo y a tus agentes en un solo lugar", values: { bot: false, agente: false, crm: "Solo al equipo", root: true } },
];

const FAQS: FaqItem[] = [
  {
    q: "¿Qué es root?",
    a: "root es un CRM para WhatsApp con agentes de IA, hecho por Nextia en la Ciudad de México. Tus agentes contestan en segundos, califican y dan seguimiento desde el número de tu empresa, y le pasan la conversación a tu equipo con todo el historial para que se dedique a cerrar.",
  },
  {
    q: "¿Necesito la API oficial de WhatsApp Business?",
    a: "Sí. root funciona con la API oficial de WhatsApp Business desde el plan Básico, y te ayudamos a tramitarla durante el arranque, sin costo extra.",
  },
  {
    q: "¿Cuánto tarda la implementación?",
    a: "La mayoría de los equipos opera en menos de una semana. El arranque incluye la configuración, la migración de tus contactos y la integración con tus sistemas.",
  },
  {
    q: "¿Se integra con mi CRM o mi ERP?",
    a: "root se conecta con Salesforce, SAP, HubSpot y Excel, y puede disparar acciones en tus sistemas cuando pasa algo importante, por ejemplo crear un lead o un pedido. Si usas otro sistema, escríbenos por WhatsApp y lo revisamos contigo.",
  },
  {
    q: "¿El agente de IA viene en todos los planes?",
    a: "Los agentes de IA vienen en los planes Pro y Enterprise. El plan Básico incluye la API oficial, el CRM básico y automatizaciones simples para tu equipo.",
  },
  {
    q: "¿Qué pasa si necesito más usuarios?",
    a: "Puedes agregar usuarios o subir de plan cuando lo necesites. Básico trae 3 usuarios, Pro trae 10 y Enterprise se arma a la medida de tu operación.",
  },
  {
    q: "¿Los mensajes de WhatsApp cuestan aparte?",
    a: "Sí. Meta cobra los mensajes de WhatsApp aparte, a su tarifa oficial, y root no les suma ningún sobreprecio.",
  },
  {
    q: "¿Cómo cuidan mis datos?",
    a: "Tratamos tus datos conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares. Puedes ejercer tus derechos ARCO y pedir el borrado de tu información; respondemos en un plazo de 20 días hábiles. Los detalles están en nuestro aviso de privacidad.",
  },
];

/* ───────────── Página ───────────── */

export default function Home() {
  return (
    <>
      <SoftwareJsonLd path="/" />

      {/* 1 · Hero con D1 */}
      <section className="bg-paper grid-bg border-b border-line" aria-labelledby="hero-titulo">
        <Container size="wide" className="pt-12 pb-16 md:pt-16 md:pb-24">
          <div className="max-w-4xl">
            <p className="kicker">{TAGLINE}</p>
            <h1 id="hero-titulo" className="h-hero mt-4 text-ink">
              El CRM de WhatsApp con agentes de IA para tu equipo de ventas
            </h1>
            <p className="lead mt-6 max-w-2xl md:text-xl">
              Tus agentes contestan en segundos, califican y dan seguimiento desde el número de tu empresa. Tu equipo recibe cada prospecto con el
              historial completo y se dedica a cerrar.
            </p>
            <CtaPair cta="hero" className="mt-9" />
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              {["API oficial de WhatsApp Business", "Precios en pesos", "La mayoría de los equipos opera en menos de una semana"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-lime" strokeWidth={2.4} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 md:mt-14">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="kicker">Del anuncio al cierre</p>
              <ExampleTag />
            </div>
            <DelAnuncioAlCierre />
          </div>
        </Container>
      </section>

      {/* 2 · El problema */}
      <Section tone="gris" labelledBy="problema-titulo">
        <SectionHeader
          id="problema-titulo"
          kicker="El problema"
          title="Tu equipo vende por WhatsApp, pero sin trazabilidad ni control"
          intro="Tus clientes quieren escribirte por WhatsApp. El problema no es el canal: es que las conversaciones viven en celulares sueltos, nadie da seguimiento y tus sistemas no se enteran de nada."
        />
        <ComparisonTable
          caption="Cómo cambia la venta por WhatsApp con root"
          firstColLabel="Qué pasa"
          columns={[
            { key: "hoy", label: "Hoy" },
            { key: "root", label: "Con root", highlight: true },
          ]}
          rows={PROBLEM_ROWS}
        />
      </Section>

      {/* 3 · Agente + equipo: D2 Carriles */}
      <Section tone="oscuro" grid labelledBy="carriles-titulo">
        <SectionHeader
          id="carriles-titulo"
          kicker="Cómo trabajan juntos tu agente y tu equipo"
          title="Tu agente contesta y califica. Tu equipo cierra. Tú ves todo."
          intro="En cada embudo hay dos carriles. Las primeras etapas las atiende tu agente de root; las que piden criterio y trato personal, tu equipo. Entre los dos está el relevo: el agente le pasa la conversación al vendedor con todo el historial y una nota de quién es, qué quiere y qué ya se le respondió."
        />
        <div className="mb-3 flex justify-end">
          <ExampleTag />
        </div>
        <Carriles />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="card p-6">
            <RoleChip role="agente">Tu agente</RoleChip>
            <h3 className="h-card mt-4 text-lg text-ink">Contesta y califica</h3>
            <p className="mt-2 leading-relaxed text-muted">Responde en segundos, hace las preguntas de tu negocio, agenda y da seguimiento a quien no ha contestado.</p>
          </div>
          <div className="card p-6">
            <RoleChip role="equipo">Tu equipo</RoleChip>
            <h3 className="h-card mt-4 text-lg text-ink">Cierra</h3>
            <p className="mt-2 leading-relaxed text-muted">Recibe a cada prospecto con el historial completo y entra cuando hace falta criterio, negociación o una visita.</p>
          </div>
          <div className="card p-6">
            <span className="chip">Tú</span>
            <h3 className="h-card mt-4 text-lg text-ink">Ves todo</h3>
            <p className="mt-2 leading-relaxed text-muted">Quién atiende qué, en qué etapa va cada trato y de qué campaña llegó, en el mismo lugar.</p>
          </div>
        </div>
      </Section>

      {/* 4 · Producto en 5 verbos */}
      <Section labelledBy="producto-titulo">
        <SectionHeader
          id="producto-titulo"
          kicker="Producto"
          title="Un CRM con WhatsApp que atiende, ordena, da seguimiento, conecta y mide"
          intro="root junta en un solo producto lo que hoy tienes regado: el agente de IA, la bandeja de tu equipo, el CRM y la conexión con tus sistemas."
        />
        <FeatureGrid items={PRODUCT_CARDS} cols={3} />
        <div className="mt-8">
          <LinkButton href="/producto" label="Conoce todo root" />
        </div>
      </Section>

      {/* 5 · La cartera es tuya: D3 */}
      <Section tone="gris" labelledBy="cartera-titulo">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionHeader
              id="cartera-titulo"
              kicker="Línea de empresa"
              title="La cartera es tuya, no del vendedor"
              intro="Con root, todas las conversaciones pasan por el número de tu empresa. Si alguien deja el equipo, sus prospectos se quedan contigo y los reasignas en un momento."
              className="mb-6 md:mb-8"
            />
            <CheckList
              items={["Un solo número de WhatsApp para todo tu equipo", "Cada conversación con su historial, en la bandeja compartida", "Nada se pierde cuando alguien cambia de puesto o se va"]}
            />
            <div className="mt-8">
              <LinkButton href="/producto/bandeja-de-whatsapp" label="Ver la bandeja de WhatsApp" />
            </div>
          </div>
          <div className="min-w-0">
            <div className="mb-3 flex justify-end">
              <ExampleTag />
            </div>
            <CarteraEsTuya />
          </div>
        </div>
      </Section>

      {/* 6 · Industrias */}
      <Section labelledBy="industrias-titulo">
        <SectionHeader
          id="industrias-titulo"
          kicker="Soluciones"
          title="Hecho para tu industria"
          intro="Cada industria pregunta distinto y da seguimiento distinto. Para cada una proponemos una receta de arranque: etapas, preguntas de calificación y mensajes de seguimiento."
        />
        <FeatureGrid cols={4} items={SOLUTION_PAGES.map((r) => ({ title: r.label, text: r.blurb ?? "", href: r.path, icon: SOLUTION_ICON[r.path] }))} />
        <div className="mt-8">
          <LinkButton href="/soluciones" label="Ver todas las soluciones" />
        </div>
      </Section>

      <ProductByNextia />

      {/* 7 · Conexiones: D5 */}
      <Section labelledBy="conexiones-titulo">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              id="conexiones-titulo"
              kicker="Integraciones"
              title="Se conecta con lo que ya usas"
              intro="root no te pide tirar tu CRM ni tu ERP. Se conecta con Salesforce, SAP, HubSpot y Excel, y cuando pasa algo importante en una conversación, dispara la acción en tu sistema."
              className="mb-6 md:mb-8"
            />
            <ul className="flex flex-col gap-3">
              {[
                ["Nuevo prospecto", "crea el lead en Salesforce"],
                ["Trato ganado", "crea el pedido en SAP"],
                ["Cita confirmada", "actualiza la etapa en HubSpot"],
              ].map(([ev, act]) => (
                <li key={ev} className="card flex items-center gap-3 px-4 py-3 text-[15px]">
                  <Icon name="bolt" className="h-4 w-4 shrink-0 text-lime" />
                  <span>
                    <span className="font-semibold text-ink">{ev}</span> <span className="text-muted">→ {act}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-display text-lg font-bold text-ink">De sistemas de registro a sistemas de acción.</p>
            <div className="mt-6">
              <LinkButton href="/producto/integraciones" label="Ver integraciones" />
            </div>
          </div>
          <MapaDeConexiones />
        </div>
      </Section>

      {/* 8 · Precio claro */}
      <Section tone="gris" labelledBy="precio-titulo">
        <SectionHeader
          id="precio-titulo"
          kicker="Precios"
          title={`Precio claro: ${PRICE_FROM.charAt(0).toLowerCase()}${PRICE_FROM.slice(1)}`}
          intro="Mensajes de WhatsApp a la tarifa oficial de Meta, sin sobreprecio. Te ayudamos a tramitar la API sin costo extra y cancelas cuando quieras, con efecto al final del periodo."
        />
        <PlanStrip />
        <PriceLegend className="mt-5" />
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/precios" label="Ver precios y qué incluye cada plan" variant="dark" />
        </div>
      </Section>

      {/* 9 · ¿Bot, CRM o root? */}
      <Section labelledBy="categorias-titulo">
        <SectionHeader
          id="categorias-titulo"
          kicker="¿Qué necesita tu WhatsApp?"
          title="¿Bot, CRM o root?"
          intro="Un bot de menús contesta, pero no entiende. Un agente de IA suelto entiende, pero no ordena a tu equipo. Un CRM ordena, pero no contesta. Un buen CRM para WhatsApp hace las tres cosas en el mismo lugar."
        />
        <ComparisonTable
          caption="Comparación por categoría: bot de menús, agente de IA suelto, CRM sin IA y root"
          columns={CATEGORY_COLUMNS}
          rows={CATEGORY_ROWS}
          footnote={
            <>
              Comparación por categoría, sin marcas: cada herramienta es distinta. Si quieres ver root frente a otros sistemas, revisa la{" "}
              <Link href={withSlash("/comparativas")} className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-2">
                comparativa
              </Link>{" "}
              o la guía{" "}
              <Link href={withSlash("/guias/chatbot-vs-agente-de-ia-vs-crm")} className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-2">
                chatbot, agente de IA o CRM
              </Link>
              .
            </>
          }
        />
      </Section>

      {/* 10 · Semana de arranque: D10 */}
      <Section tone="gris" labelledBy="arranque-titulo">
        <SectionHeader id="arranque-titulo" kicker="Semana de arranque" title="Empieza en días, no en meses" intro={`${PRICING_FACTS.start} Nosotros hacemos el trabajo pesado contigo.`} />
        <SemanaDeArranque />
      </Section>

      {/* 11 · Preguntas frecuentes */}
      <Faq items={FAQS} tone="claro" intro="Lo que más nos preguntan antes de empezar. Si tu duda no está aquí, escríbenos por WhatsApp." />

      {/* 12 · Cierre */}
      <CtaBand
        kicker={TAGLINE}
        title="Escríbenos por WhatsApp y te mostramos root con los casos de tu equipo"
        text="Cuéntanos cuántos mensajes te llegan, quién los atiende y qué sistemas usas. Te decimos qué plan te conviene y cómo sería tu semana de arranque."
      />
    </>
  );
}
