#!/bin/bash

# Script to set Wrangler secrets from .env file
# Usage: npm run secrets:set

set -e

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found"
    echo "Please create a .env file based on .env.example"
    exit 1
fi

# Load environment variables from .env
export $(grep -v '^#' .env | xargs)

echo "Setting Wrangler secrets..."

# Set R2 secrets (required for build-time gallery inventory generation)
if [ ! -z "$R2_ACCESS_KEY_ID" ]; then
    echo "$R2_ACCESS_KEY_ID" | wrangler secret put R2_ACCESS_KEY_ID -c wrangler.jsonc
    echo "✓ Set R2_ACCESS_KEY_ID"
fi

if [ ! -z "$R2_SECRET_ACCESS_KEY" ]; then
    echo "$R2_SECRET_ACCESS_KEY" | wrangler secret put R2_SECRET_ACCESS_KEY -c wrangler.jsonc
    echo "✓ Set R2_SECRET_ACCESS_KEY"
fi

if [ ! -z "$R2_BUCKET_URL" ]; then
    echo "$R2_BUCKET_URL" | wrangler secret put R2_BUCKET_URL -c wrangler.jsonc
    echo "✓ Set R2_BUCKET_URL"
fi

if [ ! -z "$R2_BUCKET_NAME" ]; then
    echo "$R2_BUCKET_NAME" | wrangler secret put R2_BUCKET_NAME -c wrangler.jsonc
    echo "✓ Set R2_BUCKET_NAME"
fi

if [ ! -z "$R2_ACCOUNT_ID" ]; then
    echo "$R2_ACCOUNT_ID" | wrangler secret put R2_ACCOUNT_ID -c wrangler.jsonc
    echo "✓ Set R2_ACCOUNT_ID"
fi

# Set optional email secrets (if using Resend)
if [ ! -z "$RESEND_API_KEY" ]; then
    echo "$RESEND_API_KEY" | wrangler secret put RESEND_API_KEY -c wrangler.jsonc
    echo "✓ Set RESEND_API_KEY"
fi

if [ ! -z "$RESEND_FROM_EMAIL" ]; then
    echo "$RESEND_FROM_EMAIL" | wrangler secret put RESEND_FROM_EMAIL -c wrangler.jsonc
    echo "✓ Set RESEND_FROM_EMAIL"
fi

if [ ! -z "$RESEND_TO_EMAIL" ]; then
    echo "$RESEND_TO_EMAIL" | wrangler secret put RESEND_TO_EMAIL -c wrangler.jsonc
    echo "✓ Set RESEND_TO_EMAIL"
fi

# Set optional Turnstile secret (if using Cloudflare Turnstile)
if [ ! -z "$TURNSTILE_SECRET_KEY" ]; then
    echo "$TURNSTILE_SECRET_KEY" | wrangler secret put TURNSTILE_SECRET_KEY -c wrangler.jsonc
    echo "✓ Set TURNSTILE_SECRET_KEY"
fi

echo ""
echo "✅ All secrets have been set successfully!"
echo ""
echo "Note: These secrets are stored securely in Cloudflare and are only"
echo "accessible to your Worker at runtime. They are not included in your"
echo "deployed code or visible in the dashboard."
