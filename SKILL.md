---
name: playwright-enjoy-rahul-framework
description: Playwright TypeScript automation framework for Enjoy with R@hul using Page Object Model
metadata:
  type: project
---

# Playwright Enjoy with R@hul Framework Skill

This skill provides guidance for working with the Playwright TypeScript automation framework for the Enjoy with R@hul website (https://enjoy-with-rahul.onrender.com/).

## Framework Overview

The framework follows the **Page Object Model (POM)** pattern with:
- TypeScript for type safety
- Custom Playwright fixtures for page objects
- Reusable components (Navigation)
- Centralized test data management
- Multi-browser support (Chromium, Firefox, WebKit, Mobile)
- Rich reporting (HTML, JSON, JUnit)
- Visual regression testing

## Key Commands

```bash
# Run all tests
npm test

# Run with browser visible
npm run test:headed

# Debug mode
npm run test:debug

# UI mode
npm run test:ui

# Show report
npm run test:report

# Install browsers
npm run test:install
```

## Project Structure

```
src/
├── pages/           # Page Object classes
│   ├── base-page.ts
│   ├── home-page.ts
│   ├── rooms-page.ts
│   ├── food-page.ts
│   ├── food-category-page.ts
│   ├── curries-page.ts
│   ├── beverages-page.ts
│   ├── desserts-page.ts
│   ├── booking-page.ts
│   └── contact-page.ts
├── components/
│   └── navigation.ts
├── fixtures/
│   └── test-fixtures.ts
├── utils/
│   ├── test-data.ts
│   └── helpers.ts
└── types/
    └── index.ts

tests/
├── home.spec.ts
├── rooms.spec.ts
├── food.spec.ts
├── booking.spec.ts
└── contact.spec.ts
```

## Page Objects

### HomePage
- `verifyPageLoaded()` - Verify page loaded
- `verifyHeroSection()` - Check hero content
- `clickExploreRooms()` - Navigate to Rooms
- `clickViewMenu()` - Navigate to Food
- `clickBookYourStay()` - Navigate to Booking
- `getNavigation()` - Get navigation component

### RoomsPage
- `verifySingleRoomCard()` - Check room details
- `getRoomPrices()` - Get price text
- `clickBookNowSingleRoom(index)` - Click Book Now
- `extractRoomData()` - Get structured room data

### FoodPage
- `verifyCategoryLinks()` - Check all categories
- `clickCurries()` - Navigate to Curries
- `clickBeverages()` - Navigate to Beverages
- `clickDesserts()` - Navigate to Desserts
- `clickBookATable()` - Navigate to Booking

### FoodCategoryPage (Base for Curries, Beverages, Desserts)
- `extractFoodItems()` - Get all food items
- `verifyFoodItemsDisplayed(count)` - Verify item count

### BookingPage
- `fillRestaurantForm(data)` - Fill restaurant booking
- `fillStayForm(data)` - Fill stay booking
- `submitRestaurantReservation()` - Submit restaurant form
- `submitStayBooking()` - Submit stay form
- `getRestaurantFoodOptions()` - Get food dropdown options
- `getStayRoomOptions()` - Get room dropdown options
- `getStayFoodOptions()` - Get food dropdown options

### ContactPage
- `verifyContactInfo()` - Check phone/email displayed
- `getPhoneNumber()` - Get phone
- `getEmail()` - Get email
- `extractContactInfo()` - Get structured contact info

### NavigationComponent
- `goToHome()` / `goToRooms()` / `goToFood()` / `goToBooking()` / `goToContact()`
- `verifyAllNavItemsPresent()` - Check all nav links
- `getVisibleNavLinks()` - Get all link texts

## Test Data

```typescript
import { 
  validRestaurantBooking, 
  validStayBooking,
  expectedContactInfo,
  expectedRoomTypes,
  expectedFoodOptions,
  generateRandomRestaurantBooking,
  generateRandomStayBooking
} from '@utils/test-data';
```

## Writing New Tests

1. **Import fixtures:**
   ```typescript
   import { test, expect } from '@fixtures/test-fixtures';
   ```

2. **Use page objects from fixtures:**
   ```typescript
   test('example', async ({ homePage, roomsPage }) => {
     await homePage.clickExploreRooms();
     await roomsPage.verifySingleRoomCard();
   });
   ```

3. **Use test data:**
   ```typescript
   import { validRestaurantBooking } from '@utils/test-data';
   
   test('booking', async ({ bookingPage }) => {
     await bookingPage.fillRestaurantForm(validRestaurantBooking);
   });
   ```

## Adding New Pages

1. Create page class in `src/pages/` extending `BasePage`
2. Add navigation to `NavigationComponent` if needed
3. Add fixture in `src/fixtures/test-fixtures.ts`
4. Export from `src/index.ts`
5. Create test file in `tests/`

## Locator Best Practices

**Preferred (accessibility-first):**
```typescript
page.getByRole('button', { name: /submit/i })
page.getByLabel('Email')
page.getByText('Welcome')
page.getByTestId('submit-button')
```

**Avoid:**
```typescript
page.locator('.btn-primary')  // CSS classes change
page.locator('#submit')       // IDs may not be stable
page.locator('xpath=//button') // Brittle
```

## Debugging

```bash
# Show trace
npx playwright show-trace test-results/traces/trace.zip

# Debug specific test
npx playwright test --debug --grep "test name"

# UI mode for exploration
npm run test:ui
```

## CI Configuration

The framework is configured for CI with:
- Retries: 2 on CI, 0 locally
- Workers: 1 on CI, auto locally
- Reports: HTML, JSON, JUnit
- Artifacts: screenshots, videos, traces on failure

## Common Patterns

### Navigation Testing
```typescript
test('navigate to all pages', async ({ 
  homePage, roomsPage, foodPage, bookingPage, contactPage 
}) => {
  const nav = homePage.getNavigation();
  
  await nav.goToRooms();
  await roomsPage.verifyPageLoaded();
  
  await nav.goToFood();
  await foodPage.verifyPageLoaded();
  
  // ... etc
});
```

### Form Testing
```typescript
test('fill and submit form', async ({ bookingPage }) => {
  await bookingPage.fillRestaurantForm({
    name: 'Test User',
    email: 'test@example.com',
    phone: '+91-9876543210',
    date: '2025-12-25',
    guests: 4,
    foodOption: 'veg'
  });
  
  // Verify filled
  await expect(bookingPage.restaurantNameInput).toHaveValue('Test User');
});
```

### Visual Regression
```typescript
test('visual regression', async ({ homePage }) => {
  await expect(homePage.page).toHaveScreenshot('home-page.png', {
    fullPage: true,
    animations: 'disabled',
    threshold: 0.2
  });
});
```

## Troubleshooting

### Tests Timeout
- Increase timeout in `playwright.config.ts`
- Check if website is accessible
- Verify selectors are correct

### Flaky Tests
- Use `waitForLoadState('networkidle')` after navigation
- Add explicit waits for dynamic content
- Use `expect(locator).toBeVisible()` which auto-retries

### Locator Issues
- Use Playwright Inspector: `npx playwright test --debug`
- Check if elements are in iframes
- Verify element is not dynamically loaded

## Related Files

- [[playwright-config]] - Playwright configuration reference
- [[test-data]] - Test data management
- [[page-objects]] - Page object patterns