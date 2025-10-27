// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.rosemarymemorial.org',
  base: '/',
  output: 'server',
  trailingSlash: 'never',

  vite: {
    server: {
      fs: {
        allow: ['..'],
      },
    },
    define: {
      'import.meta.env.PUBLIC_R2_BUCKET_URL': JSON.stringify(process.env.R2_BUCKET_URL || ''),
      'import.meta.env.PUBLIC_R2_BUCKET_NAME': JSON.stringify(process.env.R2_BUCKET_NAME || ''),
      'import.meta.env.PUBLIC_R2_ACCOUNT_ID': JSON.stringify(process.env.R2_ACCOUNT_ID || '')
    },
    ssr: {
      external: ['fs/promises', 'path'],
    },
  },

  integrations: [mdx()],
  adapter: cloudflare(),
  image: {
    service: { entrypoint: 'cloudflare' },
    domains: ['rosemarymemorial.org', 'images.rosemarymemorial.org', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.rosemarymemorial.org'
      }
    ]
  }
});