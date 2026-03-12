import type { GlobalConfig } from 'payload'

export const LegalPages: GlobalConfig = {
  slug: 'legal-pages',
  label: 'Páginas Legales',
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Términos y Condiciones',
          fields: [
            { name: 'termsTitle', label: 'Título', type: 'text', defaultValue: 'Términos y Condiciones' },
            { name: 'termsContent', label: 'Contenido', type: 'richText' },
            { name: 'termsUpdatedAt', label: 'Última actualización', type: 'date' },
          ],
        },
        {
          label: 'Aviso de Privacidad',
          fields: [
            { name: 'privacyTitle', label: 'Título', type: 'text', defaultValue: 'Aviso de Privacidad' },
            { name: 'privacyContent', label: 'Contenido', type: 'richText' },
            { name: 'privacyUpdatedAt', label: 'Última actualización', type: 'date' },
          ],
        },
      ],
    },
  ],
}