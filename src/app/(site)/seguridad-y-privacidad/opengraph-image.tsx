import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Seguridad y privacidad en root: cómo cuidamos tus datos";
export const dynamic = "force-static";

export default function Image() {
  return ogCard({ kicker: "Seguridad y privacidad", title: "Cómo cuidamos tus datos", sub: "Aviso de privacidad conforme a la LFPDPPP, derechos ARCO y borrado de información." });
}
