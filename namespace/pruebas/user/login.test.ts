import { test, expect, Page } from '@playwright/test';
import { Home } from '../../helpers/home'
import { User } from '../../helpers/login'
import { Menu, MenuOptions } from '../../helpers/menu';
import env from '../../tools/env';

let home: Home;
test.describe('Login flow -> ', () => {
  test.beforeEach(async ({ page }) => {
    home = new Home(page);
    await home.goto(); 
  });


  test('should open login modal and close it', async ({ page }) => {

    const user = new User(page);
    await user.doLoginCancel();

  });

  test('should fail login with invalid credentials', async ({ page }) => { 

    const user = new User(page);
    await user.doLogin("login", "KO", false);


  });


  test('should login successfully and then logout', async ({ page }) => {

    const user = new User(page);
    await user.doLogin(env.USER,env.PASS);

    await user.doLogOut();
  });

});