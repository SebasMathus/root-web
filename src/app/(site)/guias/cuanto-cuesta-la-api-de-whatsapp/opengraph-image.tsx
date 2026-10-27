import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Cuánto cuesta la API de WhatsApp en México";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({ kicker: "Guía", title: "Cuánto cuesta la API de WhatsApp en México", sub: "Cómo cobra Meta cada mensaje, qué es gratis y cómo calcular tu costo en pesos con la tabla oficial." });
}
