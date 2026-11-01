/**
 * Beverages Page Object
 *
 * Represents the Beverages page: https://enjoy-with-rahul.onrender.com/food/beverages
 */

import { Page } from '@playwright/test';
import { FoodCategoryPage } from './food-category-page';

export class BeveragesPage extends FoodCategoryPage {
  constructor(page: Page) {
    super(page, '/food/beverages', 'Beverages');
  }
}