import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Precios de root: CRM para WhatsApp con agentes de IA, en pesos y sin letra chica.";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({
    kicker: "Precios",
    title: "Precios en pesos, sin letra chica",
    sub: "Básico $4,999 · Pro $10,599 con agentes de IA · Enterprise a convenir. Mensajes de Meta sin sobreprecio.",
  });
}
