import type { CollectionConfig } from 'payload'

export const PricingPlans: CollectionConfig = {
  slug: 'pricing-plans',
  labels: { singular: 'Plan', plural: 'Planes de Precios' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'highlighted', 'active'],
  },
  access: { read: () => true },
  fields: [
    { name: 'name', label: 'Nombre del plan', type: 'text', required: true },
    { name: 'tagline', label: 'Tagline', type: 'text', admin: { description: 'Ej: Para PyMEs y Startups' } },
    { name: 'price', label: 'Precio (MXN/mes)', type: 'number' },
    { name: 'priceLabel', label: 'Etiqueta de precio', type: 'text', admin: { description: 'Ej: Precio a convenir — para Enterprise' } },
    { name: 'badge', label: 'Badge', type: 'text', admin: { description: 'Ej: 1 mes gratis' } },
    {
      name: 'features',
      label: 'Qué incluye',
      type: 'array',
      fields: [
        { name: 'text', label: 'Texto', type: 'text', required: true },
        { name: 'emoji', label: 'Emoji', type: 'text' },
        { name: 'enabled', label: 'Incluido', type: 'checkbox', defaultValue: true },
      ],
    },
    { name: 'ctaLabel', label: 'Texto del botón', type: 'text', defaultValue: 'Hablar con asesor' },
    { name: 'ctaUrl', label: 'URL del botón', type: 'text', defaultValue: 'https://wa.me/15557794199' },
    { name: 'highlighted', label: 'Plan destacado', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'Muestra borde y badge Más popular' } },
    { name: 'order', label: 'Orden', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    { name: 'active', label: 'Activo', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}