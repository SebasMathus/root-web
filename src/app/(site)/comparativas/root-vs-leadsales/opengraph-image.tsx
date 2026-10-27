import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "root vs Leadsales: CRM de WhatsApp con IA incluida o con IA aparte";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({
    kicker: "Comparativa",
    title: "root vs Leadsales",
    sub: "CRM de WhatsApp con IA incluida o con IA aparte. Datos públicos revisados en octubre de 2026.",
  });
}
