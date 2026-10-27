import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Calculadora de ventas perdidas por contestar tarde";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({ kicker: "Herramienta", title: "¿Cuánto dejas en la mesa por contestar tarde?", sub: "Pon tus prospectos, tu tasa de cierre y tu ticket. Ve lo que está en juego cada mes.", dark: true });
}
