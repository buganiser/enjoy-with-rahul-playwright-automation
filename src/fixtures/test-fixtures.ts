/**
 * Test Fixtures
 *
 * Custom Playwright test fixtures for the Enjoy with R@hul framework.
 * Provides pre-configured page objects for each test.
 */

import { test as base, Page } from '@playwright/test';
import { HomePage } from '@pages/home-page';
import { RoomsPage } from '@pages/rooms-page';
import { FoodPage } from '@pages/food-page';
import { CurriesPage } from '@pages/curries-page';
import { BeveragesPage } from '@pages/beverages-page';
import { DessertsPage } from '@pages/desserts-page';
import { BookingPage } from '@pages/booking-page';
import { ContactPage } from '@pages/contact-page';
import { NavigationComponent } from '@components/navigation';

/**
 * Type for custom fixtures
 */
type CustomFixtures = {
  homePage: HomePage;
  roomsPage: RoomsPage;
  foodPage: FoodPage;
  curriesPage: CurriesPage;
  beveragesPage: BeveragesPage;
  dessertsPage: DessertsPage;
  bookingPage: BookingPage;
  contactPage: ContactPage;
  navigation: NavigationComponent;
};

/**
 * Extended test with custom fixtures
 */
export const test = base.extend<CustomFixtures>({
  // Home Page fixture
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.verifyPageLoaded();
    await use(homePage);
  },

  // Rooms Page fixture
  roomsPage: async ({ page }, use) => {
    const roomsPage = new RoomsPage(page);
    await roomsPage.goto();
    await roomsPage.verifyPageLoaded();
    await use(roomsPage);
  },

  // Food Page fixture
  foodPage: async ({ page }, use) => {
    const foodPage = new FoodPage(page);
    await foodPage.goto();
    await foodPage.verifyPageLoaded();
    await use(foodPage);
  },

  // Curries Page fixture
  curriesPage: async ({ page }, use) => {
    const curriesPage = new CurriesPage(page);
    await curriesPage.goto();
    await curriesPage.verifyPageLoaded();
    await use(curriesPage);
  },

  // Beverages Page fixture
  beveragesPage: async ({ page }, use) => {
    const beveragesPage = new BeveragesPage(page);
    await beveragesPage.goto();
    await beveragesPage.verifyPageLoaded();
    await use(beveragesPage);
  },

  // Desserts Page fixture
  dessertsPage: async ({ page }, use) => {
    const dessertsPage = new DessertsPage(page);
    await dessertsPage.goto();
    await dessertsPage.verifyPageLoaded();
    await use(dessertsPage);
  },

  // Booking Page fixture
  bookingPage: async ({ page }, use) => {
    const bookingPage = new BookingPage(page);
    await bookingPage.goto();
    await bookingPage.verifyPageLoaded();
    await use(bookingPage);
  },

  // Contact Page fixture
  contactPage: async ({ page }, use) => {
    const contactPage = new ContactPage(page);
    await contactPage.goto();
    await contactPage.verifyPageLoaded();
    await use(contactPage);
  },

  // Navigation Component fixture
  navigation: async ({ page }, use) => {
    const navigation = new NavigationComponent(page);
    await use(navigation);
  },
});

/**
 * Expect with custom matchers
 */
export { expect } from '@playwright/test';