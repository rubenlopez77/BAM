// helpers/utils/bamTest.ts
import { test as base } from '@playwright/test';

/**
 * Wrapper del test de Playwright que preserva toda su API
 * pero elimina la necesidad de usar 'await' o 'expect' en los tests.
 *
 * Filosofía BAM: los tests solo declaran intención;
 * los helpers ejecutan y verifican.
 */
type BamTest = typeof base & {
  (title: string, fn: (...args: any[]) => unknown): ReturnType<typeof base>;
};

const bamTest = ((title, fn) => {
  base(title, async function ({}, testInfo, workerInfo) {
    const fixtures = arguments[0] as Record<string, unknown>;
    try {
      const result = fn(fixtures, testInfo, workerInfo);
      // Detecta promesas sin romper el tipado
      if (result && typeof (result as any).then === 'function') {
        await result;
      }
    } catch (err) {
      throw new Error(`❌ Error en test BAM "${title}": ${err}`);
    }
  });
}) as BamTest;

// === Reexporta todas las utilidades del test base === //
bamTest.describe = base.describe;
bamTest.beforeEach = base.beforeEach;
bamTest.afterEach = base.afterEach;
bamTest.beforeAll = base.beforeAll;
bamTest.afterAll = base.afterAll;
bamTest.skip = base.skip;
bamTest.only = base.only;
bamTest.fixme = base.fixme;
bamTest.slow = base.slow;
bamTest.info = base.info;
bamTest.setTimeout = base.setTimeout;
bamTest.use = base.use;

// Exporta el nuevo test
export { bamTest };
