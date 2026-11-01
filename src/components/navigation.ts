/**
 * Navigation Component
 *
 * Reusable component for the navigation bar present on all pages.
 * Encapsulates navigation links and common actions.
 */

import { Page, Locator, expect } from '@playwright/test';
import { NavMenuItem } from '@types';

export class NavigationComponent {
  private readonly page: Page;

  // Navigation locators
  private readonly navContainer: Locator;
  private readonly navLinks: Locator;
  private readonly logoLink: Locator;

  // Navigation menu items
  private readonly navItems: NavMenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Rooms', href: '/rooms' },
    { label: 'Food', href: '/food' },
    { label: 'Booking', href: '/booking' },
    { label: 'Contact', href: '/contact' },
  ];

  constructor(page: Page) {
    this.page = page;

    // Navigation container
    this.navContainer = page.locator('nav, header nav, .navbar, .navigation').first();

    // Navigation links - using getByRole for accessibility
    this.navLinks = page.getByRole('navigation').getByRole('link');

    // Logo/Home link
    this.logoLink = page.getByRole('link', { name: /home|enjoy with/i }).first();
  }

  /**
   * Navigate to a specific page using the navigation menu
   */
  async navigateTo(pageName: keyof typeof this.navItems): Promise<void> {
    const item = this.navItems.find(i => i.label.toLowerCase() === pageName.toLowerCase());
    if (!item) {
      throw new Error(`Navigation item "${pageName}" not found`);
    }

    const link = this.page.getByRole('link', { name: item.label, exact: true });
    await expect(link).toBeVisible({ timeout: 5000 });
    await link.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to Home page
   */
  async goToHome(): Promise<void> {
    await this.navigateTo('Home');
  }

  /**
   * Navigate to Rooms page
   */
  async goToRooms(): Promise<void> {
    await this.navigateTo('Rooms');
  }

  /**
   * Navigate to Food page
   */
  async goToFood(): Promise<void> {
    await this.navigateTo('Food');
  }

  /**
   * Navigate to Booking page
   */
  async goToBooking(): Promise<void> {
    await this.navigateTo('Booking');
  }

  /**
   * Navigate to Contact page
   */
  async goToContact(): Promise<void> {
    await this.navigateTo('Contact');
  }

  /**
   * Click logo to go to home
   */
  async clickLogo(): Promise<void> {
    await this.logoLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get all visible navigation links
   */
  async getVisibleNavLinks(): Promise<string[]> {
    const links = await this.navLinks.all();
    const texts: string[] = [];
    for (const link of links) {
      const text = await link.textContent();
      if (text?.trim()) {
        texts.push(text.trim());
      }
    }
    return texts;
  }

  /**
   * Verify navigation bar is visible
   */
  async verifyNavBarVisible(): Promise<void> {
    await expect(this.navContainer).toBeVisible({ timeout: 5000 });
  }

  /**
   * Verify all navigation items are present
   */
  async verifyAllNavItemsPresent(): Promise<void> {
    for (const item of this.navItems) {
      const link = this.page.getByRole('link', { name: item.label, exact: true });
      await expect(link).toBeVisible({ timeout: 5000 });
    }
  }

  /**
   * Get navigation item by label
   */
  getNavLink(label: string): Locator {
    return this.page.getByRole('link', { name: label, exact: true });
  }

  /**
   * Check if navigation item is active/current
   */
  async isNavItemActive(label: string): Promise<boolean> {
    const link = this.getNavLink(label);
    const ariaCurrent = await link.getAttribute('aria-current');
    const className = await link.getAttribute('class');
    return ariaCurrent === 'page' || (className?.includes('active') ?? false);
  }

  /**
   * Get all navigation menu items
   */
  getNavItems(): NavMenuItem[] {
    return [...this.navItems];
  }
}