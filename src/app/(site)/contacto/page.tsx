import { ContactSection } from "@/components/contacto/contact-section";
import { ContactButton, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { SUPPORT_HOURS } from "@/lib/site";

/* Contacto: formulario «Contacto root» (#contacto) con WhatsApp como alternativa. Las páginas sin formulario propio pueden enlazar aquí. */

export const metadata = pageMetadata({
  title: "Contacto: agenda una demo de root",
  description: "Déjanos tus datos y te contactamos en menos de 24 horas hábiles para mostrarte root, el CRM de WhatsApp con agentes de IA, con los casos de tu equipo.",
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
        ctas={<ContactButton label="Ir al formulario" cta="contacto-hero" size="lg" />}
        note={SUPPORT_HOURS}
      />
      <ContactSection path="/contacto/" cta="contacto" kicker="Agenda una demo" />
    </>
  );
}
