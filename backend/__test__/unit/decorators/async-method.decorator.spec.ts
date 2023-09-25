import { asyncMethodDecorator } from '../../../src/decorators/async-method.decorator';

class TestClass {
  someContest = 'testReturn';

  async testMethod(number?: number) {
    return this.someContest;
  }
}

const pause = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

describe('Async method proxy decorator', () => {
  let testClass: TestClass;

  beforeEach(() => {
    testClass = new TestClass();
  });

  it('should increment counter', async () => {
    // Arrange
    let counter = 0;
    const methodDecorator = asyncMethodDecorator(testClass, async () => {
      counter += 1;
    });

    // Act
    await Promise.all([methodDecorator.testMethod(), methodDecorator.testMethod(), methodDecorator.testMethod()]);

    // Assert
    expect(counter).toEqual(3);
  });

  it('should log arguments', async () => {
    // Arrange
    const Args: unknown[] = [];
    const methodDecorator = asyncMethodDecorator(testClass, async (task, ...args) => {
      Args.push(args[0]);
    });

    // Act
    await Promise.all([methodDecorator.testMethod(2000), methodDecorator.testMethod(2000), methodDecorator.testMethod(2000)]);

    // Assert
    expect(Args).toEqual([2000, 2000, 2000]);
  });

  it('should await methodDecorator', async () => {
    // Arrange
    const methodDecorator = asyncMethodDecorator(testClass, async () => {
      await pause(3000);
    });
    const start = Date.now();

    // Act
    await Promise.all([methodDecorator.testMethod(), methodDecorator.testMethod(), methodDecorator.testMethod()]);

    // Assert
    expect(Date.now() - start).toBeGreaterThan(2000);
  });

  it('should execute methodDecorator parallel', async () => {
    // Arrange
    const methodDecorator = asyncMethodDecorator(testClass, async () => {
      await pause(3000);
    });
    const start = Date.now();

    // Act
    await Promise.all([methodDecorator.testMethod(), methodDecorator.testMethod(), methodDecorator.testMethod()]);

    // Assert
    expect(Date.now() - start).toBeLessThan(4000);
  });

  it('should return expected result', async () => {
    // Arrange
    const methodDecorator = asyncMethodDecorator(testClass, async (task) => {
      return task();
    });

    // Act
    const response = await methodDecorator.testMethod();

    // Assert
    expect(response).toEqual('testReturn');
  });
});
