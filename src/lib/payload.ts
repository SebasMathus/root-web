import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getTestimonials() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.find({
    collection: 'testimonials',
    sort: 'order',
    limit: 100,
  })
  return data.docs
}

export async function getFeatures() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.find({
    collection: 'features',
    where: { active: { equals: true } },
    sort: 'order',
    limit: 100,
  })
  return data.docs
}

export async function getPricingPlans() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.find({
    collection: 'pricing-plans',
    where: { active: { equals: true } },
    sort: 'order',
    limit: 10,
  })
  return data.docs
}

export async function getFAQs() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.find({
    collection: 'faqs',
    sort: 'order',
    limit: 100,
  })
  return data.docs
}

export async function getHeroSection() {
  const payload = await getPayload({ config: configPromise })
  return await payload.findGlobal({ slug: 'hero-section' })
}

export async function getSiteSettings() {
  const payload = await getPayload({ config: configPromise })
  return await payload.findGlobal({ slug: 'site-settings' })
}

export async function getHowItWorks() {
  const payload = await getPayload({ config: configPromise })
  return await payload.findGlobal({ slug: 'how-it-works' })
}

export async function getPosts() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 100,
  })
  return data.docs
}

export async function getPostBySlug(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return data.docs[0] || null
}