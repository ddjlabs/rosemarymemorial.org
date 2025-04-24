import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import path from 'path';

export interface Photo {
    fileName: string;
    key: string;
    url: string;
    lastModified?: Date;
    size?: number;
    title?: string;
    description?: string;
    year?: string;
    category?: 'education' | 'family' | 'adventure';
}

// Cache for photos to avoid multiple fetches
let photosCache: Photo[] | null = null;

export async function fetchPhotos(): Promise<Photo[]> {
    // Return cached photos if available
    if (photosCache) {
        return photosCache;
    }

    try {
        // In browser context, use fetch API
        if (typeof window !== 'undefined') {
            try {
                // Use window.location.origin to ensure we have the full URL
                const inventoryUrl = new URL('/gallery-inventory.json', window.location.origin).href;
                const response = await fetch(inventoryUrl, {
                    cache: 'no-cache'
                });
                
                if (response.ok) {
                    const photos: Photo[] = await response.json();
                    console.log(`Loaded ${photos.length} photos from gallery inventory (browser)`);
                    photosCache = photos;
                    return photos;
                }
                
                console.warn('Gallery inventory file not found in browser context');
                return [];
            } catch (error) {
                console.error('Error fetching photos in browser:', error);
                return [];
            }
        }
        
        // Server-side: first try to load from the generated inventory file
        try {
            // In Node.js environment, use fs to read the file directly
            const fs = await import('fs/promises');
            const inventoryPath = path.resolve(process.cwd(), 'public/gallery-inventory.json');
            
            try {
                const data = await fs.readFile(inventoryPath, 'utf-8');
                const photos: Photo[] = JSON.parse(data);
                console.log(`Loaded ${photos.length} photos from gallery inventory file (server)`);
                photosCache = photos;
                return photos;
            } catch (fsError) {
                console.warn('Could not read gallery inventory file, falling back to R2:', fsError);
                // Fall back to fetching from R2
                const r2Photos = await fetchPhotosFromR2();
                photosCache = r2Photos;
                return r2Photos;
            }
        } catch (error) {
            console.error('Error in server-side photo loading:', error);
            
            // Last resort: try R2 directly
            const r2Photos = await fetchPhotosFromR2();
            photosCache = r2Photos;
            return r2Photos;
        }
    } catch (error) {
        console.error('Fatal error fetching photos:', error);
        return [];
    }
}

async function fetchPhotosFromR2(): Promise<Photo[]> {
    // Only run this on the server side
    if (typeof window !== 'undefined') {
        console.warn('Cannot fetch photos directly from R2 in browser environment');
        return [];
    }
    
    // Validate required environment variables
    const accountId = process.env.R2_ACCOUNT_ID;
    const bucketName = process.env.R2_BUCKET_NAME;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    
    // Custom public URL if provided, otherwise construct the standard R2 public URL
    const publicUrlBase = process.env.R2_BUCKET_URL || 
                          `https://${bucketName}.${accountId}.r2.cloudflarestorage.com`;
    
    // R2 endpoint for S3 API
    const r2Endpoint = `https://${accountId}.r2.cloudflarestorage.com`;

    if (!accountId || !bucketName || !accessKeyId || !secretAccessKey) {
        console.error('Missing required R2 configuration');
        return [];
    }

    // Initialize S3 client with AWS SDK v3
    const s3Client = new S3Client({
        region: 'auto', // R2 uses 'auto' as the region
        endpoint: r2Endpoint,
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
        },
        forcePathStyle: true, // Required for R2 compatibility
    });

    try {
        const params = {
            Bucket: bucketName,
            Prefix: 'gallery/',
        };

        console.log(`Fetching objects from R2 bucket: ${bucketName} with prefix: gallery/`);
        
        // Using AWS SDK v3 command pattern
        const command = new ListObjectsV2Command(params);
        const data = await s3Client.send(command);
        
        if (!data.Contents || data.Contents.length === 0) {
            console.log('No objects found in R2 bucket');
            return [];
        }

        console.log(`Found ${data.Contents.length} objects in R2 bucket`);

        // Construct proper URLs for R2 objects
        const photos: Photo[] = [];
        
        for (const item of data.Contents) {
            if (!item.Key || item.Key === 'gallery/') {
                continue; // Skip undefined keys or the prefix itself
            }
            
            // Get the public URL for the object
            const publicUrl = `${publicUrlBase.replace(/\/$/, '')}/${item.Key}`;
            const fileName = item.Key.split('/').pop() || path.basename(item.Key);
            
            photos.push({
                fileName,
                key: item.Key,
                url: publicUrl,
                lastModified: item.LastModified,
                size: item.Size
            });
        }
        
        return photos;
    } catch (error) {
        console.error('Error fetching photos from R2:', error);
        return [];
    }
}
