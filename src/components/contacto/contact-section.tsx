import { CtaBand } from "@/components/ui";

/**
 * Sección #contacto de la portada, /precios y /contacto: el mismo cierre con formulario que `CtaBand`, con el texto
 * de «Agenda una demo» y sin el enlace secundario a precios.
 */
export function ContactSection({
  cta,
  kicker = "Agenda una demo",
  title = "Te mostramos root con los casos de tu equipo",
  text,
}: {
  /** Prefijo de los data-cta y de los id de los campos. */
  cta: string;
  kicker?: string;
  title?: React.ReactNode;
  text?: React.ReactNode;
}) {
  return <CtaBand cta={cta} kicker={kicker} title={title} text={text} secondary={null} />;
}
