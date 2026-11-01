/**
 * Test Helpers
 *
 * Utility functions for common test operations in the Enjoy with R@hul framework.
 */

import { Page, Locator, expect } from '@playwright/test';

/**
 * Wait for a specific amount of time
 * @param ms - Milliseconds to wait
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a random string
 * @param length - Length of the string
 * @returns Random string
 */
export function randomString(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a random email
 * @returns Random email address
 */
export function randomEmail(): string {
  return `test.${randomString(8)}@example.com`;
}

/**
 * Generate a random phone number (Indian format)
 * @returns Random phone number
 */
export function randomPhone(): string {
  const prefix = '91';
  const number = Math.floor(1000000000 + Math.random() * 9000000000);
  return `+${prefix}-${number}`;
}

/**
 * Get current date in YYYY-MM-DD format
 * @returns Current date string
 */
export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get future date in YYYY-MM-DD format
 * @param days - Days to add
 * @returns Future date string
 */
export function getFutureDate(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

/**
 * Get past date in YYYY-MM-DD format
 * @param days - Days to subtract
 * @returns Past date string
 */
export function getPastDate(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

/**
 * Wait for element to be visible with custom message
 * @param locator - Element locator
 * @param message - Custom error message
 * @param timeout - Timeout in milliseconds
 */
export async function waitForVisible(
  locator: Locator,
  message: string = 'Element not visible',
  timeout: number = 10000
): Promise<void> {
  await expect(locator, message).toBeVisible({ timeout });
}

/**
 * Wait for element to be hidden
 * @param locator - Element locator
 * @param timeout - Timeout in milliseconds
 */
export async function waitForHidden(locator: Locator, timeout: number = 10000): Promise<void> {
  await expect(locator).toBeHidden({ timeout });
}

/**
 * Wait for element to have text
 * @param locator - Element locator
 * @param text - Expected text
 * @param timeout - Timeout in milliseconds
 */
export async function waitForText(
  locator: Locator,
  text: string | RegExp,
  timeout: number = 10000
): Promise<void> {
  await expect(locator).toContainText(text, { timeout });
}

/**
 * Click element with retry on failure
 * @param locator - Element locator
 * @param retries - Number of retries
 * @param delay - Delay between retries in ms
 */
export async function clickWithRetry(
  locator: Locator,
  retries: number = 3,
  delay: number = 1000
): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try {
      await locator.click({ timeout: 5000 });
      return;
    } catch (error) {
      if (i === retries - 1) throw error;
      await wait(delay);
    }
  }
}

/**
 * Fill input with retry on failure
 * @param locator - Input locator
 * @param value - Value to fill
 * @param retries - Number of retries
 */
export async function fillWithRetry(
  locator: Locator,
  value: string,
  retries: number = 3
): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try {
      await locator.fill(value, { timeout: 5000 });
      return;
    } catch (error) {
      if (i === retries - 1) throw error;
      await wait(500);
    }
  }
}

/**
 * Take screenshot with timestamp
 * @param page - Playwright page
 * @param name - Screenshot name
 * @returns Path to screenshot
 */
export async function takeScreenshot(page: Page, name: string): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `test-results/screenshots/${name}-${timestamp}.png`;
  await page.screenshot({ path: filename, fullPage: true });
  return filename;
}

/**
 * Scroll element into view
 * @param locator - Element locator
 */
export async function scrollIntoView(locator: Locator): Promise<void> {
  await locator.scrollIntoViewIfNeeded();
}

/**
 * Get all text from multiple elements
 * @param locator - Element locator
 * @returns Array of text content
 */
export async function getAllTexts(locator: Locator): Promise<string[]> {
  const elements = await locator.all();
  const texts: string[] = [];
  for (const element of elements) {
    const text = await element.textContent();
    if (text?.trim()) {
      texts.push(text.trim());
    }
  }
  return texts;
}

/**
 * Verify page has expected title
 * @param page - Playwright page
 * @param expectedTitle - Expected title (string or regex)
 */
export async function verifyPageTitle(page: Page, expectedTitle: string | RegExp): Promise<void> {
  if (typeof expectedTitle === 'string') {
    await expect(page).toHaveTitle(expectedTitle);
  } else {
    await expect(page).toHaveTitle(expectedTitle);
  }
}

/**
 * Verify URL contains expected path
 * @param page - Playwright page
 * @param expectedPath - Expected path
 */
export async function verifyUrlContains(page: Page, expectedPath: string): Promise<void> {
  await expect(page).toHaveURL(new RegExp(expectedPath));
}

/**
 * Check if element exists without throwing
 * @param locator - Element locator
 * @returns True if element exists
 */
export async function elementExists(locator: Locator): Promise<boolean> {
  try {
    await expect(locator).toBeAttached({ timeout: 2000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if element is visible without throwing
 * @param locator - Element locator
 * @returns True if element is visible
 */
export async function isElementVisible(locator: Locator): Promise<boolean> {
  try {
    await expect(locator).toBeVisible({ timeout: 2000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get attribute value safely
 * @param locator - Element locator
 * @param attribute - Attribute name
 * @returns Attribute value or null
 */
export async function getAttributeSafe(locator: Locator, attribute: string): Promise<string | null> {
  try {
    return await locator.getAttribute(attribute);
  } catch {
    return null;
  }
}

/**
 * Verify page loaded successfully (no 404/500)
 * @param page - Playwright page
 */
export async function verifyPageNotError(page: Page): Promise<void> {
  const title = await page.title();
  expect(title.toLowerCase()).not.toContain('404');
  expect(title.toLowerCase()).not.toContain('500');
  expect(title.toLowerCase()).not.toContain('error');
}

/**
 * Wait for network to be idle
 * @param page - Playwright page
 */
export async function waitForNetworkIdle(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
}

/**
 * Get viewport size
 * @param page - Playwright page
 */
export function getViewportSize(page: Page): { width: number; height: number } {
  return page.viewportSize() ?? { width: 1280, height: 720 };
}

/**
 * Set viewport size
 * @param page - Playwright page
 * @param width - Width
 * @param height - Height
 */
export async function setViewportSize(page: Page, width: number, height: number): Promise<void> {
  await page.setViewportSize({ width, height });
}

/**
 * Format price string for comparison
 * @param price - Price string
 * @returns Normalized price number
 */
export function parsePrice(price: string): number {
  const match = price.match(/₹?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  return match ? parseFloat(match[1].replace(/,/g, '')) : 0;
}

/**
 * Compare two prices with tolerance
 * @param price1 - First price
 * @param price2 - Second price
 * @param tolerance - Tolerance in rupees
 */
export function pricesMatch(price1: string, price2: string, tolerance: number = 1): boolean {
  return Math.abs(parsePrice(price1) - parsePrice(price2)) <= tolerance;
}

/**
 * Retry a function until it succeeds or max attempts reached
 * @param fn - Function to retry
 * @param maxAttempts - Maximum attempts
 * @param delay - Delay between attempts in ms
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxAttempts - 1) throw error;
      await wait(delay);
    }
  }
  throw new Error('Retry exhausted');
}