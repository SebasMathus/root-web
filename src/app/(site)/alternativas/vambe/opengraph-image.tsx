import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Alternativas a Vambe para equipos comerciales en México";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({
    kicker: "Alternativas",
    title: "Alternativas a Vambe en México",
    sub: "root, Leadsales y la app de WhatsApp Business, con precios en pesos y fuentes públicas.",
  });
}
