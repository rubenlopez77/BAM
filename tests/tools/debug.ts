import { expect, Page, Locator } from '@playwright/test';
import path from 'path';
import fs from 'fs';

export class ToolsDebug {
  private page: Page;

  constructor(page: Page) {
    this.page = page;

  } 


    /// <summary>           
    /// Experimento. Intentando replicar mi función de Screenshoots. Sin reflection es mas divertido
    /// </summary>  
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