import { defineConfig, passthroughImageService } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'

import sentry from '@sentry/astro'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    sentry({
      dsn: 'https://ca49aa683b1a4c8d6a03df744ea5efe5@o4507891270746112.ingest.us.sentry.io/4507891276840960',
      sourceMapsUploadOptions: {
        project: 'javascript-astro',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],
})
