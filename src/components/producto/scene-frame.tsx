import { Reveal } from "@/components/motion/kit";
import { ExampleTag } from "@/components/ui";

/*
 * Marco de escenas con dos composiciones (equipo «producto»).
 * Un diagrama ancho (kanban de 6 columnas, mapa de conexiones, línea de tiempo) no se lee si solo se encoge: en
 * móvil el texto quedaría en 6 px. DualScene pinta DOS lienzos con el mismo estado: el ancho (`wide`, diseñado a
 * `wideBase` px) y el angosto (`narrow`, diseñado a `narrowBase` px). Un container query sobre la <figure> muestra
 * uno u otro según el ancho real del contenedor (`breakpoint`: 480 o 620 px). Cada lienzo escala uniforme (em + cqw), los dos
 * vienen completos del servidor y van aria-hidden; la descripción va en la figcaption sr-only.
 */
/** Clases literales (Tailwind solo genera las que ve escritas completas). */
const BREAKPOINTS = {
  480: ["@max-[480px]:hidden", "@min-[480px]:hidden"],
  620: ["@max-[620px]:hidden", "@min-[620px]:hidden"],
} as const;

export function DualScene({
  caption,
  wide,
  narrow,
  wideBase = 880,
  narrowBase = 380,
  breakpoint = 620,
  reveal = true,
  className = "",
}: {
  caption: string;
  wide: React.ReactNode;
  narrow: React.ReactNode;
  wideBase?: number;
  narrowBase?: number;
  /** Ancho del contenedor (px) desde el que se usa la composición ancha. */
  breakpoint?: 480 | 620;
  reveal?: boolean;
  className?: string;
}) {
  const [hideWide, hideNarrow] = BREAKPOINTS[breakpoint];
  const canvases = (
    <>
      <div
        aria-hidden="true"
        className={`relative select-none ${hideWide}`}
        style={{ fontSize: `${(1600 / wideBase).toFixed(4)}cqw` }}
      >
        {wide}
      </div>
      <div
        aria-hidden="true"
        className={`relative select-none ${hideNarrow}`}
        style={{ fontSize: `${(1600 / narrowBase).toFixed(4)}cqw` }}
      >
        {narrow}
      </div>
    </>
  );
  return (
    <figure className={`scene ${className}`}>
      {reveal ? <Reveal>{canvases}</Reveal> : canvases}
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}

/** Etiqueta para los conceptos de «cómo trabaja root» (plan §2.1): se presentan como forma de trabajo, sin cifras. */
export function ConceptTag({ className = "" }: { className?: string }) {
  return <span className={`chip w-fit ${className}`}>Cómo trabaja root</span>;
}

/** Pie visible de una escena: «Datos de ejemplo» y, si aplica, la marca de concepto. */
export function SceneNote({ concept = false, children, className = "" }: { concept?: boolean; children?: React.ReactNode; className?: string }) {
  return (
    <div className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      <ExampleTag />
      {concept ? <ConceptTag /> : null}
      {children ? <span className="text-sm text-muted">{children}</span> : null}
    </div>
  );
}
