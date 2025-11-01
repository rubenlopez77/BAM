/**
 * 🧩 Runner - Coordinador de acciones asincrónicas del modelo BAM
 * ---------------------------------------------------------------
 * Gestiona la secuenciación, métricas y limpieza de la cola de tareas,
 * evitando bloqueos y garantizando reproducibilidad entre pruebas.
 *
 * Características:
 * - Control de profundidad (MAX_DEPTH) para prevenir saturación.
 * - Registro de métricas de tiempo, memoria media y memoria pico.
 * - Limpieza automática de la cola sin ensuciar la capa de test.
 * - Compatible con ejecución paralela y CI/CD.
 */

export class Runner {
  private queue: Promise<void> = Promise.resolve();
  private depth = 0;
  private readonly MAX_DEPTH = 100; // ajustable según complejidad de pasos
  private readonly metrics: { steps: number; totalTime: number } = {
    steps: 0,
    totalTime: 0,
  };
  private maxMem = 0; 

  /**
   * Programa una nueva acción asincrónica dentro de la cola.
   * Cada acción se ejecuta de forma secuencial y registrada.
   */
  schedule(fn: () => Promise<void>): void {
    const stepStart = performance.now();

    this.queue = this.queue
      .then(async () => {
        this.depth++;
        this.metrics.steps++;

        await fn();

        // Métricas de rendimiento y memoria
        const elapsed = performance.now() - stepStart;
        const mem = globalThis.process.memoryUsage().heapUsed / 1024 / 1024;

        this.metrics.totalTime += elapsed;
        

        // Registro del pico máximo de memoria
        this.maxMem = Math.max(this.maxMem, mem);

        // Autolimpieza si la profundidad supera el máximo permitido
        if (this.depth >= this.MAX_DEPTH) {
          console.warn(`⚠️  Runner alcanzó profundidad ${this.depth}. Cola reseteada.`);
          this.reset();
        }

        // Limpieza de memoria opcional (si se ejecuta con --expose-gc)
        if (globalThis.gc) globalThis.gc();
      })
      .catch(err => console.error('Error en helper:', err));
  }

  /**
   * Espera a que se complete toda la cola pendiente.
   * Muestra métricas de rendimiento y uso de memoria.
   */
  async waitAll(): Promise<void> {
    await this.queue;
    const mem = globalThis.process.memoryUsage().heapUsed / 1024 / 1024;

    console.log(
      `🏁 Runner completado → Steps: ${this.metrics.steps}, ` +
      `Tiempo medio: ${(this.metrics.totalTime / this.metrics.steps).toFixed(2)} ms, ` +
      `Memoria pico: ${this.maxMem.toFixed(2)} MB, ` +
      `Memoria final: ${mem.toFixed(2)} MB`
    );
  }

  /** Reinicia la cola interna y el contador de profundidad. */
  private reset(): void {
    this.queue = Promise.resolve();
    this.depth = 0;
  }
}
