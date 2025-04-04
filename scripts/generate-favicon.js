import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [16, 32, 48, 64, 128, 256];

async function generateFavicons() {
    const inputFile = join(__dirname, '..', 'site-logo', 'rosemary-memorial-logo.svg');
    const outputDir = join(__dirname, '..', 'public', 'favicon');

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Generate PNGs in different sizes
    for (const size of sizes) {
        await sharp(inputFile)
            .resize(size, size, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .png()
            .toFile(join(outputDir, `favicon-${size}x${size}.png`));
    }

    // Generate ICO file (using 16x16 and 32x32)
    const favicon16 = await sharp(inputFile)
        .resize(16, 16, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toBuffer();

    const favicon32 = await sharp(inputFile)
        .resize(32, 32, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toBuffer();

    await fs.writeFile(join(outputDir, 'favicon.ico'), favicon32);
}

generateFavicons().catch(console.error);
