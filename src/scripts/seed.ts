import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('🗑️ Limpiando testimonios existentes...')
  const existing = await payload.find({ collection: 'testimonials', limit: 100 })
  for (const doc of existing.docs) {
    await payload.delete({ collection: 'testimonials', id: doc.id })
  }

  console.log('🌱 Seeding testimonials...')

  const testimonials = [
    {
      authorName: 'David Llanes',
      authorRole: 'Head of Engineering',
      company: 'Nextia',
      quote: 'Estamos implementando Root a clientes de Nextia en menos de una semana. La integración con sistemas existentes es sorprendentemente sencilla y el equipo lo adopta de inmediato.',
      metric: { value: '<1 sem', label: 'Tiempo de implementación' },
      featured: true,
      order: 1,
    },
    {
      authorName: 'Manuel Ramírez',
      authorRole: 'Gerente Comercial',
      company: 'Hybridge Education',
      quote: 'Las automatizaciones con IA nos ahorran 4 horas diarias por agente. El equipo ahora se enfoca en cerrar, no en responder mensajes repetitivos.',
      metric: { value: '4h', label: 'Ahorradas por agente/día' },
      featured: true,
      order: 2,
    },
    {
      authorName: 'Daniela Anaya',
      authorRole: 'Directora Universidad',
      company: 'Hybridge Education',
      quote: 'Con Root atendemos 10 veces más estudiantes por hora sin aumentar el equipo. La automatización de WhatsApp cambió completamente nuestra operación.',
      metric: { value: '10x', label: 'Más estudiantes por hora' },
      featured: false,
      order: 3,
    },
    {
      authorName: 'Sofía Ardura',
      authorRole: 'Growth Manager',
      company: 'Eugenia',
      quote: 'Desde que implementamos Root en Eugenia estamos vendiendo al doble. Los flujos automatizados convierten leads que antes se perdían en el caos de WhatsApp.',
      metric: { value: '2x', label: 'Ventas desde implementación' },
      featured: false,
      order: 4,
    },
  ]

  for (const testimonial of testimonials) {
    await payload.create({ collection: 'testimonials', data: testimonial })
    console.log(`✅ ${testimonial.authorName}`)
  }

  console.log('🎉 Seed completo')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})