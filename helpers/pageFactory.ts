import fs from 'fs';
import path from 'path';
import { Page } from '@playwright/test';
import { Runner } from './runner';

export class PageFactory {
  [key: string]: any;

  constructor(
    private readonly page: Page,
    private readonly runner: Runner  
  ) {
    const pagesDir = path.resolve(__dirname, '../helpers/pages');
    const files = fs.readdirSync(pagesDir).filter(f => /\.(ts|js)$/.test(f));

    for (const file of files) {
      const baseName = file.replace(/\.page\.(ts|js)$/i, '').replace(/\.(ts|js)$/i, '');
      const instanceName = baseName.toLowerCase();
      const mod = require(path.join(pagesDir, file));
      const PageClass = Object.values(mod).find(v => typeof v === 'function');

      if (PageClass) {
        
        (this as any)[instanceName] = new (PageClass as any)(this.page, this.runner);
      }
    }
  }
}
