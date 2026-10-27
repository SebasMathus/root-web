import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Recursos de root: guías y herramientas para vender por WhatsApp";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({ kicker: "Recursos", title: "Guías y herramientas para vender por WhatsApp", sub: "API de WhatsApp, costos de Meta, agentes de IA, link de WhatsApp y calculadora de ventas perdidas." });
}
