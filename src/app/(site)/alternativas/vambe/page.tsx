import { ProductByNextia } from "@/components/product-by-nextia";
import { CtaBand, CtaButton, CtaPair, Faq, PageHero, Section, SectionHeader, SourceNote } from "@/components/ui";
import { LEADSALES, VAMBE } from "@/components/comparativas/data";
import { AlternativeCard, Cited, Ext, HonestSplit, SiblingLinks } from "@/components/comparativas/parts";
import { pageMetadata } from "@/lib/seo";
import { COMPETITOR_REVIEW_LABEL, planById } from "@/lib/site";

const PATH = "/alternativas/vambe";

export const metadata = pageMetadata({
  title: "Alternativas a Vambe para vender por WhatsApp",
  description:
    "Alternativas a Vambe en México: root, Leadsales y la app de WhatsApp Business, comparados en precio en pesos, IA y arranque. Datos públicos de octubre de 2026.",
  path: PATH,
  ownOgImage: true,
});

const V = VAMBE.src;
const L = LEADSALES.src;
const PRO = planById("pro");

const FAQS = [
  {
    q: "¿Cuál es la mejor alternativa a Vambe en México?",
    a: "Depende de lo que busques. Si quieres agentes de IA incluidos, precio en pesos y que tu equipo siga al frente de la venta, root. Si buscas el precio de entrada más bajo y la IA puede ser un complemento, Leadsales. Si eres una o dos personas y aún no necesitas IA ni embudos, la app de WhatsApp Business.",
  },
  {
    q: "¿Hay alternativas a Vambe más baratas?",
    a: `Sí. Con precios públicos revisados el ${COMPETITOR_REVIEW_LABEL}, Vambe Standard cuesta $11,480 MXN al mes más IVA con 6 usuarios, más implementación los dos primeros meses. root Pro cuesta ${PRO.priceLabel} MXN al mes con 10 usuarios y agentes de IA. Leadsales Profesional con su agente Starter suma $5,359.20 MXN al mes con 4 usuarios.`,
  },
  {
    q: "¿Puedo pasar mis contactos de Vambe a root?",
    a: "Sí. La implementación de root incluye configuración, migración de contactos e integración con tus sistemas, y te ayudamos con la API oficial de WhatsApp Business sin costo extra. La mayoría de los equipos opera en menos de una semana.",
  },
  {
    q: "¿Qué hace Vambe mejor que root?",
    a: "Según sus páginas públicas, Vambe tiene agentes de voz con IA y telefonía, atribución de pauta con eventos hacia Meta, Google y TikTok, más canales y certificaciones ISO 27001 y SOC 2 Type II. Si eso es lo que más pesa para ti, Vambe es una buena opción.",
  },
];

export default function AlternativasVambe() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Comparativas", href: "/comparativas" },
          { name: "Alternativas a Vambe", href: PATH },
        ]}
        kicker="Alternativas"
        title="Alternativas a Vambe para equipos comerciales en México"
        intro="Si estás evaluando Vambe o pensando en cambiarte, aquí tienes tres opciones con precio en pesos y la fuente de cada dato. Ponemos root primero porque es lo nuestro, y te decimos también cuándo quedarte con Vambe."
        ctas={<CtaPair cta="alt-vambe-hero" secondary={{ href: "/comparativas/root-vs-vambe", label: "Ver root vs Vambe" }} />}
        note={`Datos de competidores revisados el ${COMPETITOR_REVIEW_LABEL}.`}
      />

      <Section tone="gris" labelledBy="pesa-titulo">
        <SectionHeader
          id="pesa-titulo"
          kicker="Antes de decidir"
          title="Qué revisar al buscar una alternativa a Vambe"
          intro="Tres datos de su página de precios que conviene poner junto a cualquier otra opción."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              t: "La implementación",
              d: <Cited src={V.pricing}>$12,000 MXN el mes 1 y $6,000 MXN el mes 2; la mensualidad completa empieza el mes 3.</Cited>,
            },
            {
              t: "El IVA",
              d: (
                <>
                  <Cited src={V.pricing}>Sus precios en MXN no incluyen IVA.</Cited> Con IVA, Standard queda en $13,316.80 MXN al mes
                  (cálculo nuestro: $11,480 × 1.16).
                </>
              ),
            },
            { t: "Los usuarios", d: <Cited src={V.pricing}>Standard trae 6 usuarios; cada asiento adicional cuesta $1,000 MXN.</Cited> },
          ].map((c) => (
            <article key={c.t} className="card p-6 flex flex-col gap-3">
              <h3 className="h-card text-lg text-ink">{c.t}</h3>
              <p className="text-muted leading-relaxed">{c.d}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section labelledBy="opciones-titulo">
        <SectionHeader id="opciones-titulo" kicker="Tres opciones" title="Tres alternativas a Vambe en México" />
        <div className="grid gap-5 lg:grid-cols-3">
          <AlternativeCard
            rank={1}
            highlight
            name="root"
            forWho="Para equipos que quieren agentes de IA incluidos y seguir al frente de la venta."
            points={[
              `${PRO.name}: ${PRO.priceLabel} MXN al mes con 10 usuarios y agentes de IA.`,
              "Los agentes contestan, califican, agendan, dan seguimiento y reactivan, desde el número de tu empresa.",
              "Traspaso al vendedor con el historial completo.",
              "Se conecta con Salesforce, SAP, HubSpot y Excel.",
              "La mayoría de los equipos opera en menos de una semana.",
            ]}
            cta={<CtaButton cta="alt-vambe-root" size="sm" />}
            links={[{ href: "/comparativas/root-vs-vambe", label: "root vs Vambe" }]}
          />
          <AlternativeCard
            rank={2}
            name="Leadsales"
            forWho="Para equipos chicos que buscan el precio de entrada más bajo."
            points={[
              <Cited key="a" src={L.pricing}>
                Básico: $2,362.92 MXN al mes con IVA, 3 usuarios, sin API oficial.
              </Cited>,
              <Cited key="b" src={L.pricing}>
                Profesional: $3,239.88 MXN al mes con API oficial y 4 usuarios.
              </Cited>,
              <Cited key="c" src={L.consumption}>
                Su agente de IA se paga aparte, desde $2,119.32 MXN al mes, y se pausa al llegar al 100 % de consumo.
              </Cited>,
              <Cited key="d" src={L.pricing}>
                Prueba de 14 días.
              </Cited>,
            ]}
            links={[{ href: "/comparativas/root-vs-leadsales", label: "root vs Leadsales" }]}
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
        <SourceNote className="mt-6" sources={[V.pricing, V.ads, V.security, L.pricing, L.consumption]} />
      </Section>

      <ProductByNextia />

      <Section labelledBy="quedarte-titulo">
        <SectionHeader
          id="quedarte-titulo"
          kicker="Con honestidad"
          title="Cuándo quedarte con Vambe"
          intro="Cambiar no siempre conviene. Esto es lo que Vambe hace bien, según sus páginas públicas."
        />
        <HonestSplit
          otherName="Vambe"
          other={[
            <>
              Usas agentes de voz con IA o telefonía (<Ext src={V.pricing}>precios de Vambe</Ext>).
            </>,
            <>
              Mides tu pauta con eventos por etapa hacia Meta, Google y TikTok (<Ext src={V.ads}>Vambe Ads</Ext>).
            </>,
            <>
              Atiendes en Facebook, TikTok y webchat, además de WhatsApp e Instagram (<Ext src={V.pricing}>precios de Vambe</Ext>).
            </>,
            <>
              Tu área de compras pide ISO 27001 o SOC 2 (<Ext src={V.security}>seguridad de Vambe</Ext>).
            </>,
          ]}
          root={[
            <>Quieres precio en pesos y 10 usuarios con agentes de IA en el mismo plan.</>,
            <>Quieres arrancar en días: la mayoría de los equipos opera en menos de una semana.</>,
            <>Quieres que el agente atienda y califique, y que tu equipo cierre.</>,
            <>Conectas tu operación con SAP, Salesforce, HubSpot o Excel.</>,
          ]}
        />
      </Section>

      <Faq items={FAQS} title="Preguntas frecuentes sobre alternativas a Vambe" />

      <Section pad="md" labelledBy="mas-titulo">
        <SectionHeader id="mas-titulo" title="Sigue comparando" className="mb-8 md:mb-10" />
        <SiblingLinks current={PATH} />
      </Section>

      <CtaBand
        cta="alt-vambe-final"
        kicker="Que nadie se quede en visto"
        title="Escríbenos por WhatsApp y te mostramos root con tus propios casos"
        text="Te decimos con claridad si root te conviene más que Vambe, o si no."
      />
    </>
  );
}
