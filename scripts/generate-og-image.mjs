import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
  <text x="${WIDTH / 2}" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="bold" fill="#e2e8f0" text-anchor="middle">Personel</text>
  <text x="${WIDTH / 2}" y="350" font-family="system-ui, -apple-system, sans-serif" font-size="28" fill="#94a3b8" text-anchor="middle">全栈开发者 / 开源爱好者</text>
  <text x="${WIDTH / 2}" y="440" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#64748b" text-anchor="middle">A minimalist personal homepage.</text>
</svg>`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '..', 'public', 'og-image.png');

try {
  const sharp = (await import('sharp')).default;
  await sharp(Buffer.from(svg))
    .resize(WIDTH, HEIGHT)
    .png()
    .toFile(outputPath);
  console.log(`✅ OG image generated: ${outputPath}`);
} catch (err) {
  console.error('❌ Failed to generate OG image:', err.message);
  process.exit(1);
}
