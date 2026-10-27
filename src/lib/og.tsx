import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Fuentes de la marca para Satori (TTF estáticos, OFL; next/font no sirve aquí). Se leen al compilar.
const FONT_DIR = join(process.cwd(), "src/assets/fonts");
const fonts = () => [
  { name: "Jakarta", data: readFileSync(join(FONT_DIR, "PlusJakartaSans-ExtraBold.ttf")), weight: 800 as const, style: "normal" as const },
  { name: "Inter", data: readFileSync(join(FONT_DIR, "Inter-Medium.ttf")), weight: 500 as const, style: "normal" as const },
];

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const INK = "#0B0B0C";
const PAPER = "#FAFAF7";
const MUTED = "#5E5E5A";
const LIME = "#C6F36B";

/** Wordmark de root para Satori (sin máscara: las trampas de tinta no se notan a este tamaño). */
function Wordmark({ height, color = INK, infinity = INK }: { height: number; color?: string; infinity?: string }) {
  const width = Math.round((height * 329) / 130);
  return (
    <svg width={width} height={height} viewBox="0 0 329 130">
      <g fill="none" stroke={color} strokeWidth="25">
        <path d="M12.5 130V30" />
        <path d="M12.5 90C12.5 58 29.5 42.5 50.5 42.5H62" />
        <path d="M296.5 4V88.5A29 29 0 0 0 325.5 117.5H329" />
        <path d="M269 41H329" strokeWidth="21" />
      </g>
      <path
        d="M165.5 74L193.22 51.49A29 29 0 1 1 193.22 96.51L137.78 51.49A29 29 0 1 0 137.78 96.51Z"
        fill="none"
        stroke={infinity}
        strokeWidth="25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Tarjeta de Open Graph 1200×630 para cualquier página.
 * Uso en una carpeta de ruta, archivo `opengraph-image.tsx`:
 *   import { ogCard, ogSize, ogContentType } from "@/lib/og";
 *   export const size = ogSize; export const contentType = ogContentType; export const alt = "…";
 *   export const dynamic = "force-static";
 *   export default function Image() { return ogCard({ kicker: "Precios", title: "Precios en pesos, sin letra chica" }); }
 * dark: fondo de tinta con el ∞ en lima (para portada y campañas).
 */
export function ogCard({ kicker, title, sub, dark = false }: { kicker: string; title: string; sub?: string; dark?: boolean }) {
  const bg = dark ? "#0A0A0A" : PAPER;
  const fg = dark ? "#F5F5F0" : INK;
  const muted = dark ? "#A3A39C" : MUTED;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: bg,
          backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,.04)" : "rgba(11,11,12,.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,.04)" : "rgba(11,11,12,.04)"} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          padding: "64px 72px",
          fontFamily: "Inter",
          color: fg,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Wordmark height={56} color={fg} infinity={dark ? LIME : fg} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 22, fontWeight: 500, letterSpacing: 3, color: muted }}>{upperKeepRoot(kicker)}</div>
          <div style={{ display: "flex", fontFamily: "Jakarta", fontSize: 64, fontWeight: 800, lineHeight: 1.06, letterSpacing: -1.5, maxWidth: 1040 }}>{title}</div>
          {sub ? <div style={{ display: "flex", fontSize: 28, color: muted, maxWidth: 980, lineHeight: 1.35 }}>{sub}</div> : null}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", height: 12, width: 140, background: LIME, borderRadius: 6 }} />
          <div style={{ display: "flex", fontSize: 22, color: muted }}>goroot.ai · a product by Nextia</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: fonts() },
  );
}

/** Kicker en mayúsculas sin tocar «root», que siempre va en minúsculas. */
function upperKeepRoot(text: string) {
  return text
    .split(/(\broot\b)/)
    .map((part) => (part === "root" ? part : part.toUpperCase()))
    .join("");
}
