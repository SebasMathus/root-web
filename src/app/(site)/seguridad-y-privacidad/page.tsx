import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ProductByNextia } from "@/components/product-by-nextia";
import { CheckList, CtaBand, Faq, FeatureGrid, PageHero, Section, SectionHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, CONTACT_EMAIL } from "@/lib/site";

/*
 * Seguridad y privacidad (plan §3.6). Solo lo que respaldan el aviso de privacidad y las instrucciones de borrado
 * publicadas en /docs/* (LFPDPPP, ARCO y borrado en 20 días hábiles). Nada de certificaciones, cifrado ni GDPR
 * (plan §6.3): no hay fuente.
 */

const PATH = "/seguridad-y-privacidad";
const TITLE = "Seguridad y privacidad: cómo cuidamos tus datos";
const DESCRIPTION =
  "Seguridad y privacidad en root: tratamos tus datos conforme a la LFPDPPP, respondemos solicitudes ARCO y de borrado en 20 días hábiles y no vendemos tus datos.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, ownOgImage: true });

const AVISO = "/docs/aviso-de-privacidad/";
const BORRADO = "/docs/instrucciones-de-borrado-de-informacion/";
const TERMINOS = "/docs/terminos-y-condiciones/";

const link = "font-semibold text-ink underline decoration-lime decoration-2 underline-offset-2";

const FAQ = [
  {
    q: "¿Cómo pido que borren mi información?",
    a: `Escribe a ${CONTACT_EMAIL} con el asunto «Solicitud de borrado de información», tu nombre completo, el correo de tu cuenta, qué quieres borrar y una identificación oficial. Respondemos en un máximo de 20 días hábiles.`,
  },
  {
    q: "¿Venden o comparten mis datos?",
    a: "No vendemos, cedemos ni transferimos tus datos personales a terceros sin tu consentimiento. Las excepciones son las que prevé la LFPDPPP y los proveedores tecnológicos que necesitamos para darte el servicio, con obligaciones de confidencialidad.",
  },
  {
    q: "¿root tiene certificaciones de seguridad?",
    a: "Hoy no publicamos certificaciones de terceros. Lo que sí publicamos es nuestro aviso de privacidad conforme a la LFPDPPP y el proceso para ejercer tus derechos ARCO y pedir el borrado. Si tu área de compras tiene un cuestionario de seguridad, escríbenos y lo vemos.",
  },
  {
    q: "¿De quién son las conversaciones con mis clientes?",
    a: "De tu empresa. En root las conversaciones pasan por el número de tu empresa, con la API oficial de WhatsApp Business. Si un vendedor se va, la cartera y el historial se quedan contigo.",
  },
  {
    q: "¿Puedo dejar de recibir comunicaciones comerciales?",
    a: `Sí. Escribe a ${CONTACT_EMAIL} y dejamos de usar tus datos para promociones y encuestas. Eso no afecta el servicio que contrataste.`,
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: TITLE,
          description: DESCRIPTION,
          url: absoluteUrl(PATH),
          inLanguage: "es-MX",
        }}
      />
      <PageHero
        kicker="Seguridad y privacidad"
        title="Cómo cuidamos tus datos"
        intro="Tus conversaciones con clientes son el corazón de tu negocio. Aquí te contamos, sin letra chica, qué datos tratamos, para qué y cómo pedir que los corrijamos o los borremos."
        breadcrumbs={[{ name: "Seguridad y privacidad", href: PATH }]}
        cta="seguridad-hero"
        ctas={null}
      />

      <Section tone="claro" labelledBy="compromisos-titulo">
        <SectionHeader
          id="compromisos-titulo"
          kicker="Lo que publicamos"
          title="Nuestros compromisos con tus datos"
          intro="Todo lo de esta lista está en nuestros documentos legales, con la misma redacción de fondo."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <CheckList
            items={[
              <>
                Tratamos tus datos conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP). Lo explica nuestro{" "}
                <Link href={AVISO} className={link}>
                  aviso de privacidad
                </Link>
                .
              </>,
              "Puedes acceder, rectificar, cancelar u oponerte al tratamiento de tus datos (derechos ARCO). Respondemos en un máximo de 20 días hábiles.",
              <>
                Puedes pedir el borrado de tu información. El proceso está en{" "}
                <Link href={BORRADO} className={link}>
                  instrucciones de borrado
                </Link>{" "}
                y también tarda como máximo 20 días hábiles.
              </>,
              "No vendemos, cedemos ni transferimos tus datos a terceros sin tu consentimiento, salvo lo que prevé la ley o lo que necesitan nuestros proveedores tecnológicos para darte el servicio.",
            ]}
          />
          <CheckList
            items={[
              "Las conversaciones pasan por el número de tu empresa, con la API oficial de WhatsApp Business. La cartera es tuya, no del vendedor.",
              "Cada persona de tu equipo entra con su propio usuario. Eres responsable de cuidar las credenciales de tu cuenta y de avisarnos si ves un uso no autorizado.",
              <>
                Las reglas de uso, pagos y cancelación están en los{" "}
                <Link href={TERMINOS} className={link}>
                  términos y condiciones
                </Link>
                .
              </>,
              `Para cualquier duda de privacidad, escribe a ${CONTACT_EMAIL}.`,
            ]}
          />
        </div>
      </Section>

      <ProductByNextia />

      <Section tone="claro" labelledBy="datos-titulo">
        <SectionHeader
          id="datos-titulo"
          kicker="Qué datos tratamos"
          title="Qué datos recabamos y para qué los usamos"
          intro="Es el resumen del aviso de privacidad. Si algo no coincide, manda el aviso."
        />
        <div className="mt-10">
          <FeatureGrid
            items={[
              {
                title: "Qué datos",
                text: "Nombre, correo, teléfono o WhatsApp, nombre y giro de tu empresa, y datos de uso de la plataforma.",
                icon: "file",
              },
              {
                title: "Para qué",
                text: "Darte el servicio, gestionar tu cuenta, darte soporte, cobrar y emitir comprobantes, y cumplir obligaciones legales.",
                icon: "check",
                role: "agente",
              },
              {
                title: "Lo opcional",
                text: "Promociones y encuestas de satisfacción. Si no las quieres, escríbenos y dejamos de usarlos para eso.",
                icon: "mail",
                role: "equipo",
              },
            ]}
          />
        </div>
      </Section>

      <Faq items={FAQ} title="Preguntas sobre tus datos" />

      <CtaBand
        kicker="¿Tu área de compras tiene preguntas?"
        title="Te respondemos con nuestros documentos en la mano"
        text="Escríbenos por WhatsApp y revisamos juntos el aviso de privacidad, los términos y lo que necesite tu equipo para decidir."
        cta="seguridad-final"
      />
    </>
  );
}
