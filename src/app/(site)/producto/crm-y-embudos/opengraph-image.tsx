import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "CRM para WhatsApp de root: cada prospecto con etapa, dueño y siguiente paso";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({
    kicker: "CRM y embudos · root",
    title: "Un CRM para WhatsApp donde cada prospecto tiene etapa, dueño y siguiente paso",
    sub: "Tu agente contesta y califica. Tu equipo cierra. Tú ves todo.",
  });
}
