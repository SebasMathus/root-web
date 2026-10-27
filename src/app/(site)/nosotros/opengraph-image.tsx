import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Nosotros: hacemos root, el CRM de WhatsApp con agentes de IA, en la Ciudad de México. Un producto de Nextia.";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({ kicker: "Nosotros", title: "Hacemos root en la Ciudad de México", sub: "CRM de WhatsApp con agentes de IA. Un producto de Nextia.", dark: true });
}
