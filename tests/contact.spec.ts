/**
 * Contact Page Tests
 *
 * Tests for the Contact page of Enjoy with R@hul website.
 */

import { test, expect } from '@fixtures/test-fixtures';
import { expectedPageTitles, expectedContactInfo, expectedNavMenuItems } from '@utils/test-data';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ contactPage }) => {
    // contactPage fixture already navigates and verifies page loaded
  });

  test('should load contact page successfully', async ({ contactPage }) => {
    await contactPage.verifyPageTitle(expectedPageTitles.contact);
  });

  test('should display page header', async ({ contactPage }) => {
    await expect(contactPage.pageTitle).toBeVisible();
    const title = await contactPage.getText(contactPage.pageTitle);
    expect(title.toLowerCase()).toContain('contact us');
  });

  test('should have working navigation bar', async ({ contactPage }) => {
    const navigation = contactPage.getNavigation();
    await navigation.verifyNavBarVisible();
    await navigation.verifyAllNavItemsPresent();
  });

  test('should display contact phone number', async ({ contactPage }) => {
    await expect(contactPage.phoneLink).toBeVisible();

    const phone = await contactPage.getPhoneNumber();
    expect(phone).toContain('9161728664');
  });

  test('should display contact email', async ({ contactPage }) => {
    await expect(contactPage.emailText).toBeVisible();

    const email = await contactPage.getEmail();
    expect(email).toContain('enjoywithrahul@example.com');
  });

  test('should verify phone number format', async ({ contactPage }) => {
    await contactPage.verifyPhoneFormat();
  });

  test('should verify email format', async ({ contactPage }) => {
    await contactPage.verifyEmailFormat();
  });

  test('should extract contact info correctly', async ({ contactPage }) => {
    const contactInfo = await contactPage.extractContactInfo();

    expect(contactInfo.phone).toContain('9161728664');
    expect(contactInfo.email).toContain('enjoywithrahul@example.com');
  });

  test('should have clickable phone link', async ({ contactPage }) => {
    // The phone link should have tel: href
    const href = await contactPage.phoneLink.getAttribute('href');
    expect(href).toContain('tel:');
    expect(href).toContain('9161728664');
  });

  test('should navigate back to home via navigation', async ({ contactPage, homePage }) => {
    const navigation = contactPage.getNavigation();
    await navigation.goToHome();
    await homePage.verifyPageLoaded();
  });

  test('should navigate to all pages from Contact page', async ({
    contactPage,
    homePage,
    roomsPage,
    foodPage,
    bookingPage
  }) => {
    const navigation = contactPage.getNavigation();

    await navigation.goToHome();
    await homePage.verifyPageLoaded();

    await navigation.goToRooms();
    await roomsPage.verifyPageLoaded();

    await navigation.goToFood();
    await foodPage.verifyPageLoaded();

    await navigation.goToBooking();
    await bookingPage.verifyPageLoaded();
  });
});

test.describe('Contact Page - Navigation Items', () => {
  test('should have all expected navigation items', async ({ contactPage }) => {
    const navigation = contactPage.getNavigation();
    const navLinks = await navigation.getVisibleNavLinks();

    for (const item of expectedNavMenuItems) {
      expect(navLinks).toContain(item.label);
    }
  });

  test('should navigate to Rooms page', async ({ contactPage, roomsPage }) => {
    const navigation = contactPage.getNavigation();
    await navigation.goToRooms();
    await roomsPage.verifyPageLoaded();
  });

  test('should navigate to Food page', async ({ contactPage, foodPage }) => {
    const navigation = contactPage.getNavigation();
    await navigation.goToFood();
    await foodPage.verifyPageLoaded();
  });

  test('should navigate to Booking page', async ({ contactPage, bookingPage }) => {
    const navigation = contactPage.getNavigation();
    await navigation.goToBooking();
    await bookingPage.verifyPageLoaded();
  });
});

test.describe('Contact Page - Visual Regression', () => {
  test('should match contact page screenshot', async ({ contactPage }) => {
    await expect(contactPage.page).toHaveScreenshot('contact-page.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.2
    });
  });
});