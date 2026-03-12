import type { CollectionConfig } from 'payload'

export const DemoRequests: CollectionConfig = {
  slug: 'demo-requests',
  labels: { singular: 'Solicitud de Demo', plural: 'Solicitudes de Demo' },
  admin: {
    defaultColumns: ['name', 'company', 'email', 'status', 'createdAt'],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'WhatsApp', type: 'text' },
    { name: 'company', label: 'Empresa', type: 'text' },
    {
      name: 'teamSize',
      label: 'Tamaño del equipo',
      type: 'select',
      options: [
        { label: '1–5 personas', value: '1-5' },
        { label: '6–20 personas', value: '6-20' },
        { label: '21–50 personas', value: '21-50' },
        { label: '50+ personas', value: '50+' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'message', label: 'Mensaje', type: 'textarea' },
    {
      name: 'status',
      label: 'Estado',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Nuevo', value: 'new' },
        { label: 'Contactado', value: 'contacted' },
        { label: 'Demo agendada', value: 'demo-scheduled' },
        { label: 'Cliente', value: 'customer' },
        { label: 'Descartado', value: 'discarded' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'notes', label: 'Notas internas', type: 'textarea', admin: { position: 'sidebar' } },
  ],
  timestamps: true,
}