const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = '/usr/bin/google-chrome';
const BASE_URL = 'http://localhost:8080';
const OUT_DIR = path.join(__dirname, 'screenshots');

const VIEWPORTS = [
  { name: 'mobile-375',    width: 375,  height: 812,  mobile: true  },
  { name: 'mobile-390',    width: 390,  height: 844,  mobile: true  },
  { name: 'tablet-768',    width: 768,  height: 1024, mobile: false },
  { name: 'desktop-1280',  width: 1280, height: 800,  mobile: false },
  { name: 'fhd-1920',      width: 1920, height: 1080, mobile: false },
  { name: 'qhd-2560',      width: 2560, height: 1440, mobile: false },
  { name: '4k-3840',       width: 3840, height: 2160, mobile: false },
];

const SECTIONS = [
  { name: 'topo',          scrollY: 0      },
  { name: 'about',         scrollY: 900    },
  { name: 'cursos',        scrollY: 1800   },
  { name: 'diferenciais',  scrollY: 2700   },
  { name: 'faq',           scrollY: 3600   },
  { name: 'depoimentos',   scrollY: 4400   },
  { name: 'rodape',        scrollY: 99999  },
];

async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: 'new',
  });

  for (const vp of VIEWPORTS) {
    console.log(`\n📐 Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const vpDir = path.join(OUT_DIR, vp.name);
    if (!fs.existsSync(vpDir)) fs.mkdirSync(vpDir);

    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.mobile, deviceScaleFactor: vp.mobile ? 2 : 1 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });

    // Screenshot full page
    await page.screenshot({ path: path.join(vpDir, 'full-page.png'), fullPage: true });
    console.log(`  ✅ full-page.png`);

    // Screenshots por seção (viewport)
    for (const section of SECTIONS) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), section.scrollY);
      await new Promise(r => setTimeout(r, 300));
      await page.screenshot({ path: path.join(vpDir, `${section.name}.png`) });
      console.log(`  ✅ ${section.name}.png`);
    }

    await page.close();
  }

  await browser.close();
  console.log(`\n🎉 Screenshots salvas em: ${OUT_DIR}`);
}

run().catch(console.error);
