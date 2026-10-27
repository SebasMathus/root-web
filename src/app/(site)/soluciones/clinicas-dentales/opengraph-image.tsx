import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "root para clínicas dentales: CRM dental para cerrar más presupuestos por WhatsApp";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({ kicker: "Soluciones · Clínicas dentales", title: "CRM dental para cerrar más presupuestos por WhatsApp", sub: "Tu agente contesta, agenda la valoración y da seguimiento a cada presupuesto. Tu equipo cierra." });
}
