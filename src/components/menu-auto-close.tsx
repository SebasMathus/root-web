"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Cierra el <details> que la contiene (el menú móvil) al tocar un enlace, al cambiar de página o con Escape.
 * El <details> vive en el layout, que persiste entre navegaciones: sin esto, el panel seguiría abierto
 * encima de la página nueva. Sin JS el menú sigue funcionando; solo hay que cerrarlo a mano.
 */
export function MenuAutoClose() {
  const ref = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  // Cada cambio de ruta cierra el panel.
  useEffect(() => {
    const details = ref.current?.closest("details");
    if (details) details.open = false;
  }, [pathname]);

  useEffect(() => {
    const details = ref.current?.closest("details");
    if (!details) return;
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("a")) details.open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && details.open) {
        details.open = false;
        details.querySelector("summary")?.focus();
      }
    };
    details.addEventListener("click", onClick);
    details.addEventListener("keydown", onKey);
    return () => {
      details.removeEventListener("click", onClick);
      details.removeEventListener("keydown", onKey);
    };
  }, []);

  return <span ref={ref} hidden />;
}
