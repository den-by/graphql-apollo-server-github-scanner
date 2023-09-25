// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import retry from 'async-retry';

export async function retryHelper(task: () => unknown) {
  return await retry(
    async () => {
      return await task();
    },
    {
      minTimeout: 4000,
      retries: 10,
    },
  );
}
