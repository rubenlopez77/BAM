import { expect, Page, Locator } from '@playwright/test';
import * as dotenv from 'dotenv';

        
    /// <summary>
    /// Clase que representa la página de inicio de demoblaze.com
    /// </summary>
export class Home {
  
     constructor(private page: Page) {}


    /// <summary>                   
    /// Navega a la página de inicio y valida las categorías
    /// </summary>

  public async goto(): Promise<void> {
    
    

    dotenv.config({ path: '.env.qa' }); // carga el .env.qa
    const url = process.env.URL!;

    await this.page.goto(url);
  }


}
