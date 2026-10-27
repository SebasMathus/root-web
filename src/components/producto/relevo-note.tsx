import { Scene } from "@/components/motion/kit";
import { Icon } from "@/components/icons";
import { Avatar, Bubble, Panel, SceneChip } from "./parts";

/*
 * Nota de relevo (concepto de «cómo trabaja root»; el traspaso con historial está disponible). Estática: la escena
 * es una sola tarjeta, completa desde el servidor. Datos de ejemplo.
 */

const CAPTION =
  "Ejemplo de nota de relevo. El agente de root le pasa la conversación de Mariana López a Andrés R., del equipo. " +
  "La nota dice quién es (Mariana López, busca en Narvarte), qué quiere (2 recámaras para comprar, con crédito Infonavit preaprobado), " +
  "qué ya se respondió (disponibilidad, precio y estacionamiento) y el siguiente paso (visita el jueves a las 11:00). Debajo queda el historial completo de la conversación.";

const ROWS = [
  { k: "Quién es", v: "Mariana López · busca en Narvarte" },
  { k: "Qué quiere", v: "2 recámaras, compra, crédito Infonavit preaprobado" },
  { k: "Ya se respondió", v: "Disponibilidad, precio y estacionamiento" },
  { k: "Siguiente paso", v: "Visita el jueves a las 11:00" },
];

export function RelevoNote() {
  return (
    <Scene caption={CAPTION} baseWidth={420}>
      <Panel className="overflow-hidden">
        <div className="flex items-center gap-[0.6em] px-[0.9em] py-[0.7em] border-b border-line">
          <Avatar initials="IA" role="agente" />
          <Icon name="arrow" className="w-[1em] h-[1em] text-muted" />
          <Avatar initials="AR" role="equipo" />
          <div className="min-w-0 flex-1">
            <p className="text-[0.8em] font-semibold text-ink">Nota de relevo para Andrés R.</p>
            <p className="text-[0.62em] text-muted">De tu agente de root · hoy 22:45</p>
          </div>
          <SceneChip role="equipo">Relevo</SceneChip>
        </div>
        <dl className="p-[0.9em] grid gap-[0.45em]">
          {ROWS.map((r) => (
            <div key={r.k} className="grid grid-cols-[7.2em_1fr] gap-[0.6em] items-baseline">
              <dt className="text-[0.66em] font-bold uppercase tracking-[0.06em] text-sky">{r.k}</dt>
              <dd className="text-[0.78em] text-ink leading-snug">{r.v}</dd>
            </div>
          ))}
        </dl>
        <div className="border-t border-line bg-surface-2 p-[0.9em]">
          <p className="text-[0.62em] font-bold uppercase tracking-[0.1em] text-muted mb-[0.5em]">Historial completo</p>
          <div className="flex flex-col gap-[0.4em]">
            <Bubble tone="in">Hola, vi el depa de 2 recámaras en Narvarte, ¿sigue disponible?</Bubble>
            <Bubble tone="agente">¡Hola, Mariana! Sí, sigue disponible. ¿Lo buscas para comprar o rentar?</Bubble>
            <p className="text-center text-[0.62em] text-muted">+ 9 mensajes</p>
          </div>
        </div>
      </Panel>
    </Scene>
  );
}
