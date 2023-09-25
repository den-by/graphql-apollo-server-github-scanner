import { GithubClient } from '../clients/github.client';
import { GithubClientFactory } from '../factories/github-client.factory';
import { githubConcurrency, githubToken } from '../helpers/config.helper';
import { IRepositories, IRepository } from '../types';

export class GithubService {
  private readonly client: GithubClient;

  constructor() {
    this.client = GithubClientFactory.buildDecoratedClient({
      githubToken: githubToken(),
      concurrency: githubConcurrency(),
    });
  }

  async fetchRepositories(limit: number, offset: number): Promise<IRepositories> {
    const user = await this.client.fetchCurrentUser();
    const repositories = await this.client.fetchRepositories({ owner: user.data.login });
    const limitedRepositories = repositories.data.slice(offset, offset + limit);

    return {
      nodes: await Promise.all(
        limitedRepositories.map(async (repository): Promise<IRepository> => {
          return {
            ...this.mapFieldsSync(repository),
          };
        }),
      ),
      totalCount: repositories.data.length,
    };
  }

  private mapFieldsSync(repository: { private: boolean; name: string; owner: { login: string }; size?: number }) {
    return {
      isPrivate: repository.private,
      name: repository.name,
      owner: repository.owner.login,
      size: repository.size || 0,
    };
  }

  private async mapFieldsAsync(repository: { name: string; owner: { login: string } }) {
    const ymlFile = await this.client
      .searchFiles({
        username: repository.owner.login,
        repo: repository.name,
        extension: 'yml',
      })
      .then((response) => response.data.items[0]);

    const numberOfFiles = await this.client
      .searchFiles({
        username: repository.owner.login,
        repo: repository.name,
      })
      .then((response) => response.data.total_count);

    const ymlContent = ymlFile?.path
      ? await this.client.fetchTextFromGithubFile({
          owner: repository.owner.login,
          repo: repository.name,
          path: ymlFile?.path,
        })
      : '';

    const webhooks = await this.client
      .getHooks({
        owner: repository.owner.login,
        repository: repository.name,
      })
      .then((response) => response.data.map((hook) => ({ url: hook.config.url || '' })));

    return {
      ymlFile: ymlFile?.path,
      numberOfFiles,
      ymlContent,
      webhooks,
    };
  }

  private async mapFields(repository: { private: boolean; name: string; owner: { login: string }; size?: number }) {
    const syncFields = this.mapFieldsSync(repository);
    const asyncFields = await this.mapFieldsAsync(repository);

    return {
      ...syncFields,
      ...asyncFields,
    };
  }

  async fetchRepository(name: string): Promise<IRepository> {
    const user = await this.client.fetchCurrentUser();
    const repositories = await this.client.fetchRepositories({ owner: user.data.login });
    const repository = repositories.data.find((repo) => repo.name === name);
    if (!repository) {
      throw new Error('Repository not found');
    }

    return await this.mapFields(repository);
  }
}
