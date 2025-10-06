import { test, expect, Page } from '@playwright/test';
import { Home } from '../../helpers/home'
import { User } from '../../helpers/login'
import { Menu, MenuOptions } from '../../helpers/menu';
import env from '../../tools/env';

let home: Home;

test.beforeEach(async ({ page }) => {// al inicio de cada test <--
  home = new Home(page);
  await home.goto(); 
});


test('go Login Cancel', async ({ page }) => { //Probamos que se puede cancelar el modal de login

  const user = new User(page);
  await user.doLoginCancel();

});

test('go Login KO', async ({ page }) => {  //Probamos que no valida datos incorrectos

  const user = new User(page);
  await user.doLogin("login", "KO", false);

});


test('go Login Logout', async ({ page }) => { // //Probamos que se valida correctamente

  const user = new User(page);
  await user.doLogin(env.USER,env.PASS);

  await user.doLogOut();
});

