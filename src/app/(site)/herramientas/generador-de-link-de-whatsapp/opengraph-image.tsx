import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Generador de link de WhatsApp con mensaje";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({ kicker: "Herramienta", title: "Crea tu link de WhatsApp con mensaje", sub: "Número + mensaje = link wa.me listo para copiar. Se arma en tu navegador.", dark: true });
}
