import type { GlobalConfig } from 'payload'

export const HeroSection: GlobalConfig = {
  slug: 'hero-section',
  label: 'Hero',
  access: { read: () => true },
  fields: [
    {
      name: 'headline',
      label: 'Titular principal',
      type: 'array',
      admin: { description: 'Cada línea es una palabra grande en el hero' },
      fields: [{ name: 'word', type: 'text', required: true }],
      defaultValue: [
        { word: 'Potencia' },
        { word: 'tu' },
        { word: 'negocio' },
        { word: 'con WhatsApp' },
      ],
    },
    {
      name: 'subheadline',
      label: 'Subtítulo',
      type: 'textarea',
      defaultValue: 'Transforma cómo vendes, retienes y te comunicas con tus clientes utilizando WhatsApp.',
    },
    { name: 'ctaLabel', label: 'Texto del botón CTA', type: 'text', defaultValue: 'Agenda una demo' },
    { name: 'ctaUrl', label: 'URL del botón CTA', type: 'text', defaultValue: 'https://wa.me/15557794199?text=Hola%2C%20quiero%20agendar%20una%20demo' },
    { name: 'heroImage', label: 'Imagen / mock del producto', type: 'upload', relationTo: 'media' },
    { name: 'heroVideo', label: 'Video de fondo (URL)', type: 'text' },
    {
      name: 'stats',
      label: 'Estadísticas / números destacados',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'value', label: 'Valor', type: 'text', required: true },
        { name: 'label', label: 'Etiqueta', type: 'text', required: true },
      ],
    },
  ],
}