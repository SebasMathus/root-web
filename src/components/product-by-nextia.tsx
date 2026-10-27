import { NEXTIA_CLIENTS } from "@/lib/clients";
import { ProductByNextiaSignature } from "./brand";

/**
 * Franja «root · a product by Nextia». Va a la MITAD de cada página, entre dos secciones (DESIGN.md › Componentes).
 * Detrás corren, en dos filas y en sentidos opuestos, logos de organizaciones que han trabajado con Nextia.
 * Son clientes de Nextia, no de root: la línea de abajo lo dice. CSS puro, sin JS; con movimiento reducido
 * las filas se quedan quietas (siempre visibles).
 */
export function ProductByNextia() {
  const half = Math.ceil(NEXTIA_CLIENTS.length / 2);
  const rows = [NEXTIA_CLIENTS.slice(0, half), NEXTIA_CLIENTS.slice(half)];
  return (
    <section aria-label="root, a product by Nextia" className="theme-dark relative overflow-hidden py-16 md:py-20 border-y border-line">
      <div className="absolute inset-0 flex flex-col justify-center gap-10 md:gap-14" aria-hidden="true">
        {rows.map((row, r) => (
          <div key={r} className="marquee">
            <ul className={`marquee-track ${r === 1 ? "rev" : ""}`}>
              {[...row, ...row].map((c, i) => (
                <li key={`${c.name}-${i}`} className="flex items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.logo} alt="" className="client-logo" loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative mx-auto w-fit max-w-[calc(100%-32px)]">
        <div className="rounded-2xl border border-white/15 bg-[#0A0A0A]/85 backdrop-blur-md px-6 py-5 md:px-9 md:py-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,.7)] text-center">
          <ProductByNextiaSignature dark size={24} />
          <p className="mt-3 text-[12px] text-white/55">Detrás: algunas organizaciones que han trabajado con Nextia.</p>
        </div>
      </div>
    </section>
  );
}
