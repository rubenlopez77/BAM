import { expect, Page, Locator } from '@playwright/test';

export class Home {
     constructor(private page: Page) {}

  /// <summary>                   
  /// Navega a la home
  /// </summary>
  public async goto(): Promise<void> {
    await this.page.goto('/');
  }

}
