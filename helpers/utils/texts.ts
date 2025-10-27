export class ToolsTexts {
  public async cleanText(str: string): Promise<string> {
    if (!str) return '';

    let cleaned = str;
    
    // Normalizar espacios y saltos de línea de forma segura
    cleaned = cleaned.replaceAll('\n', ' ');
    
    while (cleaned.includes('  ')) {
      cleaned = cleaned.replaceAll('  ', ' ');
    }
    
    return cleaned.trim();
  }
}
