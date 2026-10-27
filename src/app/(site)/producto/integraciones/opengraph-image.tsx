import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Integraciones de root: WhatsApp con Salesforce, SAP, HubSpot y Excel";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({
    kicker: "Integraciones · root",
    title: "root se conecta con Salesforce, SAP, HubSpot y Excel",
    sub: "De sistemas de registro a sistemas de acción.",
  });
}
