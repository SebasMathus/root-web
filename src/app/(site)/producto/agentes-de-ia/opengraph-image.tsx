import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Agentes de IA para WhatsApp de root: atienden, califican y dan seguimiento";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({
    kicker: "Agentes de IA · root",
    title: "Agentes de IA para WhatsApp que atienden, califican y dan seguimiento",
    sub: "Tu agente contesta y califica. Tu equipo cierra. Tú ves todo.",
  });
}
