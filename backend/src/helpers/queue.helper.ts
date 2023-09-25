import { AsyncPriorityQueue, priorityQueue } from 'async';

export class QueueHelper {
  private queue: AsyncPriorityQueue<any>;

  constructor({ concurrency }: { concurrency: number }) {
    this.queue = priorityQueue(async function (task: any) {
      return await task();
    }, concurrency);
  }

  public async addTask(task: () => unknown) {
    return await this.queue.pushAsync(task);
  }
}
