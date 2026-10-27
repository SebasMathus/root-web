import Link from "next/link";
import { ProductByNextia } from "@/components/product-by-nextia";
import { CheckList, CtaBand, Faq, FeatureGrid, LinkButton, PageHero, Section, SectionHeader } from "@/components/ui";
import { Icon } from "@/components/icons";
import { BandejaScene } from "@/components/producto/bandeja-scene";
import { LineaEmpresaScene } from "@/components/producto/linea-empresa-scene";
import { RelatedProducts } from "@/components/producto/related";
import { RelevoNote } from "@/components/producto/relevo-note";
import { SceneNote } from "@/components/producto/scene-frame";
import { pageMetadata } from "@/lib/seo";
import { planById, PRICING_FACTS } from "@/lib/site";

/* Búsqueda principal: «whatsapp business api». Variantes: «api whatsapp», «whatsapp multiagente», «api oficial de whatsapp» (plan §3.2). */

const PATH = "/producto/bandeja-de-whatsapp";

export const metadata = pageMetadata({
  title: "Bandeja de WhatsApp Business API para tu equipo",
  description:
    "WhatsApp Business API oficial con una bandeja compartida: tu equipo y tus agentes de IA atienden juntos desde el número de tu empresa. La cartera es tuya.",
  path: PATH,
  ownOgImage: true,
});

const basico = planById("basico");
const pro = planById("pro");

const FAQS = [
  {
    q: "¿Puedo usar el número de mi empresa?",
    a: `Sí: las conversaciones van en un número de tu empresa conectado a la API oficial de WhatsApp Business. Si ese número hoy vive en la app de WhatsApp Business, lo revisamos contigo durante el trámite con Meta. ${PRICING_FACTS.api}`,
  },
  {
    q: "¿Cuántos usuarios incluye cada plan?",
    a: `Básico incluye ${basico.users}, Pro ${pro.users} y Enterprise usuarios a la medida de tu operación. ${PRICING_FACTS.users}`,
  },
  {
    q: "¿Necesito la API oficial de WhatsApp Business?",
    a: `Sí. root usa la API oficial de Meta desde el plan Básico. ${PRICING_FACTS.api}`,
  },
  { q: "¿Los mensajes de WhatsApp cuestan aparte?", a: PRICING_FACTS.meta },
  {
    q: "¿Qué pasa con las conversaciones si alguien deja el equipo?",
    a: "Se quedan en la bandeja de tu empresa, con todo su historial. Las reasignas a otra persona del equipo y nadie empieza de cero.",
  },
  {
    q: "¿Puedo atender Instagram desde root?",
    a: "Sí. Los mensajes de Instagram llegan a la misma bandeja que WhatsApp, para que tu equipo atienda todo desde un solo lugar.",
  },
  {
    q: "¿Los agentes de IA vienen en todos los planes?",
    a: `No: los agentes de IA vienen en Pro y Enterprise. El plan Básico (${basico.priceLabel} MXN al mes) incluye la bandeja compartida, la API oficial y el CRM.`,
  },
];

const linkClass = "text-ink underline decoration-lime decoration-2 underline-offset-2";

export default function BandejaPage() {
  return (
    <>
      <PageHero
        kicker="Bandeja de WhatsApp · API oficial"
        title="Bandeja de WhatsApp Business API para todo tu equipo, en el número de tu empresa"
        intro="Tus vendedores y tus agentes de IA atienden juntos, desde el mismo número. Cada conversación dice quién la lleva y qué sigue, y la cartera se queda en tu empresa."
        breadcrumbs={[
          { name: "Producto", href: "/producto" },
          { name: "Bandeja de WhatsApp", href: PATH },
        ]}
        cta="hero-bandeja"
        note="API oficial de WhatsApp Business desde el plan Básico · WhatsApp e Instagram en la misma bandeja"
        visual={
          <div className="mx-auto w-full max-w-[540px]">
            <BandejaScene />
            <SceneNote />
          </div>
        }
      />

      <Section tone="gris" labelledBy="multiagente-titulo">
        <SectionHeader
          id="multiagente-titulo"
          kicker="Bandeja compartida"
          title="WhatsApp multiagente: tu equipo y tus agentes en la misma bandeja"
          intro="Se acabó el «¿quién le contestó a este cliente?». Todas las conversaciones del negocio en un lugar, con dueño y con historial."
        />
        <FeatureGrid
          cols={2}
          items={[
            { icon: "users", title: "Quién atiende qué", text: "Cada conversación dice si la lleva tu agente o alguien de tu equipo, así todos saben quién sigue.", role: "equipo" },
            { icon: "chat", title: "Historial completo", text: "Lo que se habló, lo que se respondió y lo que sigue. Quien retoma la conversación no empieza de cero." },
            {
              icon: "kanban",
              title: "Contactos y seguimientos juntos",
              text: (
                <>
                  Contactos, conversaciones y seguimientos en el mismo lugar, conectados con tus{" "}
                  <Link href="/producto/crm-y-embudos/" className={linkClass}>
                    embudos del CRM
                  </Link>
                  .
                </>
              ),
            },
            { icon: "user", title: "Usuarios por plan", text: `${basico.users} en Básico, ${pro.users} en Pro y a la medida en Enterprise. ${PRICING_FACTS.users}` },
          ]}
        />
      </Section>

      <Section labelledBy="linea-titulo">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="kicker">Línea de empresa</p>
            <h2 id="linea-titulo" className="h-section text-ink mt-3">
              La cartera es tuya, no del vendedor
            </h2>
            <p className="lead mt-5">
              Con root, todas las conversaciones pasan por el número de tu empresa. Si alguien deja el equipo, sus prospectos se quedan en la bandeja con su historial y los reasignas a otra persona.
            </p>
            <CheckList
              className="mt-8"
              items={["Un número de empresa para todo el equipo", "Sin chats de trabajo en celulares personales", "El historial se queda aunque cambie el equipo"]}
            />
          </div>
          <div className="mx-auto w-full max-w-[560px]">
            <LineaEmpresaScene />
            <SceneNote />
          </div>
        </div>
      </Section>

      <ProductByNextia />

      <Section labelledBy="relevo-bandeja-titulo">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="mx-auto w-full max-w-[520px] lg:order-2">
            <RelevoNote />
            <SceneNote concept>El traspaso con historial ya está; la nota de relevo es cómo trabaja root.</SceneNote>
          </div>
          <div className="lg:order-1">
            <p className="kicker">Relevo</p>
            <h2 id="relevo-bandeja-titulo" className="h-section text-ink mt-3">
              Del agente a tu vendedor, sin perder el hilo
            </h2>
            <p className="lead mt-5">
              Cuando una conversación necesita a una persona, tu agente se la pasa a tu equipo dentro de la misma bandeja, con todo el historial. El vendedor llega sabiendo quién es, qué quiere y qué ya se respondió.
            </p>
            <p className="mt-6 text-muted leading-relaxed">
              Así se reparte el trabajo: tu agente contesta y califica, tu equipo cierra. Conoce las{" "}
              <Link href="/producto/agentes-de-ia/" className={linkClass}>
                habilidades de tu agente de IA
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section tone="gris" labelledBy="api-titulo">
        <SectionHeader
          id="api-titulo"
          kicker="API oficial de WhatsApp"
          title="API oficial de WhatsApp Business desde el plan Básico"
          intro="La app de WhatsApp Business funciona para un negocio que contesta desde un teléfono. Cuando atienden varias personas, con agentes de IA y un CRM, lo que se usa es la API oficial de Meta. root la trae en todos los planes."
        />
        <FeatureGrid
          cols={3}
          items={[
            { icon: "file", title: "Te ayudamos a tramitarla", text: PRICING_FACTS.api },
            { icon: "money", title: "Mensajes a tarifa oficial", text: PRICING_FACTS.meta },
            { icon: "phone", title: "El número de tu empresa", text: "Tu equipo y tus agentes conversan desde el número del negocio, no desde celulares personales." },
          ]}
        />
        <div className="mt-10 flex flex-wrap gap-3">
          <LinkButton href="/guias/whatsapp-business-app-vs-api" label="WhatsApp Business App o API" />
          <LinkButton href="/guias/cuanto-cuesta-la-api-de-whatsapp" label="Cuánto cuesta la API de WhatsApp" />
        </div>
      </Section>

      <Section labelledBy="canales-titulo">
        <SectionHeader id="canales-titulo" kicker="Más canales" title="Instagram y llamadas, en el mismo lugar" />
        <div className="grid gap-5 md:grid-cols-2">
          <article className="card p-6 md:p-8 flex flex-col gap-3">
            <span className="w-11 h-11 rounded-xl grid place-items-center bg-ink text-paper">
              <Icon name="instagram" className="w-5 h-5" />
            </span>
            <h3 className="h-card text-xl text-ink">Instagram en la misma bandeja</h3>
            <p className="text-muted leading-relaxed">Los mensajes de Instagram llegan junto con los de WhatsApp. Tu equipo atiende todo desde un solo lugar.</p>
          </article>
          <article className="card p-6 md:p-8 flex flex-col gap-3">
            <span className="w-11 h-11 rounded-xl grid place-items-center bg-ink text-paper">
              <Icon name="phone" className="w-5 h-5" />
            </span>
            <h3 className="h-card text-xl text-ink">Llamadas desde root</h3>
            <p className="text-muted leading-relaxed">Haz y recibe llamadas desde la plataforma, sin cambiar de herramienta. Pregúntanos por WhatsApp cómo funcionaría en tu operación.</p>
          </article>
        </div>
      </Section>

      <RelatedProducts current={PATH} tone="gris" />

      <Faq items={FAQS} tone="claro" intro="Lo que más nos preguntan de la bandeja y la API oficial de WhatsApp." />

      <CtaBand
        kicker="Que nadie se quede en visto"
        title="Pon a todo tu equipo en el número de tu empresa"
        text="Escríbenos por WhatsApp: te ayudamos con el trámite de la API oficial y con el arranque de tu bandeja."
        cta="cta-final-bandeja"
        secondary={{ href: "/precios", label: "Ver planes" }}
      />
    </>
  );
}
