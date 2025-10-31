// /tools/reporter.ts
import fs from 'fs';
import path from 'path';

// ✅ __dirname disponible porque tu proyecto usa CommonJS
const TESTS_DIR = path.resolve(__dirname, '../tests');
const OUTPUT_DIR = path.resolve(__dirname, '../reports');
const OUTPUT_FILE_JSON = path.join(OUTPUT_DIR, 'traceability-report.json');
const OUTPUT_FILE_MD = path.join(OUTPUT_DIR, 'traceability-report.md');

interface RequirementMetadata {
  id: string;
  title: string;
  description: string;
  priority: string;
  tags: string[];
  testName: string;
  file: string;
}

function extractTraceability(): RequirementMetadata[] {
  if (!fs.existsSync(TESTS_DIR)) {
    console.error(`❌ No se encontró el directorio de tests: ${TESTS_DIR}`);
    return [];
  }

  const files = fs.readdirSync(TESTS_DIR).filter(f => f.endsWith('.test.ts'));
  const results: RequirementMetadata[] = [];

  for (const file of files) {
    const fullPath = path.join(TESTS_DIR, file);
    const content = fs.readFileSync(fullPath, 'utf-8');

   const regex = /\/\*\*([\s\S]*?)\*\/[\s\r\n\t]*test\(['"`](.*?)['"`]/g;

    let match;

    while ((match = regex.exec(content)) !== null) {
      const block = match[1];
      const testName = match[2];

      const getTag = (tag: string) => {
        const tagRegex = new RegExp(`@${tag}\\s+([^\\n\\r]*)`, 'i');
        const found = block.match(tagRegex);
        return found ? found[1].trim() : '';
      };

      const tagsRaw = getTag('Tags');
      const metadata: RequirementMetadata = {
        id: getTag('ID'),
        title: getTag('Title'),
        description: getTag('Description'),
        priority: getTag('Priority'),
        tags: tagsRaw ? tagsRaw.split(',').map(t => t.trim()) : [],
        testName,
        file,
      };

      results.push(metadata);
    }
  }

  return results;
}

function generateReports(): void {
  const data = extractTraceability();

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

  // JSON
  fs.writeFileSync(OUTPUT_FILE_JSON, JSON.stringify(data, null, 2), 'utf-8');

  // Markdown
  const header =
    `# 📋 Informe de Trazabilidad BAM\n\n| ID | Test | Descripción | Prioridad | Tags | Archivo |\n|----|------|-------------|------------|------|----------|\n`;
  const rows = data
    .map(
      d =>
        `| ${d.id} | ${d.testName} | ${d.description} | ${d.priority} | ${d.tags.join(', ')} | ${d.file} |`
    )
    .join('\n');

  fs.writeFileSync(OUTPUT_FILE_MD, header + rows, 'utf-8');

  console.log('✅ Traceability reports generated:');
  console.log(`   - ${OUTPUT_FILE_JSON}`);
  console.log(`   - ${OUTPUT_FILE_MD}`);
  console.table(
    data.map(d => ({
      ID: d.id,
      Test: d.testName,
      Priority: d.priority,
      Tags: d.tags.join(', '),
      File: d.file,
    }))
  );
}

generateReports();
