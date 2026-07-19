import sharp from 'sharp';
import path from 'path';
import { mkdirSync } from 'fs';

const INPUT = path.join(__dirname, '../public/rccg-logo.png');
const OUT_DIR = path.join(__dirname, '../public/icons');

const SIZES = [
  { name: 'icon-72x72.png', size: 72 },
  { name: 'icon-96x96.png', size: 96 },
  { name: 'icon-128x128.png', size: 128 },
  { name: 'icon-144x144.png', size: 144 },
  { name: 'icon-152x152.png', size: 152 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-384x384.png', size: 384 },
  { name: 'icon-512x512.png', size: 512 },
];

async function generate() {
  mkdirSync(OUT_DIR, { recursive: true });

  for (const { name, size } of SIZES) {
    await sharp(INPUT)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 26, g: 35, b: 126, alpha: 0 },
      })
      .png()
      .toFile(path.join(OUT_DIR, name));
    console.log(`Generated ${name}`);
  }

  // Apple touch icon
  await sharp(INPUT)
    .resize(180, 180, {
      fit: 'contain',
      background: { r: 26, g: 35, b: 126, alpha: 0 },
    })
    .png()
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // Favicon 32
  await sharp(INPUT)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 26, g: 35, b: 126, alpha: 0 },
    })
    .png()
    .toFile(path.join(__dirname, '../public/favicon-32x32.png'));
  console.log('Generated favicon-32x32.png');
}

generate().catch(console.error);