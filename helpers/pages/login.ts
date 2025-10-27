import { expect, type Page } from '@playwright/test';
import { Menu, MenuOptions } from '@pages/menu.js';

export class User {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

 /// <summary>
 /// Realiza el login con las credenciales proporcionadas
 /// </summary>
 /// <param name="user">El nombre de usuario</param>
 /// <param name="pass">La contraseña</param>
 /// <param name="success">Indica si el login debe ser exitoso o no</param>
 /// </summary>
  public async doLogin(user: string, pass:string, success : boolean =true): Promise<void> {
    

    
    const menu = new Menu(this.page);
    await menu.goMenu(MenuOptions.Login);

    const loginModal = this.page.locator('#logInModal');
    const usernameField = this.page.locator('#loginusername');
    const passwordField = this.page.locator('#loginpassword');

    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();

    await usernameField.fill(user);
    await passwordField.fill(pass);

    if (success) {
      await loginModal.locator('button', { hasText: 'Log in' }).click();

      // Verify login success
      const userElement = this.page.locator('#nameofuser');
      await expect(userElement).toHaveText(`Welcome ${user}`, {});

      // Verify session cookie
      const cookies = await this.page.context().cookies();
      const sessionCookie = cookies.find(cookie => cookie.name === 'user');
      expect(sessionCookie, 'Cookie "user" no encontrada').toBeDefined();
    } else {
      // Setup dialog listener before clicking
      const dialogPromise = this.page.waitForEvent('dialog');
      await loginModal.locator('button', { hasText: 'Log in' }).click();

      const dialog = await dialogPromise;
      expect(dialog.message()).toContain('Wrong password');
    }
  }
  /// <summary>
  /// Inicia el Login pero lo cancela, el modal debe cerrarse
  /// </summary>
  public async doLoginCancel(): Promise<void> {
    await new Menu(this.page).goMenu(MenuOptions.Login);
    await this.page.locator('#logInModal button.btn-secondary').click();
  }

  /// <summary>
  /// Realiza el logout y verifica que el usuario no esta logado
  /// </summary>
  public async doLogOut(): Promise<void> {
    const menu = new Menu(this.page);
    await menu.goMenu(MenuOptions.Logout);
  }
}