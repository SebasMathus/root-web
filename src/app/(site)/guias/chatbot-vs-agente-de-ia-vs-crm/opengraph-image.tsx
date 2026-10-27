import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Chatbot, agente de IA o CRM: qué necesita tu WhatsApp de ventas";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({ kicker: "Guía", title: "Chatbot, agente de IA o CRM: qué necesita tu WhatsApp", sub: "Qué resuelve cada uno, en qué se quedan cortos y cuándo te conviene tenerlos juntos." });
}
