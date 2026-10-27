import { VerticalPage } from "@/components/soluciones/vertical-page";
import { pageMetadata } from "@/lib/seo";
import { SEO, vertical } from "./_data";

export const metadata = pageMetadata({ title: SEO.title, description: SEO.description, path: vertical.path, ownOgImage: true });

export default function Page() {
  return <VerticalPage v={vertical} />;
}
