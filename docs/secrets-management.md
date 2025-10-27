# Secrets Management Guide

This guide explains how to manage secrets for the Rosemary Memorial website using Wrangler.

## Overview

Secrets are sensitive configuration values (API keys, credentials, etc.) that should never be committed to version control. This project uses Cloudflare Workers secrets to securely store and access these values.

## Setup

### 1. Create your `.env` file

Copy the example file and fill in your actual values:

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials. **Never commit this file to git** (it's already in `.gitignore`).

### 2. Set secrets in Cloudflare

Run the secrets setup script to upload your secrets to Cloudflare:

```bash
npm run secrets:set
```

This script will:
- Read values from your `.env` file
- Upload each secret to Cloudflare Workers
- Store them securely (encrypted at rest)
- Make them available to your Worker at runtime

### 3. Verify secrets are set

List all configured secrets:

```bash
npm run secrets:list
```

**Note:** For security, this only shows secret names, not their values.

## Required Secrets

### R2 Storage (Required for Gallery)

These secrets are needed for the photo gallery to fetch images from R2:

- `R2_ACCESS_KEY_ID` - Your R2 access key ID
- `R2_SECRET_ACCESS_KEY` - Your R2 secret access key
- `R2_BUCKET_URL` - Public URL for your R2 bucket
- `R2_BUCKET_NAME` - Name of your R2 bucket (e.g., `rosemarymemorial-images`)
- `R2_ACCOUNT_ID` - Your Cloudflare account ID

**How to get these values:**

1. Go to Cloudflare Dashboard → R2
2. Select your bucket → Settings
3. Create an API token with R2 read permissions
4. Copy the credentials

## Optional Secrets

### Email (Resend)

If you want to add contact forms:

- `RESEND_API_KEY` - Your Resend API key
- `RESEND_FROM_EMAIL` - Email address to send from
- `RESEND_TO_EMAIL` - Email address to receive messages

### Bot Protection (Turnstile)

If you want to add Cloudflare Turnstile for form protection:

- `TURNSTILE_SECRET_KEY` - Your Turnstile secret key

## Accessing Secrets in Code

Secrets are available in your Worker via the `env` object:

```typescript
export default {
  async fetch(request, env, ctx) {
    // Access secrets
    const r2AccessKey = env.R2_ACCESS_KEY_ID;
    const bucketName = env.R2_BUCKET_NAME;
    
    // Use them in your code
    // ...
  }
}
```

In Astro pages with SSR:

```astro
---
const runtime = Astro.locals.runtime;
const r2AccessKey = runtime.env.R2_ACCESS_KEY_ID;
---
```

## Build-Time vs Runtime

### Build Time (Local Development)

During `npm run build`, the gallery inventory script uses secrets from your `.env` file to:
- Connect to R2
- List all photos
- Generate `gallery-inventory.json`

### Runtime (Production)

When deployed, your Worker uses Cloudflare secrets to:
- Serve dynamic content
- Access R2 if needed at runtime
- Handle any API requests

## Updating Secrets

To update a secret:

1. Update the value in your `.env` file
2. Run `npm run secrets:set` again
3. The new value will be uploaded to Cloudflare
4. Redeploy your Worker: `npm run cf:deploy`

**Note:** Secrets are updated immediately, but you may need to redeploy for changes to take effect.

## Deleting Secrets

To delete a secret:

```bash
wrangler secret delete SECRET_NAME -c wrangler.jsonc
```

For example:

```bash
wrangler secret delete RESEND_API_KEY -c wrangler.jsonc
```

## Security Best Practices

1. ✅ **Never commit `.env` to git** - It's in `.gitignore` by default
2. ✅ **Use different secrets for dev/prod** - Create separate Cloudflare projects
3. ✅ **Rotate secrets regularly** - Update API keys periodically
4. ✅ **Use least privilege** - Only grant necessary permissions to API keys
5. ✅ **Monitor access** - Check Cloudflare logs for unusual activity

## Troubleshooting

### "Secret not found" error

If you get this error at runtime:
1. Verify the secret is set: `npm run secrets:list`
2. Check the secret name matches exactly (case-sensitive)
3. Redeploy your Worker: `npm run cf:deploy`

### Build fails with R2 errors

If the gallery inventory generation fails:
1. Check your `.env` file has correct R2 credentials
2. Verify R2 bucket exists and is accessible
3. Test R2 connection manually using the AWS CLI

### Secrets not updating

If changes don't take effect:
1. Run `npm run secrets:set` to upload new values
2. Redeploy: `npm run cf:deploy`
3. Clear browser cache and test again

## CI/CD Integration

For automated deployments (GitHub Actions, GitLab CI, etc.):

1. Add secrets to your CI/CD environment variables
2. Use Wrangler's environment variable support:
   ```bash
   wrangler secret put SECRET_NAME --env production
   ```
3. Or use the Cloudflare API to set secrets programmatically

## Additional Resources

- [Cloudflare Workers Secrets Documentation](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/commands/#secret)
- [R2 Documentation](https://developers.cloudflare.com/r2/)
