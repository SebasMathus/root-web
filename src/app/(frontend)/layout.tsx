import React from 'react'
import './styles.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getSiteSettings } from '@/lib/payload'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null)
  const ogImageUrl = (settings?.ogImage as any)?.url || null

  return {
    title: {
      default: settings?.metaTitle || 'Root — WhatsApp CRM con IA',
      template: `%s | Root`,
    },
    description: settings?.metaDescription || 'Transforma cómo vendes, retienes y te comunicas con tus clientes utilizando WhatsApp con IA.',
    metadataBase: new URL('https://goroot.ai'),
    icons: {
      icon: '/favicon.png',
    },
    openGraph: {
      siteName: settings?.siteName || 'Root',
      locale: 'es_MX',
      type: 'website',
      ...(ogImageUrl && { images: [{ url: ogImageUrl }] }),
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}