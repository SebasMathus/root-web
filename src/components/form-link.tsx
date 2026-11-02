"use client";

/**
 * Enlace al formulario «Contacto root». Sin JS va a /contacto/#contacto; con JS, si la página actual ya tiene la
 * sección #contacto (todas las páginas comerciales la llevan al cierre), se desplaza hasta ella sin salir de la página.
 */
export function FormLink({ cta, className, children }: { cta: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href="/contacto/#contacto"
      data-cta={cta}
      className={className}
      onClick={(e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const target = document.getElementById("contacto");
        if (!target) return;
        e.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        history.replaceState(history.state, "", "#contacto");
      }}
    >
      {children}
    </a>
  );
}
