import { expect, Page, Locator } from '@playwright/test';
import { Tools } from '../base/tools';


export enum MenuOptions {
    Home = 'Home',
    Contact = 'Contact',
    Aboutus = 'About us',
    Cart = 'Cart',
    Login = 'Log in',
    Signup = 'Sign up',
    Logout = 'Log out',
}

  export class Menu {
    private page: Page;
    private menuElement: Locator;

    constructor(page: Page) {
      this.page = page;
      this.menuElement = this.page.locator('#navbarExample')

    } 
    
    /// <summary>           
    /// Valida que las opciones del menú sean las esperadas
    /// </summary>    
    public async validateMenu(): Promise<void> {
    const navItemTexts = await this.menuElement.locator('.nav-item:visible').allInnerTexts();

    const menuOptionsValues = Object.values(MenuOptions) as string[]; 

    const tools = new Tools(this.page)
    
    
    tools.screenshot(this.page) //testing

    // TODO: Deberia cambiar el menu si es logado o no. de momento asi
    for (const text of navItemTexts) {
        await expect(menuOptionsValues).toContain(await tools.cleanText(text))
      
    }
  }


}

    


      





