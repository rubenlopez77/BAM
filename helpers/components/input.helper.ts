import { Locator } from '@playwright/test';

export class InputHelper {
  async fill(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }
}
