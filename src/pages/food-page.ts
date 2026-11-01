/**
 * Food Page Object
 *
 * Represents the Food page of Enjoy with R@hul website.
 * URL: https://enjoy-with-rahul.onrender.com/food
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { NavigationComponent } from '@components/navigation';
import { FoodCategory } from '@types';

export class FoodPage extends BasePage {
  private readonly navigation: NavigationComponent;

  // Page header
  private readonly pageTitle: Locator;
  private readonly pageSubtitle: Locator;
  private readonly bookATableLink: Locator;

  // Food category cards/links
  private readonly saladsLink: Locator;
  private readonly curriesLink: Locator;
  private readonly beveragesLink: Locator;
  private readonly dessertsLink: Locator;

  constructor(page: Page) {
    super(page, '/food');
    this.navigation = new NavigationComponent(page);

    // Page header
    this.pageTitle = page.getByRole('heading', { level: 1, name: /delightful flavors await/i });
    this.pageSubtitle = page.getByText(/fresh, healthy & homely cooked meals/i);
    this.bookATableLink = page.getByRole('link', { name: /book a table/i });

    // Category links
    this.saladsLink = page.getByRole('link', { name: /fresh salads/i });
    this.curriesLink = page.getByRole('link', { name: /authentic curries/i });
    this.beveragesLink = page.getByRole('link', { name: /beverages/i });
    this.dessertsLink = page.getByRole('link', { name: /desserts/i });
  }

  /**
   * Get navigation component
   */
  getNavigation(): NavigationComponent {
    return this.navigation;
  }

  /**
   * Verify food page is loaded correctly
   */
  async verifyPageLoaded(): Promise<void> {
    await this.waitForLoad();
    await expect(this.pageTitle).toBeVisible({ timeout: 10000 });
    await this.navigation.verifyNavBarVisible();
  }

  /**
   * Verify page header content
   */
  async verifyPageHeader(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageSubtitle).toBeVisible();
    await expect(this.bookATableLink).toBeVisible();
  }

  /**
   * Verify all category links are present
   */
  async verifyCategoryLinks(): Promise<void> {
    await expect(this.saladsLink).toBeVisible();
    await expect(this.curriesLink).toBeVisible();
    await expect(this.beveragesLink).toBeVisible();
    await expect(this.dessertsLink).toBeVisible();
  }

  /**
   * Click Book a Table link - navigates to booking page
   */
  async clickBookATable(): Promise<void> {
    await this.bookATableLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Fresh Salads category - navigates to salads page
   */
  async clickSalads(): Promise<void> {
    await this.saladsLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Authentic Curries category - navigates to curries page
   */
  async clickCurries(): Promise<void> {
    await this.curriesLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Beverages category - navigates to beverages page
   */
  async clickBeverages(): Promise<void> {
    await this.beveragesLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Desserts category - navigates to desserts page
   */
  async clickDesserts(): Promise<void> {
    await this.dessertsLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get page title text
   */
  async getPageTitle(): Promise<string> {
    return await this.getText(this.pageTitle);
  }

  /**
   * Get page subtitle text
   */
  async getPageSubtitle(): Promise<string> {
    return await this.getText(this.pageSubtitle);
  }

  /**
   * Verify page title
   */
  async verifyPageTitle(expectedTitle: string = 'Food - Enjoy with R@hul'): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Get all category names
   */
  async getCategoryNames(): Promise<string[]> {
    const links = [
      this.saladsLink,
      this.curriesLink,
      this.beveragesLink,
      this.dessertsLink
    ];

    const names: string[] = [];
    for (const link of links) {
      const text = await link.textContent();
      if (text?.trim()) {
        names.push(text.trim());
      }
    }
    return names;
  }
}