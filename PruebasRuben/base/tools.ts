import { expect, Page, Locator } from '@playwright/test';

export class Tools {
  private page: Page;

  constructor(page: Page) {
    this.page = page;

  } 

    public async cleanText(str : string): Promise<string> {


      if (!str) return '';

      const g = str
        .replace(/\s*\(.*?\)\s*/g, '')
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      return g;
    }
}