import Link from "next/link";
import { ProductByNextia } from "@/components/product-by-nextia";
import { Callout, RELATED, RelatedLinks, ToolJsonLd } from "@/components/recursos/guide";
import { LinkGenerator } from "@/components/recursos/link-generator";
import { Container, CtaBand, Faq, FeatureGrid, PageHero, Prose, Section, SectionHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

const PATH = "/herramientas/generador-de-link-de-whatsapp";
const TITLE = "Generador de link de WhatsApp con mensaje";
const DESCRIPTION =
  "Generador de link de WhatsApp: escribe tu número y un mensaje, y copia tu link wa.me en un clic. Se arma en tu navegador, sin registro y sin guardar tus datos.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, ownOgImage: true });

const FAQ = [
  {
    q: "¿Cómo creo un link de WhatsApp con mensaje?",
    a: "Elige tu país, escribe tu número sin la lada y el mensaje que quieres que aparezca escrito. El generador arma el link wa.me con el mensaje codificado; cópialo y pégalo donde quieras.",
  },
  {
    q: "¿Cómo va el número de México en un link de WhatsApp?",
    a: "Con la lada 52 seguida de los 10 dígitos, sin espacios, guiones ni el signo +. Por ejemplo, wa.me/525512345678. El generador lo arma solo.",
  },
  {
    q: "¿El link funciona con WhatsApp Business App y con la API?",
    a: "Sí. Un link wa.me abre un chat con cualquier número de WhatsApp, sea de la app personal, de WhatsApp Business App o de la API oficial.",
  },
  {
    q: "¿Guardan mi número o mi mensaje?",
    a: "No. El link se arma en tu navegador: no se envía nada a nuestros servidores y no guardamos lo que escribes.",
  },
  {
    q: "¿Puedo saber cuántas personas escribieron por mi link?",
    a: "El link por sí solo no da estadísticas. Si usas un mensaje distinto por campaña, sabrás de dónde vino cada chat. En root, además, cada prospecto entra con la campaña que lo trajo.",
  },
  {
    q: "¿Puedo convertir el link en código QR?",
    a: "Sí. Cualquier generador de códigos QR acepta un link wa.me: pega el link que copiaste aquí y descarga tu QR para mostrador, volantes o empaques.",
  },
];

export default function Page() {
  return (
    <>
      <ToolJsonLd name="Generador de link de WhatsApp de root" description={DESCRIPTION} path={PATH} />
      <PageHero
        kicker="Herramienta · sin registro"
        title="Generador de link de WhatsApp: crea tu link con mensaje"
        intro="Escribe tu número y el mensaje con el que quieres que te escriban. Copia el link y ponlo en tu bio, tu sitio, tus anuncios o tu firma. Todo pasa en tu navegador."
        breadcrumbs={[
          { name: "Recursos", href: "/recursos" },
          { name: "Generador de link de WhatsApp", href: PATH },
        ]}
        ctas={null}
        visual={<LinkGenerator />}
      />

      <Section tone="gris" labelledBy="pasos-titulo">
        <SectionHeader id="pasos-titulo" kicker="En tres pasos" title="Cómo crear tu link de WhatsApp" />
        <FeatureGrid
          items={[
            { icon: "phone", title: "1. Tu número", text: "Elige el país y escribe el número sin la lada. Usa el número de tu empresa, no el personal de un vendedor." },
            { icon: "chat", title: "2. Tu mensaje", text: "Escribe la frase con la que quieres que te escriban. Que diga de dónde viene: «Hola, vi el anuncio de…»." },
            { icon: "send", title: "3. Copia y comparte", text: "Copia el link o el código para tu sitio. Pruébalo antes de publicarlo: abre el chat con tu mensaje listo." },
          ]}
        />
      </Section>

      <Section tone="claro">
        <Container size="narrow" className="px-0!">
          <Prose>
            <h2 id="donde-ponerlo" className="mt-0!">
              Dónde poner tu link de WhatsApp
            </h2>
            <ul>
              <li>
                <strong>Bio de Instagram, TikTok o Facebook.</strong> Un toque y el cliente ya está escribiéndote.
              </li>
              <li>
                <strong>Tu sitio web.</strong> En el botón principal, en la página de precios y en cada producto. Usa «Copiar código para tu sitio».
              </li>
              <li>
                <strong>Firma de correo y cotizaciones en PDF.</strong> Para que la respuesta llegue a WhatsApp y no se pierda en la bandeja.
              </li>
              <li>
                <strong>Tu perfil de Google.</strong> Como enlace de contacto o en tus publicaciones.
              </li>
              <li>
                <strong>Mostrador, volantes y empaques</strong>, convertido en código QR.
              </li>
            </ul>
            <p>
              En anuncios de Meta, mejor usa el botón nativo de «Enviar mensaje» por WhatsApp: esas conversaciones abren una ventana de entrada gratuita. Te lo
              explicamos en <Link href="/guias/cuanto-cuesta-la-api-de-whatsapp/">cuánto cuesta la API de WhatsApp</Link>.
            </p>
          </Prose>
        </Container>
      </Section>

      <ProductByNextia />

      <Section tone="claro">
        <Container size="narrow" className="px-0!">
          <Prose>
            <h2 id="consejos" className="mt-0!">
              Consejos para que tu link sí venda
            </h2>
            <ol>
              <li>
                <strong>Un mensaje distinto por canal.</strong> «Hola, vengo de Instagram» y «Hola, vi su anuncio de diciembre» te dicen de dónde llegó cada prospecto,
                aunque no tengas otra herramienta.
              </li>
              <li>
                <strong>Que el mensaje adelante la conversación.</strong> «Quiero cotizar» abre mejor que «Hola». Si vendes varios productos, haz un link por producto.
              </li>
              <li>
                <strong>Número de empresa, siempre.</strong> Si el link lleva al celular de un vendedor, la conversación se va con él cuando cambie de trabajo.
              </li>
              <li>
                <strong>Que alguien conteste en segundos.</strong> Un link funciona tan bien como la respuesta que recibe. Si te escriben de noche y contestas al día
                siguiente, el link hizo su parte y la venta se perdió igual.
              </li>
            </ol>
          </Prose>
          <div className="mt-8">
            <Callout title="Que un agente conteste ese link" tone="agente">
              Con root, cada mensaje que llega por tu link lo contesta un agente de IA en segundos, desde el número de tu empresa. Califica con tus preguntas, da
              seguimiento y le pasa el prospecto a tu equipo con el historial. Y cada trato entra con la campaña que lo trajo.
            </Callout>
          </div>

          <RelatedLinks items={[RELATED.calculadora, RELATED.appVsApi, RELATED.agentes, RELATED.precios]} />
        </Container>
      </Section>

      <Faq items={FAQ} title="Preguntas frecuentes sobre el link de WhatsApp" />

      <CtaBand
        kicker="Que nadie se quede en visto"
        title="Ya tienes el link. Ahora, que alguien conteste."
        text="Escríbenos por WhatsApp y te mostramos cómo un agente de root atiende cada mensaje que llega por tu link, de día y de noche."
        cta="generador-link-final"
        label="Que un agente conteste ese link"
      />
    </>
  );
}
