export class Runner {
  private queue: Promise<void> = Promise.resolve();

  schedule(fn: () => Promise<void>): void {
    this.queue = this.queue
      .then(fn)
      .catch(err => console.error('❌ Error en helper:', err));
  }

  async waitAll(): Promise<void> {
    await this.queue;
  }
}
