import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "root · CRM de WhatsApp con agentes de IA. Que nadie se quede en visto.";
export const dynamic = "force-static";

/** Fuente de public/og/root.png: tras cambiarla, copia out/opengraph-image a public/og/root.png (README). */
export default function Image() {
  return ogCard({ kicker: "CRM de WhatsApp con agentes de IA", title: "Que nadie se quede en visto.", sub: "Tu agente contesta y califica. Tu equipo cierra. Tú ves todo.", dark: true });
}
