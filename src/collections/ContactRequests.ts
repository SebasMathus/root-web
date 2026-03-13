import type { CollectionConfig } from 'payload'

export const ContactRequests: CollectionConfig = {
  slug: 'contact-requests',
  label: 'Solicitudes de Contacto',
  access: { read: () => true, create: () => true },
  admin: {
    defaultColumns: ['name', 'company', 'email', 'phone', 'createdAt'],
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    { name: 'company', label: 'Empresa', type: 'text', required: true },
    { name: 'email', label: 'Correo', type: 'email', required: true },
    { name: 'phone', label: 'Teléfono', type: 'text', required: true },
    { name: 'country', label: 'País', type: 'text', required: true },
    { name: 'status', label: 'Estado', type: 'select', defaultValue: 'new', options: [
      { label: 'Nuevo', value: 'new' },
      { label: 'Contactado', value: 'contacted' },
      { label: 'Cerrado', value: 'closed' },
    ]},
  ],
  timestamps: true,
}