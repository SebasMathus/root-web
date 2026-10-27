import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "root vs Vambe: qué cambia para un equipo comercial en México";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({
    kicker: "Comparativa",
    title: "root vs Vambe",
    sub: "Precio en pesos, implementación, IVA y quién lleva la venta. Datos públicos revisados en octubre de 2026.",
  });
}
