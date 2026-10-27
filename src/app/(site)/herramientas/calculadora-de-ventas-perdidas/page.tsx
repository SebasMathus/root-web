import Link from "next/link";
import { ProductByNextia } from "@/components/product-by-nextia";
import { Callout, RELATED, RelatedLinks, ToolJsonLd } from "@/components/recursos/guide";
import { LostSalesCalculator } from "@/components/recursos/lost-sales-calculator";
import { Container, CtaBand, Faq, FeatureGrid, PageHero, Prose, Section, SectionHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { planById, PRICE_FROM } from "@/lib/site";

const PATH = "/herramientas/calculadora-de-ventas-perdidas";
const TITLE = "Calculadora de ventas perdidas por contestar tarde";
const DESCRIPTION =
  "Calculadora de ventas perdidas: pon tus prospectos al mes, cuántos no reciben respuesta a tiempo, tu tasa de cierre y tu ticket, y ve lo que dejas en la mesa.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, ownOgImage: true });

const pro = planById("pro");
const basico = planById("basico");

const FAQ = [
  {
    q: "¿De dónde salen los números de la calculadora?",
    a: "De ti. Los valores que ves al abrirla son solo un ejemplo para que entiendas el cálculo. Cámbialos por los de tu negocio: prospectos al mes, porcentaje sin respuesta a tiempo, tasa de cierre y ticket promedio.",
  },
  {
    q: "¿Por qué no usan promedios de la industria?",
    a: "Porque cada negocio es distinto y no queremos ponerte una cifra sin fuente. Tu tasa de cierre y tu ticket dicen mucho más de tu caso que cualquier promedio.",
  },
  {
    q: "¿El resultado es lo que voy a recuperar con root?",
    a: "No. Es lo que está en juego: cuánto valdrían esos prospectos si les contestaras a tiempo y cerraras a tu tasa normal. Lo que recuperes depende de tu oferta, tu equipo y tu seguimiento.",
  },
  {
    q: "¿Qué cuenta como «respuesta a tiempo»?",
    a: "Lo decides tú, según tu negocio. Para muchos equipos es contestar mientras el cliente sigue en el chat; para otros, dentro de la primera hora. Lo importante es medirlo igual cada mes.",
  },
  {
    q: "¿Guardan los datos que pongo?",
    a: "No. El cálculo se hace en tu navegador y no se envía a ningún servidor. Si quieres compartirlo, usa «Copiar mi cálculo» y pégalo donde quieras.",
  },
  {
    q: "¿Cuánto cuesta root?",
    a: `${PRICE_FROM} con el plan ${basico.name}. Los agentes de IA vienen en el plan ${pro.name} (${pro.priceLabel} MXN al mes, ${pro.users}) y en Enterprise. Los mensajes de WhatsApp se pagan aparte, a la tarifa oficial de Meta, sin sobreprecio.`,
  },
];

export default function Page() {
  return (
    <>
      <ToolJsonLd name="Calculadora de ventas perdidas de root" description={DESCRIPTION} path={PATH} />
      <PageHero
        kicker="Herramienta · tus propios números"
        title="Calculadora de ventas perdidas por contestar tarde"
        intro="¿Cuánto dejas en la mesa cada mes por los mensajes que nadie contesta a tiempo? Pon tus números y la calculadora te lo dice en pesos, con la fórmula a la vista."
        breadcrumbs={[
          { name: "Recursos", href: "/recursos" },
          { name: "Calculadora de ventas perdidas", href: PATH },
        ]}
        ctas={null}
        note="Los valores iniciales son de ejemplo. No usamos promedios de industria."
        visual={<LostSalesCalculator />}
      />

      <Section tone="gris" labelledBy="como-funciona-titulo">
        <SectionHeader
          id="como-funciona-titulo"
          kicker="La fórmula"
          title="Cómo funciona la calculadora de ventas perdidas"
          intro="Prospectos al mes × % sin respuesta a tiempo × tasa de cierre × ticket promedio = pesos al mes en riesgo. Así sacas cada número:"
        />
        <FeatureGrid
          cols={4}
          items={[
            { icon: "chat", title: "Prospectos al mes", text: "Cuenta los chats nuevos de un mes completo en tu WhatsApp de ventas. Si pagas anuncios, suma los de cada campaña." },
            {
              icon: "clock",
              title: "% sin respuesta a tiempo",
              role: "alerta",
              text: "Revisa una muestra de chats: cuántos esperaron más de lo que tu cliente está dispuesto a esperar, incluidos los de noche y fin de semana.",
            },
            { icon: "target", title: "Tasa de cierre", text: "De los prospectos que sí atendiste, qué porcentaje te compró. Usa el dato de tu CRM o de tus ventas del último trimestre." },
            { icon: "money", title: "Ticket promedio", text: "Lo que vale una venta típica. Si tus clientes recompran, puedes usar el valor de su primera compra para no exagerar." },
          ]}
        />
      </Section>

      <Section tone="claro">
        <Container size="narrow" className="px-0!">
          <Prose>
            <h2 id="medir" className="mt-0!">
              Cómo medir tus ventas perdidas por WhatsApp sin un sistema
            </h2>
            <p>No necesitas software para tener un primer número honesto. Con una hora y tu WhatsApp de ventas basta:</p>
            <ol>
              <li>
                <strong>Elige 50 chats nuevos</strong> del último mes, de distintos días y horarios.
              </li>
              <li>
                <strong>Anota a qué hora escribió el cliente y a qué hora le contestaron.</strong> Marca los que llegaron fuera de horario.
              </li>
              <li>
                <strong>Define tu «a tiempo».</strong> Por ejemplo, «mientras el cliente sigue en línea» o «en menos de una hora». Cuenta cuántos se pasaron.
              </li>
              <li>
                <strong>Divide</strong> los que se pasaron entre 50. Ese es tu porcentaje sin respuesta a tiempo.
              </li>
            </ol>
            <p>
              Si varias personas contestan desde el mismo número o desde sus celulares, este ejercicio suele ser revelador: muchas veces nadie sabe quién tenía que
              contestar. Para eso existe la bandeja compartida, y te explicamos la diferencia en{" "}
              <Link href="/guias/whatsapp-business-app-vs-api/">WhatsApp Business App o API</Link>.
            </p>
          </Prose>
        </Container>
      </Section>

      <ProductByNextia />

      <Section tone="claro">
        <Container size="narrow" className="px-0!">
          <Prose>
            <h2 id="que-hacer" className="mt-0!">
              Qué hacer con el resultado
            </h2>
            <p>Si el número te incomodó, tienes tres palancas, de la más rápida a la más profunda:</p>
            <ul>
              <li>
                <strong>Contestar en segundos, a cualquier hora.</strong> Un agente de IA atiende de noche, en fin de semana y cuando tu equipo está en junta. Compara
                lo que dejas en la mesa con lo que cuesta un plan con agentes: {pro.name}, {pro.priceLabel} MXN al mes.
              </li>
              <li>
                <strong>Dar seguimiento a quien no cerró.</strong> Muchos prospectos no dicen que no; solo dejan de contestar. Un seguimiento a tiempo y la reactivación
                de los que se enfriaron recuperan parte de lo que hoy se pierde.
              </li>
              <li>
                <strong>Saber quién tiene cada prospecto.</strong> Con etapa, dueño y fecha de seguimiento para cada uno, nadie se queda en visto por accidente.
              </li>
            </ul>
          </Prose>
          <div className="mt-8">
            <Callout title="Tu agente contesta y califica. Tu equipo cierra. Tú ves todo." tone="agente">
              En root, el agente de IA responde desde el número de tu empresa, califica con tus preguntas y le pasa el prospecto al vendedor con el historial. Tú ves
              cada conversación, quién la tiene y de qué campaña vino cada trato.
            </Callout>
          </div>

          <RelatedLinks items={[RELATED.chatbotVsAgente, RELATED.generador, RELATED.costoApi, RELATED.precios]} />
        </Container>
      </Section>

      <Faq items={FAQ} title="Preguntas frecuentes sobre la calculadora" />

      <CtaBand
        kicker="Que nadie se quede en visto"
        title="Manda tu cálculo y te decimos qué parte puede atender un agente"
        text="Copia tu resultado, escríbenos por WhatsApp y pégalo en el chat. Con tus números te mostramos cómo trabajaría root en tu equipo."
        cta="calculadora-final"
      />
    </>
  );
}
