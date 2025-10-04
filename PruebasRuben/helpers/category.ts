import { expect, Page, Locator } from '@playwright/test';
import { Category } from './categoryBase';


export class Catregories {
  private page: Page;
  private catElement: Locator;
  private items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.catElement = this.page.locator('.list-group');
    this.items = this.catElement.locator('.list-group-item');
  
  } 



  public async goCategory(cat: Category): Promise<void> {

    await this.catElement.locator(`:has-text("${cat}")`).click();

   // Switch 
    switch (cat) {
      case Category.Monitors:
        
      //blah blah

      break;
      case Category.Phones:
        this.items.filter({ hasText: cat }).click();
      break;  
      case Category.Laptops:
        this.items.filter({ hasText: cat }).click();
      break;
      default:
        throw new Error(`Categoría no soportada: ${cat}`);
    }

  }


      /// <summary>           
    /// Obtiene el número de categorías disponibles
    /// </summary>
  private async getCategoryCount(): Promise<number> {
    return await this.items.count();
  }

  private async getCategoryNames(): Promise<string[]> {

  return (await this.items.allTextContents()).slice(1); // Ignora el primer elemento (el título)


  }

    /// <summary>           
    /// Valida que las categorías sean las esperadas
    /// </summary>  
  public async validateCategories(): Promise<void> {


    const count = await this.getCategoryCount();
    expect(count).toBe(4);

    const names = await this.getCategoryNames();
    expect(names).toEqual(['Phones', 'Laptops', 'Monitors']);
  }
}