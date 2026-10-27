import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Producto de root: el CRM de WhatsApp con agentes de IA, pieza por pieza";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({
    kicker: "Producto · root",
    title: "El CRM de WhatsApp con agentes de IA, pieza por pieza",
    sub: "Tu agente contesta y califica. Tu equipo cierra. Tú ves todo.",
    dark: true,
  });
}
