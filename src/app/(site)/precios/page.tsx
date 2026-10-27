import { PlanCards, PriceLegend, SoftwareJsonLd } from "@/components/portada-precios-nosotros/planes";
import { SemanaDeArranque } from "@/components/portada-precios-nosotros/semana-de-arranque";
import { Icon } from "@/components/icons";
import { ProductByNextia } from "@/components/product-by-nextia";
import { ComparisonTable, CtaBand, CtaButton, Faq, FeatureGrid, LinkButton, PageHero, Section, SectionHeader, type ComparisonRow, type FaqItem } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { PLANS, PRICING_FACTS } from "@/lib/site";

/*
 * Precios (plan §3.4). Búsqueda principal: «crm para whatsapp precio(s)».
 * Los tres planes tal como están publicados (lib/site › PLANS), qué cambia entre ellos, lo que no cobramos, los
 * mensajes de Meta, D10 y la FAQ de precios. Sin nombrar competidores aquí (plan §3.4, punto 5): las cifras frente
 * a otros van en /comparativas. Pendientes de producto que esta página NO afirma: si el precio lleva IVA (se cita
 * a los Términos), precio por usuario adicional, límite de conversaciones de IA, cuota de implementación y CFDI.
 */

export const metadata = pageMetadata({
  title: "Precios del CRM para WhatsApp con IA, en pesos",
  description:
    "Precios del CRM para WhatsApp de root en pesos: Básico $4,999, Pro $10,599 con agentes de IA y Enterprise a convenir. Mensajes de Meta sin sobreprecio.",
  path: "/precios",
  ownOgImage: true,
});

const [BASICO, PRO, ENTERPRISE] = PLANS;

const ROWS: ComparisonRow[] = [
  { label: "Usuarios", values: { basico: BASICO.users, pro: PRO.users, enterprise: ENTERPRISE.users } },
  { label: "API oficial de WhatsApp Business", note: "Con el número de tu empresa", values: { basico: true, pro: true, enterprise: true } },
  { label: "CRM", values: { basico: "Básico", pro: "Completo", enterprise: "Completo" } },
  { label: "Automatizaciones", values: { basico: "Simples", pro: "Con IA", enterprise: "Con IA" } },
  {
    label: "Agentes de IA",
    note: "Contestan, califican, agendan, dan seguimiento y reactivan",
    values: { basico: false, pro: true, enterprise: true },
  },
  { label: "Integraciones avanzadas", note: "Salesforce, SAP, HubSpot y Excel", values: { basico: false, pro: true, enterprise: true } },
  { label: "IA personalizada", values: { basico: false, pro: false, enterprise: true } },
  { label: "Soporte", values: { basico: "Por correo", pro: "Prioritario", enterprise: "Dedicado 24/7" } },
];

const SIN_LETRA_CHICA = [
  { title: "El trámite de la API", text: "Te ayudamos a dar de alta tu número en la API oficial de WhatsApp Business durante el arranque, sin costo extra.", icon: "shield" },
  { title: "Sobreprecio en mensajes", text: "Los mensajes de WhatsApp los cobra Meta a su tarifa oficial. root no les suma nada.", icon: "chat" },
  { title: "Cancelas cuando quieras", text: "La cancelación aplica al final del periodo que ya pagaste. No hay reembolsos por periodos parciales.", icon: "calendar" },
  { title: "Cambios con aviso", text: "Si un precio cambia, te avisamos con 30 días de anticipación.", icon: "clock" },
];

const FAQS: FaqItem[] = [
  {
    q: "¿Los precios incluyen IVA?",
    a: "Nuestros Términos y condiciones dicen que los precios están expresados en pesos mexicanos e incluyen IVA cuando aplique. Si necesitas el desglose para tu caso, pídelo al asesor por WhatsApp antes de contratar.",
  },
  {
    q: "¿Qué plan me conviene?",
    a: "Básico trae 3 usuarios y es para equipos que quieren ordenar su WhatsApp con la API oficial y un CRM, sin agentes de IA. Pro trae 10 usuarios y es para equipos que quieren que un agente de IA conteste, califique y dé seguimiento. Enterprise es para operaciones grandes que necesitan IA personalizada, más usuarios y soporte dedicado 24/7.",
  },
  {
    q: "¿Qué pasa si necesito más usuarios?",
    a: "Puedes agregar usuarios o subir de plan cuando lo necesites. Escríbenos por WhatsApp y te decimos cuál opción te sale mejor.",
  },
  {
    q: "¿Cuánto cuestan los mensajes de WhatsApp?",
    a: "Los mensajes de WhatsApp se pagan aparte, a la tarifa oficial de Meta, y root no les suma ningún sobreprecio. Meta cobra por mensaje entregado, según su categoría; en la guía de costos de la API te explicamos cómo calcularlo.",
  },
  {
    q: "¿Cómo se cobra?",
    a: "La facturación es mensual y en pesos mexicanos. Puedes cambiar de plan cuando lo necesites.",
  },
  {
    q: "¿Puedo cancelar?",
    a: "Sí, cuando quieras. La cancelación toma efecto al final del periodo de facturación vigente. Como dicen nuestros Términos, no hay reembolsos por periodos parciales.",
  },
  {
    q: "¿Cuánto tarda en estar listo?",
    a: "La mayoría de los equipos opera en menos de una semana. El arranque incluye la configuración, la migración de tus contactos y la integración con tus sistemas, y el trámite de la API va sin costo extra.",
  },
  {
    q: "¿Hay un precio para Enterprise?",
    a: "Enterprise se cotiza según el tamaño de tu operación: usuarios, IA personalizada, integraciones y soporte dedicado 24/7. Escríbenos por WhatsApp y te armamos la propuesta.",
  },
];

export default function PreciosPage() {
  return (
    <>
      <SoftwareJsonLd path="/precios" />

      <PageHero
        breadcrumbs={[{ name: "Precios", href: "/precios" }]}
        kicker="Precios en pesos, sin letra chica"
        title="Precios del CRM para WhatsApp con agentes de IA"
        intro="Tres planes en pesos mexicanos, con facturación mensual. La API oficial de WhatsApp Business viene desde el plan Básico y los agentes de IA, desde Pro."
        ctas={<CtaButton label="Hablar con un asesor" cta="precios-hero" size="lg" />}
        note={PRICING_FACTS.meta}
      />

      {/* Planes */}
      <Section tone="gris" labelledBy="planes-titulo">
        <SectionHeader id="planes-titulo" kicker="Planes" title="Elige el plan de tu equipo" intro="Todos los planes incluyen la API oficial de WhatsApp Business. Sube de plan o agrega usuarios cuando lo necesites." />
        <PlanCards />
        <PriceLegend className="mt-8" />
      </Section>

      {/* Qué cambia entre planes */}
      <Section labelledBy="comparar-titulo">
        <SectionHeader
          id="comparar-titulo"
          kicker="Plan por plan"
          title="Qué cambia entre Básico, Pro y Enterprise"
          intro="La diferencia grande está en la IA: Básico ordena a tu equipo; Pro y Enterprise suman agentes de IA que contestan y califican por ti."
        />
        <ComparisonTable
          caption="Qué incluye cada plan de root"
          firstColLabel="Incluye"
          columns={PLANS.map((p) => ({ key: p.id, label: p.name, sub: p.price === null ? p.priceLabel : `${p.priceLabel} ${p.period}`, highlight: !!p.highlight }))}
          rows={ROWS}
          footnote="Precios mensuales en pesos mexicanos, revisados el 27 de octubre de 2026. Los mensajes de WhatsApp se pagan aparte, a la tarifa oficial de Meta."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/producto/agentes-de-ia" label="Qué hacen los agentes de IA" />
          <LinkButton href="/producto/integraciones" label="Ver integraciones" />
        </div>
      </Section>

      <ProductByNextia />

      {/* Lo que no cobramos + mensajes de Meta */}
      <Section labelledBy="no-cobramos-titulo">
        <SectionHeader
          id="no-cobramos-titulo"
          kicker="Sin letra chica"
          title="Lo que no te cobramos y lo que conviene saber"
          intro="Así se ve el costo completo de root: la mensualidad de tu plan y los mensajes de Meta. Nada escondido entre los dos."
        />
        <FeatureGrid cols={4} items={SIN_LETRA_CHICA.map((n) => ({ title: n.title, text: n.text, icon: n.icon }))} />

        <div className="mt-14 grid gap-8 rounded-[18px] border border-line bg-surface p-7 md:grid-cols-[1.2fr_1fr] md:p-10">
          <div>
            <p className="kicker">Mensajes de WhatsApp</p>
            <h3 className="h-card mt-3 text-2xl text-ink">Cuánto cuesta en total un CRM para WhatsApp</h3>
            <p className="mt-4 leading-relaxed text-muted">
              Tu costo mensual tiene dos partes. La primera es tu plan de root. La segunda son los mensajes de WhatsApp, que Meta cobra por
              mensaje entregado, según su categoría. root los pasa a la tarifa oficial de Meta, sin sumarles nada.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/guias/cuanto-cuesta-la-api-de-whatsapp" label="Cuánto cuesta la API de WhatsApp" />
            </div>
          </div>
          <dl className="flex flex-col gap-3 self-center">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-surface-2 px-5 py-4">
              <dt className="flex items-center gap-2 text-ink">
                <Icon name="tag" className="h-5 w-5 text-muted" />
                Tu plan de root
              </dt>
              <dd className="mono text-ink">desde $4,999</dd>
            </div>
            <div className="text-center font-display text-xl font-bold text-muted" aria-hidden="true">
              +
            </div>
            <div className="flex items-center justify-between gap-4 rounded-xl bg-surface-2 px-5 py-4">
              <dt className="flex items-center gap-2 text-ink">
                <Icon name="chat" className="h-5 w-5 text-muted" />
                Mensajes de Meta
              </dt>
              <dd className="mono text-ink">tarifa oficial</dd>
            </div>
            <p className="text-center text-sm text-muted">Sin sobreprecio de root sobre los mensajes.</p>
          </dl>
        </div>
      </Section>

      {/* D10 */}
      <Section tone="gris" labelledBy="arranque-titulo">
        <SectionHeader
          id="arranque-titulo"
          kicker="Semana de arranque"
          title="Qué pasa después de contratar"
          intro="Te acompañamos desde el trámite de la API hasta el primer mensaje. La mayoría de los equipos opera en menos de una semana."
        />
        <SemanaDeArranque />
      </Section>

      {/* Comparativas (enlaces, sin cifras de terceros en esta página) */}
      <Section labelledBy="comparas-titulo" pad="md">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl">
            <h2 id="comparas-titulo" className="h-section text-ink">
              ¿Lo estás comparando con otras opciones?
            </h2>
            <p className="lead mt-4">
              Revisamos los precios públicos de otras herramientas y los pusimos lado a lado, con enlace a cada fuente y la fecha de revisión.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/comparativas/root-vs-vambe" label="root vs Vambe" />
            <LinkButton href="/comparativas/root-vs-leadsales" label="root vs Leadsales" />
            <LinkButton href="/comparativas" label="Todas las comparativas" variant="ghost" />
          </div>
        </div>
      </Section>

      <Faq items={FAQS} title="Preguntas sobre precios" intro="IVA, usuarios, mensajes de Meta, cobro y cancelación. Si te queda alguna duda, escríbenos por WhatsApp." />

      <CtaBand
        kicker="¿Qué plan te conviene?"
        title="Cuéntanos de tu equipo y te decimos qué plan te conviene"
        text="Dinos cuántas personas atienden WhatsApp, cuántos mensajes te llegan y qué sistemas usas. Te respondemos por el mismo WhatsApp."
        cta="precios-final"
        label="Hablar con un asesor"
        secondary={{ href: "/producto", label: "Conoce el producto" }}
      />
    </>
  );
}
