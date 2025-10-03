import { expect, Page, Locator } from '@playwright/test';

export class Home {
  private page: Page;
  private catElement: Locator;
  private items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.catElement = this.page.locator('#cat');
    this.items = this.catElement.locator('~ .list-group-item');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.demoblaze.com');

    await this.validateCategories();

  }

  async getCategoryCount(): Promise<number> {
    return await this.items.count();
  }

  async getCategoryNames(): Promise<string[]> {
    return await this.items.allTextContents();
  }

  async validateCategories(): Promise<void> {
    const count = await this.getCategoryCount();
    expect(count).toBe(3);

    const names = await this.getCategoryNames();
    expect(names).toEqual(['Phones', 'Laptops', 'Monitors']);
  }
}
