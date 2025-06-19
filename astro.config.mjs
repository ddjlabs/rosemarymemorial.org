// @ts-check
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';

import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

dotenv.config();

// https://astro.build/config
export default defineConfig({
    site: 'https://www.rosemarymemorial.org',
    base: '/',
    output: 'static',
    trailingSlash: 'never',
    vite: {
        server: {
        fs: {
            allow: ['..'],
        },
        },
        // Define environment variables that should be available to the client
        // Only expose public information, never credentials
        define: {
            'import.meta.env.PUBLIC_R2_BUCKET_URL': JSON.stringify(process.env.R2_BUCKET_URL || ''),
            'import.meta.env.PUBLIC_R2_BUCKET_NAME': JSON.stringify(process.env.R2_BUCKET_NAME || ''),
            'import.meta.env.PUBLIC_R2_ACCOUNT_ID': JSON.stringify(process.env.R2_ACCOUNT_ID || '')
        }
    },
    integrations: [sitemap(), robotsTxt()],
});