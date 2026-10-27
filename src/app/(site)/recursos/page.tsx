import { JsonLd } from "@/components/json-ld";
import { ProductByNextia } from "@/components/product-by-nextia";
import { CtaBand, FeatureGrid, PageHero, Section, SectionHeader } from "@/components/ui";
import { route } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, PRICE_FROM } from "@/lib/site";

const PATH = "/recursos";
const TITLE = "Recursos para vender por WhatsApp: guías y herramientas";
const DESCRIPTION =
  "Recursos para vender por WhatsApp: guías de la API oficial, el costo de Meta y los agentes de IA, más un generador de link y una calculadora de ventas perdidas.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, ownOgImage: true });

const GUIDES = [
  {
    path: "/guias/whatsapp-business-app-vs-api",
    icon: "phone",
    text: "La app gratuita o la API oficial: uso en equipo, límites, riesgo de bloqueo, costo y cómo pasarte sin perder clientes.",
  },
  {
    path: "/guias/cuanto-cuesta-la-api-de-whatsapp",
    icon: "money",
    text: "Cómo cobra Meta cada mensaje, qué mensajes no se cobran y cómo calcular tu costo en pesos con la tabla oficial.",
  },
  {
    path: "/guias/chatbot-vs-agente-de-ia-vs-crm",
    icon: "bot",
    text: "Qué resuelve un chatbot, un agente de IA y un CRM, y cuándo te conviene tenerlos juntos.",
  },
];

const TOOLS = [
  {
    path: "/herramientas/generador-de-link-de-whatsapp",
    icon: "send",
    text: "Número + mensaje = tu link wa.me listo para copiar, con código para tu sitio. Se arma en tu navegador.",
  },
  {
    path: "/herramientas/calculadora-de-ventas-perdidas",
    icon: "chart",
    text: "Pon tus prospectos, tu tasa de cierre y tu ticket, y ve en pesos lo que dejas en la mesa por contestar tarde.",
  },
];

const label = (path: string) => route(path)?.label ?? path;

export default function Page() {
  const all = [...GUIDES, ...TOOLS];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TITLE,
          description: DESCRIPTION,
          url: absoluteUrl(PATH),
          inLanguage: "es-MX",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: all.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: label(g.path), url: absoluteUrl(g.path) })),
          },
        }}
      />
      <PageHero
        kicker="Recursos"
        title="Recursos para vender por WhatsApp"
        intro="Guías claras y herramientas que puedes usar hoy, sin registrarte. Para equipos comerciales en México que venden por WhatsApp y quieren que nadie se quede en visto."
        breadcrumbs={[{ name: "Recursos", href: PATH }]}
        cta="recursos-hero"
      />

      <Section tone="claro" labelledBy="guias-titulo">
        <SectionHeader
          id="guias-titulo"
          kicker="Guías"
          title="Guías para vender por WhatsApp con la API oficial"
          intro="Lo que necesitas saber antes de decidir: qué versión de WhatsApp usar, cuánto cuesta y qué tipo de automatización te conviene."
        />
        <FeatureGrid items={GUIDES.map((g) => ({ title: label(g.path), text: g.text, href: g.path, icon: g.icon, tag: "Guía" }))} />
      </Section>

      <ProductByNextia />

      <Section tone="claro" labelledBy="herramientas-titulo">
        <SectionHeader
          id="herramientas-titulo"
          kicker="Herramientas"
          title="Herramientas de WhatsApp para tu equipo de ventas"
          intro="Funcionan en tu navegador: no te pedimos registro y no guardamos lo que escribes."
        />
        <FeatureGrid cols={2} items={TOOLS.map((t) => ({ title: label(t.path), text: t.text, href: t.path, icon: t.icon, tag: "Herramienta", role: "agente" as const }))} />
      </Section>

      <Section tone="gris" labelledBy="mas-titulo">
        <SectionHeader id="mas-titulo" kicker="Más de root" title="Sigue explorando" />
        <FeatureGrid
          cols={4}
          items={[
            { title: "Blog", text: "Ideas para vender mejor por WhatsApp: ventas, CRM y agentes de IA.", href: "/blog", icon: "book" },
            { title: "Seguridad y privacidad", text: "Cómo cuidamos tus datos: LFPDPPP, derechos ARCO y borrado de información.", href: "/seguridad-y-privacidad", icon: "shield" },
            { title: "Precios", text: `${PRICE_FROM}. Mensajes de WhatsApp a tarifa oficial de Meta, sin sobreprecio.`, href: "/precios", icon: "tag" },
            { title: "Soporte", text: "Horario, contacto y ayuda para quienes ya usan root.", href: "/docs/soporte", icon: "question" },
          ]}
        />
      </Section>

      <CtaBand
        kicker="Que nadie se quede en visto"
        title="¿Prefieres que te lo expliquemos con tu caso?"
        text="Escríbenos por WhatsApp: te ayudamos a elegir entre la app y la API, a estimar tu costo y a ver qué parte puede atender un agente de root."
        cta="recursos-final"
      />
    </>
  );
}
