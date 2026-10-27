import Link from "next/link";
import { ProductByNextia } from "@/components/product-by-nextia";
import { ArticleJsonLd, Callout, GuideByline, GuideToc, RELATED, RelatedLinks } from "@/components/recursos/guide";
import { AppVsApiScene } from "@/components/recursos/scenes";
import { ComparisonTable, Container, CtaBand, CtaButton, Faq, PageHero, Prose, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { planById, PRICING_FACTS } from "@/lib/site";

const PATH = "/guias/whatsapp-business-app-vs-api";
const TITLE = "WhatsApp Business App o API: cuál necesita tu equipo";
const DESCRIPTION =
  "WhatsApp Business App o API: diferencias en uso en equipo, límites, riesgo de bloqueo y costo, y cómo pasarte a la API oficial sin perder a tus clientes.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, type: "article", publishedTime: "2026-10-27", ownOgImage: true });

const basico = planById("basico");

const TOC = [
  { id: "que-es-la-app", label: "Qué es WhatsApp Business App" },
  { id: "que-es-la-api", label: "Qué es la API de WhatsApp Business" },
  { id: "tabla", label: "App vs API, punto por punto" },
  { id: "senales", label: "Señales de que ya necesitas la API" },
  { id: "lo-que-no", label: "Lo que no conviene: atajos no oficiales" },
  { id: "como-pasarte", label: "Cómo pasarte a la API con root" },
];

const FAQ = [
  {
    q: "¿Puedo usar el mismo número que ya tengo en WhatsApp Business App?",
    a: "En la mayoría de los casos, sí. Según el caso, Meta pide quitar el número de la app antes de conectarlo a la API o permite usarlo en ambos lados (lo que llama coexistencia). Lo revisamos contigo antes de mover nada y te decimos qué pasa con tus chats en tu caso.",
  },
  {
    q: "¿La API de WhatsApp es gratis?",
    a: "No del todo. Conectarte a la API no tiene costo con root: te ayudamos a tramitarla sin costo extra. Lo que sí se paga son los mensajes, que Meta cobra por mensaje entregado según su categoría y el país de tu cliente. En root se pagan a la tarifa oficial de Meta, sin sobreprecio.",
  },
  {
    q: "¿Necesito la API para usar root?",
    a: `Sí. root trabaja sobre la API oficial de WhatsApp Business y la incluye desde el plan ${basico.name} (${basico.priceLabel} MXN al mes). Es la vía oficial de Meta para conectar WhatsApp con un software.`,
  },
  {
    q: "¿Con la API me pueden bloquear el número?",
    a: "La API no te hace inmune: Meta puede limitar o restringir un número si mucha gente lo bloquea o lo reporta, o si mandas mensajes a quien no te dio permiso. Lo que sí cambia es que trabajas dentro de las reglas de Meta, en lugar de arriesgarte con herramientas no oficiales.",
  },
  {
    q: "¿Cuánto tarda pasar de la app a la API?",
    a: "Depende de que tu empresa tenga sus datos en orden con Meta. Con root, la mayoría de los equipos opera en menos de una semana, incluyendo configuración, migración de contactos e integración. No es una garantía: te decimos el tiempo real cuando vemos tu caso.",
  },
  {
    q: "¿Mis vendedores siguen usando su WhatsApp personal?",
    a: "Ya no hace falta: contestan desde root, en el número de tu empresa. Así cada conversación queda en la bandeja compartida, con su historial, y no se va con nadie.",
  },
];

export default function Page() {
  return (
    <>
      <ArticleJsonLd title={TITLE} description={DESCRIPTION} path={PATH} />
      <PageHero
        kicker="Guía · WhatsApp Business API"
        title={TITLE}
        intro="La app gratuita funciona muy bien mientras una persona contesta desde un celular. Cuando atiende un equipo, llegan anuncios y quieres que un agente de IA conteste de noche, necesitas la API oficial. Aquí te explicamos la diferencia sin tecnicismos."
        breadcrumbs={[
          { name: "Recursos", href: "/recursos" },
          { name: "WhatsApp Business App o API", href: PATH },
        ]}
        cta="guia-app-vs-api-hero"
        ctaLabel="Te ayudamos a tramitarla"
        note={<GuideByline minutes={7} />}
        visual={<AppVsApiScene />}
      />

      <Section tone="claro">
        <Container size="narrow" className="px-0!">
          <Prose>
            <GuideToc items={TOC} />

            <p>
              La pregunta no es cuál es «mejor», sino cuál le queda a tu forma de vender hoy. Las dos son de Meta, las dos usan tu número y las dos sirven para
              vender. La diferencia está en cuántas personas atienden, qué tanto quieres automatizar y cuánto control necesitas sobre tu cartera.
            </p>

            <h2 id="que-es-la-app">Qué es WhatsApp Business App</h2>
            <p>
              Es la app gratuita de WhatsApp para negocios. Se instala en un celular, como el WhatsApp de siempre, y le suma herramientas útiles: perfil de empresa con
              horario y dirección, catálogo, respuestas rápidas, etiquetas, mensaje de bienvenida y mensaje de ausencia. También puedes abrirla en la computadora con
              dispositivos vinculados.
            </p>
            <p>Para un negocio que empieza, es suficiente. Sus límites aparecen cuando el negocio crece:</p>
            <ul>
              <li>
                <strong>Es una sola bandeja.</strong> Si tres personas contestan desde el mismo número, no hay forma clara de saber quién atiende a quién ni de repartir
                conversaciones.
              </li>
              <li>
                <strong>No se conecta con tus sistemas.</strong> Lo que pasa en el chat no llega a tu CRM, a tu ERP ni a tu Excel, salvo que alguien lo copie a mano.
              </li>
              <li>
                <strong>La automatización es básica.</strong> Bienvenida, ausencia y respuestas rápidas. Nada que califique a un prospecto o le dé seguimiento por ti.
              </li>
              <li>
                <strong>Todo depende de un celular.</strong> Si se pierde, se descompone o se va con alguien, el historial corre la misma suerte.
              </li>
            </ul>

            <h2 id="que-es-la-api">Qué es la API de WhatsApp Business</h2>
            <p>
              La API (Meta la llama plataforma de WhatsApp Business) es la versión para empresas que necesitan conectar WhatsApp con su propio software. No tiene una
              app propia: la usas a través de una plataforma, como root, que le pone encima una bandeja para tu equipo, un CRM y agentes de IA.
            </p>
            <p>Con la API cambian tres cosas importantes:</p>
            <ul>
              <li>
                <strong>Varias personas atienden el mismo número</strong>, cada una con sus conversaciones asignadas y con historial completo.
              </li>
              <li>
                <strong>Se puede automatizar en serio</strong>: un agente de IA que contesta en segundos, califica con tus preguntas y le pasa el prospecto a un
                vendedor.
              </li>
              <li>
                <strong>Hay reglas claras de Meta.</strong> Dentro de las 24 horas después de que tu cliente te escribe, contestas libremente. Para escribirle primero o
                después de ese plazo, usas plantillas aprobadas por Meta, que se cobran por mensaje. Y Meta pone límites de envío que crecen con la calidad de tus
                mensajes.
              </li>
            </ul>
          </Prose>

          <h2 id="tabla" className="h-section text-ink text-[1.5rem]! mt-14 scroll-mt-24">
            WhatsApp Business App vs API, punto por punto
          </h2>
          <div className="mt-6">
            <ComparisonTable
              caption="Comparación entre WhatsApp Business App y la API oficial de WhatsApp Business"
              firstColLabel="Tema"
              columns={[
                { key: "app", label: "WhatsApp Business App", sub: "La app gratuita para el celular" },
                { key: "api", label: "API oficial", sub: "Usada a través de una plataforma como root", highlight: true },
              ]}
              rows={[
                {
                  label: "A quién le escribes",
                  values: {
                    app: "A quien te escriba y a tus contactos, uno por uno o con listas de difusión.",
                    api: "A quien te escriba y, con su permiso, a quien quieras retomar con plantillas aprobadas por Meta.",
                  },
                },
                {
                  label: "Uso en equipo",
                  values: {
                    app: "Una bandeja compartida sin asignación: todos ven todo y nadie sabe quién contesta.",
                    api: "Cada prospecto tiene dueño, etapa e historial. Tu agente de IA y tu equipo atienden juntos.",
                  },
                },
                {
                  label: "Límites",
                  values: {
                    app: "Pensada para una persona o un equipo muy chico en uno o pocos dispositivos.",
                    api: "Pensada para equipos. Meta fija límites de envío que crecen con la calidad de tus mensajes.",
                  },
                },
                {
                  label: "Organización",
                  values: {
                    app: "Etiquetas y chats fijados. Lo demás vive en la memoria de quien contesta.",
                    api: "Embudos, etapas, ficha de cada prospecto y conexión con tu CRM, ERP o Excel.",
                  },
                },
                {
                  label: "Riesgo de bloqueo",
                  values: {
                    app: "Bajo si la usas como está pensada. Sube si la fuerzas con extensiones o envíos masivos no oficiales.",
                    api: "Trabajas dentro de las reglas de Meta. Igual pueden limitarte si te bloquean o reportan mucho.",
                  },
                },
                {
                  label: "Costo",
                  values: {
                    app: "La app no tiene costo. El costo real es el tiempo de tu equipo y los prospectos que se enfrían.",
                    api: (
                      <>
                        Meta cobra por mensaje entregado según categoría y país. Más el software: con root, desde {basico.priceLabel} MXN al mes.{" "}
                        <Link href="/guias/cuanto-cuesta-la-api-de-whatsapp/" className="underline">
                          Ver costos
                        </Link>
                      </>
                    ),
                  },
                },
              ]}
              footnote="Resumen general con base en la documentación pública de Meta. Las reglas y límites los fija Meta y pueden cambiar."
            />
          </div>
        </Container>
      </Section>

      <ProductByNextia />

      <Section tone="claro">
        <Container size="narrow" className="px-0!">
          <Prose>
            <h2 id="senales" className="mt-0!">
              Señales de que ya necesitas la API
            </h2>
            <p>Si te identificas con dos o más, la app ya te está costando ventas:</p>
            <ul>
              <li>Hay más de una persona contestando el mismo WhatsApp y a veces dos le responden al mismo cliente… o ninguna.</li>
              <li>Pagas anuncios que llevan a WhatsApp y no sabes cuál de ellos trajo a quien sí compró.</li>
              <li>Te escriben de noche o en fin de semana y la respuesta llega cuando el cliente ya le compró a otro.</li>
              <li>Tus vendedores atienden desde su WhatsApp personal y, cuando se van, se llevan la cartera.</li>
              <li>Tu información vive en el chat y en un Excel que nadie actualiza.</li>
              <li>Quieres que un agente de IA conteste, califique y dé seguimiento, pero sin perder el control de lo que dice.</li>
            </ul>
            <Callout title="La cartera es de tu empresa, no del vendedor" tone="equipo">
              Con root, todas las conversaciones pasan por el número de tu empresa. Si alguien deja el equipo, sus conversaciones se quedan en la bandeja compartida y
              se reasignan con todo el historial.
            </Callout>

            <h2 id="lo-que-no">Lo que no conviene: atajos no oficiales</h2>
            <p>
              Antes de dar el paso, muchos equipos prueban atajos: extensiones que automatizan WhatsApp Web, «APIs» que no son de Meta, o un mismo celular compartido
              por todo el equipo. Funcionan… hasta que dejan de funcionar.
            </p>
            <ul>
              <li>
                <strong>Van contra los términos de WhatsApp.</strong> Meta puede suspender el número y, con él, todas tus conversaciones.
              </li>
              <li>
                <strong>No hay a quién reclamar.</strong> Si la conexión se cae, nadie te garantiza que regrese ni que tus datos sigan ahí.
              </li>
              <li>
                <strong>Siguen sin orden.</strong> Automatizar envíos no resuelve quién atiende, qué se prometió ni cuándo toca el siguiente mensaje.
              </li>
            </ul>
            <p>Si vas a invertir en ordenar tu WhatsApp de ventas, hazlo sobre la API oficial.</p>

            <h2 id="como-pasarte">Cómo pasarte a la API con root</h2>
            <p>
              root usa la API oficial de WhatsApp Business desde el plan {basico.name}. {PRICING_FACTS.api} El arranque se ve así:
            </p>
            <ol>
              <li>
                <strong>Trámite de la API oficial.</strong> Te acompañamos con Meta para dar de alta tu número en la API.
              </li>
              <li>
                <strong>Configuramos tu agente.</strong> Tus preguntas de calificación, tus respuestas y tu tono (agentes de IA en los planes Pro y Enterprise).
              </li>
              <li>
                <strong>Migramos tus contactos</strong> para que no empieces de cero.
              </li>
              <li>
                <strong>Conectamos tus sistemas</strong>, como Salesforce, SAP, HubSpot o Excel, si los usas.
              </li>
              <li>
                <strong>En vivo.</strong> Tu agente contesta el primer mensaje y tu equipo recibe a los prospectos listos para cerrar.
              </li>
            </ol>
            <p>
              La mayoría de los equipos opera en menos de una semana. Si además quieres atender Instagram, llega a la misma bandeja.
            </p>
            <p>
              ¿Te preocupa el costo de los mensajes? Lo explicamos completo en{" "}
              <Link href="/guias/cuanto-cuesta-la-api-de-whatsapp/">cuánto cuesta la API de WhatsApp</Link>. Y si todavía no tienes claro si necesitas un bot, un
              agente o un CRM, lee <Link href="/guias/chatbot-vs-agente-de-ia-vs-crm/">chatbot, agente de IA o CRM</Link>.
            </p>
            <div className="pt-2">
              <CtaButton cta="guia-app-vs-api-cuerpo" label="Te ayudamos a tramitarla" size="lg" />
            </div>
          </Prose>

          <RelatedLinks items={[RELATED.costoApi, RELATED.chatbotVsAgente, RELATED.bandeja, RELATED.precios]} />
        </Container>
      </Section>

      <Faq items={FAQ} title="Preguntas frecuentes sobre la app y la API" />

      <CtaBand
        kicker="Que nadie se quede en visto"
        title="¿Listo para pasarte a la API oficial?"
        text="Escríbenos por WhatsApp: revisamos tu número, te ayudamos con el trámite sin costo extra y te mostramos cómo atendería tu agente de root."
        cta="guia-app-vs-api-final"
        label="Te ayudamos a tramitarla"
      />
    </>
  );
}
