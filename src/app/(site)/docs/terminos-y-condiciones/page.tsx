import { LegalPage } from "@/components/legal";
import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

const PATH = "/docs/terminos-y-condiciones";

export const metadata = pageMetadata({
  title: "Términos y condiciones",
  description: "Términos y condiciones de uso de root (goroot.ai): servicio, uso permitido, cuentas, pagos y facturación mensual en MXN, cancelación y contacto.",
  path: PATH,
});

/* Texto legal del sitio anterior (goroot.ai/docs/terminos-y-condiciones, marzo 2026), sin cambios de fondo. */
export default function TerminosYCondiciones() {
  return (
    <LegalPage title="Términos y condiciones" path={PATH} updated="marzo 2026">
      <h2>1. Aceptación de los términos</h2>
      <p>
        Al acceder y utilizar la plataforma Root, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguno de estos
        términos, no debe usar nuestros servicios.
      </p>

      <h2>2. Descripción del servicio</h2>
      <p>
        Root es una plataforma de CRM y automatización de WhatsApp con inteligencia artificial, diseñada para empresas que desean mejorar sus procesos de
        ventas y comunicación con clientes.
      </p>

      <h2>3. Uso permitido</h2>
      <p>
        El usuario se compromete a utilizar la plataforma únicamente para fines legales y de acuerdo con estos términos. Queda prohibido el uso de Root para
        enviar spam, contenido ilegal o cualquier actividad que viole las políticas de WhatsApp Business.
      </p>

      <h2>4. Cuentas y seguridad</h2>
      <p>
        El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que ocurran bajo su cuenta. Debe
        notificar inmediatamente a Root sobre cualquier uso no autorizado.
      </p>

      <h2>5. Pagos y facturación</h2>
      <p>
        Los servicios de Root se facturan mensualmente. Los precios están expresados en MXN e incluyen IVA cuando aplique. Root se reserva el derecho de
        modificar sus precios con un aviso previo de 30 días.
      </p>

      <h2>6. Cancelación</h2>
      <p>
        El usuario puede cancelar su suscripción en cualquier momento. La cancelación tomará efecto al final del período de facturación vigente. No se
        realizan reembolsos por períodos parciales.
      </p>

      <h2>7. Limitación de responsabilidad</h2>
      <p>
        Root no será responsable por daños indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso de la plataforma. La
        responsabilidad máxima de Root se limita al monto pagado por el usuario en los últimos 3 meses.
      </p>

      <h2>8. Contacto</h2>
      <p>
        Para cualquier duda sobre estos términos: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </LegalPage>
  );
}
