import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonio', plural: 'Testimonios' },
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'company', 'featured', 'order'],
  },
  access: { read: () => true },
  fields: [
    { name: 'authorName', label: 'Nombre', type: 'text', required: true },
    { name: 'authorRole', label: 'Cargo', type: 'text' },
    { name: 'company', label: 'Empresa', type: 'text' },
    { name: 'avatar', label: 'Foto', type: 'upload', relationTo: 'media' },
    { name: 'quote', label: 'Testimonio', type: 'textarea', required: true },
    {
      name: 'metric',
      label: 'Métrica destacada',
      type: 'group',
      admin: { description: 'Ej: retención del 60% al 90%' },
      fields: [
        { name: 'value', label: 'Valor', type: 'text' },
        { name: 'label', label: 'Etiqueta', type: 'text' },
      ],
    },
    { name: 'featured', label: 'Destacado', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'order', label: 'Orden', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}