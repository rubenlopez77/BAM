import { Page, expect } from '@playwright/test';
import { Runner } from '@helpers/runner';

type Creds = { username: string; password: string };

export class Login {
  constructor(
    private readonly page: Page,
    private readonly runner: Runner
  ) {}

  loginWith(credentials: Creds, expectSuccess = true): void {
  this.runner.schedule(async () => {
    console.log('▶️ Iniciando flujo de login...');

    // Espera al botón y abre modal
    await this.page.waitForSelector('#login2', { state: 'visible' });
    await this.page.locator('#login2').click();

    // Espera al modal y campos
    const modal = this.page.locator('#logInModal');
    await expect(modal).toBeVisible({ timeout: 5000 });

    const usernameField = this.page.locator('#loginusername');
    const passwordField = this.page.locator('#loginpassword');
    const loginBtn = this.page.locator('button:has-text("Log in")');

    await usernameField.waitFor({ state: 'visible' });
    await usernameField.fill(credentials.username);
    await passwordField.fill(credentials.password);

    if (expectSuccess) {
      await loginBtn.click();
      await expect(this.page.locator('#nameofuser')).toBeVisible({ timeout: 5000 });
      const text = await this.page.locator('#nameofuser').textContent();
      expect(text).toMatch(`Welcome ${credentials.username}`);
    } else {
      const [dialog] = await Promise.all([
        this.page.waitForEvent('dialog'),
        loginBtn.click()
      ]);
      expect(dialog.message()).toContain('Wrong password');
      await dialog.accept();
    }

    console.log('✅ Flujo de login completado');
  });
}


  doLoginCancel(): void {
    this.runner.schedule(async () => {
      await this.page.locator('#login2').click();
      const cancelButton = this.page.locator('#logInModal button.btn-secondary');
      await expect(cancelButton).toBeVisible();
      await cancelButton.click();
    });
  }

  doLogOut(): void {
    this.runner.schedule(async () => {
      const logoutButton = this.page.locator('#logout2');
      await expect(logoutButton).toBeVisible({ timeout: 5000 });
      await logoutButton.click();
    });
  }
}
