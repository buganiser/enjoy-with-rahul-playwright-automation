/**
 * Rooms Page Tests
 *
 * Tests for the Rooms page of Enjoy with R@hul website.
 */

import { test, expect } from '@fixtures/test-fixtures';
import { expectedPageTitles } from '@utils/test-data';

test.describe('Rooms Page', () => {
  test.beforeEach(async ({ roomsPage }) => {
    // roomsPage fixture already navigates and verifies page loaded
  });

  test('should load rooms page successfully', async ({ roomsPage }) => {
    await roomsPage.verifyPageTitle(expectedPageTitles.rooms);
  });

  test('should display page header with correct content', async ({ roomsPage }) => {
    await roomsPage.verifyPageHeader();
  });

  test('should have working navigation bar', async ({ roomsPage }) => {
    const navigation = roomsPage.getNavigation();
    await navigation.verifyNavBarVisible();
    await navigation.verifyAllNavItemsPresent();
  });

  test('should have correct room title', async ({ roomsPage }) => {
    const title = await roomsPage.getRoomTitle();
    expect(title.toLowerCase()).toContain('single room');
  });

  test('should have correct room description', async ({ roomsPage }) => {
    const description = await roomsPage.getRoomDescription();
    expect(description.toLowerCase()).toContain('solo travelers');
    expect(description.toLowerCase()).toContain('comfort');
    expect(description.toLowerCase()).toContain('privacy');
  });

  test('should have Book Now links', async ({ roomsPage }) => {
    const count = await roomsPage.getBookNowLinksCount();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should navigate back to home via navigation', async ({ roomsPage, homePage }) => {
    const navigation = roomsPage.getNavigation();
    await navigation.goToHome();
    await homePage.verifyPageLoaded();
  });
});

test.describe('Rooms Page - Navigation', () => {
  test('should navigate to all pages from Rooms page', async ({
    roomsPage,
    homePage,
    foodPage,
    bookingPage,
    contactPage
  }) => {
    const navigation = roomsPage.getNavigation();

    await navigation.goToHome();
    await homePage.verifyPageLoaded();

    await navigation.goToFood();
    await foodPage.verifyPageLoaded();

    await navigation.goToBooking();
    await bookingPage.verifyPageLoaded();

    await navigation.goToContact();
    await contactPage.verifyPageLoaded();
  });
});

test.describe('Rooms Page - Visual Regression', () => {
  test('should match rooms page screenshot', async ({ roomsPage }) => {
    await expect(roomsPage.page).toHaveScreenshot('rooms-page.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.2
    });
  });
});