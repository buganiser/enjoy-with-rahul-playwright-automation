/**
 * Booking Page Object
 *
 * Represents the Booking page of Enjoy with R@hul website.
 * URL: https://enjoy-with-rahul.onrender.com/booking
 * Contains two forms: Restaurant Reservation and Stay Booking
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { NavigationComponent } from '@components/navigation';
import { RestaurantBookingData, StayBookingData, FoodOption, RoomType } from '@types';

export class BookingPage extends BasePage {
  private readonly navigation: NavigationComponent;

  // Page header
  private readonly pageTitle: Locator;

  // Restaurant Reservation Form
  private readonly restaurantForm: Locator;
  private readonly restaurantTitle: Locator;
  private readonly restaurantNameInput: Locator;
  private readonly restaurantEmailInput: Locator;
  private readonly restaurantPhoneInput: Locator;
  private readonly restaurantDateInput: Locator;
  private readonly restaurantGuestsInput: Locator;
  private readonly restaurantFoodSelect: Locator;
  private readonly restaurantReserveButton: Locator;
  private readonly restaurantBookingTypeHidden: Locator;

  // Stay Booking Form
  private readonly stayForm: Locator;
  private readonly stayTitle: Locator;
  private readonly stayNameInput: Locator;
  private readonly stayEmailInput: Locator;
  private readonly stayCheckinInput: Locator;
  private readonly stayCheckoutInput: Locator;
  private readonly stayGuestsInput: Locator;
  private readonly stayRoomSelect: Locator;
  private readonly stayFoodSelect: Locator;
  private readonly stayBookButton: Locator;
  private readonly stayBookingTypeHidden: Locator;

  constructor(page: Page) {
    super(page, '/booking');
    this.navigation = new NavigationComponent(page);

    // Page title
    this.pageTitle = page.getByRole('heading', { level: 1, name: /booking/i });

    // Restaurant Reservation Form (first form)
    this.restaurantForm = page.locator('form').first();
    this.restaurantTitle = page.getByRole('heading', { name: /lunch.*dinner|restaurant reservation/i });
    this.restaurantNameInput = page.locator('input[name="name"]').first();
    this.restaurantEmailInput = page.locator('input[name="email"]').first();
    this.restaurantPhoneInput = page.locator('input[name="phone"]').first();
    this.restaurantDateInput = page.locator('input[name="date"]').first();
    this.restaurantGuestsInput = page.locator('input[name="guests"]').first();
    this.restaurantFoodSelect = page.locator('select[name="food"]').first();
    this.restaurantReserveButton = page.getByRole('button', { name: /reserve now/i });
    this.restaurantBookingTypeHidden = page.locator('input[name="booking_type"][value="restaurant"]').first();

    // Stay Booking Form (second form)
    this.stayForm = page.locator('form').last();
    this.stayTitle = page.getByRole('heading', { name: /stay/i });
    this.stayNameInput = page.locator('input[name="name"]').last();
    this.stayEmailInput = page.locator('input[name="email"]').last();
    this.stayCheckinInput = page.locator('input[name="checkin"]');
    this.stayCheckoutInput = page.locator('input[name="checkout"]');
    this.stayGuestsInput = page.locator('input[name="guests"]').last();
    this.stayRoomSelect = page.locator('select[name="room"]');
    this.stayFoodSelect = page.locator('select[name="food"]').last();
    this.stayBookButton = page.getByRole('button', { name: /book now/i });
    this.stayBookingTypeHidden = page.locator('input[name="booking_type"][value="stay"]').last();
  }

  /**
   * Get navigation component
   */
  getNavigation(): NavigationComponent {
    return this.navigation;
  }

  /**
   * Verify booking page is loaded
   */
  async verifyPageLoaded(): Promise<void> {
    await this.waitForLoad();
    await expect(this.pageTitle).toBeVisible({ timeout: 10000 });
    await this.navigation.verifyNavBarVisible();
  }

  /**
   * Verify both forms are present
   */
  async verifyBothFormsPresent(): Promise<void> {
    await expect(this.restaurantForm).toBeVisible();
    await expect(this.stayForm).toBeVisible();
    await expect(this.restaurantTitle).toBeVisible();
    await expect(this.stayTitle).toBeVisible();
  }

  // ==================== Restaurant Reservation Form Methods ====================

  /**
   * Fill restaurant reservation form
   */
  async fillRestaurantForm(data: RestaurantBookingData): Promise<void> {
    await this.fillInput(this.restaurantNameInput, data.name);
    await this.fillInput(this.restaurantEmailInput, data.email);
    await this.fillInput(this.restaurantPhoneInput, data.phone);
    await this.fillInput(this.restaurantDateInput, data.date);
    await this.fillInput(this.restaurantGuestsInput, data.guests.toString());
    await this.selectOption(this.restaurantFoodSelect, data.foodOption);
  }

  /**
   * Submit restaurant reservation
   */
  async submitRestaurantReservation(): Promise<void> {
    await this.clickElement(this.restaurantReserveButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Complete restaurant booking flow
   */
  async completeRestaurantBooking(data: RestaurantBookingData): Promise<void> {
    await this.fillRestaurantForm(data);
    await this.submitRestaurantReservation();
  }

  /**
   * Verify restaurant form fields are visible
   */
  async verifyRestaurantFormFields(): Promise<void> {
    await expect(this.restaurantNameInput).toBeVisible();
    await expect(this.restaurantEmailInput).toBeVisible();
    await expect(this.restaurantPhoneInput).toBeVisible();
    await expect(this.restaurantDateInput).toBeVisible();
    await expect(this.restaurantGuestsInput).toBeVisible();
    await expect(this.restaurantFoodSelect).toBeVisible();
    await expect(this.restaurantReserveButton).toBeVisible();
  }

  /**
   * Get restaurant food options
   */
  async getRestaurantFoodOptions(): Promise<string[]> {
    const options = await this.restaurantFoodSelect.locator('option').all();
    const values: string[] = [];
    for (const opt of options) {
      const val = await opt.getAttribute('value');
      if (val) values.push(val);
    }
    return values;
  }

  // ==================== Stay Booking Form Methods ====================

  /**
   * Fill stay booking form
   */
  async fillStayForm(data: StayBookingData): Promise<void> {
    await this.fillInput(this.stayNameInput, data.name);
    await this.fillInput(this.stayEmailInput, data.email);
    await this.fillInput(this.stayCheckinInput, data.checkin);
    await this.fillInput(this.stayCheckoutInput, data.checkout);
    await this.fillInput(this.stayGuestsInput, data.guests.toString());
    await this.selectOption(this.stayRoomSelect, data.roomType);
    await this.selectOption(this.stayFoodSelect, data.foodOption);
  }

  /**
   * Submit stay booking
   */
  async submitStayBooking(): Promise<void> {
    await this.clickElement(this.stayBookButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Complete stay booking flow
   */
  async completeStayBooking(data: StayBookingData): Promise<void> {
    await this.fillStayForm(data);
    await this.submitStayBooking();
  }

  /**
   * Verify stay form fields are visible
   */
  async verifyStayFormFields(): Promise<void> {
    await expect(this.stayNameInput).toBeVisible();
    await expect(this.stayEmailInput).toBeVisible();
    await expect(this.stayCheckinInput).toBeVisible();
    await expect(this.stayCheckoutInput).toBeVisible();
    await expect(this.stayGuestsInput).toBeVisible();
    await expect(this.stayRoomSelect).toBeVisible();
    await expect(this.stayFoodSelect).toBeVisible();
    await expect(this.stayBookButton).toBeVisible();
  }

  /**
   * Get stay room type options
   */
  async getStayRoomOptions(): Promise<string[]> {
    const options = await this.stayRoomSelect.locator('option').all();
    const values: string[] = [];
    for (const opt of options) {
      const val = await opt.getAttribute('value');
      if (val) values.push(val);
    }
    return values;
  }

  /**
   * Get stay food options
   */
  async getStayFoodOptions(): Promise<string[]> {
    const options = await this.stayFoodSelect.locator('option').all();
    const values: string[] = [];
    for (const opt of options) {
      const val = await opt.getAttribute('value');
      if (val) values.push(val);
    }
    return values;
  }

  // ==================== Common Methods ====================

  /**
   * Verify page title
   */
  async verifyPageTitle(expectedTitle: string = 'Booking - Enjoy with R@hul'): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Clear restaurant form
   */
  async clearRestaurantForm(): Promise<void> {
    await this.restaurantNameInput.clear();
    await this.restaurantEmailInput.clear();
    await this.restaurantPhoneInput.clear();
    await this.restaurantDateInput.clear();
    await this.restaurantGuestsInput.clear();
  }

  /**
   * Clear stay form
   */
  async clearStayForm(): Promise<void> {
    await this.stayNameInput.clear();
    await this.stayEmailInput.clear();
    await this.stayCheckinInput.clear();
    await this.stayCheckoutInput.clear();
    await this.stayGuestsInput.clear();
  }
}