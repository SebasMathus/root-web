import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { JsonLd } from "@/components/json-ld";
import { ADDRESS, CONTACT_EMAIL, DEFAULT_DESCRIPTION, PARENT, SITE_NAME, SITE_URL, WHATSAPP_URL } from "@/lib/site";
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
      contactPoint: { "@type": "ContactPoint", contactType: "sales", url: WHATSAPP_URL, availableLanguage: ["Spanish"] },
    },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: SITE_NAME, inLanguage: "es-MX", publisher: { "@id": `${SITE_URL}/#organization` } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${jakarta.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <JsonLd data={ORGANIZATION} />
        {children}
        {/* Etiqueta propia de root que ya cargaba el sitio anterior (visitas y formularios). */}
        <Script src="https://cdn.goroot.ai/tag_v0.2.js" data-org="root" strategy="afterInteractive" />
      </body>
    </html>
  );
}
