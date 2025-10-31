// /helpers/pages/LoginPage.ts
import { Page, expect } from '@playwright/test';

export class HomePage {


  constructor(private page: Page) {
   
  }

  // Acciones de negocio (asíncronas internas)
  async home() {
    await this.page.goto('https://www.demoblaze.com');
  }

}