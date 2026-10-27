import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Comparativa de CRM de WhatsApp con IA: root, Vambe y Leadsales";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({
    kicker: "Comparativas",
    title: "CRM de WhatsApp con IA: root, Vambe y Leadsales",
    sub: "Precio por usuario, IVA, agentes de IA e integraciones, con la fuente de cada dato.",
  });
}
