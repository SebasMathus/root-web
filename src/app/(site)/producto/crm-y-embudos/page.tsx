import Link from "next/link";
import { ProductByNextia } from "@/components/product-by-nextia";
import { CheckList, CtaBand, Faq, FeatureGrid, LinkButton, PageHero, Section, SectionHeader } from "@/components/ui";
import { Icon } from "@/components/icons";
import { CarrilesScene } from "@/components/producto/carriles-scene";
import { FichaVivaScene } from "@/components/producto/ficha-viva-scene";
import { RelatedProducts } from "@/components/producto/related";
import { ConceptTag, SceneNote } from "@/components/producto/scene-frame";
import { pageMetadata } from "@/lib/seo";
import { GUIDE_PHRASE, planById, PRICE_FROM, PRICING_FACTS } from "@/lib/site";

/* Búsqueda principal: «crm para whatsapp». Variantes: «crm de whatsapp», «crm para whatsapp business» (plan §3.2). */

const PATH = "/producto/crm-y-embudos";

export const metadata = pageMetadata({
  title: "CRM para WhatsApp con embudos y agentes de IA",
  description:
    "CRM para WhatsApp con embudos, etapas y agentes de IA: cada prospecto tiene etapa, dueño y siguiente paso, y tu equipo recibe la conversación con historial.",
  path: PATH,
  ownOgImage: true,
});

const basico = planById("basico");
const pro = planById("pro");

const PIPELINES: { name: string; stages: string[] }[] = [
  { name: "Ventas", stages: ["Nuevo", "Respondido", "Calificado", "Cita", "Propuesta", "Ganado"] },
  { name: "Posventa", stages: ["Entregado", "Seguimiento", "Reseña", "Recompra"] },
  { name: "Renovaciones", stages: ["Por vencer", "Contactado", "Propuesta", "Renovado"] },
];

const INDUSTRY_FIELDS: { name: string; href: string; fields: string[] }[] = [
  { name: "Inmobiliarias", href: "/soluciones/inmobiliarias", fields: ["Compra o renta", "Zona", "Presupuesto", "Infonavit, Fovissste o crédito bancario", "Plazo"] },
  { name: "Agencias de autos", href: "/soluciones/agencias-de-autos", fields: ["Modelo", "Contado o crédito", "Enganche", "Auto a cuenta"] },
  { name: "Clínicas estéticas", href: "/soluciones/clinicas-esteticas", fields: ["Tratamiento", "Zona del cuerpo", "Fecha de valoración", "Campaña de origen"] },
];

const FAQS = [
  {
    q: "¿Qué es un CRM para WhatsApp?",
    a: "Es un CRM donde la conversación de WhatsApp es el centro: cada prospecto que escribe queda registrado con su etapa, quién lo atiende y qué sigue. En root, además, tus agentes de IA contestan y califican dentro del mismo CRM.",
  },
  {
    q: "¿Puedo tener más de un embudo?",
    a: "Sí. Puedes armar embudos para distintas partes de tu negocio, como ventas, posventa o renovaciones, cada uno con sus propias etapas.",
  },
  {
    q: "¿Tengo que dejar el CRM que ya uso?",
    a: "No. root se conecta con Salesforce y HubSpot, y también con SAP y Excel. Puedes usar root para la conversación y mandar a tu sistema lo que importa.",
  },
  {
    q: "¿Puedo migrar mis contactos?",
    a: `Sí. ${PRICING_FACTS.start}`,
  },
  {
    q: "¿Qué cambia entre el CRM del plan Básico y el de Pro?",
    a: `Básico (${basico.priceLabel} MXN al mes, ${basico.users}) trae CRM básico y automatizaciones simples. Pro (${pro.priceLabel} MXN al mes, ${pro.users}) trae CRM completo, agentes de IA e integraciones avanzadas.`,
  },
  {
    q: "¿Quién decide en qué etapa pasa un prospecto al equipo?",
    a: "Tú. Durante el arranque definimos contigo en qué momento la conversación pasa a una persona: por ejemplo, cuando el prospecto ya dio presupuesto y zona, o cuando pide hablar con alguien.",
  },
];

const linkClass = "text-ink underline decoration-lime decoration-2 underline-offset-2";

export default function CrmPage() {
  return (
    <>
      <PageHero
        kicker="CRM y embudos"
        title="CRM para WhatsApp donde cada prospecto tiene etapa, dueño y siguiente paso"
        intro="Cada conversación entra a tu embudo. Tu agente de IA la contesta y la califica, tu equipo la cierra y tú ves en qué va todo, sin perseguir a nadie por chat."
        breadcrumbs={[
          { name: "Producto", href: "/producto" },
          { name: "CRM y embudos", href: PATH },
        ]}
        cta="hero-crm"
        note={`${PRICE_FROM} · API oficial de WhatsApp Business · Agentes de IA en Pro y Enterprise`}
        visual={
          <div className="mx-auto w-full max-w-[600px]">
            <FichaVivaScene />
            <SceneNote concept />
          </div>
        }
      />

      <Section tone="gris" labelledBy="ficha-titulo">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <ConceptTag />
            <h2 id="ficha-titulo" className="h-section text-ink mt-4">
              Ficha viva: la conversación llena tu CRM de WhatsApp
            </h2>
            <p className="lead mt-5">
              Mientras tu agente conversa, la ficha del prospecto se llena con lo que importa: presupuesto, zona, fecha, producto o forma de pago. Tu equipo la abre y ya sabe con quién habla.
            </p>
            <CheckList
              className="mt-8"
              items={[
                "Tu agente califica con las preguntas de tu negocio",
                "Lo que responde el prospecto queda en su ficha, no perdido en el chat",
                "Tu vendedor llega a la conversación con el contexto completo",
              ]}
            />
          </div>
          <div className="grid gap-4">
            {INDUSTRY_FIELDS.map((ind) => (
              <Link key={ind.name} href={`${ind.href}/`} className="card card-hover p-5 md:p-6 block">
                <span className="flex items-center justify-between gap-4">
                  <span className="h-card text-lg text-ink">{ind.name}</span>
                  <Icon name="arrow" className="w-4 h-4 text-ink" />
                </span>
                <span className="mt-3 flex flex-wrap gap-2">
                  {ind.fields.map((f) => (
                    <span key={f} className="chip chip-agente">
                      {f}
                    </span>
                  ))}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section id="carriles" labelledBy="carriles-titulo">
        <div className="max-w-3xl mb-10 md:mb-14">
          <ConceptTag />
          <h2 id="carriles-titulo" className="h-section text-ink mt-4">
            Carriles: qué etapas de tu embudo atiende el agente y cuáles tu equipo
          </h2>
          <p className="lead mt-5">
            En cada embudo marcas dónde trabaja tu agente y dónde entra tu equipo. Entre los dos carriles está el relevo: el punto exacto donde la conversación pasa a una persona, con todo el historial. Mueve el relevo y mira cómo cambia.
          </p>
        </div>
        <CarrilesScene />
      </Section>

      <ProductByNextia />

      <Section labelledBy="embudos-titulo">
        <SectionHeader
          id="embudos-titulo"
          kicker="Embudos y etapas"
          title="Embudos de WhatsApp para cada parte de tu negocio"
          intro="Arma un embudo por cada proceso que hoy vive en chats sueltos. Cada etapa tiene un dueño y un siguiente paso."
        />
        <div className="grid gap-4">
          {PIPELINES.map((p) => (
            <div key={p.name} className="card p-5 md:p-6 grid gap-4 md:grid-cols-[10rem_1fr] md:items-center">
              <h3 className="h-card text-lg text-ink">{p.name}</h3>
              <ol className="flex flex-wrap items-center gap-2">
                {p.stages.map((st, i) => (
                  <li key={st} className="flex items-center gap-2">
                    <span className={`chip ${i === p.stages.length - 1 ? "chip-ganado" : ""}`}>{st}</span>
                    {i < p.stages.length - 1 ? <Icon name="chevron-right" className="w-4 h-4 text-muted" /> : null}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <div className="mt-10 card p-6 md:p-8 grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <ConceptTag />
            <h3 className="h-card text-xl text-ink mt-4">Reglas de pase, en lenguaje natural</h3>
            <p className="text-muted mt-2 leading-relaxed">La condición para que un prospecto avance de etapa o pase a tu equipo se escribe como la dirías tú.</p>
          </div>
          <CheckList
            items={["«Pasa a Calificado cuando dio presupuesto y zona.»", "«Pasa a Cita cuando aceptó un horario.»", "«Pasa al equipo si pide hablar con una persona.»"]}
          />
        </div>
      </Section>

      <Section tone="gris" labelledBy="vista-titulo">
        <SectionHeader id="vista-titulo" kicker="Tú ves todo" title="La vista del gerente: todo tu WhatsApp comercial en un tablero" intro={GUIDE_PHRASE} />
        <FeatureGrid
          cols={3}
          items={[
            { icon: "kanban", title: "En qué etapa va cada prospecto", text: "Sin preguntarle a nadie por chat. El embudo te dice quién está nuevo, quién calificado y quién a punto de cerrar." },
            { icon: "users", title: "Quién lo atiende", text: "Cada trato tiene dueño: tu agente o una persona de tu equipo. Si alguien sale, la cartera se queda.", role: "equipo" },
            { icon: "clock", title: "Qué sigue", text: "Cada prospecto tiene un siguiente paso: una cita, una propuesta o un seguimiento programado.", role: "agente" },
          ]}
        />
        <div className="mt-8 card p-6 md:p-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <ConceptTag />
            <p className="text-ink leading-relaxed mt-3">
              Cada mañana, el <strong>Corte de la mañana</strong> te resume lo que hizo tu agente mientras tu equipo no estaba: atendidos, calificados y quién espera a una persona.
            </p>
          </div>
          <LinkButton href="/producto/agentes-de-ia#corte-titulo" label="Ver el Corte de la mañana" />
        </div>
      </Section>

      <Section labelledBy="ya-tienes-titulo">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="kicker">¿Ya tienes CRM?</p>
            <h2 id="ya-tienes-titulo" className="h-section text-ink mt-3">
              root se conecta con tu CRM, no te obliga a cambiarlo
            </h2>
            <p className="lead mt-5">
              Si tu empresa ya trabaja en Salesforce o HubSpot, root atiende la conversación de WhatsApp y manda a tu sistema lo que importa: el lead nuevo, la etapa, la cita, el trato ganado. Con SAP y Excel, igual.
            </p>
            <div className="mt-8">
              <LinkButton href="/producto/integraciones" label="Ver integraciones" variant="dark" />
            </div>
          </div>
          <div className="card p-6 md:p-8">
            <p className="kicker">Se conecta con</p>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {["Salesforce", "HubSpot", "SAP", "Excel"].map((s) => (
                <li key={s} className="rounded-xl border border-line bg-surface-2 px-4 py-3 font-semibold text-ink">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">
              ¿Cuánto cuesta? Mira los{" "}
              <Link href="/precios/" className={linkClass}>
                planes y precios
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <RelatedProducts current={PATH} tone="gris" />

      <Faq items={FAQS} tone="claro" intro="Lo que más nos preguntan del CRM de WhatsApp de root." />

      <CtaBand
        kicker="Que nadie se quede en visto"
        title="Ordena tu WhatsApp comercial en un solo embudo"
        text="Escríbenos por WhatsApp y armamos contigo las etapas, las preguntas y los carriles de tu equipo."
        cta="cta-final-crm"
      />
    </>
  );
}
