import { test, expect, Page } from '@playwright/test';
import { Home } from '../helpers/home';
import { Category, Categories } from '../helpers/category';
import { Menu, MenuOptions } from '../helpers/menu';



let home: Home;

test.beforeEach(async ({ page }) => {// al inicio de cada test <--
  home = new Home(page);
  await home.goto(); 
});


test('landing', async ({ page }) => {

  // HEADER Todo: Header a su clase
  await expect(page).toHaveTitle("STORE");
  await expect(page.getByRole('heading', { name: 'STORE' })).toBeVisible();

  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', 'favicon.ico');
  
  const response = await page.request.get(`${new URL(page.url()).origin}/favicon.ico`);
  console.log(response.status());
  expect(response.ok()).toBeTruthy();
  
  // MENU
  const menu = new Menu(page);
  await menu.validateMenu();

  // FOOTER Todo tambien a su clase
  await expect(page.locator('footer').locator('text=Copyright © Product Store 2017')).toBeVisible();

});

test('has categories', async ({ page }) => {


  const categories = new Categories(page);
  await categories.validateCategories();  
});

test('go Monitor', async ({ page }) => {

  const categories = new Categories(page);
  await categories.goCategory(Category.Monitors);

});




