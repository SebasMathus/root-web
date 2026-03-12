import type { GlobalConfig } from 'payload'

export const HowItWorks: GlobalConfig = {
  slug: 'how-it-works',
  label: 'Cómo Funciona',
  access: { read: () => true },
  fields: [
    { name: 'headline', label: 'Titular', type: 'text', defaultValue: 'Cómo funciona' },
    { name: 'subheadline', label: 'Subtítulo', type: 'text' },
    {
      name: 'steps',
      label: 'Pasos',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'number', label: 'Número', type: 'text', required: true },
        { name: 'title', label: 'Título', type: 'text', required: true },
        { name: 'description', label: 'Descripción', type: 'textarea', required: true },
        { name: 'image', label: 'Imagen', type: 'upload', relationTo: 'media' },
      ],
      defaultValue: [
        { number: '01', title: 'Conecta con tus canales', description: 'Elige los canales donde están tus clientes: WhatsApp, Instagram, Google, etc.' },
        { number: '02', title: 'Automatiza tu flujo de trabajo', description: 'Configura automatizaciones AI y personalizadas para que funcionen sin intervención manual.' },
        { number: '03', title: 'Integra con tus sistemas', description: 'Conecta Root con Salesforce, SAP o Excel. Convierte tus sistemas de registro en sistemas de acción.' },
      ],
    },
    {
      name: 'problemHeadline',
      label: 'Titular sección problema',
      type: 'text',
      defaultValue: '¿Tu equipo sigue resolviendo todo por WhatsApp sin trazabilidad ni control?',
    },
    {
      name: 'problemPoints',
      label: 'Puntos del problema',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'number', label: 'Número', type: 'text', required: true },
        { name: 'title', label: 'Título', type: 'text', required: true },
        { name: 'description', label: 'Descripción', type: 'textarea' },
      ],
      defaultValue: [
        { number: '01', title: 'Tus clientes quieren hablar directamente contigo', description: 'Casi siempre por medio de WhatsApp' },
        { number: '02', title: 'Múltiples herramientas desconectadas', description: 'CRM para ventas, soporte, cobranza, exceles por todos lados' },
        { number: '03', title: 'Falta de automatizaciones inteligentes', description: 'Los equipos pierden demasiado tiempo en tareas repetitivas' },
        { number: '04', title: 'Falta de insights accionables', description: 'Tus herramientas no te permiten actuar inmediatamente' },
      ],
    },
  ],
}