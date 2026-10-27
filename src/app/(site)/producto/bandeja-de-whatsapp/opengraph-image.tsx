import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Bandeja de WhatsApp Business API de root: todo tu equipo en el número de tu empresa";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({
    kicker: "Bandeja de WhatsApp · root",
    title: "Una bandeja de WhatsApp para todo tu equipo, en el número de tu empresa",
    sub: "API oficial de WhatsApp Business. La cartera es tuya, no del vendedor.",
  });
}
