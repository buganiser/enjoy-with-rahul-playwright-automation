/**
 * Test Data
 *
 * Centralized test data for the Enjoy with R@hul automation framework.
 * Contains valid and invalid test data for various scenarios.
 */

import {
  RestaurantBookingData,
  StayBookingData,
  ContactInfo,
  NavMenuItem,
  FoodOption,
  RoomType
} from '@types';

/**
 * Valid restaurant booking data
 */
export const validRestaurantBooking: RestaurantBookingData = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91-9876543210',
  date: '2025-12-25',
  guests: 4,
  foodOption: 'veg'
};

/**
 * Valid stay booking data
 */
export const validStayBooking: StayBookingData = {
  name: 'Priya Patel',
  email: 'priya.patel@example.com',
  checkin: '2025-12-20',
  checkout: '2025-12-22',
  guests: 2,
  roomType: 'double',
  foodOption: 'both'
};

/**
 * Alternative valid restaurant booking data
 */
export const validRestaurantBooking2: RestaurantBookingData = {
  name: 'Amit Kumar',
  email: 'amit.kumar@example.com',
  phone: '+91-9123456789',
  date: '2025-11-15',
  guests: 6,
  foodOption: 'non-veg'
};

/**
 * Alternative valid stay booking data
 */
export const validStayBooking2: StayBookingData = {
  name: 'Sunita Singh',
  email: 'sunita.singh@example.com',
  checkin: '2025-11-10',
  checkout: '2025-11-12',
  guests: 3,
  roomType: 'double-extra',
  foodOption: 'veg'
};

/**
 * Expected contact information from the website
 */
export const expectedContactInfo: ContactInfo = {
  phone: '+91-9161728664',
  email: 'enjoywithrahul@example.com'
};

/**
 * Expected navigation menu items
 */
export const expectedNavMenuItems: NavMenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Rooms', href: '/rooms' },
  { label: 'Food', href: '/food' },
  { label: 'Booking', href: '/booking' },
  { label: 'Contact', href: '/contact' }
];

/**
 * Expected food categories
 */
export const expectedFoodCategories = [
  { name: 'Fresh Salads', url: '/food/salads', icon: '🥗' },
  { name: 'Authentic Curries', url: '/food/curries', icon: '🍛' },
  { name: 'Beverages', url: '/food/beverages', icon: '🥤' },
  { name: 'Desserts', url: '/food/desserts', icon: '🍨' }
];

/**
 * Expected room types for stay booking
 */
export const expectedRoomTypes: RoomType[] = [
  'single',
  'double',
  'double-extra',
  'two-sharing',
  'three-sharing'
];

/**
 * Expected room type labels
 */
export const expectedRoomTypeLabels: Record<RoomType, string> = {
  'single': 'Single',
  'double': 'Double',
  'double-extra': 'Double with Extra Bed',
  'two-sharing': 'Two Sharing',
  'three-sharing': 'Three Sharing'
};

/**
 * Expected food options
 */
export const expectedFoodOptions: FoodOption[] = ['veg', 'non-veg', 'both'];

/**
 * Expected food option labels
 */
export const expectedFoodOptionLabels: Record<FoodOption, string> = {
  'veg': 'Veg',
  'non-veg': 'Non Veg',
  'both': 'Both'
};

/**
 * Invalid test data for negative testing
 */
export const invalidTestData = {
  restaurantBooking: {
    emptyName: { ...validRestaurantBooking, name: '' },
    invalidEmail: { ...validRestaurantBooking, email: 'invalid-email' },
    invalidPhone: { ...validRestaurantBooking, phone: '123' },
    pastDate: { ...validRestaurantBooking, date: '2020-01-01' },
    zeroGuests: { ...validRestaurantBooking, guests: 0 },
    negativeGuests: { ...validRestaurantBooking, guests: -1 },
  },
  stayBooking: {
    emptyName: { ...validStayBooking, name: '' },
    invalidEmail: { ...validStayBooking, email: 'invalid-email' },
    pastCheckin: { ...validStayBooking, checkin: '2020-01-01' },
    checkoutBeforeCheckin: { ...validStayBooking, checkout: '2025-12-18' },
    zeroGuests: { ...validStayBooking, guests: 0 },
    invalidRoomType: { ...validStayBooking, roomType: 'invalid' as RoomType },
  }
};

/**
 * Expected page titles
 */
export const expectedPageTitles = {
  home: 'Home - Enjoy with R@hul',
  rooms: 'Rooms - Enjoy with R@hul',
  food: 'Food - Enjoy with R@hul',
  curries: /Authentic Curries - Enjoy with R@hul/,
  beverages: 'Beverages - Enjoy with R@hul',
  desserts: 'Desserts - Enjoy with R@hul',
  booking: 'Booking - Enjoy with R@hul',
  contact: 'Contact - Enjoy with R@hul'
};

/**
 * Expected room prices (from website exploration)
 */
export const expectedRoomPrices = {
  single: {
    withoutFood: '₹1200',
    vegOption: '₹1500',
    nonVegOption: '₹1600'
  }
};

/**
 * Expected food items for each category (from website exploration)
 */
export const expectedFoodItems = {
  curries: [
    { name: 'Butter Chicken', price: '₹ 350', ingredients: 'Tender chicken in creamy tomato-based gravy with butter and spices.' },
    { name: 'Mutton Rogan Josh', price: '₹ 420', ingredients: 'Juicy lamb pieces slow cooked with Kashmiri spices.' },
    { name: 'Fish Curry', price: '₹ 300', ingredients: 'Fresh fish cooked with coconut milk and South Indian spices.' },
    { name: 'Paneer Tikka Masala', price: '₹', ingredients: 'Grilled paneer cubes in spicy and tangy tomato' }
  ],
  beverages: [
    { name: 'Mango Lassi', price: '₹ 120', ingredients: 'Sweet mango pulp blended with yogurt, milk, and sugar.' },
    { name: 'Masala Chai', price: '₹ 80', ingredients: 'Traditional Indian tea brewed with milk, spices, and herbs.' },
    { name: 'Cold Coffee', price: '₹ 150', ingredients: 'Chilled coffee with milk, sugar, and ice cream topping.' },
    { name: 'Fresh Lime Soda', price: '₹ 90', ingredients: 'Refreshing lemon soda served sweet or salty.' }
  ],
  desserts: [
    { name: 'Gulab Jamun', price: '₹ 100', ingredients: 'Soft fried dough balls soaked in sugar syrup.' },
    { name: 'Rasgulla', price: '₹ 120', ingredients: 'Bengali sweet made with cottage cheese balls in sugar syrup.' },
    { name: 'Chocolate Brownie', price: '₹ 180', ingredients: 'Rich chocolate cake topped with walnuts and chocolate sauce.' },
    { name: 'Ice Cream Sundae', price: '₹ 150', ingredients: 'Two scoops of ice cream with chocolate syrup and nuts.' }
  ]
};

/**
 * Generate random test data for unique test runs
 */
export function generateRandomRestaurantBooking(): RestaurantBookingData {
  const names = ['Rahul', 'Priya', 'Amit', 'Sunita', 'Vikram', 'Neha'];
  const surnames = ['Sharma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Verma'];
  const domains = ['example.com', 'test.com', 'demo.org'];

  const firstName = names[Math.floor(Math.random() * names.length)];
  const lastName = surnames[Math.floor(Math.random() * surnames.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];

  return {
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
    phone: `+91-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    date: generateFutureDate(7, 60),
    guests: Math.floor(Math.random() * 8) + 1,
    foodOption: ['veg', 'non-veg', 'both'][Math.floor(Math.random() * 3)] as FoodOption
  };
}

/**
 * Generate random stay booking data
 */
export function generateRandomStayBooking(): StayBookingData {
  const names = ['Rahul', 'Priya', 'Amit', 'Sunita', 'Vikram', 'Neha'];
  const surnames = ['Sharma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Verma'];
  const domains = ['example.com', 'test.com', 'demo.org'];
  const roomTypes: RoomType[] = ['single', 'double', 'double-extra', 'two-sharing', 'three-sharing'];

  const firstName = names[Math.floor(Math.random() * names.length)];
  const lastName = surnames[Math.floor(Math.random() * surnames.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const checkin = generateFutureDate(7, 60);
  const checkout = generateFutureDateFromDate(checkin, 1, 7);

  return {
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
    checkin,
    checkout,
    guests: Math.floor(Math.random() * 4) + 1,
    roomType: roomTypes[Math.floor(Math.random() * roomTypes.length)],
    foodOption: ['veg', 'non-veg', 'both'][Math.floor(Math.random() * 3)] as FoodOption
  };
}

/**
 * Generate a future date string in YYYY-MM-DD format
 */
function generateFutureDate(minDays: number, maxDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + minDays + Math.floor(Math.random() * (maxDays - minDays + 1)));
  return date.toISOString().split('T')[0];
}

/**
 * Generate a future date from a base date
 */
function generateFutureDateFromDate(baseDate: string, minDays: number, maxDays: number): string {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + minDays + Math.floor(Math.random() * (maxDays - minDays + 1)));
  return date.toISOString().split('T')[0];
}