/**
 * Home Page Tests
 *
 * Tests for the Home page of Enjoy with R@hul website.
 */

import { test, expect } from '@fixtures/test-fixtures';
import { expectedPageTitles, expectedNavMenuItems } from '@utils/test-data';

test.describe('Home Page', () => {
  test.beforeEach(async ({ homePage }) => {
    // homePage fixture already navigates and verifies page loaded
  });

  test('should load home page successfully', async ({ homePage }) => {
    await homePage.verifyPageTitle(expectedPageTitles.home);
  });

  test('should display hero section with correct content', async ({ homePage }) => {
    await homePage.verifyHeroSection();

    const heroTitle = await homePage.getHeroTitle();
    expect(heroTitle).toContain('Welcome to Enjoy');

    const heroSubtitle = await homePage.getHeroSubtitle();
    expect(heroSubtitle).toContain('Stay');
    expect(heroSubtitle).toContain('Eat');
    expect(heroSubtitle).toContain('Relax');
    expect(heroSubtitle).toContain('Enjoy');
  });

  test('should have working navigation bar', async ({ homePage }) => {
    const navigation = homePage.getNavigation();
    await navigation.verifyNavBarVisible();
    await navigation.verifyAllNavItemsPresent();
  });

  test('should have correct navigation menu items', async ({ homePage }) => {
    const navigation = homePage.getNavigation();
    const navLinks = await navigation.getVisibleNavLinks();

    const expectedLabels = expectedNavMenuItems.map(item => item.label);
    for (const label of expectedLabels) {
      expect(navLinks).toContain(label);
    }
  });

  test('should navigate to all pages via navigation bar', async ({
    homePage,
    roomsPage,
    foodPage,
    bookingPage,
    contactPage
  }) => {
    const navigation = homePage.getNavigation();

    await navigation.goToRooms();
    await roomsPage.verifyPageLoaded();

    await navigation.goToFood();
    await foodPage.verifyPageLoaded();

    await navigation.goToBooking();
    await bookingPage.verifyPageLoaded();

    await navigation.goToContact();
    await contactPage.verifyPageLoaded();

    await navigation.goToHome();
    await homePage.verifyPageLoaded();
  });

  test('should have correct page title', async ({ homePage }) => {
    const title = await homePage.getTitle();
    expect(title).toBe(expectedPageTitles.home);
  });
});

test.describe('Home Page - Visual Regression', () => {
  test('should match home page screenshot', async ({ homePage }) => {
    await expect(homePage.page).toHaveScreenshot('home-page.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.2
    });
  });
});