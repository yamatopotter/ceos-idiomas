const { default: lighthouse } = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

const URL = 'http://localhost:8080';
const OUT_DIR = path.join(__dirname, 'lighthouse');

const CONFIGS = [
  {
    name: 'desktop',
    formFactor: 'desktop',
    screenEmulation: { mobile: false, width: 1920, height: 1080, deviceScaleFactor: 1, disabled: false },
    throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 },
  },
  {
    name: 'mobile',
    formFactor: 'mobile',
    screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 2, disabled: false },
    throttling: { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4 },
  },
];

async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const config of CONFIGS) {
    console.log(`\n🔦 Rodando Lighthouse — ${config.name}...`);

    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'],
      chromePath: '/usr/bin/google-chrome',
    });

    const result = await lighthouse(URL, {
      port: chrome.port,
      output: ['html', 'json'],
      logLevel: 'error',
      formFactor: config.formFactor,
      screenEmulation: config.screenEmulation,
      throttling: config.throttling,
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    });

    const html = result.report[0];
    const json = JSON.parse(result.report[1]);

    const htmlPath = path.join(OUT_DIR, `${config.name}.html`);
    const jsonPath = path.join(OUT_DIR, `${config.name}.json`);
    fs.writeFileSync(htmlPath, html);
    fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2));

    const cats = json.categories;
    console.log(`  Performance:    ${Math.round(cats.performance.score * 100)}`);
    console.log(`  Acessibilidade: ${Math.round(cats.accessibility.score * 100)}`);
    console.log(`  Boas Práticas:  ${Math.round(cats['best-practices'].score * 100)}`);
    console.log(`  SEO:            ${Math.round(cats.seo.score * 100)}`);
    console.log(`  📄 Relatório: ${htmlPath}`);

    await chrome.kill();
  }

  console.log('\n🎉 Lighthouse concluído!');
}

run().catch(console.error);
