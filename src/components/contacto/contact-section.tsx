import { Icon } from "@/components/icons";
import { Container, CtaButton, keepRootCase } from "@/components/ui";
import { ContactForm } from "./contact-form";

/**
 * Sección #contacto: formulario «Contacto root» + WhatsApp como alternativa. Bloque oscuro de cierre (sustituye a
 * CtaBand en las páginas que la usan). Los CTA de la misma página llegan aquí con `ContactButton` (href="#contacto").
 */
export function ContactSection({
  path,
  cta,
  kicker = "Agenda una demo",
  title = "Te mostramos root con los casos de tu equipo",
  text = "Déjanos tus datos y te contactamos en menos de 24 horas hábiles. Te decimos qué plan te conviene y cómo sería tu semana de arranque.",
}: {
  /** Ruta de la página (llena `origen` aun sin JS; al enviar se toma de la URL real). */
  path: string;
  /** Prefijo de los data-cta y de los id de los campos. */
  cta: string;
  kicker?: string;
  title?: React.ReactNode;
  text?: React.ReactNode;
}) {
  return (
    <section id="contacto" className="theme-dark grid-bg scroll-mt-24" aria-labelledby={`${cta}-titulo`}>
      <Container className="py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:items-start">
          <div className="max-w-xl">
            <p className="kicker text-lime">{keepRootCase(kicker)}</p>
            <h2 id={`${cta}-titulo`} className="h-section mt-3 text-ink">
              {title}
            </h2>
            <p className="lead mt-5">{text}</p>
            <ul className="mt-7 flex flex-col gap-3 text-[15px] text-muted">
              {["Te contactamos en menos de 24 horas hábiles", "Con los casos y sistemas de tu equipo", "Precios en pesos, sin letra chica"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2.5">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-lime" strokeWidth={2.4} />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-9 border-t border-line pt-7">
              <p className="text-sm text-muted">¿Prefieres escribirnos ahora?</p>
              <CtaButton cta={`${cta}-whatsapp`} variant="outline" className="mt-3" />
            </div>
          </div>
          <ContactForm path={path} cta={cta} />
        </div>
      </Container>
    </section>
  );
}
