import { expect, Page, Locator } from '@playwright/test';

export class Locators {
  private page: Page;

  constructor(page: Page) {
    this.page = page;

  } 

}