import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'Pregunta', plural: 'Preguntas Frecuentes' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
  },
  access: { read: () => true },
  fields: [
    { name: 'question', label: 'Pregunta', type: 'text', required: true },
    { name: 'answer', label: 'Respuesta', type: 'richText', required: true },
    {
      name: 'category',
      label: 'Categoría',
      type: 'select',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Integraciones', value: 'integrations' },
        { label: 'Precios', value: 'pricing' },
        { label: 'Seguridad', value: 'security' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'order', label: 'Orden', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}