import { expect, Page, Locator } from '@playwright/test';

        
    /// <summary>
    /// Clase que representa la página de inicio de demoblaze.com
    /// </summary>
export class Home {
  
    

     constructor(private page: Page) {}


    /// <summary>                   
    /// Navega a la página de inicio y valida las categorías
    /// </summary>

  public async goto(): Promise<void> {
    await this.page.goto('/');
  }


}
