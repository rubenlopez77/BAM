import { bamTest } from '@utils/bam.js';
import { Home } from '@pages/home.js';
import { User } from '@pages/login.js';


let home: Home;
bamTest.describe('Login flow -> ', () => {
  bamTest.beforeEach(async ({ page }) => {
    home = new Home(page);
    await home.goto(); 
  });


  bamTest('should open login modal and close it', async ({ page }) => {

    const user = new User(page);
    await user.doLoginCancel();

  });
  /**
   * @ID REQ-LOGIN-001
   * @Title Validación de login con credenciales inválidas
   * @Description Usuario recibe error al introducir credenciales incorrectas
   */
  bamTest('should fail login with invalid credentials', async ({ page }) => { 

    const user = new User(page);
    user.doLogin("login", "KO", false);
  });


  bamTest.fixme('should login successfully and then logout', async ({ page }) => {

    const user = new User(page);
     //user.doLogin(env.USER,env.PASS);
     await user.doLogOut();
  });

});