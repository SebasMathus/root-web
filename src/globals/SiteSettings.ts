import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuración del Sitio',
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            { name: 'siteName', label: 'Nombre del sitio', type: 'text', defaultValue: 'Root' },
            { name: 'logo', label: 'Logo', type: 'upload', relationTo: 'media' },
            { name: 'logoLight', label: 'Logo claro', type: 'upload', relationTo: 'media' },
            { name: 'favicon', label: 'Favicon', type: 'upload', relationTo: 'media' },
            { name: 'ogImage', label: 'OG Image por defecto', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Contacto',
          fields: [
            { name: 'whatsappNumber', label: 'Número WhatsApp', type: 'text', defaultValue: '15557794199' },
            { name: 'whatsappMessage', label: 'Mensaje pre-cargado', type: 'text', defaultValue: 'Hola, quiero más informes' },
            { name: 'email', label: 'Email', type: 'email' },
          ],
        },
        {
          label: 'Redes Sociales',
          fields: [
            { name: 'linkedin', label: 'LinkedIn', type: 'text' },
            { name: 'twitter', label: 'Twitter/X', type: 'text' },
            { name: 'instagram', label: 'Instagram', type: 'text' },
            { name: 'youtube', label: 'YouTube', type: 'text' },
          ],
        },
        {
          label: 'Analytics',
          fields: [
            { name: 'ga4Id', label: 'GA4 ID', type: 'text' },
            { name: 'gtmId', label: 'Google Tag Manager ID', type: 'text' },
            { name: 'facebookPixelId', label: 'Facebook Pixel ID', type: 'text' },
          ],
        },
        {
          label: 'SEO Global',
          fields: [
            { name: 'metaTitle', label: 'Meta título por defecto', type: 'text', defaultValue: 'Root — Automatiza WhatsApp con IA' },
            { name: 'metaDescription', label: 'Meta descripción por defecto', type: 'textarea', defaultValue: 'Transforma cómo vendes, retienes y te comunicas con tus clientes utilizando WhatsApp.' },
          ],
        },
      ],
    },
  ],
}