import { expect, Page, Locator } from '@playwright/test';
import { Menu, MenuOptions } from '../helpers/menu';

export class User {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }


  public async goLogin(user: string, pass:string, success : boolean =true): Promise<void> {
    
    await expect(this.page.locator('#logInModal')).toBeVisible();
    await this.page.fill('#loginusername', user);
    await this.page.fill('#loginpassword', pass);

    const loginModal = this.page.locator('#logInModal');
  

    if (success){
      await loginModal.locator('button', { hasText: 'Log in' }).click();
      await expect(loginModal.locator('#logInModal')).toBeHidden(); 

       const menu = new Menu(this.page);
       expect(await menu.isLogged(user)).toBe(true);

    } else {
      let alertMessage: string | null = 'Wrong password';
      this.page.once('dialog', async dialog => {
        alertMessage = dialog.message();
      });
        
      await loginModal.locator('button', { hasText: 'Log in' }).click();
      expect(alertMessage).toContain('Wrong password');

     

    }
    


  }
    public async goLoginCancel(): Promise<void> {{
      
      const loginModal = this.page.locator('#logInModal');
      await loginModal.locator('button.btn-secondary').click();
      await expect(loginModal.locator('#logInModal')).toBeHidden(); 


    }
  }
}
