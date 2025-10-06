import { expect, Page, Locator } from '@playwright/test';
import { ToolsTexts } from '../tools/texts';
import { ToolsDebug } from '../tools/debug';


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

    await new ToolsDebug(this.page).screenshot(this.page);
    const tt = new ToolsTexts()

    // TODO: Deberia cambiar el menu si es logado o no. de momento asi
    for (const text of navItemTexts) {
        await expect(menuOptionsValues).toContain(await tt.cleanText(text))
      
    }
  }
    public async goMenu(menu: MenuOptions): Promise<void> {
    
     await this.page.locator('.navbar-nav').getByRole('link', { name: menu}).click(); 
  }
  

      public async isLogged(user: string): Promise<boolean> {

      const userElement = this.page.locator('#nameofuser');
      await expect(userElement).toBeVisible(); // asegura que el elemento esté en el DOM
      const userText = await userElement.textContent();

      return userText === `Welcome ${user}`;




      return true;

      }

}

    


      





