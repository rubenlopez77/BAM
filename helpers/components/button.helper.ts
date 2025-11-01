// components/ButtonHelper.ts
import { expect, Page, Locator } from '@playwright/test';

export class ButtonHelper {
  constructor(private readonly page: Page) {}

  async click(locator: Locator, name?: string) {
    await expect(locator).toBeVisible();
    await locator.click();
    console.log(`✅ Clicked button${name ? `: ${name}` : ''}`);
  }
}
