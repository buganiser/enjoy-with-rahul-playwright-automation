# Enjoy with R@hul - Playwright TypeScript Automation Framework

A comprehensive Playwright TypeScript automation framework for testing the Enjoy with R@hul website (https://enjoy-with-rahul.onrender.com/) using the Page Object Model (POM) pattern.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Framework Architecture](#framework-architecture)
- [Writing Tests](#writing-tests)
- [Configuration](#configuration)
- [CI/CD Integration](#cicd-integration)

## ✨ Features

- **Page Object Model (POM)** - Clean separation of test logic and page interactions
- **TypeScript Support** - Full type safety and IntelliSense
- **Multi-browser Testing** - Chromium, Firefox, WebKit (Desktop & Mobile)
- **Custom Fixtures** - Pre-configured page objects for each test
- **Rich Reporting** - HTML, JSON, JUnit reports with screenshots, videos, traces
- **Visual Regression** - Screenshot comparison with configurable thresholds
- **Parallel Execution** - Fast test execution with configurable workers
- **Retry Logic** - Automatic retry on flaky tests (CI only)
- **Navigation Component** - Reusable navigation across all pages
- **Test Data Management** - Centralized test data with generators

## 📁 Project Structure

```
Playwright_Automation_Framework/
├── package.json              # Dependencies and npm scripts
├── tsconfig.json             # TypeScript configuration
├── playwright.config.ts      # Playwright configuration
├── .gitignore               # Git ignore rules
├── README.md                # This file
├── SKILL.md                 # Framework skill documentation
├── src/
│   ├── index.ts             # Main exports
│   ├── pages/               # Page Object classes
│   │   ├── base-page.ts     # Base page class
│   │   ├── home-page.ts     # Home page
│   │   ├── rooms-page.ts    # Rooms page
│   │   ├── food-page.ts     # Food main page
│   │   ├── food-category-page.ts # Base food category page
│   │   ├── curries-page.ts  # Curries page
│   │   ├── beverages-page.ts # Beverages page
│   │   ├── desserts-page.ts # Desserts page
│   │   ├── booking-page.ts  # Booking page (2 forms)
│   │   └── contact-page.ts  # Contact page
│   ├── components/
│   │   └── navigation.ts    # Navigation component
│   ├── fixtures/
│   │   └── test-fixtures.ts # Custom Playwright fixtures
│   ├── utils/
│   │   ├── test-data.ts     # Test data and generators
│   │   └── helpers.ts       # Utility functions
│   └── types/
│       └── index.ts         # TypeScript type definitions
├── tests/                   # Test specifications
│   ├── home.spec.ts         # Home page tests
│   ├── rooms.spec.ts        # Rooms page tests
│   ├── food.spec.ts         # Food pages tests
│   ├── booking.spec.ts      # Booking page tests
│   └── contact.spec.ts      # Contact page tests
├── test-results/            # Test execution artifacts
│   ├── screenshots/         # Failure screenshots
│   ├── videos/              # Failure videos
│   └── traces/              # Failure traces
└── reports/                 # Test reports
    ├── html/                # HTML report
    ├── results.json         # JSON results
    └── results.xml          # JUnit XML results
```

## 🔧 Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git** (optional, for version control)

## 📦 Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd C:\Users\RAHUL\Documents\Playwright_Automation_Framework
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npm run test:install
   # or
   npx playwright install
   ```

4. **Verify installation:**
   ```bash
   npx playwright --version
   ```

## 🚀 Running Tests

### Basic Commands

```bash
# Run all tests (headless)
npm test

# Run tests with browser UI visible
npm run test:headed

# Run tests in debug mode (step through)
npm run test:debug

# Open Playwright UI mode
npm run test:ui

# Show HTML report after test run
npm run test:report
```

### Browser-Specific Tests

```bash
# Run only on Chromium
npx playwright test --project=chromium

# Run only on Firefox
npx playwright test --project=firefox

# Run only on WebKit (Safari)
npx playwright test --project=webkit

# Run on mobile viewports
npx playwright test --project=mobile-chrome
npx playwright test --project=mobile-safari
```

### Test Filtering

```bash
# Run specific test file
npx playwright test tests/home.spec.ts

# Run tests matching pattern
npx playwright test --grep "should load"

# Run specific test
npx playwright test --grep "should navigate to Rooms page"

# Run only failed tests (after a run)
npx playwright test --last-failed
```

### Parallel Execution

```bash
# Run with specific number of workers
npx playwright test --workers=4

# Run sequentially (debugging)
npx playwright test --workers=1
```

## 📊 Test Reports

### HTML Report (Recommended)

```bash
npm run test:report
```

Opens an interactive HTML report with:
- Test results with pass/fail status
- Screenshots on failure
- Videos on failure
- Traces for debugging
- Timeline view
- Filtering and search

### JSON Report

```bash
# Generated at reports/results.json
npx playwright test --reporter=json
```

### JUnit XML Report

```bash
# Generated at reports/results.xml
npx playwright test --reporter=junit
```

### List Reporter (Console)

```bash
# Default - shows in console
npm test
```

## 🏗️ Framework Architecture

### Page Object Model

Each page has a dedicated Page Object class that:
- Encapsulates page elements and interactions
- Provides semantic methods for test actions
- Handles waiting and synchronization
- Extends `BasePage` for common functionality

```typescript
// Example usage in tests
test('should navigate to rooms', async ({ homePage, roomsPage }) => {
  await homePage.clickExploreRooms();
  await roomsPage.verifyPageLoaded();
});
```

### Custom Fixtures

Pre-configured page objects automatically navigate and verify page load:

```typescript
// In test-fixtures.ts
test('example', async ({ homePage, roomsPage, bookingPage }) => {
  // Pages are already loaded and verified
  await homePage.clickExploreRooms();
  await roomsPage.verifySingleRoomCard();
});
```

### Navigation Component

Reusable navigation across all pages:

```typescript
const navigation = homePage.getNavigation();
await navigation.goToRooms();
await navigation.goToFood();
await navigation.goToBooking();
await navigation.goToContact();
```

### Test Data Management

Centralized test data with generators:

```typescript
import { validRestaurantBooking, generateRandomStayBooking } from '@utils/test-data';

// Use predefined data
await bookingPage.fillRestaurantForm(validRestaurantBooking);

// Generate random data for unique runs
const randomBooking = generateRandomStayBooking();
await bookingPage.fillStayForm(randomBooking);
```

## ✍️ Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@fixtures/test-fixtures';
import { expectedPageTitles } from '@utils/test-data';

test.describe('Feature Name', () => {
  test('should do something', async ({ homePage }) => {
    // Test implementation
    await homePage.verifyPageTitle(expectedPageTitles.home);
  });
});
```

### Using Page Objects

```typescript
test('should fill booking form', async ({ bookingPage }) => {
  await bookingPage.fillRestaurantForm({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91-9876543210',
    date: '2025-12-25',
    guests: 4,
    foodOption: 'veg'
  });
});
```

### Visual Regression Tests

```typescript
test('should match screenshot', async ({ homePage }) => {
  await expect(homePage.page).toHaveScreenshot('home-page.png', {
    fullPage: true,
    animations: 'disabled',
    threshold: 0.2
  });
});
```

## ⚙️ Configuration

### Playwright Config (`playwright.config.ts`)

Key configuration options:

```typescript
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['junit', { outputFile: 'reports/results.xml' }],
  ],
  
  use: {
    baseURL: 'https://enjoy-with-rahul.onrender.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 12'] } },
  ],
});
```

### Environment Variables

```bash
# Base URL (overrides config)
BASE_URL=https://staging.example.com npm test

# CI mode (enables retries, single worker)
CI=true npm test

# Debug mode
DEBUG=pw:api npm test
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run tests
        run: npm test
      - name: Upload HTML report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: reports/html/
          retention-days: 7
```

### Azure DevOps Example

```yaml
# azure-pipelines.yml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '20.x'
  - script: npm ci
  - script: npx playwright install --with-deps
  - script: npm test
  - task: PublishTestResults@2
    inputs:
      testResultsFormat: 'JUnit'
      testResultsFiles: 'reports/results.xml'
  - task: PublishBuildArtifacts@1
    inputs:
      pathToPublish: 'reports/html'
      artifactName: 'playwright-report'
```

## 🐛 Debugging Tests

### Trace Viewer

```bash
# Open trace for failed test
npx playwright show-trace test-results/traces/trace.zip
```

### Debug Mode

```bash
# Step through test execution
npm run test:debug
```

### VS Code Extension

Install the [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension for:
- Run/debug tests from editor
- View test results inline
- Pick locators from browser
- Generate test code

## 📝 Best Practices

1. **Use Page Objects** - Never use raw locators in tests
2. **Prefer User-Facing Locators** - Use `getByRole`, `getByLabel`, `getByText`
3. **Avoid Hardcoded Waits** - Use Playwright's auto-waiting
4. **Keep Tests Independent** - Each test should run in isolation
5. **Use Fixtures** - Leverage custom fixtures for setup
6. **Centralize Test Data** - Use `@utils/test-data` for all test data
7. **Name Tests Clearly** - Use descriptive test names
8. **Handle Flakiness** - Use retry logic in helpers, not in tests

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Run full test suite before committing

## 📄 License

ISC License - Feel free to use and modify for your projects.

## 🆘 Support

For issues or questions:
- Check the [Playwright Documentation](https://playwright.dev/docs/intro)
- Review test files for usage examples
- Check `SKILL.md` for framework-specific guidance

---

**Built with ❤️ using Playwright and TypeScript**