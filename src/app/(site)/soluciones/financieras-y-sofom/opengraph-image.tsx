import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "root para financieras y Sofom: CRM de cobranza por WhatsApp";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({ kicker: "Soluciones · Financieras y Sofom", title: "CRM de cobranza por WhatsApp para financieras y Sofom", sub: "Recordatorios de pago, promesas registradas y seguimiento de crédito desde tu número." });
}
