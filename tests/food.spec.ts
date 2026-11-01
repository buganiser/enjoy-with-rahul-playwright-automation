/**
 * Food Page Tests
 *
 * Tests for the Food page and food category pages of Enjoy with R@hul website.
 */

import { test, expect } from '@fixtures/test-fixtures';
import { expectedPageTitles } from '@utils/test-data';

test.describe('Food Main Page', () => {
  test.beforeEach(async ({ foodPage }) => {
    // foodPage fixture already navigates and verifies page loaded
  });

  test('should load food page successfully', async ({ foodPage }) => {
    await foodPage.verifyPageTitle(expectedPageTitles.food);
  });

  test('should display page header with correct content', async ({ foodPage }) => {
    await foodPage.verifyPageHeader();

    const title = await foodPage.getPageTitle();
    expect(title).toContain('Delightful Flavors');

    const subtitle = await foodPage.getPageSubtitle();
    expect(subtitle).toContain('Fresh, healthy & homely cooked meals');
  });

  test('should have working navigation bar', async ({ foodPage }) => {
    const navigation = foodPage.getNavigation();
    await navigation.verifyNavBarVisible();
    await navigation.verifyAllNavItemsPresent();
  });

  test('should display all food category links', async ({ foodPage }) => {
    await foodPage.verifyCategoryLinks();
  });

  test('should have Book a Table link', async ({ foodPage }) => {
    const bookATableLink = foodPage.page.getByRole('link', { name: /book a table/i });
    await expect(bookATableLink).toBeVisible();
  });

  test('should navigate back to home via navigation', async ({ foodPage, homePage }) => {
    const navigation = foodPage.getNavigation();
    await navigation.goToHome();
    await homePage.verifyPageLoaded();
  });

  test('should get all category names', async ({ foodPage }) => {
    const categories = await foodPage.getCategoryNames();
    expect(categories.length).toBeGreaterThanOrEqual(3);
  });
});

test.describe('Curries Page', () => {
  test.beforeEach(async ({ curriesPage }) => {
    // curriesPage fixture already navigates and verifies page loaded
  });

  test('should load curries page successfully', async ({ curriesPage }) => {
    await curriesPage.verifyPageTitle(expectedPageTitles.curries);
  });

  test('should display page header', async ({ curriesPage }) => {
    await curriesPage.verifyPageHeader();
  });

  test('should display curry items', async ({ curriesPage }) => {
    await curriesPage.verifyFoodItemsDisplayed();
  });

  test('should have working navigation', async ({ curriesPage, homePage }) => {
    const navigation = curriesPage.getNavigation();
    await navigation.goToHome();
    await homePage.verifyPageLoaded();
  });
});

test.describe('Beverages Page', () => {
  test.beforeEach(async ({ beveragesPage }) => {
    // beveragesPage fixture already navigates and verifies page loaded
  });

  test('should load beverages page successfully', async ({ beveragesPage }) => {
    await beveragesPage.verifyPageTitle(expectedPageTitles.beverages);
  });

  test('should display page header', async ({ beveragesPage }) => {
    await beveragesPage.verifyPageHeader();
  });

  test('should display beverage items', async ({ beveragesPage }) => {
    await beveragesPage.verifyFoodItemsDisplayed();
  });

  test('should have working navigation', async ({ beveragesPage, homePage }) => {
    const navigation = beveragesPage.getNavigation();
    await navigation.goToHome();
    await homePage.verifyPageLoaded();
  });
});

test.describe('Desserts Page', () => {
  test.beforeEach(async ({ dessertsPage }) => {
    // dessertsPage fixture already navigates and verifies page loaded
  });

  test('should load desserts page successfully', async ({ dessertsPage }) => {
    await dessertsPage.verifyPageTitle(expectedPageTitles.desserts);
  });

  test('should display page header', async ({ dessertsPage }) => {
    await dessertsPage.verifyPageHeader();
  });

  test('should display dessert items', async ({ dessertsPage }) => {
    await dessertsPage.verifyFoodItemsDisplayed();
  });

  test('should have working navigation', async ({ dessertsPage, homePage }) => {
    const navigation = dessertsPage.getNavigation();
    await navigation.goToHome();
    await homePage.verifyPageLoaded();
  });
});

test.describe('Food Pages - Navigation', () => {
  test('should navigate from Curries back to Food page', async ({ curriesPage, foodPage }) => {
    const navigation = curriesPage.getNavigation();
    await navigation.goToFood();
    await foodPage.verifyPageLoaded();
  });

  test('should navigate from Beverages back to Food page', async ({ beveragesPage, foodPage }) => {
    const navigation = beveragesPage.getNavigation();
    await navigation.goToFood();
    await foodPage.verifyPageLoaded();
  });

  test('should navigate from Desserts back to Food page', async ({ dessertsPage, foodPage }) => {
    const navigation = dessertsPage.getNavigation();
    await navigation.goToFood();
    await foodPage.verifyPageLoaded();
  });
});

test.describe('Food Pages - Visual Regression', () => {
  test('should match food main page screenshot', async ({ foodPage }) => {
    await expect(foodPage.page).toHaveScreenshot('food-page.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.2
    });
  });

  test('should match curries page screenshot', async ({ curriesPage }) => {
    await expect(curriesPage.page).toHaveScreenshot('curries-page.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.2
    });
  });

  test('should match beverages page screenshot', async ({ beveragesPage }) => {
    await expect(beveragesPage.page).toHaveScreenshot('beverages-page.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.2
    });
  });

  test('should match desserts page screenshot', async ({ dessertsPage }) => {
    await expect(dessertsPage.page).toHaveScreenshot('desserts-page.png', {
      fullPage: true,
      animations: 'disabled',
      threshold: 0.2
    });
  });
});