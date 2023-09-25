export const getEnvOrDefaultOrThrow = (env: string, defaultValue?: string): string => {
  if (!process.env[env] && !defaultValue) {
    throw new Error(`please setup env ${env}`);
  }

  return (process.env[env] ?? defaultValue) as string;
};

export const githubToken = () => getEnvOrDefaultOrThrow('GITHUB_TOKEN');
export const githubConcurrency = () => Number(getEnvOrDefaultOrThrow('GITHUB_CONCURRENCY'));
