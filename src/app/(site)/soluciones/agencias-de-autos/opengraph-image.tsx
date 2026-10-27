import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { SEO } from "./_data";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = SEO.title;
export const dynamic = "force-static";

export default function Image() {
  return ogCard(SEO.og);
}
