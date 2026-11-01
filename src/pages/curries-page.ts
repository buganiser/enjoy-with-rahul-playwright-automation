/**
 * Curries Page Object
 *
 * Represents the Curries page: https://enjoy-with-rahul.onrender.com/food/curries
 */

import { Page } from '@playwright/test';
import { FoodCategoryPage } from './food-category-page';

export class CurriesPage extends FoodCategoryPage {
  constructor(page: Page) {
    super(page, '/food/curries', 'Authentic Curries');
  }
}