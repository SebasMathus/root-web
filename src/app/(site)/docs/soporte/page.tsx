import Link from "next/link";
import { LegalPage } from "@/components/legal";
import { pageMetadata } from "@/lib/seo";
import { ADDRESS_LINE, CONTACT_EMAIL } from "@/lib/site";

const PATH = "/docs/soporte";

export const metadata = pageMetadata({
  title: "Soporte de root: horario y contacto",
  description: "Soporte de root: escríbenos a sebastian@goroot.ai. Lunes a viernes de 9:00 a 18:00 h (CDMX); respondemos en menos de 24 horas hábiles.",
  path: PATH,
});

/* Contenido del sitio anterior (goroot.ai/docs/soporte). */
export default function Soporte() {
  return (
    <LegalPage title="Centro de soporte" path={PATH} kicker="Soporte" intro="Estamos aquí para ayudarte.">
      <h2>Contacto directo</h2>
      <p>Para soporte técnico o cualquier duda sobre tu cuenta, contáctanos directamente:</p>
      <ul>
        <li>
          Correo: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </li>
      </ul>
      <p>
        ¿Aún no usas root? <Link href="/contacto/#contacto">Agenda una demo</Link>.
      </p>

      <h2>Horario de atención</h2>
      <p>Lunes a viernes de 9:00 a 18:00 hrs (Ciudad de México, GMT-6). Respondemos todos los mensajes en menos de 24 horas hábiles.</p>

      <h2>Dirección</h2>
      <p>{ADDRESS_LINE}, CDMX</p>
    </LegalPage>
  );
}
