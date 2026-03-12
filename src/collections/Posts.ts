import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Artículo', plural: 'Blog' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { status: { equals: 'published' } }
    },
  },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            }
            return value
          },
        ],
      },
    },
    { name: 'excerpt', label: 'Extracto', type: 'textarea' },
    { name: 'coverImage', label: 'Imagen de portada', type: 'upload', relationTo: 'media' },
    { name: 'content', label: 'Contenido', type: 'richText', required: true },
    {
      name: 'category',
      label: 'Categoría',
      type: 'select',
      options: [
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Ventas', value: 'ventas' },
        { label: 'CRM', value: 'crm' },
        { label: 'Automatización', value: 'automatizacion' },
        { label: 'Casos de éxito', value: 'casos-de-exito' },
        { label: 'Producto', value: 'producto' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      label: 'Estado',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      label: 'Fecha de publicación',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'featured',
      label: 'Destacado',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'meta',
      label: 'SEO',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', label: 'Meta título' },
        { name: 'description', type: 'textarea', label: 'Meta descripción' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'OG Image' },
      ],
    },
  ],
  versions: { drafts: true },
}