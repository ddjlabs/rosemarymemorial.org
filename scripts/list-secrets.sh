#!/bin/bash

# Script to list all Wrangler secrets
# Usage: npm run secrets:list

echo "Listing all secrets for rosemarymemorial-org worker..."
echo ""

wrangler secret list -c wrangler.jsonc

echo ""
echo "Note: Secret values are never displayed for security reasons."
echo "Only secret names and metadata are shown."
