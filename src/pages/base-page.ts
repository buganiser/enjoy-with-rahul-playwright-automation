/**
 * Base Page Object Class
 *
 * Provides common functionality for all page objects in the framework.
 * All page objects should extend this class.
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePageObject } from '@types';

export abstract class BasePage implements BasePageObject {
  protected readonly page: Page;
  public readonly url: string;

  constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
  }

  /**
   * Navigate to the page URL
   */
  async goto(): Promise<void> {
    await this.page.goto(this.url, { waitUntil: 'networkidle' });
    await this.waitForLoad();
  }

  /**
   * Wait for page to fully load
   * Override in child classes for page-specific wait conditions
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Check if page is loaded
   * Override in child classes for page-specific verification
   */
  async isLoaded(): Promise<boolean> {
    try {
      await this.page.waitForURL(this.url, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Take screenshot of current page
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true
    });
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator, timeout = 10000): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForElementHidden(locator: Locator, timeout = 10000): Promise<void> {
    await expect(locator).toBeHidden({ timeout });
  }

  /**
   * Click element with retry
   */
  async clickElement(locator: Locator, options?: { force?: boolean; timeout?: number }): Promise<void> {
    await locator.click({
      force: options?.force ?? false,
      timeout: options?.timeout ?? 10000
    });
  }

  /**
   * Fill input field
   */
  async fillInput(locator: Locator, value: string, options?: { force?: boolean; timeout?: number }): Promise<void> {
    await locator.fill(value, {
      force: options?.force ?? false,
      timeout: options?.timeout ?? 10000
    });
  }

  /**
   * Select option from dropdown
   */
  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  /**
   * Get text content of element
   */
  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? '';
  }

  /**
   * Get all text contents from multiple elements
   */
  async getAllTexts(locator: Locator): Promise<string[]> {
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
   * Check if element exists
   */
  async elementExists(locator: Locator): Promise<boolean> {
    try {
      await expect(locator).toBeAttached({ timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    try {
      await expect(locator).toBeVisible({ timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Reload page
   */
  async reload(): Promise<void> {
    await this.page.reload({ waitUntil: 'networkidle' });
  }

  /**
   * Go back in browser history
   */
  async goBack(): Promise<void> {
    await this.page.goBack({ waitUntil: 'networkidle' });
  }

  /**
   * Wait for network idle
   */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}