/**
 * Type definitions for the Enjoy with R@hul automation framework
 */

import { Page, Locator } from '@playwright/test';

/**
 * Room type options available on the Rooms page
 */
export type RoomType =
  | 'single'
  | 'double'
  | 'double-extra'
  | 'two-sharing'
  | 'three-sharing';

/**
 * Food options available for bookings
 */
export type FoodOption = 'veg' | 'non-veg' | 'both';

/**
 * Booking type
 */
export type BookingType = 'restaurant' | 'stay';

/**
 * Room data structure
 */
export interface RoomData {
  name: string;
  description: string;
  prices: {
    withoutFood: string;
    vegOption: string;
    nonVegOption: string;
  };
}

/**
 * Food item data structure
 */
export interface FoodItem {
  name: string;
  description: string;
  ingredients: string;
  price: string;
}

/**
 * Food category data structure
 */
export interface FoodCategory {
  name: string;
  description: string;
  items: FoodItem[];
  url: string;
}

/**
 * Restaurant booking form data
 */
export interface RestaurantBookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  foodOption: FoodOption;
}

/**
 * Stay booking form data
 */
export interface StayBookingData {
  name: string;
  email: string;
  checkin: string;
  checkout: string;
  guests: number;
  roomType: RoomType;
  foodOption: FoodOption;
}

/**
 * Contact information
 */
export interface ContactInfo {
  phone: string;
  email: string;
}

/**
 * Navigation menu item
 */
export interface NavMenuItem {
  label: string;
  href: string;
}

/**
 * Test data fixtures
 */
export interface TestData {
  validRestaurantBooking: RestaurantBookingData;
  validStayBooking: StayBookingData;
  contactInfo: ContactInfo;
  navMenuItems: NavMenuItem[];
}

/**
 * Page object interface - base contract for all page objects
 */
export interface BasePageObject {
  page: Page;
  url: string;
  goto(): Promise<void>;
  waitForLoad(): Promise<void>;
  isLoaded(): Promise<boolean>;
}

/**
 * Custom Playwright test fixtures
 */
export interface CustomFixtures {
  homePage: HomePage;
  roomsPage: RoomsPage;
  foodPage: FoodPage;
  bookingPage: BookingPage;
  contactPage: ContactPage;
}

// Forward declarations to avoid circular imports
import { HomePage } from '@pages/home-page';
import { RoomsPage } from '@pages/rooms-page';
import { FoodPage } from '@pages/food-page';
import { BookingPage } from '@pages/booking-page';
import { ContactPage } from '@pages/contact-page';

/**
 * Utility types for locators
 */
export type LocatorGetter = (page: Page) => Locator;

/**
 * Assertion helper types
 */
export interface AssertionOptions {
  timeout?: number;
  soft?: boolean;
}