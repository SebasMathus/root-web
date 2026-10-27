import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "root para laboratorios clínicos: cotiza estudios y agenda tomas por WhatsApp";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({ kicker: "Soluciones · Laboratorios clínicos", title: "Cotiza estudios y agenda tomas por WhatsApp", sub: "Precio, preparación y toma en sucursal o a domicilio, sin saturar tu recepción." });
}
