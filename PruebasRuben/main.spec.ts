import { test, expect, Page } from '@playwright/test';
import { Home } from './helpers/home';
import { Catregories } from './helpers/category';
import { Category } from './helpers/categoryBase';

let home: Home;

test.beforeEach(async ({ page }) => {
  home = new Home(page);
  await home.goto(); // navega a la página de inicio antes de cada test
});


test('landing', async ({ page }) => {



  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/STORE/);
});

test('has categories', async ({ page }) => {


  const categories = new Catregories(page);
  await categories.validateCategories();  
});

test('go Monitor', async ({ page }) => {

  const categories = new Catregories(page);
  await categories.goCategory(Category.Monitors);

});