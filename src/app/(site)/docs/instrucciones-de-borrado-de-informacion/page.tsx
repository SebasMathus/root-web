import { LegalPage } from "@/components/legal";
import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

// Meta (WhatsApp Business) enlaza esta ruta exacta como instrucciones de eliminación de datos: no la muevas.
const PATH = "/docs/instrucciones-de-borrado-de-informacion";

export const metadata = pageMetadata({
  title: "Instrucciones de borrado de información",
  description: "Cómo solicitar el borrado de tu información personal en root: a quién escribir, qué incluir y en cuánto tiempo respondemos (20 días hábiles).",
  path: PATH,
});

/* Texto del sitio anterior (goroot.ai/docs/instrucciones-de-borrado-de-informacion, marzo 2026), sin cambios de fondo. */
export default function BorradoDeInformacion() {
  return (
    <LegalPage title="Instrucciones de borrado de información" path={PATH} updated="marzo 2026">
      <h2>¿Cómo solicitar el borrado de tu información?</h2>
      <p>
        De acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), tienes derecho a solicitar la cancelación
        y borrado de tus datos personales de nuestra plataforma.
      </p>

      <h2>Proceso de solicitud</h2>
      <p>Para solicitar el borrado de tu información, sigue estos pasos:</p>
      <ul>
        <li>
          Envía un correo a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> con el asunto &quot;Solicitud de borrado de información&quot;
        </li>
        <li>Incluye tu nombre completo y correo electrónico asociado a tu cuenta</li>
        <li>Especifica qué información deseas que sea eliminada</li>
        <li>Adjunta una identificación oficial para verificar tu identidad</li>
      </ul>

      <h2>Tiempos de respuesta</h2>
      <p>
        Procesaremos tu solicitud en un plazo máximo de 20 días hábiles a partir de la recepción. Te notificaremos por correo electrónico una vez que el
        proceso haya sido completado.
      </p>

      <h2>Información que puede ser retenida</h2>
      <p>
        Algunos datos pueden ser retenidos por obligaciones legales, fiscales o contractuales aún después de tu solicitud. En ese caso, te informaremos
        específicamente qué información no puede ser eliminada y por qué razón.
      </p>
    </LegalPage>
  );
}
