/**
 * Main entry point for the Enjoy with R@hul Playwright Framework
 *
 * Exports all page objects, components, fixtures, utilities, and types
 */

// Pages
export { BasePage } from './pages/base-page';
export { HomePage } from './pages/home-page';
export { RoomsPage } from './pages/rooms-page';
export { FoodPage } from './pages/food-page';
export { FoodCategoryPage } from './pages/food-category-page';
export { CurriesPage } from './pages/curries-page';
export { BeveragesPage } from './pages/beverages-page';
export { DessertsPage } from './pages/desserts-page';
export { BookingPage } from './pages/booking-page';
export { ContactPage } from './pages/contact-page';

// Components
export { NavigationComponent } from './components/navigation';

// Fixtures
export { test, expect } from './fixtures/test-fixtures';

// Utilities
export * from './utils/test-data';
export * from './utils/helpers';

// Types
export * from './types';