import { test, expect } from '@playwright/test';
import { Home } from './helpers/home';

test('landing', async ({ page }) => {
  await page.goto('https://www.demoblaze.com');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/STORE/);
});

test('has categories', async ({ page }) => {
  
  
  const home = new Home(page);
  await home.goto();     


});


test('go Monitor', async ({ page }) => {
  await page.goto('https://www.demoblaze.com');

  const catElement = page.locator('#cat');
  const items = catElement.locator('~ .list-group-item');

  // Contamos cuántos hay
  const count = await items.count();
  expect(count).toBe(3);


  const categoiesName = await items.allTextContents();
  expect(categoiesName).toEqual(['Phones', 'Laptops', 'Monitors']);

});