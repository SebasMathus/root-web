import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "WhatsApp Business App o API: cuál necesita tu equipo";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({ kicker: "Guía", title: "WhatsApp Business App o API: cuál necesita tu equipo", sub: "Diferencias en uso en equipo, límites, riesgo de bloqueo y costo, y cómo pasarte a la API oficial." });
}
