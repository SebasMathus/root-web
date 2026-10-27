import Link from "next/link";
import { ProductByNextia } from "@/components/product-by-nextia";
import { ArticleJsonLd, Callout, GuideByline, GuideToc, META_PRICING_SOURCES, META_REVIEW_LABEL, OfficialSources, RELATED, RelatedLinks } from "@/components/recursos/guide";
import { ServiceWindowDiagram } from "@/components/recursos/scenes";
import { CheckList, ComparisonTable, Container, CtaBand, Faq, LinkButton, PageHero, Prose, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { planById, PLANS, PRICING_FACTS } from "@/lib/site";

const PATH = "/guias/cuanto-cuesta-la-api-de-whatsapp";
const TITLE = "Cuánto cuesta la API de WhatsApp en México";
const DESCRIPTION =
  "Cuánto cuesta la API de WhatsApp en México: cómo cobra Meta cada mensaje, qué mensajes no se cobran y cómo calcular tu costo en pesos con la tabla oficial.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, type: "article", publishedTime: "2026-10-27", ownOgImage: true });

const basico = planById("basico");
const META_DOCS = META_PRICING_SOURCES[0].href;
const META_RATES = META_PRICING_SOURCES[1].href;

const TOC = [
  { id: "lo-corto", label: "Lo corto: qué pagas" },
  { id: "como-cobra-meta", label: "Cómo cobra Meta: por mensaje" },
  { id: "que-es-gratis", label: "Qué mensajes no se cobran" },
  { id: "de-que-depende", label: "De qué depende la tarifa" },
  { id: "como-calcular", label: "Cómo calcular tu costo en pesos" },
  { id: "que-cobra-root", label: "Qué cobra root y qué no" },
  { id: "gastar-menos", label: "Cómo gastar menos sin vender menos" },
];

const FAQ = [
  {
    q: "¿Cuánto cuesta un mensaje de WhatsApp Business en México?",
    a: "Depende de la categoría del mensaje (marketing, utilidad, autenticación o servicio) y del país del número que lo recibe: a los números de México se les aplica la tarifa de México. Meta publica la tarifa de cada categoría en su tabla oficial, también en pesos mexicanos. No copiamos los montos aquí porque Meta los actualiza; consulta siempre la tabla vigente.",
  },
  {
    q: "¿Me cobran los mensajes que me mandan mis clientes?",
    a: "No. Según Meta, los mensajes que tus clientes te envían no tienen costo. Lo que se cobra son los mensajes que tu empresa entrega, según su categoría.",
  },
  {
    q: "¿root le suma algo a la tarifa de Meta?",
    a: "No. En root los mensajes de WhatsApp se pagan a la tarifa oficial de Meta, sin sobreprecio. Lo que pagas a root es tu plan mensual.",
  },
  {
    q: "¿Qué pasa si contesto después de 24 horas?",
    a: "La ventana de atención ya se cerró. Para volver a escribirle a ese cliente necesitas una plantilla aprobada por Meta, que se cobra por mensaje entregado según su categoría.",
  },
  {
    q: "¿Cuesta algo conectarme a la API?",
    a: "Con root, no: te ayudamos a tramitar la API oficial de WhatsApp Business durante el arranque, sin costo extra. Lo que sí se paga es tu plan y los mensajes que Meta cobra.",
  },
  {
    q: "¿Cuál es el plan más económico de root con la API?",
    a: `El plan ${basico.name}: ${basico.priceLabel} MXN al mes, con ${basico.users} y la API oficial incluida. Los agentes de IA vienen en los planes Pro y Enterprise.`,
  },
];

function CostCard() {
  return (
    <div className="card shadow-[var(--shadow)] p-5 md:p-7">
      <p className="kicker">Tu costo mensual con la API</p>
      <div className="mt-5 grid gap-3">
        <div className="rounded-2xl border border-line bg-surface-2 p-4">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-display font-bold text-ink">Software</p>
            <p className="mono text-ink">desde {basico.priceLabel}</p>
          </div>
          <p className="mt-1 text-sm text-muted">Tu plan de root, en MXN al mes. Bandeja, CRM y, desde Pro, agentes de IA.</p>
        </div>
        <p className="text-center mono text-muted" aria-hidden="true">
          +
        </p>
        <div className="rounded-2xl border border-line bg-surface-2 p-4">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-display font-bold text-ink">Mensajes</p>
            <p className="mono text-ink">tarifa de Meta</p>
          </div>
          <p className="mt-1 text-sm text-muted">Por mensaje entregado, según categoría y país. Sin sobreprecio de root.</p>
        </div>
        <p className="text-center mono text-muted" aria-hidden="true">
          =
        </p>
        <div className="rounded-2xl bg-lime-soft p-4">
          <p className="font-display font-bold text-ink">Lo que pagas al mes</p>
          <p className="mt-1 text-sm text-ink/80">Sin cuota por tramitar la API. Facturación mensual en pesos.</p>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <ArticleJsonLd title={TITLE} description={DESCRIPTION} path={PATH} />
      <PageHero
        kicker="Guía · Costos de Meta"
        title={TITLE}
        intro="Usar la API de WhatsApp tiene dos costos: los mensajes, que cobra Meta, y la plataforma desde la que atiendes. Aquí te explicamos cómo cobra Meta, qué es gratis y cómo sacar tu número en pesos sin adivinar."
        breadcrumbs={[
          { name: "Recursos", href: "/recursos" },
          { name: "Cuánto cuesta la API de WhatsApp", href: PATH },
        ]}
        cta="guia-costo-api-hero"
        note={<GuideByline minutes={8} />}
        visual={<CostCard />}
      />

      <Section tone="claro">
        <Container size="narrow" className="px-0!">
          <Prose>
            <GuideToc items={TOC} />

            <h2 id="lo-corto">Lo corto: qué pagas</h2>
            <ul>
              <li>
                <strong>Los mensajes.</strong> Meta cobra por cada mensaje que tu empresa entrega, según su categoría y el país de tu cliente. Los mensajes que tus
                clientes te mandan no se cobran.
              </li>
              <li>
                <strong>La plataforma.</strong> La API no trae una app para tu equipo: necesitas un software encima. En root, desde {basico.priceLabel} MXN al mes.
              </li>
              <li>
                <strong>Lo que no se ve.</strong> El tiempo de tu equipo y los prospectos que se enfrían porque nadie contestó a tiempo. Para ese número, usa la{" "}
                <Link href="/herramientas/calculadora-de-ventas-perdidas/">calculadora de ventas perdidas</Link>.
              </li>
            </ul>

            <h2 id="como-cobra-meta">Cómo cobra Meta: por mensaje, no por conversación</h2>
            <p>
              Desde el 1 de julio de 2025, Meta cobra la plataforma de WhatsApp Business <strong>por mensaje entregado</strong>; antes cobraba por conversación de 24
              horas. Si un mensaje no llega, no se cobra. Cada mensaje cae en una de cuatro categorías:
            </p>
            <ul>
              <li>
                <strong>Marketing.</strong> Promociones, lanzamientos, invitaciones a eventos, recordatorios de carrito o mensajes para reactivar a alguien.
              </li>
              <li>
                <strong>Utilidad.</strong> Información sobre algo que el cliente ya pidió: confirmación de cita, aviso de envío, cambio de horario, estado de un trámite.
              </li>
              <li>
                <strong>Autenticación.</strong> Códigos de un solo uso para verificar una cuenta o iniciar sesión.
              </li>
              <li>
                <strong>Servicio.</strong> Tus respuestas libres, sin plantilla, dentro de la ventana de atención de 24 horas que abre tu cliente al escribirte.
              </li>
            </ul>
            <p>
              Los mensajes de marketing, utilidad y autenticación son <strong>plantillas</strong>: textos que Meta revisa y aprueba antes de que los uses. Meta también
              revisa que cada plantilla esté en la categoría correcta, así que una promoción disfrazada de aviso puede terminar cobrándose como marketing.
            </p>

            <h2 id="que-es-gratis">Qué mensajes no se cobran</h2>
            <p>Según la documentación de Meta, revisada el {META_REVIEW_LABEL}:</p>
            <ul>
              <li>
                <strong>Los que te mandan tus clientes.</strong> Siempre gratis.
              </li>
              <li>
                <strong>Los de la ventana de entrada gratuita.</strong> Si tu cliente llega desde un anuncio que hace clic a WhatsApp, se abre una ventana en la que tus
                mensajes no se cobran. Meta define su duración y condiciones en su documentación.
              </li>
              <li>
                <strong>Una parte de los mensajes de servicio.</strong> Cada número tiene un nivel gratuito de 1,000 mensajes de servicio entregados al mes, que no se
                acumulan.
              </li>
            </ul>
          </Prose>

          <div className="mt-8">
            <ServiceWindowDiagram />
          </div>

          <div className="mt-8">
            <Callout title="Ojo: Meta cambió las reglas el 1 de octubre de 2026" tone="alerta">
              La{" "}
              <a href={META_DOCS} target="_blank" rel="noopener noreferrer" className="underline">
                documentación para desarrolladores de Meta
              </a>{" "}
              indica que desde esa fecha volvió a cobrar los mensajes de servicio (después del nivel gratuito) y los de utilidad enviados dentro de la ventana de
              atención, que antes eran gratis. Algunas páginas comerciales de Meta en español todavía describían el esquema anterior cuando revisamos esta guía.
              Antes de presupuestar, confirma en la documentación oficial.
            </Callout>
          </div>

          <Prose className="mt-12">
            <h2 id="de-que-depende">De qué depende la tarifa</h2>
            <ul>
              <li>
                <strong>La categoría.</strong> Marketing, utilidad, autenticación o servicio: cada una tiene su tarifa.
              </li>
              <li>
                <strong>El país de tu cliente.</strong> La tarifa depende de la lada del número que recibe el mensaje. México tiene su propia tarifa en la tabla de Meta.
              </li>
              <li>
                <strong>Tu volumen.</strong> En utilidad y autenticación, Meta baja la tarifa por escalones de volumen mensual.
              </li>
              <li>
                <strong>La moneda.</strong> Meta publica tablas en varias monedas; según su documentación, la de pesos mexicanos (MXN) está disponible desde el 1 de enero
                de 2026.
              </li>
            </ul>
            <p>
              Las tarifas vigentes están en la{" "}
              <a href={META_RATES} target="_blank" rel="noopener noreferrer">
                página oficial de precios de WhatsApp Business
              </a>{" "}
              y en la{" "}
              <a href={META_DOCS} target="_blank" rel="noopener noreferrer">
                documentación de precios de Meta
              </a>
              , donde puedes descargar la tabla por moneda. No las copiamos aquí a propósito: Meta las actualiza y una cifra vieja en una guía es peor que ninguna.
            </p>
          </Prose>
        </Container>
      </Section>

      <ProductByNextia />

      <Section tone="claro">
        <Container size="narrow" className="px-0!">
          <Prose>
            <h2 id="como-calcular" className="mt-0!">
              Cómo calcular tu costo en pesos
            </h2>
            <p>Con media hora y la tabla de Meta en MXN sacas un estimado bastante fino:</p>
            <ol>
              <li>
                <strong>Cuenta tus mensajes del mes por categoría.</strong> ¿Cuántas confirmaciones o recordatorios mandas? ¿Cuántas campañas y a cuántos contactos? ¿Usas
                códigos de verificación?
              </li>
              <li>
                <strong>Busca la tarifa de México</strong> para cada categoría en la tabla oficial.
              </li>
              <li>
                <strong>Multiplica y suma.</strong> Mensajes de cada categoría × su tarifa.
              </li>
              <li>
                <strong>Resta lo gratis:</strong> lo que contestas dentro de la ventana de entrada gratuita y lo que cabe en el nivel gratuito de servicio.
              </li>
              <li>
                <strong>Suma tu plan.</strong> El software va aparte de los mensajes.
              </li>
            </ol>
          </Prose>

          <div className="mt-8">
            <ComparisonTable
              caption="Ejemplo de cómo estimar el costo mensual de mensajes de una clínica"
              captionVisible
              firstColLabel="Mensaje"
              columns={[
                { key: "cat", label: "Categoría" },
                { key: "n", label: "Al mes (ejemplo)" },
                { key: "costo", label: "Cómo se calcula", highlight: true },
              ]}
              rows={[
                { label: "Recordatorio de cita un día antes", values: { cat: "Utilidad", n: "600", costo: "600 × tarifa de utilidad para México" } },
                { label: "Campaña de temporada a pacientes que aceptaron recibirla", values: { cat: "Marketing", n: "1,500", costo: "1,500 × tarifa de marketing para México" } },
                { label: "Respuestas a quien escribe por un anuncio de clic a WhatsApp", values: { cat: "Cualquiera", n: "—", costo: "Sin costo mientras dure la ventana de entrada gratuita" } },
                { label: "Respuestas a quien escribe por su cuenta", values: { cat: "Servicio", n: "900", costo: "Las primeras 1,000 del mes sin costo; las demás, a tarifa de servicio" } },
              ]}
              footnote="Cantidades de ejemplo. Las tarifas salen de la tabla oficial de Meta en MXN vigente el mes en que mandas los mensajes."
            />
          </div>

          <Prose className="mt-12">
            <h2 id="que-cobra-root">Qué cobra root y qué no</h2>
            <p>root cobra una mensualidad por plan, en pesos. Estos son los precios publicados:</p>
          </Prose>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {PLANS.map((p) => (
              <li key={p.id} className={`card p-5 ${p.highlight ? "border-ink!" : ""}`}>
                <p className="font-display font-bold text-ink">{p.name}</p>
                <p className="mono text-ink mt-2">{p.priceLabel}</p>
                <p className="text-sm text-muted">{p.period || "Cotización a la medida"}</p>
                <p className="text-sm text-muted mt-2">
                  {p.users} · {p.ai ? "con agentes de IA" : "sin agentes de IA"}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <CheckList items={[PRICING_FACTS.meta, PRICING_FACTS.api, PRICING_FACTS.billing, PRICING_FACTS.iva, PRICING_FACTS.cancel, PRICING_FACTS.changes]} />
          </div>
          <div className="mt-8">
            <LinkButton href="/precios" label="Ver precios y qué incluye cada plan" />
          </div>

          <Prose className="mt-12">
            <h2 id="gastar-menos">Cómo gastar menos en mensajes sin vender menos</h2>
            <ul>
              <li>
                <strong>Contesta mientras la ventana está abierta.</strong> Una respuesta en segundos cae dentro de la ventana de atención; una respuesta al día siguiente
                puede obligarte a usar una plantilla. Para eso sirve un agente de IA que atiende de noche.
              </li>
              <li>
                <strong>Aprovecha los anuncios de clic a WhatsApp.</strong> Las conversaciones que llegan por ahí abren la ventana de entrada gratuita.
              </li>
              <li>
                <strong>Manda marketing solo a quien te dio permiso</strong> y segmenta: una campaña a quien sí le interesa cuesta menos y genera menos bloqueos.
              </li>
              <li>
                <strong>Usa utilidad para lo que es utilidad.</strong> Recordatorios y avisos reales, sin promociones dentro.
              </li>
              <li>
                <strong>Mide qué campaña trae ventas.</strong> En root cada prospecto entra con la campaña que lo trajo, así sabes en qué vale la pena gastar.
              </li>
            </ul>
            <p>
              ¿Todavía no sabes si necesitas la API? Empieza por{" "}
              <Link href="/guias/whatsapp-business-app-vs-api/">WhatsApp Business App o API</Link>.
            </p>
          </Prose>

          <div className="mt-10">
            <OfficialSources sources={META_PRICING_SOURCES} intro="Fuentes oficiales de Meta" />
          </div>

          <RelatedLinks items={[RELATED.appVsApi, RELATED.calculadora, RELATED.precios, RELATED.campanas]} />
        </Container>
      </Section>

      <Faq items={FAQ} title="Preguntas frecuentes sobre el costo de la API" />

      <CtaBand
        kicker="Sin sobreprecio en mensajes"
        title="¿Quieres tu costo total con tus números?"
        text="Escríbenos por WhatsApp con cuántos mensajes mandas al mes y te ayudamos a estimar mensajes de Meta y plan de root."
        cta="guia-costo-api-final"
      />
    </>
  );
}
