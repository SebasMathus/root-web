import { ProductByNextia } from "@/components/product-by-nextia";
import { CheckList, CtaBand, Faq, FeatureGrid, LinkButton, PageHero, PricesButton, Section, SectionHeader } from "@/components/ui";
import { CadenciaScene } from "@/components/producto/cadencia-scene";
import { OrigenScene } from "@/components/producto/origen-scene";
import { RelatedProducts } from "@/components/producto/related";
import { ConceptTag, SceneNote } from "@/components/producto/scene-frame";
import { pageMetadata } from "@/lib/seo";
import { planById, PRICING_FACTS } from "@/lib/site";

/*
 * Búsqueda principal: «respuesta automática whatsapp business» (plan §3.2). Variante del H1: «seguimiento automático por WhatsApp».
 * Fuera de esta página hasta que producto lo confirme: envíos masivos con plantillas (plan §6.2).
 */

const PATH = "/producto/campanas-y-seguimiento";

export const metadata = pageMetadata({
  title: "Respuesta automática y seguimiento en WhatsApp Business",
  description:
    "Respuesta automática en WhatsApp Business que no se queda en el primer mensaje: tu agente da seguimiento, rescata a quien se enfrió y ves qué campaña lo trajo.",
  path: PATH,
  ownOgImage: true,
});

const pro = planById("pro");

const CADENCE = [
  { day: "Día 1", title: "Resuelve dudas", text: "«¿Te quedó alguna duda de la cotización?» El momento en que el interés sigue fresco." },
  { day: "Día 3", title: "Da opciones", text: "Formas de pago, otra fecha, otro modelo. Algo concreto para que la persona conteste." },
  { day: "Día 7", title: "Propone un paso", text: "Una llamada, una visita o un horario con alguien de tu equipo." },
  { day: "Día 30", title: "Retoma", text: "«¿Retomamos?» Y si no hay respuesta, el prospecto pasa a tu lista de rescate." },
];

const FAQS = [
  {
    q: "¿Qué es una respuesta automática en WhatsApp Business?",
    a: `Es un mensaje que sale solo cuando alguien escribe. En root no es un texto fijo: tu agente de IA contesta lo que te preguntaron, califica y da seguimiento. Los agentes vienen en Pro (${pro.priceLabel} MXN al mes) y Enterprise.`,
  },
  {
    q: "¿Cada cuánto escribe el seguimiento?",
    a: "Lo defines con nosotros según tu venta. En root lo pensamos como cadencias: por ejemplo, los días 1, 3, 7 y 30 después de una cotización, con un mensaje distinto en cada uno.",
  },
  {
    q: "¿Qué pasa si el prospecto contesta?",
    a: "La conversación sigue con tu agente o pasa a tu equipo, con todo el historial, para que quien conteste sepa qué se le ofreció.",
  },
  {
    q: "¿Puedo reactivar a clientes de antes?",
    a: "Sí. Tu agente puede retomar a quien dejó de contestar y a clientes que ya te compraron, para una recompra, una renovación o un servicio de seguimiento.",
  },
  {
    q: "¿Cómo sé qué campaña trajo a cada prospecto?",
    a: "Una etiqueta en tu sitio registra visitas y formularios, y cada prospecto entra a root como trato con la campaña que lo trajo. Después exportas tratos y conversiones para calcular tu costo por venta.",
  },
  {
    q: "¿Los mensajes de seguimiento cuestan aparte?",
    a: `Después de 24 horas sin mensajes del cliente, WhatsApp pide usar plantillas aprobadas por Meta, que Meta cobra por mensaje. ${PRICING_FACTS.meta}`,
  },
];

export default function CampanasPage() {
  return (
    <>
      <PageHero
        kicker="Campañas y seguimiento"
        title="Respuesta automática y seguimiento en WhatsApp Business para que ningún prospecto se enfríe"
        intro="Una venta no siempre se pierde por un «no»: muchas veces se pierde por un silencio. Tu agente responde al instante, vuelve a escribir cuando toca y rescata a quien dejó de contestar. Y sabes qué campaña trajo a cada uno."
        breadcrumbs={[
          { name: "Producto", href: "/producto" },
          { name: "Campañas y seguimiento", href: PATH },
        ]}
        cta="hero-seguimiento"
        note="Seguimiento con agentes de IA en Pro y Enterprise · Mensajes de Meta a tarifa oficial, sin sobreprecio"
        visual={
          <div className="mx-auto w-full max-w-[520px]">
            <CadenciaScene reveal={false} />
          </div>
        }
      />

      <Section tone="gris" labelledBy="cadencias-titulo">
        <div className="max-w-3xl mb-10 md:mb-14">
          <ConceptTag />
          <h2 id="cadencias-titulo" className="h-section text-ink mt-4">
            Cadencias de seguimiento automático por WhatsApp
          </h2>
          <p className="lead mt-5">
            Una cadencia es una secuencia de mensajes con días y horarios: por ejemplo, los días 1, 3, 7 y 30 después de una cotización. Si el prospecto contesta, el seguimiento se detiene y la conversación sigue con tu agente o con tu equipo.
          </p>
        </div>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CADENCE.map((c) => (
            <li key={c.day} className="card p-6 flex flex-col gap-3">
              <span className="mono text-sm text-lime">{c.day}</span>
              <h3 className="h-card text-lg text-ink">{c.title}</h3>
              <p className="text-muted leading-relaxed">{c.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-muted max-w-3xl">
          Los días son un ejemplo: cada negocio tiene su ritmo. Después de 24 horas sin mensajes del cliente, WhatsApp pide plantillas aprobadas por Meta; se pagan a la tarifa oficial de Meta, sin sobreprecio de root.
        </p>
      </Section>

      <Section labelledBy="rescate-titulo">
        <SectionHeader
          id="rescate-titulo"
          kicker="Rescate"
          title="Rescate: reactiva por WhatsApp a quien dejó de contestar"
          intro="Tu base de contactos ya te costó. Tu agente retoma a quien se quedó a medias y a quien te compró antes, para que esos chats vuelvan a vender."
        />
        <FeatureGrid
          cols={3}
          items={[
            { icon: "chat", title: "Prospectos que se quedaron en visto", text: "Preguntaron, les contestaste y ya no respondieron. Tu agente vuelve a escribir con algo nuevo que decir.", role: "alerta" },
            { icon: "file", title: "Cotizaciones sin respuesta", text: "El presupuesto se envió y nadie le dio seguimiento. Ahora cada cotización tiene su siguiente paso.", role: "agente" },
            { icon: "repeat", title: "Clientes de antes", text: "Recompra, renovación, mantenimiento o el siguiente servicio: tu agente retoma la conversación en el momento indicado.", role: "ganado" },
          ]}
        />
      </Section>

      <ProductByNextia />

      <Section labelledBy="origen-titulo">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="kicker">Origen del trato</p>
            <h2 id="origen-titulo" className="h-section text-ink mt-3">
              Origen del trato: sabes qué campaña te trae ventas
            </h2>
            <p className="lead mt-5">
              Una etiqueta en tu sitio registra visitas y formularios. Cada prospecto entra a root como trato con la campaña que lo trajo, y al final del mes exportas tratos y conversiones para calcular tu costo por venta.
            </p>
            <CheckList
              className="mt-8"
              items={["Cada trato con su campaña de origen", "Prospectos y tratos ganados por campaña", "Exporta tratos y conversiones para calcular tu costo por venta"]}
            />
          </div>
          <div className="mx-auto w-full max-w-[520px]">
            <OrigenScene />
            <SceneNote />
          </div>
        </div>
      </Section>

      <Section tone="gris" labelledBy="costos-titulo">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="kicker">Costos de Meta</p>
            <h2 id="costos-titulo" className="h-section text-ink mt-3">
              Cuánto cuestan los mensajes de seguimiento en WhatsApp
            </h2>
            <p className="lead mt-5">
              La tarifa de los mensajes la pone Meta y depende del tipo de mensaje y del país. {PRICING_FACTS.meta}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/guias/cuanto-cuesta-la-api-de-whatsapp" label="Cuánto cuesta la API de WhatsApp" />
              <PricesButton />
            </div>
          </div>
          <div className="card p-6 md:p-8">
            <p className="kicker">Lo que no cobramos</p>
            <CheckList className="mt-4" items={["Sobreprecio en los mensajes de Meta", "El trámite de la API oficial de WhatsApp Business"]} />
          </div>
        </div>
      </Section>

      <RelatedProducts current={PATH} />

      <Faq items={FAQS} intro="Lo que más nos preguntan del seguimiento automático y las campañas." />

      <CtaBand
        kicker="Que nadie se quede en visto"
        title="Haz que cada prospecto tenga su siguiente mensaje"
        text="Escríbenos por WhatsApp y armamos contigo la primera cadencia de seguimiento de tu equipo."
        cta="cta-final-seguimiento"
      />
    </>
  );
}
