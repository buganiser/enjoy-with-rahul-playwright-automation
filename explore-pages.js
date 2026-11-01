const { chromium } = require('playwright');

const pages = [
  { name: 'Home', url: 'https://enjoy-with-rahul.onrender.com/' },
  { name: 'Rooms', url: 'https://enjoy-with-rahul.onrender.com/rooms' },
  { name: 'Food', url: 'https://enjoy-with-rahul.onrender.com/food' },
  { name: 'Booking', url: 'https://enjoy-with-rahul.onrender.com/booking' },
  { name: 'Contact', url: 'https://enjoy-with-rahul.onrender.com/contact' },
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

  // Get all selects
  const selects = await page.locator('select').all();
  console.log('\nSelects found:', selects.length);
  for (const select of selects) {
    const name = await select.getAttribute('name');
    const id = await select.getAttribute('id');
    const options = await select.locator('option').all();
    console.log(`  - name: ${name}, id: ${id}, options: ${options.length}`);
    for (const opt of options) {
      const val = await opt.getAttribute('value');
      const text = await opt.textContent();
      console.log(`      ${val}: ${text?.trim()}`);
    }
  }

  // Get all textareas
  const textareas = await page.locator('textarea').all();
  console.log('\nTextareas found:', textareas.length);
  for (const ta of textareas) {
    const name = await ta.getAttribute('name');
    const id = await ta.getAttribute('id');
    const placeholder = await ta.getAttribute('placeholder');
    console.log(`  - name: ${name}, id: ${id}, placeholder: ${placeholder}`);
  }

  // Get all forms
  const forms = await page.locator('form').all();
  console.log('\nForms found:', forms.length);
  for (const form of forms) {
    const action = await form.getAttribute('action');
    const method = await form.getAttribute('method');
    console.log(`  - action: ${action}, method: ${method}`);
  }

  // Get page text preview
  const bodyText = await page.textContent('body');
  console.log('\nPage text preview:', bodyText?.substring(0, 500));

  // Take screenshot
  await page.screenshot({ path: `screenshot-${name.toLowerCase()}.png`, fullPage: true });
  console.log(`\nScreenshot saved to screenshot-${name.toLowerCase()}.png`);
}

async function explore() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  for (const p of pages) {
    await explorePage(page, p.name, p.url);
  }

  await browser.close();
}

explore().catch(console.error);