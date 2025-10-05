import { expect, Page, Locator } from '@playwright/test';
import path from 'path';
import fs from 'fs';

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
   
  
  public async screenshot(page: Page, filename: string = 'screenshot'): Promise<void> {
    const now = new Date();
    const userFolder = process.env.USERPROFILE || process.env.HOME;
    const folderName = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotsDir = path.join(userFolder!, 'debutTest', folderName);

    fs.mkdirSync(screenshotsDir, { recursive: true });

    const fileName = `${filename}.png`;
    const filePath = path.join(screenshotsDir, fileName);

    await page.screenshot({
      path: filePath,
      fullPage: true,
    });


  console.log(`Screenshot ${filePath} con nombre:'${filename}' realizado.`);


  }
}