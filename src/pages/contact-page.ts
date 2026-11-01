/**
 * Contact Page Object
 *
 * Represents the Contact page of Enjoy with R@hul website.
 * URL: https://enjoy-with-rahul.onrender.com/contact
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { NavigationComponent } from '@components/navigation';
import { ContactInfo } from '@types';

export class ContactPage extends BasePage {
  private readonly navigation: NavigationComponent;

  // Page header
  private readonly pageTitle: Locator;

  // Contact information
  private readonly phoneLink: Locator;
  private readonly emailText: Locator;

  constructor(page: Page) {
    super(page, '/contact');
    this.navigation = new NavigationComponent(page);

    // Page title
    this.pageTitle = page.getByRole('heading', { level: 1, name: /contact us/i });

    // Contact info
    this.phoneLink = page.getByRole('link', { name: /\+91/i });
    this.emailText = page.getByText(/enjoywithrahul@example\.com/i);
  }

  /**
   * Get navigation component
   */
  getNavigation(): NavigationComponent {
    return this.navigation;
  }

  /**
   * Verify contact page is loaded
   */
  async verifyPageLoaded(): Promise<void> {
    await this.waitForLoad();
    await expect(this.pageTitle).toBeVisible({ timeout: 10000 });
    await this.navigation.verifyNavBarVisible();
  }

  /**
   * Verify contact information is displayed
   */
  async verifyContactInfo(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.phoneLink).toBeVisible();
    await expect(this.emailText).toBeVisible();
  }

  /**
   * Get phone number
   */
  async getPhoneNumber(): Promise<string> {
    return await this.getText(this.phoneLink);
  }

  /**
   * Get email address
   */
  async getEmail(): Promise<string> {
    return await this.getText(this.emailText);
  }

  /**
   * Click phone link (opens tel: handler)
   */
  async clickPhoneLink(): Promise<void> {
    await this.phoneLink.click();
  }

  /**
   * Extract contact info
   */
  async extractContactInfo(): Promise<ContactInfo> {
    const phone = await this.getPhoneNumber();
    const email = await this.getEmail();
    return { phone, email };
  }

  /**
   * Verify page title
   */
  async verifyPageTitle(expectedTitle: string = 'Contact - Enjoy with R@hul'): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Verify phone number format
   */
  async verifyPhoneFormat(): Promise<void> {
    const phone = await this.getPhoneNumber();
    expect(phone).toMatch(/^\+91-\d{10}$/);
  }

  /**
   * Verify email format
   */
  async verifyEmailFormat(): Promise<void> {
    const emailText = await this.getEmail();
    // Extract email from text like "Email: enjoywithrahul@example.com"
    const emailMatch = emailText.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
    expect(emailMatch).toBeTruthy();
    expect(emailMatch?.[0]).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }
}