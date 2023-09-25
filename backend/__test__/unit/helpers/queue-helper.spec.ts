import { QueueHelper } from '../../../src/helpers/queue.helper';

describe('QueueHelper', () => {
  let queue: QueueHelper;
  const concurrency = 2;
  const testFunc1 = jest.fn();
  const testFunc2 = jest.fn();
  const testFunc3 = jest.fn();

  beforeEach(() => {
    queue = new QueueHelper({ concurrency });
    // jest.useFakeTimers();
  });

  afterEach(() => {
    // jest.clearAllTimers();
  });

  it('should add a task to the queue', (done) => {
    queue.addTask(testFunc1);
    setTimeout(() => {
      expect(testFunc1).toHaveBeenCalled();
      done();
    }, 1000);
  });

  it('should only run up to the concurrency limit', (done) => {
    queue.addTask(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            testFunc1();
            resolve(null);
          }, 500);
        }),
    );
    queue.addTask(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            testFunc2();
            resolve(null);
          }, 500);
        }),
    );
    queue.addTask(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            testFunc3();
            resolve(null);
          }, 500);
        }),
    );

    setTimeout(() => {
      expect(testFunc1).toHaveBeenCalled();
      expect(testFunc2).toHaveBeenCalled();
      expect(testFunc3).not.toHaveBeenCalled();
      done();
    }, 1000);
  });
});
