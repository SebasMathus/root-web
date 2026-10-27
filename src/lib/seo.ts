import type { Metadata } from "next";
import { LOCALE, SITE_NAME } from "./site";

/**
 * Imagen para compartir por defecto (public/og/root.png, 1200×630, hecha con lib/og.tsx › ogCard).
 * Si la carpeta de la página tiene su propio `opengraph-image.tsx`, pasa `ownOgImage: true` a pageMetadata: si no,
 * esta imagen por defecto gana sobre la del archivo.
 */
export const DEFAULT_OG_IMAGE = { url: "/og/root.png", width: 1200, height: 630, alt: "root · CRM de WhatsApp con agentes de IA. Que nadie se quede en visto." };

export type PageSeo = {
  /** Título SIN « | root»: el layout raíz lo agrega con title.template. Máx. ~55 caracteres. */
  title: string;
  /** 140–160 caracteres, con la búsqueda principal al inicio y un beneficio concreto. */
  description: string;
  /** Ruta del sitio con «/» inicial («/precios»). Se publica con «/» final (trailingSlash). */
  path: string;
  /** true en páginas que no deben indexarse. */
  noindex?: boolean;
  /** Portada: usa el título tal cual, sin la plantilla « | root». */
  absoluteTitle?: boolean;
  /** Para artículos del blog. */
  type?: "website" | "article";
  publishedTime?: string;
  /** true si la carpeta de la ruta tiene su propio opengraph-image.tsx (no se pone la imagen por defecto). */
  ownOgImage?: boolean;
};

/** «/precios» → «/precios/»; «/» se queda igual. Respeta «#ancla» y «?query»: «/a#b» → «/a/#b». Coincide con trailingSlash: true. */
export const withSlash = (href: string) => {
  const cut = href.search(/[?#]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const rest = cut === -1 ? "" : href.slice(cut);
  if (path === "") return href;
  return (path === "/" || path.endsWith("/") ? path : `${path}/`) + rest;
};

/** Metadatos estándar de una página: canonical, Open Graph, Twitter y robots. */
export function pageMetadata({ title, description, path, noindex, absoluteTitle, type = "website", publishedTime, ownOgImage }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const url = withSlash(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: LOCALE,
      title: fullTitle,
      description,
      ...(ownOgImage ? {} : { images: [DEFAULT_OG_IMAGE] }),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, ...(ownOgImage ? {} : { images: [DEFAULT_OG_IMAGE.url] }) },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
