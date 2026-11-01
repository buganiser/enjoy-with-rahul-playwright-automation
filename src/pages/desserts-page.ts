/**
 * Desserts Page Object
 *
 * Represents the Desserts page: https://enjoy-with-rahul.onrender.com/food/desserts
 */

import { Page } from '@playwright/test';
import { FoodCategoryPage } from './food-category-page';

export class DessertsPage extends FoodCategoryPage {
  constructor(page: Page) {
    super(page, '/food/desserts', 'Desserts');
  }
}