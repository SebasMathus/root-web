import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Alternativas a Leadsales para equipos comerciales en México";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({
    kicker: "Alternativas",
    title: "Alternativas a Leadsales en México",
    sub: "root, Vambe y la app de WhatsApp Business, con precios en pesos y fuentes públicas.",
  });
}
