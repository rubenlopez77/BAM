import { expect, Page, Locator } from '@playwright/test';
import { Tools } from '../base/tools';


export enum MenuOptions {
    Home = 'Home',
    Contact = 'Contact',
    Aboutus = 'About us',
    Cart = 'Cart',
    Login = 'Log in',
    Signup = 'Sign up',
}

  export class Menu {
    private page: Page;
    private menuElement: Locator;

    constructor(page: Page) {
      this.page = page;
      this.menuElement = this.page.locator('#navbarExample');

    } 
    
    /// <summary>           
    /// Valida que las opciones del menú sean las esperadas
    /// </summary>    
    public async validateMenu(): Promise<void> {

    const navItemTexts = await this.menuElement.locator('.nav-item').allInnerTexts();
    const menuOptionsValues = Object.values(MenuOptions) as string[]; 

    const tools = new Tools(this.page);

    for (const text of navItemTexts) {
      await expect(menuOptionsValues).toContain(await tools.cleanText(text));
    }
  }


}

    


      




//await expect(page.locator('#navbarExample')).toBeVisible();
// await expect(page.locator('#navbarExample')).toBeVisible();

// const navLinks = ['Home', 'Contact', 'About us', 'Cart', 'Log in', 'Sign up'];

// for (const link of navLinks) {
//   await expect(page.getByRole('link', { name: link })).toBeVisible();
// }



