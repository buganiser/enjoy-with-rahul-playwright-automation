const { chromium } = require('playwright');

async function explore() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Navigating to https://enjoy-with-rahul.onrender.com/');
  await page.goto('https://enjoy-with-rahul.onrender.com/', { waitUntil: 'networkidle' });

  // Get page title
  const title = await page.title();
  console.log('Page Title:', title);

  // Get all links
  const links = await page.locator('a').all();
  console.log('\nLinks found:', links.length);
  for (const link of links) {
    const href = await link.getAttribute('href');
    const text = await link.textContent();
    console.log(`  - ${text?.trim()}: ${href}`);
  }

  // Get all buttons
  const buttons = await page.locator('button').all();
  console.log('\nButtons found:', buttons.length);
  for (const btn of buttons) {
    const text = await btn.textContent();
    console.log(`  - ${text?.trim()}`);
  }

  // Get all inputs
  const inputs = await page.locator('input').all();
  console.log('\nInputs found:', inputs.length);
  for (const input of inputs) {
    const type = await input.getAttribute('type');
    const name = await input.getAttribute('name');
    const id = await input.getAttribute('id');
    console.log(`  - type: ${type}, name: ${name}, id: ${id}`);
  }

  // Get all forms
  const forms = await page.locator('form').all();
  console.log('\nForms found:', forms.length);

  // Get page HTML structure (main elements)
  const bodyText = await page.textContent('body');
  console.log('\nPage text preview:', bodyText?.substring(0, 500));

  // Take screenshot
  await page.screenshot({ path: 'website-screenshot.png', fullPage: true });
  console.log('\nScreenshot saved to website-screenshot.png');

  await browser.close();
}

explore().catch(console.error);