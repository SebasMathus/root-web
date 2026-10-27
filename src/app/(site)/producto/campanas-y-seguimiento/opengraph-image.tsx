import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Seguimiento automático por WhatsApp con root: que ningún prospecto se enfríe";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({
    kicker: "Campañas y seguimiento · root",
    title: "Seguimiento automático por WhatsApp para que ningún prospecto se enfríe",
    sub: "Cadencias, rescate y el origen de cada trato.",
  });
}
