import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Features } from './collections/Features'
import { Testimonials } from './collections/Testimonials'
import { PricingPlans } from './collections/PricingPlans'
import { FAQs } from './collections/FAQs'
import { DemoRequests } from './collections/DemoRequests'

import { SiteSettings } from './globals/SiteSettings'
import { HeroSection } from './globals/HeroSection'
import { HowItWorks } from './globals/HowItWorks'
import { LegalPages } from './globals/LegalPages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Posts,
    Features,
    Testimonials,
    PricingPlans,
    FAQs,
    DemoRequests,
  ],
  globals: [
    SiteSettings,
    HeroSection,
    HowItWorks,
    LegalPages,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})