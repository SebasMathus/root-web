import type { FaqItem, Feature, Role } from "@/components/ui";

/*
 * Tipos de las páginas de Soluciones (plan §3.3). Cada página de vertical arma un objeto `Vertical` en su carpeta
 * (`src/app/(site)/soluciones/<slug>/_data.ts`) y lo pasa a <VerticalPage />. Fase 2 usa estos mismos tipos.
 * Reglas de contenido (DESIGN.md › Qué afirmar): sin cifras de resultados; los conceptos de cómo trabaja root
 * (Receta, Carriles, Ficha viva, Reglas de pase, Cadencias, nota de Relevo) se presentan como conceptos.
 */

/** Carril de una etapa: la atiende el agente (lima) o tu equipo (cielo). */
export type Lane = "agente" | "equipo";

/* ───────────── Escena: chat de WhatsApp que llena la Ficha viva y mueve el trato de etapa ───────────── */

export type SceneMessage = {
  from: "cliente" | "agente";
  text: string;
  /** Hora del mensaje («22:41»). */
  time: string;
  /** Claves de `fields` que este mensaje llena. */
  fills?: string[];
  /** Índice de `stages` al que pasa el trato cuando aparece este mensaje. */
  stage?: number;
};

export type SceneField = { key: string; label: string; value: string };

export type VerticalSceneData = {
  /** Negocio ficticio del ejemplo («Inmobiliaria Altavista»). */
  business: string;
  /** Prospecto del ejemplo. */
  contact: string;
  /** Origen del trato (campaña o canal que lo trajo). */
  origin: string;
  /** Tiempo de primera respuesta del ejemplo («6 s»). */
  firstReply: string;
  /** Campos de la Ficha viva, en orden. */
  fields: SceneField[];
  /** Etapas del embudo con su carril. */
  stages: { name: string; lane: Lane }[];
  /** Guion: 5 o 6 mensajes cortos (el panel mide lo mismo en todas las verticales). */
  messages: SceneMessage[];
  /** Relevo al equipo al final de la escena: a quién, la nota de relevo y la etapa en que queda. */
  handoff: { to: string; note: string; stage: number };
};

/* ───────────── Página de vertical ───────────── */

export type VerticalStep = { title: string; text: string; icon: string; role: Role };

export type VerticalRecipe = {
  /** h2 («La Receta inmobiliaria de root»). */
  title: string;
  intro: string;
  stages: { name: string; lane: Lane }[];
  /** Preguntas de calificación que llenan la Ficha viva. */
  questions: string[];
  /** Regla de pase en lenguaje natural. */
  passRule: string;
  /** Cadencia de seguimiento si el prospecto deja de contestar (mensajes de ejemplo). */
  cadence: { day: string; text: string }[];
};

export type Vertical = {
  /** Ruta registrada en lib/routes.ts («/soluciones/inmobiliarias»). */
  path: string;
  /** Nombre para migas de pan («Inmobiliarias»). */
  label: string;
  kicker: string;
  /** h1 con la búsqueda principal. */
  h1: string;
  intro: string;
  /** Etiqueta del CTA del hero (por defecto «Escríbenos por WhatsApp»). */
  heroCtaLabel?: string;
  /** Escena del hero. */
  scene: VerticalSceneData;
  /** Descripción de la escena para lectores de pantalla (figcaption). */
  sceneCaption: string;
  /** Dolores en formato pregunta. `title` es la pregunta-gancho de la industria (h2). */
  pains: { kicker?: string; title: string; intro?: string; items: { q: string; text: string; icon: string }[] };
  /** Cómo trabaja root ahí (h2 con variante de la búsqueda principal). */
  how: { title: string; intro?: string; steps: VerticalStep[] };
  recipe: VerticalRecipe;
  useCases: { title: string; intro?: string; items: Feature[] };
  /** Métricas que vas a ver (nombres, sin cifras) y cómo convive con los sistemas de la industria. */
  metrics: { title: string; intro?: string; items: string[] };
  systems: { title: string; text: string };
  /** Texto propio del bloque de precio (opcional; si no, el estándar). */
  planText?: string;
  faq: { title: string; items: FaqItem[] };
  /** 2–4 rutas hermanas (registradas en lib/routes.ts). */
  siblings: string[];
  closing: { title: string; text: string; cta?: string; label?: string };
  /** Prefijo de data-cta («soluciones-inmobiliarias»). */
  ctaId: string;
};
