function asyncFunction(f: unknown): f is () => Promise<unknown> {
  return typeof f === 'function' && f.constructor.name === 'AsyncFunction';
}

export function asyncMethodDecorator<K extends {}>(
  initialObject: K,
  queryFunction: (task: () => unknown, ...args: unknown[]) => Promise<unknown>,
): K {
  return new Proxy(initialObject, {
    get(target, prop, receiver) {
      const originalProperty = Reflect.get(target, prop, receiver);
      if (typeof originalProperty !== 'function') {
        return originalProperty;
      }
      const isPromise = asyncFunction(originalProperty);
      if (!isPromise) {
        return function (this: K, ...args: unknown[]) {
          if (typeof originalProperty === 'function') {
            const bound = originalProperty.bind(this);

            return bound(...args);
          }
          throw new Error('Not a function');
        };
      }

      return async function (this: K, ...args: unknown[]) {
        if (typeof originalProperty === 'function') {
          const bound = originalProperty.bind(this);

          return await queryFunction(() => bound(...args), ...args);
        }
        throw new Error('Not a function');
      };
    },
  });
}
