import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Root — WhatsApp CRM con IA para vender más',
  description: 'Transforma cómo vendes, retienes y te comunicas con tus clientes utilizando WhatsApp con IA. CRM, automatizaciones y más.',
}

import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import FAQs from '@/components/FAQs'
import ContactForm from '@/components/ContactForm'


export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQs />
      <ContactForm />
    </main>
  )
}