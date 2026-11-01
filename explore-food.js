const { chromium } = require('playwright');

const foodPages = [
  { name: 'Salads', url: 'https://enjoy-with-rahul.onrender.com/food/salads' },
  { name: 'Curries', url: 'https://enjoy-with-rahul.onrender.com/food/curries' },
  { name: 'Beverages', url: 'https://enjoy-with-rahul.onrender.com/food/beverages' },
  { name: 'Desserts', url: 'https://enjoy-with-rahul.onrender.com/food/desserts' },
];

async function explorePage(page, name, url) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Exploring: ${name} - ${url}`);
  console.log(`${'='.repeat(60)}`);

  await page.goto(url, { waitUntil: 'networkidle' });

  const title = await page.title();
  console.log('Page Title:', title);

  // Get all links
  const links = await page.locator('a').all();
  console.log('\nLinks found:', links.length);
  for (const link of links) {
    const href = await link.getAttribute('href');
    const text = await link.textContent();
    if (text?.trim()) {
      console.log(`  - ${text.trim()}: ${href}`);
    }
  }

  // Get all buttons
  const buttons = await page.locator('button').all();
  console.log('\nButtons found:', buttons.length);
  for (const btn of buttons) {
    const text = await btn.textContent();
    if (text?.trim()) {
      console.log(`  - ${text.trim()}`);
    }
  }

  // Get all inputs
  const inputs = await page.locator('input').all();
  console.log('\nInputs found:', inputs.length);
  for (const input of inputs) {
    const type = await input.getAttribute('type');
    const name = await input.getAttribute('name');
    const id = await input.getAttribute('id');
    const placeholder = await input.getAttribute('placeholder');
    console.log(`  - type: ${type}, name: ${name}, id: ${id}, placeholder: ${placeholder}`);
  }

  // Get page text preview
  const bodyText = await page.textContent('body');
  console.log('\nPage text preview:', bodyText?.substring(0, 800));

  // Take screenshot
  await page.screenshot({ path: `screenshot-${name.toLowerCase()}.png`, fullPage: true });
  console.log(`\nScreenshot saved to screenshot-${name.toLowerCase()}.png`);
}

async function explore() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  for (const p of foodPages) {
    await explorePage(page, p.name, p.url);
  }

  await browser.close();
}

explore().catch(console.error);