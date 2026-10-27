import { useId } from "react";
import { PARENT } from "@/lib/site";

/*
 * Logotipo de root, refresh del plan §5.1 (DESIGN.md › Logo).
 * Wordmark vectorial en una retícula de altura de x = 100 u (línea base y = 130, altura de x y = 30, asta de la
 * «t» y = 4), trazo constante de 25 u (la barra de la «t», 21 u). La doble «o» es un ∞ hecho de dos círculos
 * (radio 29 u, centros a ±46 u) unidos por tangentes que se cruzan; en el cruce, cuatro cuñas (trampas de tinta)
 * adelgazan el trazo ~8 % para que no se empaste a 20 px. El gancho de la «t» usa el mismo radio que el ∞.
 * Interletraje abierto: 16 u entre «r» y ∞ y entre ∞ y «t» (el PNG anterior tenía ~13 u).
 */

export const WORDMARK_VIEWBOX = { width: 329, height: 130 };
const STROKE = 25;
const R_STEM = "M12.5 130V30";
const R_ARM = "M12.5 90C12.5 58 29.5 42.5 50.5 42.5H62";
/** ∞ centrado en (165.5, 74); empieza y termina en el cruce (útil para dibujarlo con stroke-dashoffset). */
export const INFINITY_PATH = "M165.5 74L193.22 51.49A29 29 0 1 1 193.22 96.51L137.78 51.49A29 29 0 1 0 137.78 96.51Z";
const INFINITY_TRAPS =
  "M165.5 60.3L156.19 50.33L174.81 50.33ZM165.5 87.7L156.19 97.67L174.81 97.67ZM148.07 74L136.36 66.43L136.36 81.57ZM182.93 74L194.64 66.43L194.64 81.57Z";
const T_STEM = "M296.5 4V88.5A29 29 0 0 0 325.5 117.5H329";
const T_BAR = "M269 41H329";

/** Colores fijos de marca (no cambian con el tono de la sección). */
export const BRAND = { ink: "#0B0B0C", paper: "#FAFAF7", paperDark: "#F5F5F0", lime: "#C6F36B" };

type Tone = "auto" | "ink" | "paper";
const toneColor = (tone: Tone) => (tone === "ink" ? BRAND.ink : tone === "paper" ? BRAND.paperDark : "var(--ink)");

/** ∞ con las trampas de tinta en el cruce. Las coordenadas son las del wordmark. */
function Infinity8({ color, maskId }: { color: string; maskId: string }) {
  return (
    <>
      <mask id={maskId} maskUnits="userSpaceOnUse" x="60" y="20" width="212" height="110">
        <rect x="60" y="20" width="212" height="110" fill="#fff" />
        <path fill="#000" d={INFINITY_TRAPS} />
      </mask>
      <path d={INFINITY_PATH} mask={`url(#${maskId})`} fill="none" stroke={color} strokeWidth={STROKE} strokeLinejoin="round" />
    </>
  );
}

/**
 * Wordmark «root». `height` en px (el ancho sale de la proporción 329:130).
 * tone: "auto" usa --ink (positivo en claro, negativo dentro de .theme-dark), "ink" positivo fijo, "paper" negativo fijo.
 * accent: el ∞ en lima (solo marketing sobre tinta, nunca en la navegación).
 */
export function RootLogo({
  height = 28,
  tone = "auto",
  accent = false,
  className = "",
  title = "root",
}: {
  height?: number;
  tone?: Tone;
  accent?: boolean;
  className?: string;
  /** Nombre accesible. Pasa "" si el logo va junto a texto que ya dice «root». */
  title?: string;
}) {
  const id = useId().replace(/:/g, "");
  const color = toneColor(tone);
  const width = Math.round((height * WORDMARK_VIEWBOX.width) / WORDMARK_VIEWBOX.height);
  return (
    <svg
      viewBox={`0 0 ${WORDMARK_VIEWBOX.width} ${WORDMARK_VIEWBOX.height}`}
      width={width}
      height={height}
      className={`shrink-0 ${className}`}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g fill="none" stroke={color} strokeWidth={STROKE}>
        <path d={R_STEM} />
        <path d={R_ARM} />
        <path d={T_STEM} />
        <path d={T_BAR} strokeWidth={21} />
      </g>
      <Infinity8 color={accent ? BRAND.lime : color} maskId={`root-inf-${id}`} />
    </svg>
  );
}

/**
 * Isotipo ∞ suelto. variant "tile": dentro de un cuadrado de esquinas redondeadas (radio 22 %), tinta sobre papel
 * o al revés (tone); "plain": solo el ∞. Tamaño mínimo 16 px.
 * tone "auto": tile de --ink con ∞ de --paper (se invierte en bloques oscuros). "accent": tile de tinta con ∞ lima.
 */
export function RootMark({
  size = 32,
  variant = "tile",
  tone = "auto",
  className = "",
  title = "",
}: {
  size?: number;
  variant?: "tile" | "plain";
  tone?: "auto" | "ink" | "paper" | "accent";
  className?: string;
  title?: string;
}) {
  const id = useId().replace(/:/g, "");
  const bg = tone === "ink" ? BRAND.ink : tone === "paper" ? BRAND.paper : tone === "accent" ? BRAND.ink : "var(--ink)";
  const fg =
    variant === "plain"
      ? tone === "accent"
        ? BRAND.lime
        : toneColor(tone === "paper" ? "paper" : tone === "ink" ? "ink" : "auto")
      : tone === "ink"
        ? BRAND.paper
        : tone === "paper"
          ? BRAND.ink
          : tone === "accent"
            ? BRAND.lime
            : "var(--paper)";
  const a11y = title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };
  if (variant === "plain") {
    return (
      <svg viewBox="72 26 187 96" width={size} height={Math.round((size * 96) / 187)} className={`shrink-0 ${className}`} focusable="false" {...a11y}>
        <Infinity8 color={fg} maskId={`root-mark-${id}`} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 230 230" width={size} height={size} className={`shrink-0 ${className}`} focusable="false" {...a11y}>
      <rect width="230" height="230" rx="50.6" fill={bg} />
      <g transform="translate(-50.5 41)">
        <Infinity8 color={fg} maskId={`root-mark-${id}`} />
      </g>
    </svg>
  );
}

/**
 * ∞ animado (cargador y nodo central de diagramas): la pista siempre está dibujada; encima el trazo se dibuja en
 * 1.2 s y un destello lima recorre el bucle despacio. CSS puro (globals.css › .mark-draw, .mark-comet): con
 * movimiento reducido queda el ∞ completo y quieto. Decorativo: aria-hidden.
 */
export function RootMarkAnimated({ size = 64, tile = true, className = "" }: { size?: number; tile?: boolean; className?: string }) {
  const fg = tile ? "var(--paper)" : "var(--ink)";
  const inner = (
    <>
      <path d={INFINITY_PATH} fill="none" stroke={fg} strokeOpacity={0.22} strokeWidth={STROKE} strokeLinejoin="round" />
      <path className="mark-draw" pathLength={1} d={INFINITY_PATH} fill="none" stroke={fg} strokeWidth={STROKE} strokeLinejoin="round" />
      <path
        className="mark-comet"
        pathLength={1}
        d={INFINITY_PATH}
        fill="none"
        stroke={BRAND.lime}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
  if (!tile) {
    return (
      <svg viewBox="72 26 187 96" width={size} height={Math.round((size * 96) / 187)} className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
        {inner}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 230 230" width={size} height={size} className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <rect width="230" height="230" rx="50.6" fill="var(--ink)" />
      <g transform="translate(-50.5 41)">{inner}</g>
    </svg>
  );
}

/** Proporción de los PNG del logotipo de Nextia (1078 × 257 px). */
const NEXTIA_RATIO = 1078 / 257;

/** Logotipo de Nextia (imagen). Ancho y alto fijos: no mueve el texto al cargar. */
export function NextiaLogo({ dark = false, height = 18, className = "" }: { dark?: boolean; height?: number; className?: string }) {
  const width = Math.round(height * NEXTIA_RATIO);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={dark ? "/nextia-logo-white.png" : "/nextia-logo.png"} alt="Nextia" width={width} height={height} style={{ height, width }} className={className} />;
}

/** Firma «root · a product by Nextia» en una línea. dark: para fondos de tinta. */
export function ProductByNextiaSignature({ dark = false, size = 22, className = "" }: { dark?: boolean; size?: number; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 ${className}`}>
      <RootLogo height={size} tone={dark ? "paper" : "ink"} />
      <span className={`h-5 w-px ${dark ? "bg-white/25" : "bg-black/15"}`} aria-hidden="true" />
      <a
        href={PARENT.url}
        rel="noopener"
        className={`inline-flex items-center gap-2.5 text-[13px] font-medium ${dark ? "text-white/70 hover:text-white" : "text-[#5E5E5A] hover:text-[#0B0B0C]"}`}
      >
        a product by
        <NextiaLogo dark={dark} height={Math.round(size * 0.78)} />
      </a>
    </span>
  );
}
