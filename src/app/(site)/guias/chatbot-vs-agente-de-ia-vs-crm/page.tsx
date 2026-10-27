import Link from "next/link";
import { ProductByNextia } from "@/components/product-by-nextia";
import { ArticleJsonLd, Callout, GuideByline, GuideToc, RELATED, RelatedLinks } from "@/components/recursos/guide";
import { ChatbotAgentCrmScene } from "@/components/recursos/scenes";
import { ComparisonTable, Container, CtaBand, CtaButton, Faq, PageHero, Prose, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { GUIDE_PHRASE } from "@/lib/site";

const PATH = "/guias/chatbot-vs-agente-de-ia-vs-crm";
const TITLE = "Chatbot, agente de IA o CRM: qué necesita tu WhatsApp";
const H1 = "Chatbot, agente de IA o CRM: qué necesita tu WhatsApp de ventas";
const DESCRIPTION =
  "Chatbot de WhatsApp, agente de IA o CRM: qué resuelve cada uno, en qué se quedan cortos y cuándo te conviene tenerlos juntos para vender más por WhatsApp.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, type: "article", publishedTime: "2026-10-27", ownOgImage: true });

const TOC = [
  { id: "en-una-frase", label: "Las tres piezas, en una frase" },
  { id: "chatbot", label: "Qué es un chatbot de WhatsApp" },
  { id: "agente", label: "Qué es un agente de IA" },
  { id: "crm", label: "Qué es un CRM para WhatsApp" },
  { id: "tabla", label: "Chatbot vs agente de IA vs CRM" },
  { id: "cuando", label: "Cuándo te conviene cada uno" },
  { id: "juntos", label: "Cómo se ven juntos" },
  { id: "preguntas", label: "Cinco preguntas para elegir" },
  { id: "ejemplos", label: "Ejemplos por industria" },
];

const FAQ = [
  {
    q: "¿Cuál es la diferencia entre un chatbot y un agente de IA?",
    a: "Un chatbot de menús sigue un guion fijo: ofrece opciones y responde según la que elijas. Un agente de IA entiende lo que la persona escribe con sus palabras, contesta con la información de tu negocio y hace las preguntas que necesitas para calificar.",
  },
  {
    q: "¿El agente de IA puede inventar respuestas?",
    a: "Un agente bien configurado contesta con la información que tú le das y le pasa a tu equipo lo que no sabe. Por eso importa que viva dentro de tu CRM: cada respuesta queda en el historial y tu equipo puede revisarla.",
  },
  {
    q: "¿Un agente de IA reemplaza a mis vendedores?",
    a: "No es la idea. El agente hace el trabajo repetitivo: contestar rápido, calificar, dar seguimiento y reactivar. Tu equipo se queda con lo que necesita criterio: negociar y cerrar.",
  },
  {
    q: "¿Necesito un CRM si ya tengo un chatbot?",
    a: "Si vendes con un equipo, sí. El chatbot resuelve la primera respuesta, pero no te dice quién atiende a cada prospecto, en qué etapa va ni cuándo le toca el siguiente mensaje.",
  },
  {
    q: "¿En qué planes de root vienen los agentes de IA?",
    a: "En Pro y Enterprise. El plan Básico incluye la API oficial, la bandeja y el CRM, con automatizaciones simples.",
  },
  {
    q: "¿Puedo ver cómo contestaría un agente de root?",
    a: "Escríbenos por WhatsApp y te mostramos root con casos de tu negocio: tus preguntas frecuentes, tus etapas y tu forma de calificar.",
  },
];

export default function Page() {
  return (
    <>
      <ArticleJsonLd title={H1} description={DESCRIPTION} path={PATH} />
      <PageHero
        kicker="Guía · Agentes de IA"
        title={H1}
        intro="«Ponle un bot al WhatsApp» puede significar tres cosas muy distintas. Un chatbot contesta con menús, un agente de IA conversa y califica, y un CRM ordena el trabajo de tu equipo. Aquí ves qué hace cada uno y cuándo los necesitas juntos."
        breadcrumbs={[
          { name: "Recursos", href: "/recursos" },
          { name: "Chatbot, agente de IA o CRM", href: PATH },
        ]}
        cta="guia-chatbot-hero"
        note={<GuideByline minutes={7} />}
        visual={<ChatbotAgentCrmScene />}
      />

      <Section tone="claro">
        <Container size="narrow" className="px-0!">
          <Prose>
            <GuideToc items={TOC} />

            <h2 id="en-una-frase">Las tres piezas, en una frase</h2>
            <ul>
              <li>
                <strong>Chatbot de menús:</strong> contesta con opciones fijas («escribe 1 para…»).
              </li>
              <li>
                <strong>Agente de IA:</strong> entiende lo que tu cliente escribe, contesta con tu información y le hace las preguntas que tú harías.
              </li>
              <li>
                <strong>CRM para WhatsApp:</strong> le da a cada prospecto una etapa, un dueño y una fecha para volver a escribirle.
              </li>
            </ul>
            <p>
              No compiten entre sí: resuelven partes distintas del mismo problema. La pregunta útil no es «¿cuál compro?», sino «¿qué parte de mi venta se está
              cayendo?».
            </p>

            <h2 id="chatbot">Qué es un chatbot de WhatsApp</h2>
            <p>
              Es un guion automático. Cuando alguien escribe, el bot responde con un saludo y un menú; según la opción que elija la persona, manda otro mensaje o pide
              un dato. Funciona bien para preguntas que siempre se contestan igual: horario, ubicación, requisitos.
            </p>
            <p>
              Su límite es que la gente no escribe en menús. Escribe «¿sigue disponible el depa y aceptan Infonavit?», dos preguntas en una, con sus palabras. El bot
              no encuentra la opción, repite el menú y el prospecto se va con la duda. Además, el bot no sabe qué pasa después: no da seguimiento ni avisa a nadie.
            </p>

            <h2 id="agente">Qué es un agente de IA</h2>
            <p>
              Es un asistente que conversa. Lee el mensaje completo, entiende la intención y contesta con la información que le diste: precios, disponibilidad,
              requisitos, zonas. Además hace preguntas para calificar (presupuesto, zona, fecha, producto) y puede agendar, dar seguimiento y reactivar a quien dejó de
              contestar.
            </p>
            <p>
              Un agente suelto, sin CRM, tiene un problema: la conversación termina y luego ¿qué? Si nadie ve lo que el agente averiguó y nadie toma el relevo, el
              prospecto calificado se queda esperando igual que antes, solo que mejor atendido.
            </p>

            <h2 id="crm">Qué es un CRM para WhatsApp</h2>
            <p>
              Es el lugar donde tu equipo ve todos sus prospectos: en qué etapa va cada uno, quién lo atiende, qué se le prometió y cuándo toca escribirle. Un buen CRM
              de WhatsApp junta conversaciones, contactos y seguimientos en un solo lugar, y se conecta con tus otros sistemas.
            </p>
            <p>
              Un CRM sin IA ordena, pero no contesta. Si te escriben a las 10 de la noche, la tarjeta aparece en «Nuevo» y espera a que alguien llegue al día
              siguiente. El orden ayuda; la velocidad sigue dependiendo de tu equipo.
            </p>
          </Prose>

          <h2 id="tabla" className="h-section text-ink text-[1.5rem]! mt-14 scroll-mt-24">
            Chatbot vs agente de IA vs CRM
          </h2>
          <div className="mt-6">
            <ComparisonTable
              caption="Qué hace un chatbot de menús, un agente de IA suelto, un CRM sin IA y root, que junta CRM y agentes"
              firstColLabel="Qué necesitas"
              columns={[
                { key: "bot", label: "Chatbot de menús" },
                { key: "agente", label: "Agente de IA suelto" },
                { key: "crm", label: "CRM sin IA" },
                { key: "root", label: "root", sub: "CRM de WhatsApp con agentes de IA", highlight: true },
              ]}
              rows={[
                { label: "Contesta preguntas con las palabras del cliente", values: { bot: false, agente: true, crm: false, root: true } },
                { label: "Atiende de noche y en fin de semana", values: { bot: "Con menús", agente: true, crm: false, root: true } },
                { label: "Califica con tus preguntas", values: { bot: "Con formularios rígidos", agente: true, crm: "A mano", root: true } },
                { label: "Da seguimiento a quien no contesta", values: { bot: false, agente: "Depende de la herramienta", crm: "Con recordatorios a tu equipo", root: true } },
                { label: "Pasa al vendedor con el historial", values: { bot: false, agente: "Depende de la herramienta", crm: "No aplica", root: true } },
                { label: "Etapa, dueño y seguimiento de cada prospecto", values: { bot: false, agente: false, crm: true, root: true } },
                { label: "Se conecta con tu CRM, ERP o Excel", values: { bot: null, agente: null, crm: "Depende de la herramienta", root: "Salesforce, SAP, HubSpot y Excel" } },
              ]}
              footnote="Comparación por tipo de herramienta, no por marca. Cada producto del mercado puede tener más o menos funciones."
            />
          </div>
        </Container>
      </Section>

      <ProductByNextia />

      <Section tone="claro">
        <Container size="narrow" className="px-0!">
          <Prose>
            <h2 id="cuando" className="mt-0!">
              Cuándo te conviene cada uno
            </h2>
            <ul>
              <li>
                <strong>Un chatbot de menús</strong> te alcanza si recibes pocos mensajes, casi siempre con las mismas tres preguntas, y una sola persona da seguimiento.
              </li>
              <li>
                <strong>Un CRM sin IA</strong> te conviene si tu equipo ya contesta rápido en horario y lo que te falta es orden: quién atiende a quién y qué sigue.
              </li>
              <li>
                <strong>Un agente de IA suelto</strong> sirve para no dejar a nadie sin respuesta, pero si vendes con un equipo vas a necesitar dónde aterrizar lo que el
                agente averigua.
              </li>
              <li>
                <strong>CRM y agentes juntos</strong> es para equipos comerciales que reciben prospectos de anuncios, portales o redes, atienden entre varias personas y
                no quieren que nadie se quede en visto.
              </li>
            </ul>

            <h2 id="juntos">Cómo se ven juntos: el agente contesta, tu equipo cierra</h2>
            <p>La frase que usamos en root para explicarlo: «{GUIDE_PHRASE}»</p>
            <ol>
              <li>
                <strong>Llega el mensaje</strong> al número de tu empresa, de un anuncio, de tu sitio o de Instagram.
              </li>
              <li>
                <strong>El agente contesta en segundos</strong> y califica con tus preguntas. Lo que averigua queda en el historial del prospecto; en root lo
                pensamos como una ficha viva que se completa mientras conversa.
              </li>
              <li>
                <strong>Relevo.</strong> Cuando el prospecto está listo, el agente le pasa la conversación a un vendedor con todo el historial, para que no tenga que
                preguntar lo mismo dos veces.
              </li>
              <li>
                <strong>Tu equipo cierra</strong> y el trato avanza en el embudo. Tú ves todo: qué atendió el agente, qué tiene cada vendedor y de qué campaña vino cada
                trato.
              </li>
            </ol>
            <Callout title="Carriles: quién atiende cada etapa" tone="agente">
              Así pensamos el trabajo en root: en cada embudo, unas etapas son el carril del agente (contestar, calificar, dar seguimiento) y otras el carril de tu
              equipo (visita, propuesta, cierre). El punto donde se cruzan es el relevo.
            </Callout>

            <h2 id="preguntas">Cinco preguntas para elegir</h2>
            <ol>
              <li>¿Cuántos mensajes te llegan fuera de horario y cuánto tardan en recibir respuesta?</li>
              <li>¿Cuántas personas contestan el WhatsApp de ventas y cómo se reparten los prospectos?</li>
              <li>¿Sabes en qué etapa va cada prospecto y quién lo tiene?</li>
              <li>¿Qué preguntas haces siempre para saber si alguien va en serio?</li>
              <li>¿Dónde tiene que terminar la información: en tu CRM, en tu ERP, en un Excel?</li>
            </ol>
            <p>
              Si la respuesta a la primera te preocupa, la{" "}
              <Link href="/herramientas/calculadora-de-ventas-perdidas/">calculadora de ventas perdidas</Link> te ayuda a ponerle número. Y si todavía estás en
              WhatsApp Business App, revisa primero <Link href="/guias/whatsapp-business-app-vs-api/">si ya necesitas la API</Link>: un agente de IA trabaja sobre la
              API oficial.
            </p>

            <h2 id="ejemplos">Ejemplos por industria</h2>
            <ul>
              <li>
                <strong>Inmobiliarias:</strong> el agente pregunta si es renta o compra, zona, presupuesto y forma de pago, y pasa la visita al asesor.{" "}
                <Link href="/soluciones/inmobiliarias/">Ver inmobiliarias</Link>.
              </li>
              <li>
                <strong>Tiendas en redes:</strong> precio, talla, existencia y envío, contestados aunque la tienda esté cerrada.{" "}
                <Link href="/soluciones/tiendas-en-redes/">Ver tiendas en redes</Link>.
              </li>
              <li>
                <strong>Clínicas estéticas:</strong> cada «¿precio?» recibe respuesta y seguimiento hacia una valoración.{" "}
                <Link href="/soluciones/clinicas-esteticas/">Ver clínicas estéticas</Link>.
              </li>
            </ul>
            <div className="pt-2">
              <CtaButton cta="guia-chatbot-cuerpo" label="Escríbenos por WhatsApp" size="lg" />
            </div>
          </Prose>

          <RelatedLinks items={[RELATED.agentes, RELATED.appVsApi, RELATED.calculadora, RELATED.precios]} />
        </Container>
      </Section>

      <Faq items={FAQ} title="Preguntas frecuentes sobre chatbots, agentes y CRM" />

      <CtaBand
        kicker="Que nadie se quede en visto"
        title="Tu agente contesta y califica. Tu equipo cierra."
        text="Escríbenos por WhatsApp y te mostramos cómo atendería un agente de root a tus prospectos, con tus preguntas y tus etapas."
        cta="guia-chatbot-final"
      />
    </>
  );
}
