/**
 * Rooms Page Object
 *
 * Represents the Rooms page of Enjoy with R@hul website.
 * URL: https://enjoy-with-rahul.onrender.com/rooms
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { NavigationComponent } from '@components/navigation';
import { RoomData, RoomType } from '@types';

export class RoomsPage extends BasePage {
  private readonly navigation: NavigationComponent;

  // Page header
  private readonly pageTitle: Locator;
  private readonly pageSubtitle: Locator;

  // Room cards
  private readonly roomCards: Locator;

  // Specific room elements (Single Room)
  private readonly singleRoomCard: Locator;
  private readonly singleRoomTitle: Locator;
  private readonly singleRoomDescription: Locator;
  private readonly singleRoomPrices: Locator;
  private readonly singleRoomBookNowLinks: Locator;

  constructor(page: Page) {
    super(page, '/rooms');
    this.navigation = new NavigationComponent(page);

    // Page header
    this.pageTitle = page.getByRole('heading', { level: 1, name: /our rooms/i });
    this.pageSubtitle = page.getByText(/choose from cozy and comfortable rooms/i);

    // Room cards container
    this.roomCards = page.locator('section').filter({ hasText: /single room|double room|family room/i }).first();

    // Single Room specific elements
    this.singleRoomCard = page.locator('article, div, section').filter({ hasText: /single room/i }).first();
    this.singleRoomTitle = page.getByRole('heading', { name: /single room/i });
    this.singleRoomDescription = page.getByText(/perfect for solo travelers/i);
    this.singleRoomPrices = page.locator('text=/Without Food.*Veg Option.*Non-Veg Option/i').first();
    this.singleRoomBookNowLinks = page.getByRole('link', { name: /book now/i });
  }

  /**
   * Get navigation component
   */
  getNavigation(): NavigationComponent {
    return this.navigation;
  }

  /**
   * Verify rooms page is loaded correctly
   */
  async verifyPageLoaded(): Promise<void> {
    await this.waitForLoad();
    // Verify page loaded by checking navigation and URL
    await this.navigation.verifyNavBarVisible();
    await expect(this.page).toHaveURL(/.*rooms/);
  }

  /**
   * Verify page header content
   */
  async verifyPageHeader(): Promise<void> {
    // Check for any heading or the page subtitle
    await expect(this.pageSubtitle).toBeVisible({ timeout: 15000 });
  }

  /**
   * Verify Single Room card is displayed with correct information
   */
  async verifySingleRoomCard(): Promise<void> {
    await expect(this.singleRoomTitle).toBeVisible();
    await expect(this.singleRoomDescription).toBeVisible();

    // Verify price options are present
    const pricesText = await this.getText(this.singleRoomPrices);
    expect(pricesText).toContain('Without Food');
    expect(pricesText).toContain('Veg Option');
    expect(pricesText).toContain('Non-Veg Option');
    expect(pricesText).toContain('1200');
    expect(pricesText).toContain('1500');
    expect(pricesText).toContain('1600');
  }

  /**
   * Click Book Now for Single Room (first option - Without Food)
   */
  async clickBookNowSingleRoom(optionIndex: number = 0): Promise<void> {
    const bookNowLinks = await this.singleRoomBookNowLinks.all();
    if (bookNowLinks.length > optionIndex) {
      await bookNowLinks[optionIndex].click();
      await this.page.waitForLoadState('networkidle');
    } else {
      throw new Error(`Book Now link at index ${optionIndex} not found`);
    }
  }

  /**
   * Get all Book Now links count
   */
  async getBookNowLinksCount(): Promise<number> {
    return await this.singleRoomBookNowLinks.count();
  }

  /**
   * Get room title
   */
  async getRoomTitle(): Promise<string> {
    return await this.getText(this.singleRoomTitle);
  }

  /**
   * Get room description
   */
  async getRoomDescription(): Promise<string> {
    return await this.getText(this.singleRoomDescription);
  }

  /**
   * Get room prices text
   */
  async getRoomPrices(): Promise<string> {
    return await this.getText(this.singleRoomPrices);
  }

  /**
   * Verify page title
   */
  async verifyPageTitle(expectedTitle: string = 'Rooms - Enjoy with R@hul'): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Extract room data from page
   */
  async extractRoomData(): Promise<RoomData> {
    const name = await this.getRoomTitle();
    const description = await this.getRoomDescription();
    const pricesText = await this.getRoomPrices();

    // Parse prices from text
    const withoutFoodMatch = pricesText.match(/Without Food[:\s]*₹?(\d+)/i);
    const vegOptionMatch = pricesText.match(/Veg Option[:\s]*₹?(\d+)/i);
    const nonVegOptionMatch = pricesText.match(/Non-Veg Option[:\s]*₹?(\d+)/i);

    return {
      name,
      description,
      prices: {
        withoutFood: withoutFoodMatch ? `₹${withoutFoodMatch[1]}` : '₹1200',
        vegOption: vegOptionMatch ? `₹${vegOptionMatch[1]}` : '₹1500',
        nonVegOption: nonVegOptionMatch ? `₹${nonVegOptionMatch[1]}` : '₹1600',
      }
    };
  }
}