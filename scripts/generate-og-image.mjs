import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const WIDTH = 1200;
const HEIGHT = 630;

const BORDER = 12;
const YELLOW = '#ffe44d';
const INK = '#0a0a0a';
const PAPER = '#fffcf2';

// Neo-brutalist OG card: paper ground, offset yellow panel, hard black shadow.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${PAPER}" />

  <!-- hard shadow of the main panel -->
  <rect x="106" y="116" width="1000" height="420" fill="${INK}" />
  <!-- main yellow panel -->
  <rect x="90" y="100" width="1000" height="420" fill="${YELLOW}" stroke="${INK}" stroke-width="${BORDER}" />

  <text x="140" y="185" font-family="'JetBrains Mono', monospace" font-size="24" font-weight="700" letter-spacing="6" fill="${INK}">HELLO — 我是</text>
  <text x="140" y="330" font-family="'Space Grotesk', system-ui, sans-serif" font-size="140" font-weight="700" fill="${INK}">杨晔塬</text>
  <text x="140" y="408" font-family="'Space Grotesk', system-ui, sans-serif" font-size="50" font-weight="700" fill="${INK}">AI AGENT 开发 · 腾讯实习</text>
  <text x="140" y="468" font-family="'JetBrains Mono', monospace" font-size="21" font-weight="500" letter-spacing="2" fill="${INK}">LANGGRAPH · 多智能体编排 · 电子科技大学</text>

  <!-- accent blocks bottom-right -->
  <rect x="880" y="556" width="60" height="44" fill="#2e6ff2" stroke="${INK}" stroke-width="6" />
  <rect x="950" y="556" width="60" height="44" fill="#ff4d3d" stroke="${INK}" stroke-width="6" />
  <rect x="1020" y="556" width="60" height="44" fill="#22c55e" stroke="${INK}" stroke-width="6" />
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
