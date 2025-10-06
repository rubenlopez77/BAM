import { test, expect, Page } from '@playwright/test';
import { Home } from '../../helpers/home'
import { User } from '../../helpers/login'
import { Menu, MenuOptions } from '../../helpers/menu';


let home: Home;

test.beforeEach(async ({ page }) => {// al inicio de cada test <--
  home = new Home(page);
  await home.goto(); 
});


test('go Login', async ({ page }) => {

  const menu = new Menu(page);
  menu.goMenu(MenuOptions.Login);

  const user = new User(page);
  await user.goLogin();

});