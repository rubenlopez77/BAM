import { test as base } from '@playwright/test';
import { DriverFactory } from './driverFactory';
import { PageFactory } from './pageFactory';
import { Runner } from './runner';

type Fixtures = {
  pages: PageFactory;
  runner: Runner;
};

export const test = base.extend<Fixtures>({
  runner: async ({}, use) => {
    const runner = new Runner();
    await use(runner);
  },

  pages: async ({ runner }, use, testInfo) => {
    const context = await DriverFactory.createContext();
    const browserPage = await context.newPage();

    const baseUrl = process.env.BASE_URL || 'https://www.demoblaze.com';
    console.log(`🌐 Navegando a: ${baseUrl} usando ${testInfo.project.name}`);
    await browserPage.goto(baseUrl);

    const factory = new PageFactory(browserPage, runner);
    await use(factory);

    testInfo.attach('runner_status', { body: 'Esperando cola de Runner…' });
    await runner.waitAll();

    await browserPage.waitForTimeout(250);

    if (!context.pages()[0]?.isClosed()) {
      console.log('🚪 Cerrando contexto...');
      await context.close();
    }
  },
});

export { expect } from '@playwright/test';
