import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { ADDRESS, CONTACT_EMAIL, DEFAULT_DESCRIPTION, PARENT, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", weight: ["700", "800"], variable: "--font-jakarta" });
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", weight: ["500"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "root · CRM de WhatsApp con agentes de IA para equipos de ventas", template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PARENT.name, url: PARENT.url }],
  publisher: SITE_NAME,
  formatDetection: { telephone: false, address: false, email: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = { themeColor: "#FAFAF7", width: "device-width", initialScale: 1 };

/** Contenedor de Google Tag Manager de goroot.ai: GA4 y Google Ads viven dentro de GTM, no hay gtag.js en el código. */
const GTM_ID = "GTM-PCXDHXNC";
const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

const ORGANIZATION = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon.svg`,
      email: CONTACT_EMAIL,
      description: DEFAULT_DESCRIPTION,
      parentOrganization: { "@type": "Organization", name: PARENT.name, url: PARENT.url },
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS.street,
        addressLocality: ADDRESS.locality,
        addressRegion: ADDRESS.region,
        postalCode: ADDRESS.postalCode,
        addressCountry: ADDRESS.country,
      },
      areaServed: "MX",
      contactPoint: { "@type": "ContactPoint", contactType: "sales", url: `${SITE_URL}/contacto/`, email: CONTACT_EMAIL, availableLanguage: ["Spanish"] },
    },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: SITE_NAME, inLanguage: "es-MX", publisher: { "@id": `${SITE_URL}/#organization` } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${jakarta.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        {/* Google Tag Manager: lo más arriba posible del <head> (snippet oficial). */}
        <script dangerouslySetInnerHTML={{ __html: GTM_SNIPPET }} />
      </head>
      <body>
        {/* Google Tag Manager (noscript), al inicio del <body>. */}
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        <JsonLd data={ORGANIZATION} />
        {children}
        {/* Tag de root (CRM), como en nextia-web: <script defer> directo en el HTML estático. page_view (también en navegación interna, data-spa-pageviews viene activo por defecto)
            y form_submit de cada <form>, p. ej. «Contacto root» (src/components/contacto). */}
        <script src="https://cdn.goroot.ai/tag_v0.8.js" data-org="root-ai" defer></script>
      </body>
    </html>
  );
}
