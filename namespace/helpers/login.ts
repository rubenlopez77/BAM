import { expect, Page, Locator } from '@playwright/test';
import env from '../tools/env'; 



  export class User {
    private page: Page;


    constructor(page: Page) {
      this.page = page;
 

    } 
  public async goLogin(): Promise<void> {

    
    const login = env.USER;

  }
}