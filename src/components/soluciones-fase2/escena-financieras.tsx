"use client";
import { Enter, Scene, Thread, ThreadDivider, useSceneLoop } from "@/components/motion/kit";
import { Bubble, SceneChip, SceneExample, SceneFrame } from "./scene-parts";

/**
 * Recordatorio de pago, promesa y «ya pagué» (plan §3.3, financieras; tramos de OPP-105: preventivo, día de
 * pago, +1, +5, +10). El cliente promete pagar el lunes, manda su comprobante y la cuenta queda al corriente:
 * los toques de +5 y +10 ya no salen. Estado final: al corriente, sin pendiente para el gestor.
 * Nunca se vacía: al repetir, la conversación anterior queda como historial y la nueva entra debajo.
 */
const STEPS = [1500, 1500, 1500, 1600, 3400];

const TRAMOS = ["−3 días", "Día de pago", "+1", "+5", "+10"];

/** Cada elemento del hilo y el paso en el que aparece. */
const ITEMS: { at: number; node: React.ReactNode }[] = [
  {
    at: 0,
    node: (
      <Bubble from="agente" meta="mar 12 · 10:00">
        Hola Ricardo, tu pago de $2,350 vence el viernes 15. Te dejo los datos para pagar.
      </Bubble>
    ),
  },
  {
    at: 1,
    node: (
      <Bubble from="cliente" meta="sáb 16">
        Se me pasó, pago el lunes.
      </Bubble>
    ),
  },
  {
    at: 2,
    node: (
      <div className="flex justify-center">
        <SceneChip role="agente">Promesa registrada · lunes 18 · $2,350</SceneChip>
      </div>
    ),
  },
  {
    at: 3,
    node: (
      <Bubble from="cliente" meta="lun 18">
        Ya pagué. Va mi comprobante. <span className="mono text-[0.9em] text-muted">[comprobante.pdf]</span>
      </Bubble>
    ),
  },
  {
    at: 4,
    node: (
      <div className="flex items-center justify-between gap-[0.6em] rounded-[0.8em] bg-success-soft px-[0.8em] py-[0.55em]">
        <p className="text-[0.78em] font-semibold text-success">Cuenta al corriente</p>
        <p className="text-[0.72em] text-muted">+5 y +10 no se envían · gestor sin pendiente</p>
      </div>
    ),
  },
];

export function EscenaFinancieras() {
  const { ref, step, playing } = useSceneLoop<HTMLDivElement>(STEPS);
  const late = step >= 1;
  const promise = step >= 2;
  const done = step >= 4;
  const replaying = playing && !done;
  // Tramo en el que va la cuenta según el paso.
  const tramo = step === 0 ? 0 : 2;

  return (
    <div ref={ref}>
      <Scene
        reveal={false}
        baseWidth={520}
        caption="Ejemplo de recordatorio de pago por WhatsApp. Tres días antes del vencimiento el agente de root le recuerda a Ricardo su pago de 2,350 pesos. Un día después del vencimiento Ricardo responde que paga el lunes y el agente registra la promesa. El lunes Ricardo manda su comprobante, la cuenta queda al corriente y los recordatorios de +5 y +10 días ya no se envían."
      >
        <SceneFrame
          title="Ricardo M. · Crédito personal"
          sub="Pago quincenal $2,350 · vence vie 15"
          icon="bank"
          right={
            <SceneChip role={done ? "ganado" : late && !promise ? "alerta" : "agente"}>
              {done ? "Al corriente" : promise ? "Promesa: lun 18" : late ? "+1 día" : "Preventivo"}
            </SceneChip>
          }
        >
          {/* Tramos */}
          <ol className="mb-[0.9em] grid grid-cols-5 gap-[0.3em]">
            {TRAMOS.map((t, i) => {
              const skipped = done && i > 2;
              const current = !done && i === tramo;
              const past = i <= (done ? 2 : tramo);
              return (
                <li
                  key={t}
                  className={`rounded-[0.5em] px-[0.3em] py-[0.35em] text-center text-[0.66em] font-semibold transition-colors duration-500 ${
                    current
                      ? "bg-lime-fill text-fixed-ink"
                      : skipped
                        ? "bg-surface-2 text-muted line-through"
                        : past
                          ? "bg-lime-soft text-lime"
                          : "bg-surface-2 text-muted"
                  }`}
                >
                  {t}
                </li>
              );
            })}
          </ol>

          <Thread
            fade={replaying}
            className="gap-[0.5em]"
            full={ITEMS.map((it) => (
              <div key={it.at}>{it.node}</div>
            ))}
          >
            {replaying
              ? ITEMS.map((it) => (
                  <div key={`h-${it.at}`} className="shrink-0">
                    {it.node}
                  </div>
                ))
              : null}
            {replaying ? <ThreadDivider>Siguiente quincena</ThreadDivider> : null}
            {ITEMS.filter((it) => step >= it.at).map((it) => (
              <Enter key={`${replaying ? "r" : "c"}-${it.at}`} run={replaying}>
                {it.node}
              </Enter>
            ))}
          </Thread>
          <SceneExample />
        </SceneFrame>
      </Scene>
    </div>
  );
}
