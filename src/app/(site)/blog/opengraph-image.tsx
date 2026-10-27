import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Blog de root: ventas por WhatsApp, CRM y agentes de IA";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({ kicker: "Blog de root", title: "Ideas para vender mejor por WhatsApp", sub: "Ventas por WhatsApp, CRM y agentes de IA para equipos comerciales en México." });
}
