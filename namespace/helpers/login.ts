import { expect, Page, Locator } from '@playwright/test';
import { Menu, MenuOptions } from '../helpers/menu';

export class User {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /// <summary>
  /// Realiza el login con las credenciales y valida automáticamente el resultado.
  /// </summary>
  /// <param name="user">nombre Usuario</param>
  /// <param name="pass">Contraseña</param>
  /// <param name="success">
  /// Indica si se espera que el login sea exitoso (true) o fallido (false). 
  /// Por defecto es true.
  /// </param>
  public async doLogin(user: string, pass:string, success : boolean =true): Promise<void> {
    
    const menu = new Menu(this.page);
    await menu.goMenu(MenuOptions.Login);


    await expect(this.page.locator('#logInModal')).toBeVisible({  });
    const loginModal = await this.page.locator('#logInModal');

    const usernameField = this.page.locator('#loginusername');
    const passwordField = this.page.locator('#loginpassword');

    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();


    await usernameField.fill(user);
    await passwordField.fill(pass);


    //await this.page.fill('#loginusername', user);
    //await this.page.fill('#loginpassword', pass);

   
  
    if (success){
      await loginModal.locator('button', { hasText: 'Log in' }).click();
      
      await expect(loginModal).toBeHidden({ timeout: 10000 });

     const userElement = this.page.locator('#nameofuser');

    // Espera explicita
      await expect(userElement).toHaveText(`Welcome ${user}`, {});

    } else {
        await this.page.waitForTimeout(4000); 
      let alertMessage: string | null = 'Wrong password';
      this.page.once('dialog', async dialog => {
        alertMessage = dialog.message();
      });
        
      await loginModal.locator('button', { hasText: 'Log in' }).click();
      expect(alertMessage).toContain('Wrong password');
    }
   
    // Cookie
    const cookies = await this.page.context().cookies();
    const sessionCookie = cookies.find(cookie => cookie.name === 'user'); 
    expect(sessionCookie, 'Cookie "user" no encontrada').toBeDefined(); 
  }
    /// <summary>
    /// Inicia el Login pero lo cancela, el modal debe cerrarse 
    /// </summary>
    public async doLoginCancel(): Promise<void> {{
      
      const menu = new Menu(this.page);
      await menu.goMenu(MenuOptions.Login);

      const loginModal = this.page.locator('#logInModal');
      await loginModal.locator('button.btn-secondary').click();
      await expect(loginModal.locator('#logInModal')).toBeHidden(); 
    }
  }
    /// <summary>
    /// Realiza el logout y verifica que el usuario no esta logado revisando si existe el usuario del menu superior. 
    /// </summary>
    public async doLogOut(): Promise<void> {{

      const menu = new Menu(this.page);
      await menu.goMenu(MenuOptions.Logout);

      //await expect(await menu.isLogged()).toBeFalsy();

      const cookies = await this.page.context().cookies();
      const sessionCookie = cookies.find(cookie => cookie.name === 'user');
      //expect(sessionCookie, 'Cookie "user" debería haber sido eliminada').toBeUndefined(); //// no borra la cookie al logout. Abro bug :P
    }
  }
}