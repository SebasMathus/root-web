/*
 * Lienzo de escena con escala uniforme (DESIGN.md › Escenas, regla 5): el contenedor declara container-type y el
 * lienzo toma su font-size del ancho (cqw), así que todo lo que va dentro, medido en em, escala parejo.
 * `base` = ancho de diseño en px (a ese ancho 1em = 16 px). Sin hooks: sirve en componentes de servidor y de cliente.
 * Úsalo cuando una figura necesita dos lienzos (uno por punto de quiebre) o paneles separados; para un lienzo
 * único está <Scene> del kit.
 */
export function Canvas({ base, aspect, className = "", innerClassName = "", children }: { base: number; aspect?: string; className?: string; innerClassName?: string; children: React.ReactNode }) {
  return (
    <div className={`@container ${className}`}>
      <div aria-hidden="true" className={`relative select-none ${innerClassName}`} style={{ fontSize: `${(1600 / base).toFixed(4)}cqw`, aspectRatio: aspect }}>
        {children}
      </div>
    </div>
  );
}

/** Iniciales en un círculo (vendedores del equipo, color cielo). Medido en em. */
export function Avatar({ initials, tone = "equipo", className = "" }: { initials: string; tone?: "equipo" | "neutral"; className?: string }) {
  const c = tone === "equipo" ? "bg-sky-soft text-sky" : "bg-surface-2 text-muted";
  return <span className={`grid size-[1.9em] shrink-0 place-items-center rounded-full font-semibold leading-none ${c} ${className}`}>{initials}</span>;
}
