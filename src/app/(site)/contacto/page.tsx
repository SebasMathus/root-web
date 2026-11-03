import { ContactSection } from "@/components/contacto/contact-section";
import { CtaButton, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { SUPPORT_HOURS } from "@/lib/site";

/* Contacto: formulario «Contacto root» (#contacto) y, al enviarlo, la agenda de la demo en Google Calendar. Las páginas sin formulario propio enlazan aquí. */

export const metadata = pageMetadata({
  title: "Contacto: agenda una demo de root",
  description: "Déjanos tus datos y elige el horario de tu demo de root, el CRM de WhatsApp con agentes de IA, con los casos de tu equipo.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Contacto", href: "/contacto" }]}
        kicker="Contacto"
        title="Agenda una demo de root"
        intro="Cuéntanos de tu equipo de ventas y te mostramos cómo tus agentes contestan, califican y dan seguimiento desde el número de tu empresa."
        ctas={<CtaButton label="Ir al formulario" cta="contacto-hero" size="lg" />}
        note={SUPPORT_HOURS}
      />
      <ContactSection cta="contacto" kicker="Agenda una demo" />
    </>
  );
}
