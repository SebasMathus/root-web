/**
 * Registro único de páginas (mapa del sitio, plan §3). Alimenta el sitemap, los menús del encabezado y el pie.
 * Toda página nueva se agrega aquí. `index: false` = noindex y fuera del sitemap.
 * `owner` es el equipo responsable de construirla (DESIGN.md › Mapa de rutas).
 *
 * Diferencias con el plan, por decisión del dueño:
 * - Los legales y el soporte se quedan en /docs/* (Meta usa /docs/instrucciones-de-borrado-de-informacion).
 * - /ayuda no se crea: /docs/soporte es la página de ayuda.
 * - /novedades (changelog) no se publica todavía: no hay entradas reales de producto. Se agrega aquí cuando las haya.
 * - Una sola página de comparativas (/comparativas): root frente a «otros sistemas», sin nombrar marcas de la competencia.
 */
export type RouteGroup =
  | "principal"
  | "producto"
  | "soluciones"
  | "precios"
  | "comparativas"
  | "recursos"
  | "blog"
  | "empresa"
  | "legal";

export type RouteOwner = "cimientos" | "portada" | "producto" | "soluciones" | "precios-y-comparativas" | "recursos" | "empresa";

export type RouteEntry = {
  path: string;
  /** Nombre corto para menús, migas de pan y el pie. */
  label: string;
  /** Una línea para menús desplegables y tarjetas (dolor o promesa). */
  blurb?: string;
  group: RouteGroup;
  index: boolean;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  owner: RouteOwner;
  /** Soluciones: fase 1 se sostiene con lo publicado; fase 2 depende de funciones por confirmar (plan §3). */
  phase?: 1 | 2;
  /** Verbo de la tarjeta de producto en la portada (plan §3.1, sección 4). */
  verb?: string;
};

export const ROUTES: RouteEntry[] = [
  { path: "/", label: "Inicio", group: "principal", index: true, priority: 1, changeFrequency: "weekly", owner: "portada" },

  // Producto: una página por pilar, cada una con un verbo.
  { path: "/producto", label: "Producto", blurb: "Todo root en una vista", group: "producto", index: true, priority: 0.8, changeFrequency: "monthly", owner: "producto" },
  { path: "/producto/agentes-de-ia", label: "Agentes de IA", verb: "Atiende", blurb: "Contestan, califican, agendan y dan seguimiento", group: "producto", index: true, priority: 0.9, changeFrequency: "monthly", owner: "producto" },
  { path: "/producto/bandeja-de-whatsapp", label: "Bandeja de WhatsApp", verb: "Ordena", blurb: "Todo tu equipo en el número de tu empresa", group: "producto", index: true, priority: 0.85, changeFrequency: "monthly", owner: "producto" },
  { path: "/producto/crm-y-embudos", label: "CRM y embudos", verb: "Da seguimiento", blurb: "Etapa, dueño y siguiente paso para cada prospecto", group: "producto", index: true, priority: 0.9, changeFrequency: "monthly", owner: "producto" },
  { path: "/producto/campanas-y-seguimiento", label: "Campañas y seguimiento", verb: "Mide", blurb: "Seguimiento automático y el origen de cada trato", group: "producto", index: true, priority: 0.8, changeFrequency: "monthly", owner: "producto" },
  { path: "/producto/integraciones", label: "Integraciones", verb: "Conecta", blurb: "Salesforce, SAP, HubSpot y Excel", group: "producto", index: true, priority: 0.8, changeFrequency: "monthly", owner: "producto" },

  // Soluciones por industria (orden del ranking de verticales-root.md).
  { path: "/soluciones", label: "Soluciones", blurb: "root para tu industria", group: "soluciones", index: true, priority: 0.7, changeFrequency: "monthly", owner: "soluciones" },
  { path: "/soluciones/inmobiliarias", label: "Inmobiliarias", blurb: "Cada lead de portal o de Meta, contestado y calificado", group: "soluciones", phase: 1, index: true, priority: 0.85, changeFrequency: "monthly", owner: "soluciones" },
  { path: "/soluciones/agencias-de-autos", label: "Agencias de autos", blurb: "Que ningún prospecto se quede sin respuesta", group: "soluciones", phase: 1, index: true, priority: 0.8, changeFrequency: "monthly", owner: "soluciones" },
  { path: "/soluciones/clinicas-esteticas", label: "Clínicas estéticas", blurb: "Cada «¿precio?» con seguimiento", group: "soluciones", phase: 1, index: true, priority: 0.75, changeFrequency: "monthly", owner: "soluciones" },
  { path: "/soluciones/tiendas-en-redes", label: "Tiendas en redes", blurb: "Vende por WhatsApp e Instagram aunque esté cerrado", group: "soluciones", phase: 1, index: true, priority: 0.75, changeFrequency: "monthly", owner: "soluciones" },
  { path: "/soluciones/clinicas-dentales", label: "Clínicas dentales", blurb: "Más presupuestos aceptados por WhatsApp", group: "soluciones", phase: 2, index: true, priority: 0.7, changeFrequency: "monthly", owner: "soluciones" },
  { path: "/soluciones/consultorios-y-clinicas", label: "Consultorios y clínicas", blurb: "Confirma, reagenda y llena huecos de agenda", group: "soluciones", phase: 2, index: true, priority: 0.7, changeFrequency: "monthly", owner: "soluciones" },
  { path: "/soluciones/financieras-y-sofom", label: "Financieras y Sofom", blurb: "Recordatorios de pago y seguimiento de crédito", group: "soluciones", phase: 2, index: true, priority: 0.7, changeFrequency: "monthly", owner: "soluciones" },
  { path: "/soluciones/laboratorios-clinicos", label: "Laboratorios clínicos", blurb: "Cotiza estudios y agenda tomas", group: "soluciones", phase: 2, index: true, priority: 0.65, changeFrequency: "monthly", owner: "soluciones" },

  { path: "/precios", label: "Precios", blurb: "Precios en pesos, sin letra chica", group: "precios", index: true, priority: 0.9, changeFrequency: "monthly", owner: "portada" },

  // Comparativa: root frente a otros sistemas, por tipo de herramienta. No se nombran marcas de la competencia.
  { path: "/comparativas", label: "Comparativas", blurb: "root frente a otros sistemas", group: "comparativas", index: true, priority: 0.7, changeFrequency: "monthly", owner: "precios-y-comparativas" },

  // Recursos.
  { path: "/recursos", label: "Recursos", blurb: "Guías y herramientas para vender por WhatsApp", group: "recursos", index: true, priority: 0.5, changeFrequency: "monthly", owner: "recursos" },
  { path: "/guias/whatsapp-business-app-vs-api", label: "WhatsApp Business App o API", blurb: "Cuál necesita tu equipo", group: "recursos", index: true, priority: 0.7, changeFrequency: "monthly", owner: "recursos" },
  { path: "/guias/cuanto-cuesta-la-api-de-whatsapp", label: "Cuánto cuesta la API de WhatsApp", blurb: "En pesos, con la tarifa de Meta", group: "recursos", index: true, priority: 0.7, changeFrequency: "monthly", owner: "recursos" },
  { path: "/guias/chatbot-vs-agente-de-ia-vs-crm", label: "Chatbot, agente de IA o CRM", blurb: "Qué necesita tu WhatsApp de ventas", group: "recursos", index: true, priority: 0.65, changeFrequency: "monthly", owner: "recursos" },
  { path: "/herramientas/generador-de-link-de-whatsapp", label: "Generador de link de WhatsApp", blurb: "Crea tu link con mensaje y QR", group: "recursos", index: true, priority: 0.65, changeFrequency: "monthly", owner: "recursos" },
  { path: "/herramientas/calculadora-de-ventas-perdidas", label: "Calculadora de ventas perdidas", blurb: "Lo que dejas en la mesa por contestar tarde", group: "recursos", index: true, priority: 0.6, changeFrequency: "monthly", owner: "recursos" },
  { path: "/seguridad-y-privacidad", label: "Seguridad y privacidad", blurb: "Cómo cuidamos tus datos", group: "recursos", index: true, priority: 0.4, changeFrequency: "yearly", owner: "recursos" },

  // Blog.
  { path: "/blog", label: "Blog", blurb: "Ventas por WhatsApp, CRM y agentes de IA", group: "blog", index: true, priority: 0.5, changeFrequency: "weekly", owner: "cimientos" },
  { path: "/blog/como-automatizar-whatsapp", label: "Cómo automatizar WhatsApp para vender más", group: "blog", index: true, priority: 0.5, changeFrequency: "yearly", owner: "cimientos" },

  // Empresa y soporte.
  { path: "/nosotros", label: "Nosotros", blurb: "Hacemos root en la Ciudad de México", group: "empresa", index: true, priority: 0.5, changeFrequency: "yearly", owner: "portada" },
  { path: "/docs/soporte", label: "Soporte", blurb: "Horario, contacto y ayuda", group: "empresa", index: true, priority: 0.4, changeFrequency: "yearly", owner: "cimientos" },

  // Legales: mismas rutas que el sitio anterior (Meta usa la de borrado).
  { path: "/docs/aviso-de-privacidad", label: "Aviso de privacidad", group: "legal", index: true, priority: 0.2, changeFrequency: "yearly", owner: "cimientos" },
  { path: "/docs/terminos-y-condiciones", label: "Términos y condiciones", group: "legal", index: true, priority: 0.2, changeFrequency: "yearly", owner: "cimientos" },
  { path: "/docs/instrucciones-de-borrado-de-informacion", label: "Borrado de información", group: "legal", index: true, priority: 0.2, changeFrequency: "yearly", owner: "cimientos" },
];

export const routesIn = (group: RouteGroup) => ROUTES.filter((r) => r.group === group);
export const route = (path: string) => ROUTES.find((r) => r.path === path);
export const routeLabel = (path: string) => route(path)?.label ?? path;

/** Las 5 páginas de producto (sin el índice). */
export const PRODUCT_PAGES = routesIn("producto").filter((r) => r.path !== "/producto");
/** Las 8 soluciones (sin el índice), fase 1 primero. */
export const SOLUTION_PAGES = routesIn("soluciones").filter((r) => r.path !== "/soluciones");
/** Guías, herramientas y seguridad (sin el índice). */
export const RESOURCE_PAGES = routesIn("recursos").filter((r) => r.path !== "/recursos");
export const LEGAL_PAGES = routesIn("legal");
