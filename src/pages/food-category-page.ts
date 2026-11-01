/**
 * Food Category Page Object (Base class for Curries, Beverages, Desserts)
 *
 * Base class for food category pages like Curries, Beverages, Desserts.
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { NavigationComponent } from '@components/navigation';
import { FoodItem, FoodCategory } from '@types';

export class FoodCategoryPage extends BasePage {
  protected readonly navigation: NavigationComponent;

  // Page header
  protected readonly pageTitle: Locator;
  protected readonly pageSubtitle: Locator;

  // Food items container
  protected readonly foodItemsContainer: Locator;
  protected readonly foodItems: Locator;

  constructor(page: Page, url: string, categoryName: string) {
    super(page, url);
    this.navigation = new NavigationComponent(page);

    // Page header - use category name for heading
    this.pageTitle = page.getByRole('heading', { level: 1, name: new RegExp(categoryName, 'i') });
    this.pageSubtitle = page.locator('text=/rich, flavorful|cool, refreshing|sweet treats/i').first();

    // Food items - each item appears to be in a card/article
    this.foodItemsContainer = page.locator('section, div').filter({ hasText: /₹/i }).first();
    this.foodItems = page.locator('article, div, section').filter({ hasText: /₹/i });
  }

  /**
   * Get navigation component
   */
  getNavigation(): NavigationComponent {
    return this.navigation;
  }

  /**
   * Verify food category page is loaded
   */
  async verifyPageLoaded(): Promise<void> {
    await this.waitForLoad();
    await expect(this.pageTitle).toBeVisible({ timeout: 10000 });
    await this.navigation.verifyNavBarVisible();
  }

  /**
   * Verify page header
   */
  async verifyPageHeader(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageSubtitle).toBeVisible();
  }

  /**
   * Get all food items count
   */
  async getFoodItemsCount(): Promise<number> {
    return await this.foodItems.count();
  }

  /**
   * Extract all food items from the page
   */
  async extractFoodItems(): Promise<FoodItem[]> {
    const items: FoodItem[] = [];
    const count = await this.foodItems.count();

    for (let i = 0; i < count; i++) {
      const item = this.foodItems.nth(i);
      const itemText = await item.textContent();

      if (!itemText?.trim()) continue;

      // Parse item text to extract name, description, ingredients, price
      // Format appears to be: Name\nIngredients: ...\n₹ Price
      const lines = itemText.trim().split('\n').map(l => l.trim()).filter(l => l);

      if (lines.length >= 2) {
        const name = lines[0];
        let description = '';
        let ingredients = '';
        let price = '';

        for (const line of lines.slice(1)) {
          if (line.startsWith('Ingredients:')) {
            ingredients = line.replace('Ingredients:', '').trim();
          } else if (line.match(/^₹\s*\d+/)) {
            price = line.trim();
          } else if (!description) {
            description = line;
          }
        }

        items.push({ name, description, ingredients, price });
      }
    }

    return items;
  }

  /**
   * Verify food items are displayed
   */
  async verifyFoodItemsDisplayed(expectedCount?: number): Promise<void> {
    const count = await this.getFoodItemsCount();
    if (expectedCount !== undefined) {
      expect(count).toBe(expectedCount);
    } else {
      expect(count).toBeGreaterThan(0);
    }
  }

  /**
   * Get page title text
   */
  async getPageTitle(): Promise<string> {
    return await this.getText(this.pageTitle);
  }

  /**
   * Verify page title matches expected
   */
  async verifyPageTitle(expectedPattern: RegExp): Promise<void> {
    const title = await this.page.title();
    expect(title).toMatch(expectedPattern);
  }
}