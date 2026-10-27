import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "CRM para WhatsApp: root frente a otros sistemas";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({
    kicker: "Comparativa",
    title: "CRM para WhatsApp: root frente a otros sistemas",
    sub: "Bots, agentes de IA sueltos y CRMs por tipo: precio en pesos, IA incluida y relevo con historial.",
  });
}
