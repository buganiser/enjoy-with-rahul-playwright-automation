/**
 * Home Page Object
 *
 * Represents the home page of Enjoy with R@hul website.
 * URL: https://enjoy-with-rahul.onrender.com/
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { NavigationComponent } from '@components/navigation';

export class HomePage extends BasePage {
  private readonly navigation: NavigationComponent;

  // Hero section locators
  private readonly heroSection: Locator;
  private readonly heroTitle: Locator;
  private readonly heroSubtitle: Locator;
  private readonly bookNowButton: Locator;

  // Feature cards
  private readonly roomsCard: Locator;
  private readonly foodCard: Locator;
  private readonly exploreRoomsLink: Locator;
  private readonly viewMenuLink: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.navigation = new NavigationComponent(page);

    // Hero section
    this.heroSection = page.locator('section').first();
    this.heroTitle = page.getByRole('heading', { level: 1, name: /welcome to enjoy/i });
    this.heroSubtitle = page.getByText(/stay.*eat.*relax.*enjoy/i);
    this.bookNowButton = page.getByRole('link', { name: /book your stay/i });

    // Feature cards - use more specific locators based on actual DOM structure
    // The feature cards are in sections with the text content
    this.roomsCard = page.locator('section').filter({ hasText: /comfortable rooms/i }).first();
    this.foodCard = page.locator('section').filter({ hasText: /delicious food/i }).first();
    this.exploreRoomsLink = page.getByRole('link', { name: /explore rooms/i });
    this.viewMenuLink = page.getByRole('link', { name: /view menu/i });
  }

  /**
   * Get navigation component
   */
  getNavigation(): NavigationComponent {
    return this.navigation;
  }

  /**
   * Verify home page is loaded correctly
   */
  async verifyPageLoaded(): Promise<void> {
    await this.waitForLoad();
    await expect(this.heroTitle).toBeVisible({ timeout: 10000 });
    await this.navigation.verifyNavBarVisible();
  }

  /**
   * Verify hero section content
   */
  async verifyHeroSection(): Promise<void> {
    await expect(this.heroTitle).toBeVisible();
    await expect(this.heroSubtitle).toBeVisible();
    await expect(this.bookNowButton).toBeVisible();
  }

  /**
   * Click Book Your Stay button - navigates to booking page
   */
  async clickBookYourStay(): Promise<void> {
    await this.bookNowButton.scrollIntoViewIfNeeded();
    await this.bookNowButton.click({ timeout: 30000 });
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  /**
   * Click Explore Rooms link - navigates to rooms page
   */
  async clickExploreRooms(): Promise<void> {
    await this.exploreRoomsLink.scrollIntoViewIfNeeded();
    await this.exploreRoomsLink.click({ timeout: 30000 });
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  /**
   * Click View Menu link - navigates to food page
   */
  async clickViewMenu(): Promise<void> {
    await this.viewMenuLink.scrollIntoViewIfNeeded();
    await this.viewMenuLink.click({ timeout: 30000 });
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  /**
   * Verify feature cards are present
   */
  async verifyFeatureCards(): Promise<void> {
    // Scroll to make sure elements are in view
    await this.roomsCard.scrollIntoViewIfNeeded();
    await this.foodCard.scrollIntoViewIfNeeded();

    await expect(this.roomsCard).toBeVisible({ timeout: 15000 });
    await expect(this.foodCard).toBeVisible({ timeout: 15000 });
    await expect(this.exploreRoomsLink).toBeVisible({ timeout: 15000 });
    await expect(this.viewMenuLink).toBeVisible({ timeout: 15000 });
  }

  /**
   * Get hero title text
   */
  async getHeroTitle(): Promise<string> {
    return await this.getText(this.heroTitle);
  }

  /**
   * Get hero subtitle text
   */
  async getHeroSubtitle(): Promise<string> {
    return await this.getText(this.heroSubtitle);
  }

  /**
   * Verify page title
   */
  async verifyPageTitle(expectedTitle: string = 'Home - Enjoy with R@hul'): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Get all text content from hero section
   */
  async getHeroText(): Promise<string> {
    return await this.getText(this.heroSection);
  }
}