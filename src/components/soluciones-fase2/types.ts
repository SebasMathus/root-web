import type { FaqItem, Feature, Role } from "@/components/ui";

/**
 * Datos de una página de Soluciones de fase 2 (plan §3.3). Todo el texto vive en la página; la plantilla
 * (vertical-page.tsx) solo lo acomoda. Fuente de etapas, preguntas y métricas: verticales-root.md.
 */

/** Etapa del embudo de la Receta. `lane` dice quién la atiende: el agente (lima) o tu equipo (cielo). */
export type RecipeStage = { name: string; lane: Extract<Role, "agente" | "equipo"> };

/** Toque de la cadencia: cuándo, qué pasa y el mensaje de ejemplo. */
export type CadenceStep = { when: string; label: string; message: string };

export type Recipe = {
  /** h2 de la sección (variante de la búsqueda). */
  title: string;
  intro: string;
  /** Etapas en orden. Donde cambia el carril (agente → equipo) se marca el relevo. */
  stages: RecipeStage[];
  /** Segundo embudo opcional (por ejemplo, originación de crédito además de cobranza). */
  altFunnel?: { title: string; stages: RecipeStage[] };
  questions: string[];
  cadenceTitle: string;
  cadence: CadenceStep[];
  /** Línea bajo la cadencia (qué la detiene, qué pasa al final). */
  cadenceNote: string;
};

export type VerticalData = {
  path: string;
  /** Nombre corto (migas de pan). */
  label: string;
  kicker: string;
  h1: string;
  intro: string;
  heroNote: string;
  /** Propósito del CTA (data-cta), por ejemplo «sol-dentales». */
  cta: string;
  pains: { title: string; intro: string; items: Feature[] };
  how: { title: string; intro: string; items: Feature[] };
  recipe: Recipe;
  useCases: { title: string; intro: string; items: Feature[] };
  metrics: { title: string; intro: string; items: { name: string; text: string }[] };
  /** Cómo convive root con el sistema que ya usa la industria. */
  fit: { title: string; text: string; points: string[] };
  /** Rutas hermanas a enlazar (2 a 4). */
  siblings: string[];
  faq: FaqItem[];
  close: { title: string; text: string };
};
