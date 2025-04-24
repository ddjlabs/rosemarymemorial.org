import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate required environment variables
const requiredEnvVars = [
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_ACCOUNT_ID',
  'R2_BUCKET_NAME'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// Construct the proper R2 endpoint URL
const accountId = process.env.R2_ACCOUNT_ID;
const r2Endpoint = `https://${accountId}.r2.cloudflarestorage.com`;

// For public URLs (if using Cloudflare R2 with public access)
const publicUrlBase = process.env.R2_BUCKET_URL || `https://${process.env.R2_BUCKET_NAME}.${accountId}.r2.cloudflarestorage.com`;

console.log(`Using R2 endpoint: ${r2Endpoint}`);
console.log(`Using public URL base: ${publicUrlBase}`);

// Initialize S3 client with AWS SDK v3
const s3Client = new S3Client({
  region: 'auto', // R2 uses 'auto' as the region
  endpoint: r2Endpoint,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true, // Required for R2 compatibility
});

async function generateGalleryInventory() {
  try {
    const params = {
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: 'gallery/',
    };

    console.log(`Listing objects in bucket: ${process.env.R2_BUCKET_NAME} with prefix: gallery/`);
    
    // Using AWS SDK v3 command pattern
    const command = new ListObjectsV2Command(params);
    const data = await s3Client.send(command);
    
    if (!data.Contents || data.Contents.length === 0) {
      console.log('No objects found in the specified bucket and prefix.');
      return;
    }

    console.log(`Found ${data.Contents.length} objects in the bucket.`);

    // Construct proper URLs for R2 objects
    const inventory = data.Contents
      .filter(item => item.Key !== 'gallery/') // Filter out the prefix itself
      .map((item) => {
        // Get the public URL for the object
        const publicUrl = `${publicUrlBase.replace(/\/$/, '')}/${item.Key}`;
        
        return {
          fileName: path.basename(item.Key),
          key: item.Key,
          url: publicUrl,
          lastModified: item.LastModified,
          size: item.Size
        };
      });

    const outputPath = path.join(__dirname, '../public/gallery-inventory.json');
    fs.writeFileSync(
      outputPath,
      JSON.stringify(inventory, null, 2)
    );

    console.log(`Gallery inventory generated successfully! Saved to ${outputPath}`);
    console.log(`Total items: ${inventory.length}`);
  } catch (error) {
    console.error('Error generating gallery inventory:', error);
  }
}

generateGalleryInventory();