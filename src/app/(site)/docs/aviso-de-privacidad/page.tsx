import { LegalPage } from "@/components/legal";
import { pageMetadata } from "@/lib/seo";
import { ADDRESS_LINE, CONTACT_EMAIL } from "@/lib/site";

const PATH = "/docs/aviso-de-privacidad";

export const metadata = pageMetadata({
  title: "Aviso de privacidad",
  description: "Aviso de privacidad de root (goroot.ai): qué datos personales recabamos, para qué los usamos y cómo ejercer tus derechos ARCO conforme a la LFPDPPP.",
  path: PATH,
});

const Mail = () => <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

/* Texto legal del sitio anterior (goroot.ai/docs/aviso-de-privacidad, marzo 2026), sin cambios de fondo. */
export default function AvisoDePrivacidad() {
  return (
    <LegalPage title="Aviso de privacidad" path={PATH} updated="marzo 2026">
      <h2>1. Identidad y domicilio del Responsable</h2>
      <p>
        Root (en adelante &quot;Root&quot; o &quot;el Responsable&quot;), con domicilio en {ADDRESS_LINE}, CDMX, es responsable del tratamiento de sus datos
        personales conforme a lo establecido en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
      </p>

      <h2>2. Datos personales que recabamos</h2>
      <p>Para llevar a cabo las finalidades descritas en este aviso, recabamos los siguientes datos personales:</p>
      <ul>
        <li>Nombre completo</li>
        <li>Correo electrónico</li>
        <li>Número de teléfono / WhatsApp</li>
        <li>Nombre y giro de la empresa</li>
        <li>Datos de uso de la plataforma</li>
      </ul>

      <h2>3. Finalidades del tratamiento</h2>
      <p>Sus datos personales serán utilizados para las siguientes finalidades primarias:</p>
      <ul>
        <li>Proveer los servicios contratados de la plataforma Root</li>
        <li>Gestionar su cuenta y acceso a la plataforma</li>
        <li>Brindar soporte técnico y atención al cliente</li>
        <li>Procesar pagos y emitir comprobantes fiscales</li>
        <li>Cumplir con obligaciones legales y contractuales</li>
      </ul>
      <p>Finalidades secundarias:</p>
      <ul>
        <li>Envío de comunicaciones comerciales y promociones</li>
        <li>Encuestas de satisfacción y mejora del servicio</li>
      </ul>
      <p>
        Si no desea que sus datos sean tratados para las finalidades secundarias, puede manifestarlo enviando un correo a <Mail />.
      </p>

      <h2>4. Transferencia de datos</h2>
      <p>
        Root no vende, cede ni transfiere sus datos personales a terceros sin su consentimiento, salvo en los casos previstos por la LFPDPPP o cuando sea
        necesario para la prestación del servicio con proveedores tecnológicos bajo estrictas obligaciones de confidencialidad.
      </p>

      <h2>5. Derechos ARCO</h2>
      <p>
        Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales (derechos ARCO). Para ejercer estos derechos,
        envíe su solicitud a <Mail /> indicando su nombre completo, descripción clara del derecho que desea ejercer y cualquier documento que acredite su
        identidad.
      </p>
      <p>Responderemos a su solicitud en un plazo máximo de 20 días hábiles.</p>

      <h2>6. Uso de cookies y tecnologías de rastreo</h2>
      <p>
        Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia, analizar el tráfico y personalizar el contenido. Puede
        deshabilitar las cookies desde la configuración de su navegador, aunque esto puede afectar el funcionamiento del sitio.
      </p>

      <h2>7. Cambios al aviso de privacidad</h2>
      <p>
        Nos reservamos el derecho de modificar este aviso en cualquier momento. Las modificaciones serán publicadas en esta página con la fecha de
        actualización correspondiente. Le recomendamos revisarlo periódicamente.
      </p>

      <h2>8. Contacto</h2>
      <p>Para cualquier duda o aclaración respecto a este aviso de privacidad, puede contactarnos en:</p>
      <ul>
        <li>
          Email: <Mail />
        </li>
        <li>Domicilio: {ADDRESS_LINE}, CDMX</li>
      </ul>
    </LegalPage>
  );
}
