import { chromium, firefox, webkit, Browser, BrowserContext } from '@playwright/test';

export class DriverFactory {
  private static browser: Browser | null = null;

  static async getBrowser(): Promise<Browser> {
    if (this.browser?.isConnected()) return this.browser;

    const name = process.env.BROWSER || 'chromium';
    const headless  =false; //= process.env.HEADLESS !== 'false';

    switch (name) {
      case 'firefox':
        this.browser = await firefox.launch({ headless });
        break;
      case 'webkit':
        this.browser = await webkit.launch({ headless });
        break;
      default:
        this.browser = await chromium.launch({ headless });
        break;
    }
    return this.browser;
  }

  static async createContext(): Promise<BrowserContext> {
    const browser = await this.getBrowser();
    return await browser.newContext();
  }

  static async closeBrowser(): Promise<void> {
    if (this.browser && this.browser.isConnected()) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
