"use client";
import { useEffect, useRef, useState } from "react";
import { animate, inView, motion, useInView, useReducedMotion } from "motion/react";

/*
 * Kit de movimiento para escenas y diagramas (DESIGN.md › Escenas). Reglas que este kit ya cumple:
 * 1. El estado que se renderiza en el servidor es el FINAL y completo (`rest`): sin JS, en la miniatura y con
 *    movimiento reducido la escena se lee entera. Nada arranca en opacidad 0.
 * 2. Al entrar en pantalla la escena sostiene ese estado ≥ 2.5 s antes de animar.
 * 3. Fuera de pantalla se pausa (no corre ningún temporizador).
 * 4. prefers-reduced-motion: se queda quieta en `rest`.
 * 5. Escala uniforme: dentro de <Scene> todo se mide en em; el font-size sale del ancho del contenedor (cqw).
 */

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const MIN_HOLD_MS = 2500;

/**
 * Bucle de una escena: recorre los pasos 0…n-1 (cada uno dura `durations[i]` ms) solo mientras está en pantalla.
 * Devuelve el `ref` (ponlo en el contenedor de la escena) y el `step` actual.
 * - `rest`: paso que se muestra en el servidor, fuera de pantalla y con movimiento reducido (por defecto, el último).
 * - `firstHold`: cuánto se sostiene `rest` al entrar (mínimo 2.5 s).
 * - `resetOnLeave`: al salir de pantalla vuelve a `rest` (por defecto true), para que nunca quede a medias.
 * Ejemplo: `const { ref, step } = useSceneLoop<HTMLDivElement>([1200, 1400, 1800, 3000]);`
 */
export function useSceneLoop<T extends HTMLElement = HTMLDivElement>(
  durations: readonly number[],
  {
    rest = durations.length - 1,
    firstHold = 2600,
    resetOnLeave = true,
    paused = false,
  }: {
    rest?: number;
    firstHold?: number;
    resetOnLeave?: boolean;
    /** true congela la escena en el paso actual (por ejemplo, con el cursor encima). Al soltar, vuelve a sostener y sigue. */
    paused?: boolean;
  } = {},
) {
  const ref = useRef<T>(null);
  const visible = useInView(ref, { margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(rest);
  const key = durations.join(",");

  useEffect(() => {
    if (!visible || reduce) {
      if (resetOnLeave) {
        const t = setTimeout(() => setStep(rest), 0);
        return () => clearTimeout(t);
      }
      return;
    }
    if (paused) return;
    const steps = key.split(",").map(Number);
    let i = 0;
    let timer = setTimeout(
      function tick() {
        setStep(i);
        const wait = steps[i];
        i = (i + 1) % steps.length;
        timer = setTimeout(tick, wait);
      },
      Math.max(MIN_HOLD_MS, firstHold),
    );
    return () => clearTimeout(timer);
  }, [visible, reduce, key, firstHold, rest, resetOnLeave, paused]);

  return { ref, step, playing: visible && !reduce && !paused };
}

/** true cuando el elemento está en pantalla y el usuario no pidió movimiento reducido (para animaciones propias). */
export function usePlayable<T extends HTMLElement = HTMLDivElement>(margin = "0px 0px -10% 0px") {
  const ref = useRef<T>(null);
  const visible = useInView(ref, { margin: margin as `${number}px ${number}px ${number}px ${number}px` });
  const reduce = useReducedMotion();
  return { ref, playable: visible && !reduce, reduce: !!reduce };
}

/**
 * Entrada suave: al entrar en pantalla sube 14 px. NUNCA toca la opacidad (el visual se ve aunque el observador
 * tarde o el usuario salte con un ancla). Si ya está en pantalla al cargar, o con movimiento reducido, no hace nada.
 */
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    let anim: { stop: () => void } | undefined;
    const stop = inView(el, () => {
      anim = animate(el, { transform: ["translateY(14px)", "translateY(0px)"] }, { duration: 0.6, ease: EASE, delay });
    });
    return () => {
      stop();
      anim?.stop();
      el.style.transform = "";
    };
  }, [reduce, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Hilo de conversación que NUNCA se vacía (regla 1 de DESIGN.md › Escenas). `full` es el estado completo: se pinta
 * invisible y solo reserva el alto. Encima va lo vivo (`children`), anclado abajo y recortado arriba, como WhatsApp.
 * Al repetir el guion, la escena pone la conversación anterior como historial, así lo nuevo entra debajo de un
 * historial lleno y el panel pasa de un estado completo a otro. `className` va en las dos capas (gap, padding,
 * fondo); `outerClassName`, en la caja (p. ej. `flex-1` para estirarse).
 */
export function Thread({
  full,
  children,
  fade = false,
  className = "",
  outerClassName = "",
}: {
  full: React.ReactNode;
  children: React.ReactNode;
  /** true mientras hay historial: el mensaje más viejo se desvanece arriba en vez de cortarse en seco. */
  fade?: boolean;
  className?: string;
  outerClassName?: string;
}) {
  return (
    <div className={`relative ${outerClassName}`}>
      <div className={`invisible flex flex-col ${className}`}>{full}</div>
      <div
        className={`absolute inset-0 flex flex-col justify-end overflow-hidden ${fade ? "[mask-image:linear-gradient(to_bottom,transparent,#000_1.6em)]" : ""} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

/** Separador entre el historial y la conversación que se repite (pastilla centrada, en em). */
export function ThreadDivider({ children = "Nueva conversación" }: { children?: React.ReactNode }) {
  return (
    <p className="shrink-0 self-center rounded-full border border-line bg-surface px-[0.8em] py-[0.15em] text-[0.56em] font-semibold uppercase tracking-[0.08em] text-muted">
      {children}
    </p>
  );
}

/** Entrada de un elemento nuevo dentro de un bucle: sube y crece un poco, sin tocar la opacidad. */
export function Enter({
  children,
  run,
  className = "",
  origin = "50% 100%",
}: {
  children: React.ReactNode;
  run: boolean;
  className?: string;
  origin?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={run && !reduce ? { y: "0.7em", scale: 0.96 } : false}
      animate={{ y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{ transformOrigin: origin }}
      className={`flex shrink-0 flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Marco de una escena: <figure> con la descripción en una <figcaption> solo para lectores de pantalla; el dibujo
 * va aria-hidden. `baseWidth` es el ancho de diseño en px: a ese ancho 1em = 16 px, y todo escala parejo.
 * `reveal={false}` en el hero (se ve desde el primer pintado). `aspect` reserva el alto (ej. "16/10") para CLS 0.
 */
export function Scene({
  caption,
  children,
  baseWidth = 640,
  aspect,
  reveal = true,
  delay = 0,
  className = "",
  innerClassName = "",
}: {
  caption: string;
  children: React.ReactNode;
  baseWidth?: number;
  aspect?: string;
  reveal?: boolean;
  delay?: number;
  className?: string;
  innerClassName?: string;
}) {
  const canvas = (
    <div
      aria-hidden="true"
      className={`relative select-none ${innerClassName}`}
      style={{ fontSize: `${(1600 / baseWidth).toFixed(4)}cqw`, aspectRatio: aspect }}
    >
      {children}
    </div>
  );
  return (
    <figure className={`scene ${className}`}>
      {reveal ? <Reveal delay={delay}>{canvas}</Reveal> : canvas}
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}

/**
 * Número que cuenta hasta `value` cuando `run` es true; en el servidor y con movimiento reducido muestra `value`.
 * `format` da el texto (ej. n => `$${n.toLocaleString("es-MX")}`).
 */
export function CountUp({
  value,
  run = true,
  duration = 1.2,
  format = (n: number) => String(Math.round(n)),
}: {
  value: number;
  run?: boolean;
  duration?: number;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || !run || reduce) return;
    const ctrl = animate(0, value, { duration, ease: EASE, onUpdate: (v) => (el.textContent = format(v)) });
    return () => {
      ctrl.stop();
      el.textContent = format(value);
    };
  }, [run, reduce, value, duration, format]);
  return <span ref={ref}>{format(value)}</span>;
}

/**
 * Texto que se «escribe» letra por letra mientras `run` es true. En el servidor y con movimiento reducido muestra
 * el texto completo. Reserva el espacio del texto completo (sin saltos de layout).
 */
export function Typewriter({
  text,
  run = true,
  speed = 28,
  className = "",
}: {
  text: string;
  run?: boolean;
  speed?: number;
  className?: string;
}) {
  const [n, setN] = useState(text.length);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!run || reduce) {
      const t = setTimeout(() => setN(text.length), 0);
      return () => clearTimeout(t);
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [run, reduce, text, speed]);
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="invisible">{text}</span>
      <span className="absolute inset-0">{text.slice(0, n)}</span>
    </span>
  );
}
