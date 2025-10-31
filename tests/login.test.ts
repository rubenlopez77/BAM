import { test } from '../helpers/hooks';
import loginData from '../data/users.json';

let user: any; //actor que realiza la accion

test.describe('Login flow →', () => {
  test.beforeEach(async ({ pages }) => {
    user = pages.login;
  });

    /**
   * @ID REQ-LOGIN-001
   * @Title Validación de login con credenciales válidas
   * @Description Como usuario, al introducir credenciales correctas debo poder acceder al sistema.
   * @Priority High
   * @Tags security, login
   */
  test('Validación de login con credenciales válidas', () => {
    user.loginWith(loginData.valid, true);
  });

    /**
   * @ID REQ-LOGIN-002
   * @Title Validación de login con credenciales inválidas
   * @Description Como usuario, al introducir credenciales correctas debo ver un m ensaje de erro.
   * @Priority High
   * @Tags security, login
   */

    test('Validación de login con credenciales invalidas', () => {
    user.loginWith(loginData.invalid, false);
  });


    /**
   * @ID REQ-LOGIN-004
   * @Title Logout de la aplicación
   * @Description Como usuario, y una vez logado debo poder cerrar sesión y volver al estado inicial. La sesión se debe limpiar.
   * @Priority High
   * @Tags security, login
   */

    test('Logout de la aplicación', () => {
    user.loginWith(loginData.valid, true);
    user.doLogOut();
  });

});
