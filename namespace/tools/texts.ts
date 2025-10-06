export class ToolsTexts {
  
    public async cleanText(str : string): Promise<string> {

      if (!str) return '';

      const g = str
        .replace(/\s*\(.*?\)\s*/g, '')
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      return g;
    }
   
  
}