import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
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
import { ContactRequests } from './collections/ContactRequests'

import { SiteSettings } from './globals/SiteSettings'
import { HeroSection } from './globals/HeroSection'
import { HowItWorks } from './globals/HowItWorks'
import { LegalPages } from './globals/LegalPages'

import AdminLogo from './components/AdminLogo'
import AdminIcon from './components/AdminIcon'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Root',
      favicon: 'https://root-web-media.s3.us-east-1.amazonaws.com/favicon.png',
    },
    components: {
      graphics: {
        Logo: AdminLogo,
        Icon: AdminIcon,
      },
    },
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
    ContactRequests,
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
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'us-east-1',
      },
      baseURL: String(process.env.S3_ENDPOINT || 'https://root-web-media.s3.us-east-1.amazonaws.com'),
    }),
  ],
})