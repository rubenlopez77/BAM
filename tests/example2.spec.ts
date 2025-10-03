import { test, expect } from "@playwright/test";
import { LoginPage } from "./pageobjects/LoginPage";

test("Testear playroght", async ({ page }) => {
  await page.goto("https://playwright.dev/docs/api/class-selectors");
 
  const itemsContainer = await page
    .locator(".menu__list .menu__link").last();
 //   .all();
  

await itemsContainer.evaluate((e) => {
  (e as HTMLElement).style.border = "3px solid lime"; // borde verde fosforito
  (e as HTMLElement).style.backgroundColor = "rgba(160, 13, 116, 0.2)"; // fondo semitransparente
});


  //     const texts: string[] = [];
  // for (let container of itemsContainer) {
  //   texts.push(...(await container.allTextContents()));

  // }
console.log(`la cosa es como sigue ${await itemsContainer.textContent()}`);

    
});

test("purchase an item 2", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
  const itemsContainer = await page
    .locator("#inventory_container .inventory_item")
    .all();
  
  for (let container of itemsContainer) {
    console.log(await container.allTextContents());
  }
});

test("purchase an item 3", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
  const itemsContainer = await page
    .locator("#inventory_container .inventory_item")
    .all();
  
  for (let container of itemsContainer) {
    console.log(await container.allTextContents());
  }
});
