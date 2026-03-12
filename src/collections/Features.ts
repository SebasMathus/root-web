import type { CollectionConfig } from 'payload'

export const Features: CollectionConfig = {
  slug: 'features',
  labels: { singular: 'Feature', plural: 'Features' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order', 'active'],
  },
  access: { read: () => true },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'description', label: 'Descripción', type: 'textarea', required: true },
    {
      name: 'category',
      label: 'Categoría',
      type: 'select',
      options: [
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'CRM', value: 'crm' },
        { label: 'Automatización', value: 'automation' },
        { label: 'Integraciones', value: 'integrations' },
        { label: 'Llamadas', value: 'calls' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'icon', label: 'Ícono', type: 'text' },
    { name: 'image', label: 'Imagen', type: 'upload', relationTo: 'media' },
    { name: 'order', label: 'Orden', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    { name: 'active', label: 'Activa', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}