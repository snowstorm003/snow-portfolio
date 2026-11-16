// Regenerates the social share image and PNG favicons in /public.
// Run after changing the name or title in src/data/site.json:
//   node scripts/generate-images.mjs
// Needs Playwright with Chromium (npm i -D playwright && npx playwright install chromium).
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const site = JSON.parse(readFileSync(new URL('../src/data/site.json', import.meta.url), 'utf8'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const fonts = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&family=IBM+Plex+Mono:wght@400;500&display=block">';

const og = `<!doctype html><html><head>${fonts}<style>
  *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#EEEBE3;color:#151515;font-family:Archivo,sans-serif;padding:56px 64px}
  .mono{font-family:'IBM Plex Mono',monospace;font-size:20px;letter-spacing:.06em;text-transform:uppercase;color:#5C5A55}
  .bar{height:64px;border:3px solid #151515;border-bottom:none;background:repeating-linear-gradient(-45deg,#151515 0 40px,#EEEBE3 40px 80px)}
  .slate{border:3px solid #151515;display:grid;grid-template-columns:2fr 1fr 1fr;gap:3px;background:#151515}
  .c{background:#EEEBE3;padding:20px 28px}.top{grid-column:1/-1;padding:24px 28px 30px}
  h1{margin:8px 0 0;font-weight:800;font-stretch:66%;font-size:128px;line-height:.9;text-transform:uppercase;letter-spacing:-.01em}
  .v{margin-top:8px;font-weight:700;font-stretch:85%;font-size:30px;text-transform:uppercase}.a{color:#B5301A}
</style></head><body>
  <div class="bar"></div>
  <div class="slate">
    <div class="c top"><span class="mono">Prod.</span><h1>${esc(site.name)}</h1></div>
    <div class="c"><span class="mono">Role</span><div class="v">${esc(site.title)}</div></div>
    <div class="c"><span class="mono">Alias</span><div class="v a">“${esc(site.alias)}”</div></div>
    <div class="c"><span class="mono">Base</span><div class="v">${esc(site.base)}</div></div>
  </div>
</body></html>`;

const icon = (size) => `<!doctype html><html><body style="margin:0;width:${size}px;height:${size}px;background:#EEEBE3;display:flex;align-items:center;justify-content:center">
  <div style="width:${Math.round(size * 0.44)}px;height:${Math.round(size * 0.44)}px;border-radius:50%;background:#B5301A"></div></body></html>`;

const browser = await chromium.launch();
const shoot = async (html, w, h, out) => {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: new URL(`../public/${out}`, import.meta.url).pathname });
  await page.close();
};
await shoot(og, 1200, 630, 'og-default.png');
await shoot(icon(180), 180, 180, 'apple-touch-icon.png');
await shoot(icon(32), 32, 32, 'favicon-32.png');
await browser.close();
console.log('Wrote public/og-default.png, apple-touch-icon.png, favicon-32.png');
