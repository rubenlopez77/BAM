import { test, expect, Page } from '@playwright/test';
import { Home } from './helpers/home';
import { Category, Categories } from '../PruebasRuben/helpers/category';


let home: Home;

test.beforeEach(async ({ page }) => {
  home = new Home(page);
  await home.goto(); // navega a la página de inicio antes de cada test
});


test('landing', async ({ page }) => {

  await expect(page).toHaveTitle(/STORE/);
});

test('has categories', async ({ page }) => {


  const categories = new Categories(page);
  await categories.validateCategories();  
});

test('go Monitor', async ({ page }) => {

  const categories = new Categories(page);
  await categories.goCategory(Category.Monitors);

});

// En otro archivo, por ejemplo: test.spec.ts


