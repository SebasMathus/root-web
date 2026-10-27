import Link from "next/link";
import { ProductByNextia } from "@/components/product-by-nextia";
import { ComparisonTable, CtaBand, CtaPair, Faq, LinkButton, PageHero, Section, SectionHeader, SourceNote } from "@/components/ui";
import { CostPerUser } from "@/components/comparativas/cost-per-user";
import { VAMBE, ROOT_SRC } from "@/components/comparativas/data";
import { GuidePhraseScene } from "@/components/comparativas/guide-scene";
import { Cited, Ext, HonestSplit, SiblingLinks, Steps, SummaryCard } from "@/components/comparativas/parts";
import { pageMetadata } from "@/lib/seo";
import { COMPETITOR_REVIEW_LABEL, GUIDE_PHRASE, PRICING_FACTS, planById } from "@/lib/site";

const PATH = "/comparativas/root-vs-vambe";

export const metadata = pageMetadata({
  title: "root vs Vambe: precios, IA y arranque en México",
  description:
    "root vs Vambe: compara precio en pesos, IVA, implementación, agentes de IA y arranque para tu equipo de ventas. Datos públicos de octubre de 2026, con fuente.",
  path: PATH,
  ownOgImage: true,
});

const V = VAMBE.src;
const PRO = planById("pro");
const BASICO = planById("basico");

const FAQS = [
  {
    q: "¿Cuánto cuesta root comparado con Vambe?",
    a: `El plan Pro de root, con agentes de IA, cuesta ${PRO.priceLabel} MXN al mes con 10 usuarios. El plan Standard de Vambe cuesta $11,480 MXN al mes más IVA con 6 usuarios y 3,000 conversaciones, según su página de precios revisada el ${COMPETITOR_REVIEW_LABEL}. Por usuario (cálculo nuestro), root Pro sale en $1,059.90 y Vambe Standard en $1,913.33 más IVA.`,
  },
  {
    q: "¿Vambe cobra implementación? ¿Y root?",
    a: "Según su página de precios, Vambe cobra $12,000 MXN de implementación el mes 1 y $6,000 MXN el mes 2, y la mensualidad completa empieza el mes 3. En root te ayudamos a tramitar la API oficial de WhatsApp Business sin costo extra, y la mayoría de los equipos opera en menos de una semana. Si tu caso necesita algo a la medida, te lo decimos antes por WhatsApp.",
  },
  {
    q: "¿Los precios incluyen IVA?",
    a: `Vambe aclara que sus precios en MXN no incluyen IVA. ${PRICING_FACTS.iva}`,
  },
  {
    q: "¿root tiene certificaciones como ISO 27001 o SOC 2?",
    a: "Hoy no publicamos certificaciones. Tratamos tus datos conforme a nuestro aviso de privacidad, que sigue la LFPDPPP, con derechos ARCO y borrado de información. Vambe sí publica ISO 27001 y SOC 2 Type II en su página de seguridad; si tu área de compras los exige, tómalo en cuenta.",
  },
  {
    q: "¿root tiene garantía de resultados?",
    a: `No. Preferimos que veas root con tus propios casos antes de decidir. ${PRICING_FACTS.cancel}`,
  },
  {
    q: "¿Puedo cambiarme de Vambe a root?",
    a: "Sí. Escríbenos por WhatsApp, revisamos tu proceso, conectamos la API oficial de WhatsApp Business y migramos tus contactos. La implementación incluye configuración, migración e integración, y la mayoría de los equipos opera en menos de una semana.",
  },
  {
    q: "¿De dónde salen los datos de Vambe?",
    a: `De sus páginas públicas: vambe.ai, su página de precios, la de plataforma, la de seguridad y su blog. Los revisamos el ${COMPETITOR_REVIEW_LABEL} y cada dato de esta página lleva el enlace a su fuente. Si algo cambió, avísanos por WhatsApp y lo corregimos.`,
  },
];

export default function RootVsVambe() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Comparativas", href: "/comparativas" },
          { name: "root vs Vambe", href: PATH },
        ]}
        kicker="Comparativa"
        title="root vs Vambe: qué cambia para un equipo comercial en México"
        intro="Las dos opciones ponen agentes de IA en tu WhatsApp. La diferencia está en el precio, en cómo arrancas y en quién lleva la venta. Aquí lo tienes lado a lado, con la fuente de cada dato."
        ctas={<CtaPair cta="vs-vambe-hero" secondary={{ href: "/precios", label: "Ver precios de root" }} />}
        note={`Datos de Vambe revisados el ${COMPETITOR_REVIEW_LABEL} en sus páginas públicas.`}
        visual={
          <SummaryCard
            items={[
              {
                label: "Precio",
                role: "root",
                text: (
                  <>
                    root Pro: {PRO.priceLabel} MXN al mes, 10 usuarios, IA incluida. Vambe Standard: $11,480 MXN al mes + IVA, 6 usuarios,
                    más implementación los dos primeros meses (<Ext src={V.pricing}>fuente</Ext>).
                  </>
                ),
              },
              {
                label: "Enfoque",
                role: "root",
                text: (
                  <>
                    En root tu agente contesta y califica, y tu equipo cierra. Vambe se presenta como un sistema de IA que automatiza el
                    flujo comercial completo (<Ext src={V.home}>fuente</Ext>).
                  </>
                ),
              },
              {
                label: "Dónde gana Vambe",
                text: (
                  <>
                    Voz con IA, atribución de pauta con su producto de anuncios (<Ext src={V.ads}>fuente</Ext>), más canales y
                    certificaciones de seguridad publicadas (<Ext src={V.security}>fuente</Ext>).
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
          title="root o Vambe: la comparación completa"
          intro="Lo que dice cada uno en su sitio. En la columna de Vambe, cada dato enlaza a la página de donde sale."
        />
        <ComparisonTable
          caption="Comparación de root y Vambe por tema"
          firstColLabel="Tema"
          columns={[
            { key: "root", label: "root", sub: "CRM de WhatsApp con agentes de IA", highlight: true },
            { key: "vambe", label: "Vambe", sub: `Revisado el ${COMPETITOR_REVIEW_LABEL}` },
          ]}
          rows={[
            {
              label: "Qué es",
              values: {
                root: "CRM de WhatsApp con agentes de IA: el agente atiende y califica, tu equipo cierra.",
                vambe: (
                  <Cited src={V.home}>Se presenta como un sistema de IA proactivo y omnicanal para marketing, venta y posventa.</Cited>
                ),
              },
            },
            {
              label: "Plan con IA",
              values: {
                root: `${PRO.name}: ${PRO.priceLabel} MXN al mes, 10 usuarios.`,
                vambe: <Cited src={V.pricing}>Standard: $11,480 MXN al mes + IVA, 6 usuarios y 3,000 conversaciones.</Cited>,
              },
            },
            {
              label: "Plan de entrada",
              values: {
                root: `${BASICO.name}: ${BASICO.priceLabel} MXN al mes, 3 usuarios y API oficial, sin agentes de IA.`,
                vambe: <Cited src={V.pricing}>Standard es su plan de entrada; trae sus modelos de IA.</Cited>,
              },
            },
            {
              label: "Implementación",
              values: {
                root: "Te ayudamos a tramitar la API oficial sin costo extra. La mayoría opera en menos de una semana.",
                vambe: <Cited src={V.pricing}>$12,000 MXN el mes 1 y $6,000 MXN el mes 2; la mensualidad completa empieza el mes 3.</Cited>,
              },
            },
            {
              label: "IVA",
              values: {
                root: (
                  <span>
                    Nuestros{" "}
                    <Link href={ROOT_SRC.terms.href} className="underline decoration-line underline-offset-2">
                      Términos
                    </Link>{" "}
                    dicen que los precios incluyen IVA cuando aplique.
                  </span>
                ),
                vambe: <Cited src={V.pricing}>Sus precios en MXN no incluyen IVA.</Cited>,
              },
            },
            {
              label: "Mensajes de WhatsApp",
              values: {
                root: "Aparte, a tarifa oficial de Meta, sin sobreprecio.",
                vambe: <Cited src={V.crmBlog}>Aparte del software, según su blog.</Cited>,
              },
            },
            {
              label: "Usuarios extra",
              values: {
                root: "Agregas usuarios o subes de plan cuando lo necesites.",
                vambe: <Cited src={V.pricing}>$1,000 MXN por asiento adicional.</Cited>,
              },
            },
            {
              label: "El agente agenda",
              values: {
                root: "Sí: agenda citas y visitas, da seguimiento y reactiva.",
                vambe: <Cited src={V.tech}>Sí, con su módulo de citas.</Cited>,
              },
            },
            {
              label: "Paso a una persona",
              values: {
                root: "Traspaso al vendedor con el historial completo, en el número de tu empresa.",
                vambe: <Cited src={V.salud}>Tu equipo toma el control de la conversación en tu número.</Cited>,
              },
            },
            {
              label: "Origen de tus prospectos",
              values: {
                root: "Cada prospecto entra con la campaña que lo trajo.",
                vambe: (
                  <Cited src={V.ads}>
                    Más completo: su producto de anuncios manda eventos por etapa a Meta, Google y TikTok y arma audiencias. Cuesta $9,940
                    MXN al mes aparte.
                  </Cited>
                ),
              },
            },
            {
              label: "Canales",
              values: {
                root: "WhatsApp e Instagram. Llamadas desde la plataforma.",
                vambe: (
                  <span>
                    <Cited src={V.pricing}>WhatsApp, Instagram, Facebook, TikTok y webchat, además de voz.</Cited>{" "}
                    <Cited src={V.core}>Presume más de 7 canales.</Cited>
                  </span>
                ),
              },
            },
            {
              label: "Integraciones",
              values: {
                root: "Salesforce, SAP, HubSpot y Excel. Un evento en root dispara una acción en tu CRM o ERP.",
                vambe: (
                  <span>
                    <Cited src={V.core}>Más de 50 integraciones según su página de plataforma.</Cited>{" "}
                    <Cited src={V.api}>Tiene API pública con documentación.</Cited>
                  </span>
                ),
              },
            },
            {
              label: "Seguridad",
              values: {
                root: "Aviso de privacidad conforme a la LFPDPPP. Sin certificaciones publicadas.",
                vambe: <Cited src={V.security}>ISO 27001 y SOC 2 Type II, según su página de seguridad.</Cited>,
              },
            },
            {
              label: "Garantía",
              values: {
                root: "No ofrecemos garantía de resultados. Cancelas al final del periodo.",
                vambe: <Cited src={V.contact}>60 días con devolución; no aplica al plan Standard.</Cited>,
              },
            },
            {
              label: "Dónde están",
              values: {
                root: "Ciudad de México. Hecho por Nextia.",
                vambe: <Cited src={V.llms}>Sede en Chile, con oficina en la Ciudad de México.</Cited>,
              },
            },
          ]}
        />
        <SourceNote className="mt-5" sources={Object.values(V)} />
      </Section>

      <Section labelledBy="precio-titulo">
        <SectionHeader
          id="precio-titulo"
          kicker="Precio"
          title="Precio de root vs Vambe: mensualidad, IVA e implementación"
          intro="Comparamos el plan de cada uno que trae IA. Cambia entre costo por usuario y mensualidad, y mira cómo queda con IVA."
        />
        <CostPerUser only={["vambe"]} id="d8-vambe" />
        <p className="mt-6 text-muted leading-relaxed max-w-3xl">
          Además de la mensualidad, Vambe cobra la implementación en los dos primeros meses, según su{" "}
          <Ext src={V.pricing}>página de precios</Ext>. En root, el trámite de la API oficial va sin costo extra y los mensajes de Meta se
          pagan a tarifa oficial. Para ver qué incluye cada plan de root, revisa los{" "}
          <Link href="/precios/" className="underline decoration-line underline-offset-2 hover:decoration-ink">
            precios de root
          </Link>
          .
        </p>
      </Section>

      <Section tone="gris" labelledBy="enfoque-titulo">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeader
              id="enfoque-titulo"
              kicker="Enfoque"
              title="Agentes de IA que trabajan con tu equipo, no en su lugar"
              className="mb-6 md:mb-8"
            />
            <div className="flex flex-col gap-4 text-ink/85 leading-relaxed text-[17px]">
              <p>
                En su portada, Vambe describe el camino del primer mensaje al cierre como «completamente automático» (
                <Ext src={V.home}>vambe.ai</Ext>). Es una apuesta válida si quieres que la IA lleve casi todo.
              </p>
              <p>
                root parte de otra idea: <strong className="text-ink">{GUIDE_PHRASE}</strong> El agente atiende en segundos y califica con
                las preguntas de tu negocio. Cuando el prospecto está listo, le pasa la conversación al vendedor con el historial completo.
                Tu equipo cierra y tú ves cada etapa del embudo.
              </p>
              <p>Todo pasa por el número de tu empresa: la cartera es tuya, no del vendedor.</p>
            </div>
            <div className="mt-8">
              <LinkButton href="/producto/agentes-de-ia" label="Cómo trabajan los agentes de root" />
            </div>
          </div>
          <GuidePhraseScene className="w-full max-w-[520px] lg:justify-self-end" />
        </div>
      </Section>

      <Section labelledBy="arranque-titulo">
        <SectionHeader
          id="arranque-titulo"
          kicker="Arranque"
          title="Cuánto tardas en arrancar con root y con Vambe"
          intro="El tiempo que pasa entre decidir y tener al agente contestando también cuesta."
        />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card p-6 md:p-8 border-ink/30">
            <p className="kicker text-lime normal-case">root</p>
            <h3 className="h-card text-xl text-ink mt-3">Semana de arranque</h3>
            <p className="mt-3 text-muted leading-relaxed">
              Tramitamos contigo la API oficial de WhatsApp Business sin costo extra, configuramos tus embudos y tu agente, migramos tus
              contactos y conectamos tus sistemas. La mayoría de los equipos opera en menos de una semana.
            </p>
          </div>
          <div className="card p-6 md:p-8">
            <p className="kicker">Vambe</p>
            <h3 className="h-card text-xl text-ink mt-3">Implementación en los meses 1 y 2</h3>
            <p className="mt-3 text-muted leading-relaxed">
              Según su <Ext src={V.pricing}>página de precios</Ext>, la implementación se paga antes de empezar e incluye un periodo de
              ajustes y pruebas. La mensualidad completa empieza el mes 3. Además, ofrece consultoría (
              <Ext src={V.services}>consultoría de Vambe</Ext>).
            </p>
          </div>
        </div>
      </Section>

      <ProductByNextia />

      <Section labelledBy="conviene-titulo">
        <SectionHeader
          id="conviene-titulo"
          kicker="Con honestidad"
          title="Cuándo te conviene Vambe y cuándo root"
          intro="No hay una opción mejor para todos. Esto es lo que vemos en sus páginas públicas y en lo que hacemos nosotros."
        />
        <HonestSplit
          otherName="Vambe"
          other={[
            <>
              Necesitas agentes de voz con IA y telefonía para tu equipo (<Ext src={V.pricing}>precios de Vambe</Ext>).
            </>,
            <>
              Quieres atribución de pauta con eventos por etapa hacia Meta, Google y TikTok, y audiencias armadas con tus ventas (
              <Ext src={V.ads}>Vambe Ads</Ext>).
            </>,
            <>
              Atiendes en muchos canales: Facebook, TikTok y webchat, además de WhatsApp e Instagram (
              <Ext src={V.pricing}>precios de Vambe</Ext>).
            </>,
            <>
              Tu área de compras pide certificaciones como ISO 27001 o SOC 2 (<Ext src={V.security}>seguridad de Vambe</Ext>).
            </>,
            <>
              Prefieres un modelo con consultoría (<Ext src={V.services}>consultoría de Vambe</Ext>) y no te pesa pagar implementación (
              <Ext src={V.pricing}>precios de Vambe</Ext>).
            </>,
          ]}
          root={[
            <>Quieres que el agente haga el trabajo pesado y que tu equipo siga al frente de la venta.</>,
            <>Necesitas 10 usuarios con agentes de IA en el mismo plan, con precio en pesos.</>,
            <>Quieres arrancar en días: la mayoría de los equipos opera en menos de una semana.</>,
            <>Conectas root con Salesforce, SAP, HubSpot o Excel para que cada evento dispare una acción.</>,
            <>Prefieres hablar con alguien en México, por WhatsApp, desde el primer mensaje.</>,
          ]}
        />
      </Section>

      <Section tone="gris" labelledBy="cambio-titulo">
        <SectionHeader
          id="cambio-titulo"
          kicker="Cambio"
          title="Cómo cambiarte de Vambe a root"
          intro="Sin pausar la operación: armamos root mientras tu equipo sigue vendiendo."
        />
        <Steps
          items={[
            {
              title: "Escríbenos por WhatsApp",
              text: "Cuéntanos tu proceso, tus embudos y qué atiende hoy tu IA. Te mostramos root con tus propios casos.",
            },
            { title: "API oficial", text: "Tramitamos o conectamos contigo la API oficial de WhatsApp Business, sin costo extra." },
            {
              title: "Embudos, agente y contactos",
              text: "Configuramos tus etapas y las preguntas para calificar, y migramos tus contactos.",
            },
            { title: "Conecta y arranca", text: "Integramos tus sistemas y tu equipo empieza. La mayoría opera en menos de una semana." },
          ]}
        />
      </Section>

      <Faq items={FAQS} tone="claro" title="Preguntas frecuentes sobre root y Vambe" />

      <Section tone="gris" pad="md" labelledBy="mas-titulo">
        <SectionHeader id="mas-titulo" title="Sigue comparando" className="mb-8 md:mb-10" />
        <SiblingLinks current={PATH} />
      </Section>

      <CtaBand
        cta="vs-vambe-final"
        kicker="Que nadie se quede en visto"
        title="Escríbenos por WhatsApp y te mostramos root con tus propios casos"
        text="Si hoy usas Vambe o lo estás evaluando, te decimos con claridad en qué te conviene cada uno."
      />
    </>
  );
}
