import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "root para consultorios y clínicas: agenda de citas médicas por WhatsApp";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({ kicker: "Soluciones · Consultorios y clínicas", title: "Confirma, reagenda y llena huecos de tu agenda por WhatsApp", sub: "Agenda de citas médicas por WhatsApp para clínicas con varios médicos." });
}
