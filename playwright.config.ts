import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Enjoy with R@hul Automation Framework
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Fail build on CI if test.only is left
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 1,

  // Number of workers - reduce for slow website
  workers: process.env.CI ? 1 : 2,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['junit', { outputFile: 'reports/results.xml' }],
    ['list']
  ],

  // Global test timeout - increased for slow website
  timeout: 120 * 1000,

  // Expect timeout
  expect: {
    timeout: 15 * 1000,
    toHaveScreenshot: {
      maxDiffPixels: 100,
      threshold: 0.2
    }
  },

  // Output directories
  outputDir: 'test-results',

  // Screenshot on failure
  screenshot: 'only-on-failure',

  // Video recording
  video: 'retain-on-failure',

  // Trace recording
  trace: 'retain-on-failure',

  // Global setup and teardown
  // globalSetup: './src/utils/global-setup.ts',
  // globalTeardown: './src/utils/global-teardown.ts',

  // Project configurations for multi-browser testing
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile viewports
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
    // Tablet viewports
    {
      name: 'tablet-chrome',
      use: { ...devices['iPad Pro'] },
    }
  ],

  // Base URL for all tests
  use: {
    baseURL: 'https://enjoy-with-rahul.onrender.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Default timeout for actions - increased for slow website
    actionTimeout: 30 * 1000,
    navigationTimeout: 60 * 1000,
  },

  // Web server for local development (if needed)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },
});