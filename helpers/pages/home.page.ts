import { Page, expect } from '@playwright/test';
import { Runner } from '../../helpers/runner';

type Creds = { username: string; password: string };

export class Login {
  constructor(
    private readonly page: Page,
    private readonly runner: Runner   // <--- instancia, no clase
  ) {}


  goto(): void {
     this.runner.schedule(async () => {
      await this.page.goto('https://www.demoblaze.com');
    });
  }
}
