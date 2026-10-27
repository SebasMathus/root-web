import Link from "next/link";
import { ProductByNextia } from "@/components/product-by-nextia";
import { CheckList, ComparisonTable, CtaBand, Faq, PageHero, PricesButton, Section, SectionHeader } from "@/components/ui";
import { AgentChatScene } from "@/components/producto/agent-chat-scene";
import { CorteMananaScene } from "@/components/producto/corte-manana-scene";
import { RelatedProducts } from "@/components/producto/related";
import { RelevoNote } from "@/components/producto/relevo-note";
import { ConceptTag, SceneNote } from "@/components/producto/scene-frame";
import { SkillGrid } from "@/components/producto/skills";
import { pageMetadata } from "@/lib/seo";
import { GUIDE_PHRASE, planById, PRICING_FACTS } from "@/lib/site";

/* Búsqueda principal: «agente de ia para whatsapp». Variantes: «chatbot whatsapp», «bot para whatsapp», «whatsapp business bot» (plan §3.2). */

const PATH = "/producto/agentes-de-ia";

export const metadata = pageMetadata({
  title: "Agente de IA para WhatsApp que atiende y califica",
  description:
    "Agente de IA para WhatsApp que contesta en segundos, califica con tus preguntas, agenda y da seguimiento. Tu equipo recibe cada prospecto con su historial.",
  path: PATH,
  ownOgImage: true,
});

const pro = planById("pro");
const basico = planById("basico");

const FAQS = [
  {
    q: "¿En qué planes vienen los agentes de IA?",
    a: `En Pro y Enterprise. Pro cuesta ${pro.priceLabel} MXN al mes e incluye ${pro.users}; Enterprise es a convenir y suma IA personalizada. El plan Básico (${basico.priceLabel} MXN al mes) trae la bandeja y el CRM, sin agentes.`,
  },
  {
    q: "¿A qué hora contesta el agente?",
    a: "A cualquier hora: también de noche, en fin de semana y en días festivos. Cuando tu equipo llega, retoma con todo el historial de la conversación.",
  },
  {
    q: "¿Qué pasa si le preguntan algo que no sabe?",
    a: "Tu agente contesta con la información que tú le das. Cuando la pregunta sale de ahí, la conversación pasa a tu equipo con todo el historial, para que nadie tenga que volver a preguntar.",
  },
  {
    q: "¿El agente reemplaza a mi equipo de ventas?",
    a: `No. Es un compañero del equipo: ${GUIDE_PHRASE} Tu agente se encarga del trabajo repetitivo para que tus vendedores dediquen su tiempo a cerrar.`,
  },
  {
    q: "¿Desde qué número contesta?",
    a: `Desde el número de tu empresa, conectado a la API oficial de WhatsApp Business. ${PRICING_FACTS.api}`,
  },
  {
    q: "¿En qué se diferencia de un chatbot de WhatsApp?",
    a: "Un chatbot de menús te hace escoger opciones fijas. El agente de root entiende lo que escribe la persona, contesta con la información de tu negocio, califica con tus preguntas y vive dentro de tu CRM, así que cada prospecto queda con etapa, dueño y lo que sigue.",
  },
  {
    q: "¿Cuánto tarda en estar listo?",
    a: `${PRICING_FACTS.start} Configuramos contigo las preguntas, las respuestas y el tono de tu agente.`,
  },
];

export default function AgentesDeIaPage() {
  return (
    <>
      <PageHero
        kicker="Agentes de IA · planes Pro y Enterprise"
        title="Agentes de IA para WhatsApp que atienden, califican y dan seguimiento"
        intro="Tu agente de root contesta en segundos desde el número de tu empresa, hace las preguntas que haría tu equipo y le pasa la conversación a tu equipo con todo el historial. Tu equipo se dedica a cerrar."
        breadcrumbs={[
          { name: "Producto", href: "/producto" },
          { name: "Agentes de IA", href: PATH },
        ]}
        cta="hero-agentes"
        note="Incluidos en Pro y Enterprise · API oficial de WhatsApp Business · Contesta las 24 horas"
        visual={
          <div className="mx-auto w-full max-w-[540px]">
            <AgentChatScene />
            <SceneNote />
          </div>
        }
      />

      <Section tone="gris" labelledBy="habilidades-titulo">
        <SectionHeader
          id="habilidades-titulo"
          kicker="Habilidades"
          title="Seis habilidades de tu agente de IA para WhatsApp"
          intro="Lo que tu agente hace en cada conversación. Las configuramos contigo durante el arranque, con las preguntas, las respuestas y el tono de tu negocio."
        />
        <SkillGrid />
      </Section>

      <Section labelledBy="no-es-bot-titulo">
        <SectionHeader
          id="no-es-bot-titulo"
          kicker="Chatbot, agente o root"
          title="No es un chatbot de WhatsApp de menús"
          intro="Un bot de opciones te hace escoger del 1 al 5. Un agente de IA suelto contesta bien, pero no sabe qué pasa después. El agente de root vive dentro de tu CRM: contesta, califica y deja a cada prospecto con etapa, dueño y lo que sigue."
        />
        <ComparisonTable
          caption="Diferencias entre un bot de menús, un agente de IA suelto y el agente de root"
          firstColLabel="Qué pasa cuando alguien escribe"
          columns={[
            { key: "bot", label: "Bot de menús" },
            { key: "suelto", label: "Agente de IA suelto" },
            { key: "root", label: "Agente de root", sub: "Dentro de tu CRM", highlight: true },
          ]}
          rows={[
            {
              label: "Cómo contesta",
              values: { bot: "Con opciones fijas: «escribe 1 para precios»", suelto: "Con lenguaje natural", root: "Con lenguaje natural y la información de tu negocio" },
            },
            { label: "Califica al prospecto", values: { bot: false, suelto: "Depende de la herramienta", root: "Con las preguntas de tu negocio" } },
            { label: "Agenda, da seguimiento y reactiva", values: { bot: false, suelto: "Depende de la herramienta", root: true } },
            {
              label: "Cuando hace falta una persona",
              values: { bot: "La conversación se queda en el menú", suelto: "Hay que buscar el chat en otra herramienta", root: "Pasa a tu vendedor con todo el historial" },
            },
            { label: "Dónde queda la información", values: { bot: "En el chat", suelto: "En la herramienta del agente", root: "En tu CRM, con etapa, dueño y siguiente paso" } },
          ]}
          footnote={
            <>
              Son categorías generales, no marcas. ¿Quieres el detalle? Lee la guía{" "}
              <Link href="/guias/chatbot-vs-agente-de-ia-vs-crm/" className="underline decoration-lime decoration-2 underline-offset-2 text-ink">
                Chatbot, agente de IA o CRM
              </Link>
              .
            </>
          }
        />
      </Section>

      <ProductByNextia />

      <Section labelledBy="corte-titulo">
        <SectionHeader
          id="corte-titulo"
          kicker="Corte de la mañana"
          title="Lo que hizo tu agente de WhatsApp mientras tu equipo no estaba"
          intro="Los mensajes no esperan a las 9:00. Tu agente atiende la noche y el fin de semana; en la mañana, tu equipo encuentra el corte: cuántos escribieron, quién ya está calificado y quién espera a una persona."
        />
        <div className="max-w-4xl">
          <CorteMananaScene />
          <SceneNote concept>Así trabaja root: el corte resume el turno sin que nadie arme un reporte.</SceneNote>
        </div>
      </Section>

      <Section tone="gris" labelledBy="relevo-titulo">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="kicker">Relevo y reglas de pase</p>
            <h2 id="relevo-titulo" className="h-section text-ink mt-3">
              Cuándo pasa la conversación a tu equipo
            </h2>
            <p className="lead mt-5">
              Cuando toca una persona, tu agente le pasa la conversación a tu vendedor con todo el historial y una <strong className="text-ink">nota de relevo</strong>: quién es, qué quiere y qué ya se respondió.
            </p>
            <div className="mt-8 card p-6">
              <ConceptTag />
              <h3 className="h-card text-lg text-ink mt-4">Reglas de pase, en tus palabras</h3>
              <p className="text-muted mt-2 leading-relaxed">La condición para que un prospecto avance o pase a tu equipo se escribe como la dirías en una junta:</p>
              <CheckList
                className="mt-4"
                items={[
                  "«Si ya dio presupuesto y zona, pásalo a Andrés.»",
                  "«Si pide hablar con una persona, pásalo de inmediato.»",
                  "«Si pregunta por factura, pásalo a administración.»",
                ]}
              />
            </div>
            <p className="mt-6 text-muted leading-relaxed">
              ¿Qué etapas atiende el agente y cuáles tu equipo? Lo ves en los{" "}
              <Link href="/producto/crm-y-embudos/#carriles" className="text-ink underline decoration-lime decoration-2 underline-offset-2">
                Carriles del CRM
              </Link>
              . Y la conversación sigue en la{" "}
              <Link href="/producto/bandeja-de-whatsapp/" className="text-ink underline decoration-lime decoration-2 underline-offset-2">
                bandeja compartida
              </Link>
              .
            </p>
          </div>
          <div className="mx-auto w-full max-w-[520px]">
            <RelevoNote />
            <SceneNote concept>El traspaso con historial ya está; la nota de relevo es cómo trabaja root.</SceneNote>
          </div>
        </div>
      </Section>

      <Section labelledBy="control-titulo">
        <SectionHeader
          id="control-titulo"
          kicker="Tú tienes el control"
          title="Tu agente contesta con lo que tú le das"
          intro="Trabaja con la información que defines con nosotros durante el arranque. Lo que sale de ahí, pasa a tu equipo."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6 md:p-8">
            <h3 className="h-card text-xl text-ink">Lo que le das a tu agente</h3>
            <CheckList
              className="mt-5"
              items={["Tus productos, precios y condiciones vigentes", "Horarios, ubicación y requisitos", "Las preguntas con las que calificas a un prospecto", "Cuándo pasar la conversación a tu equipo"]}
            />
          </div>
          <div className="card p-6 md:p-8">
            <h3 className="h-card text-xl text-ink">Lo que se queda con tu equipo</h3>
            <CheckList className="mt-5" items={["Negociar precio o condiciones especiales", "Quejas y casos delicados", "Las preguntas que salen de lo que le diste", "Cerrar la venta"]} />
          </div>
        </div>
        <div className="mt-10 card p-6 md:p-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-ink leading-relaxed max-w-2xl">
            Los agentes de IA vienen en <strong>Pro</strong> ({pro.priceLabel} MXN al mes, {pro.users}) y en <strong>Enterprise</strong>, con IA personalizada. Mensajes de WhatsApp a tarifa oficial de Meta, sin sobreprecio.
          </p>
          <PricesButton label="Ver precios" />
        </div>
      </Section>

      <RelatedProducts current={PATH} tone="gris" />

      <Faq items={FAQS} tone="claro" intro="Lo que más nos preguntan de los agentes de IA de root." />

      <CtaBand
        kicker="Que nadie se quede en visto"
        title="Pon a tu agente a contestar desde el número de tu empresa"
        text="Escríbenos por WhatsApp y te mostramos cómo contestaría tu agente con las preguntas de tu negocio."
        cta="cta-final-agentes"
      />
    </>
  );
}
