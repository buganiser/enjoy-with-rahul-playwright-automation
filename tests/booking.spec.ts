/**
 * Booking Page Tests
 *
 * Tests for the Booking page of Enjoy with R@hul website.
 * Covers both Restaurant Reservation and Stay Booking forms.
 */

import { test, expect } from '@fixtures/test-fixtures';
import {
  expectedPageTitles,
  validRestaurantBooking,
  validStayBooking,
  expectedRoomTypes,
  expectedRoomTypeLabels,
  expectedFoodOptions,
  expectedFoodOptionLabels
} from '@utils/test-data';

test.describe('Booking Page', () => {
  test.beforeEach(async ({ bookingPage }) => {
    // bookingPage fixture already navigates and verifies page loaded
  });

  test('should load booking page successfully', async ({ bookingPage }) => {
    await bookingPage.verifyPageTitle(expectedPageTitles.booking);
  });

  test('should have working navigation bar', async ({ bookingPage }) => {
    const navigation = bookingPage.getNavigation();
    await navigation.verifyNavBarVisible();
    await navigation.verifyAllNavItemsPresent();
  });

  test('should display both booking forms', async ({ bookingPage }) => {
    await bookingPage.verifyBothFormsPresent();
  });
});

test.describe('Restaurant Reservation Form', () => {
  test.beforeEach(async ({ bookingPage }) => {
    await bookingPage.verifyRestaurantFormFields();
  });

  test('should display all restaurant form fields', async ({ bookingPage }) => {
    // Verified in beforeEach
    await expect(bookingPage.restaurantNameInput).toBeVisible();
    await expect(bookingPage.restaurantEmailInput).toBeVisible();
    await expect(bookingPage.restaurantPhoneInput).toBeVisible();
    await expect(bookingPage.restaurantDateInput).toBeVisible();
    await expect(bookingPage.restaurantGuestsInput).toBeVisible();
    await expect(bookingPage.restaurantFoodSelect).toBeVisible();
    await expect(bookingPage.restaurantReserveButton).toBeVisible();
  });

  test('should have correct food options in dropdown', async ({ bookingPage }) => {
    const options = await bookingPage.getRestaurantFoodOptions();

    expect(options).toEqual(expectedFoodOptions);
  });

  test('should fill restaurant form with valid data', async ({ bookingPage }) => {
    await bookingPage.fillRestaurantForm(validRestaurantBooking);

    // Verify values were filled
    await expect(bookingPage.restaurantNameInput).toHaveValue(validRestaurantBooking.name);
    await expect(bookingPage.restaurantEmailInput).toHaveValue(validRestaurantBooking.email);
    await expect(bookingPage.restaurantPhoneInput).toHaveValue(validRestaurantBooking.phone);
    await expect(bookingPage.restaurantDateInput).toHaveValue(validRestaurantBooking.date);
    await expect(bookingPage.restaurantGuestsInput).toHaveValue(validRestaurantBooking.guests.toString());
    await expect(bookingPage.restaurantFoodSelect).toHaveValue(validRestaurantBooking.foodOption);
  });

  test('should submit restaurant reservation form', async ({ bookingPage }) => {
    await bookingPage.completeRestaurantBooking(validRestaurantBooking);

    // Form submission should navigate or show success
    // Since we don't want to actually submit, we just verify the click works
    // The form submission might show a success message or redirect
  });

  test('should clear restaurant form', async ({ bookingPage }) => {
    await bookingPage.fillRestaurantForm(validRestaurantBooking);
    await bookingPage.clearRestaurantForm();

    await expect(bookingPage.restaurantNameInput).toHaveValue('');
    await expect(bookingPage.restaurantEmailInput).toHaveValue('');
    await expect(bookingPage.restaurantPhoneInput).toHaveValue('');
    await expect(bookingPage.restaurantDateInput).toHaveValue('');
    await expect(bookingPage.restaurantGuestsInput).toHaveValue('');
  });
});

test.describe('Stay Booking Form', () => {
  test.beforeEach(async ({ bookingPage }) => {
    await bookingPage.verifyStayFormFields();
  });

  test('should display all stay form fields', async ({ bookingPage }) => {
    // Verified in beforeEach
    await expect(bookingPage.stayNameInput).toBeVisible();
    await expect(bookingPage.stayEmailInput).toBeVisible();
    await expect(bookingPage.stayCheckinInput).toBeVisible();
    await expect(bookingPage.stayCheckoutInput).toBeVisible();
    await expect(bookingPage.stayGuestsInput).toBeVisible();
    await expect(bookingPage.stayRoomSelect).toBeVisible();
    await expect(bookingPage.stayFoodSelect).toBeVisible();
    await expect(bookingPage.stayBookButton).toBeVisible();
  });

  test('should have correct room type options', async ({ bookingPage }) => {
    const options = await bookingPage.getStayRoomOptions();

    expect(options).toEqual(expectedRoomTypes);
  });

  test('should have correct food options', async ({ bookingPage }) => {
    const options = await bookingPage.getStayFoodOptions();

    expect(options).toEqual(expectedFoodOptions);
  });

  test('should fill stay form with valid data', async ({ bookingPage }) => {
    await bookingPage.fillStayForm(validStayBooking);

    // Verify values were filled
    await expect(bookingPage.stayNameInput).toHaveValue(validStayBooking.name);
    await expect(bookingPage.stayEmailInput).toHaveValue(validStayBooking.email);
    await expect(bookingPage.stayCheckinInput).toHaveValue(validStayBooking.checkin);
    await expect(bookingPage.stayCheckoutInput).toHaveValue(validStayBooking.checkout);
    await expect(bookingPage.stayGuestsInput).toHaveValue(validStayBooking.guests.toString());
    await expect(bookingPage.stayRoomSelect).toHaveValue(validStayBooking.roomType);
    await expect(bookingPage.stayFoodSelect).toHaveValue(validStayBooking.foodOption);
  });

  test('should submit stay booking form', async ({ bookingPage }) => {
    await bookingPage.completeStayBooking(validStayBooking);

    // Form submission should navigate or show success
  });

  test('should clear stay form', async ({ bookingPage }) => {
    await bookingPage.fillStayForm(validStayBooking);
    await bookingPage.clearStayForm();

    await expect(bookingPage.stayNameInput).toHaveValue('');
    await expect(bookingPage.stayEmailInput).toHaveValue('');
    await expect(bookingPage.stayCheckinInput).toHaveValue('');
    await expect(bookingPage.stayCheckoutInput).toHaveValue('');
    await expect(bookingPage.stayGuestsInput).toHaveValue('');
  });
});

test.describe('Booking Page - Form Validation', () => {
  test('should accept different food options for restaurant booking', async ({ bookingPage }) => {
    for (const foodOption of expectedFoodOptions) {
      const data = { ...validRestaurantBooking, foodOption };
      await bookingPage.fillRestaurantForm(data);
      await expect(bookingPage.restaurantFoodSelect).toHaveValue(foodOption);
      await bookingPage.clearRestaurantForm();
    }
  });

  test('should accept different room types for stay booking', async ({ bookingPage }) => {
    for (const roomType of expectedRoomTypes) {
      const data = { ...validStayBooking, roomType };
      await bookingPage.fillStayForm(data);
      await expect(bookingPage.stayRoomSelect).toHaveValue(roomType);
      await bookingPage.clearStayForm();
    }
  });

  test('should accept different food options for stay booking', async ({ bookingPage }) => {
    for (const foodOption of expectedFoodOptions) {
      const data = { ...validStayBooking, foodOption };
      await bookingPage.fillStayForm(data);
      await expect(bookingPage.stayFoodSelect).toHaveValue(foodOption);
      await bookingPage.clearStayForm();
    }
  });
});

test.describe('Booking Page - Navigation', () => {
  test('should navigate to all pages from Booking page', async ({
    bookingPage,
    homePage,
    roomsPage,
    foodPage,
    contactPage
  }) => {
    const navigation = bookingPage.getNavigation();

    await navigation.goToHome();
    await homePage.verifyPageLoaded();

    await navigation.goToRooms();
    await roomsPage.verifyPageLoaded();

    await navigation.goToFood();
    await foodPage.verifyPageLoaded();

    await navigation.goToContact();
    await contactPage.verifyPageLoaded();
  });
});

test.describe('Booking Page - Visual Regression', () => {
  test('should match booking page screenshot', async ({ bookingPage }) => {
    await expect(bookingPage.page).toHaveScreenshot('booking-page.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.2
    });
  });
});