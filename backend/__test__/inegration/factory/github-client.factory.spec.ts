import * as process from 'process';

import { GithubClientFactory } from '../../../src/factories/github-client.factory';
import { GithubClient } from '../../../src/clients/github.client';

describe('GithubClientFactory', () => {
  let client: GithubClient;

  beforeAll(() => {
    const auth = process.env.GITHUB_TOKEN || '';
    client = GithubClientFactory.buildDecoratedClient({ githubToken: auth, concurrency: 2 });
  });

  describe('fetchCurrentUser', () => {
    it('should return current user', async () => {
      // Arrange
      // Act
      const response = await client.fetchCurrentUser();
      // Assert
      expect(response.status).toEqual(200);
    });
  });

  describe('fetchRepositories', () => {
    it('should return repositories', async () => {
      // Arrange
      const fetchCurrentUserResp = await client.fetchCurrentUser();
      const currentUser = fetchCurrentUserResp.data.login;
      // Act
      const response = await client.fetchRepositories({
        owner: currentUser,
      });
      // Assert
      expect(response.status).toEqual(200);
    });
  });

  describe('getHooks', () => {
    it('should return hooks', async () => {
      // Arrange
      const fetchCurrentUserResp = await client.fetchCurrentUser();
      const currentUser = fetchCurrentUserResp.data.login;
      const fetchRepositoriesResp = await client.fetchRepositories({
        owner: currentUser,
      });
      const repositoryName = fetchRepositoriesResp.data[0].name;
      // Act
      const response = await client.getHooks({
        owner: currentUser,
        repository: repositoryName,
      });
      // Assert
      expect(response.status).toEqual(200);
    });
  });

  describe('findFileInRepository', () => {
    it('should return file', async () => {
      // Arrange
      const fetchCurrentUserResp = await client.fetchCurrentUser();
      const currentUser = fetchCurrentUserResp.data.login;
      const fetchRepositoriesResp = await client.fetchRepositories({
        owner: currentUser,
      });
      const repositoryName = fetchRepositoriesResp.data[0].name;
      // Act
      const response = await client.searchFiles({
        repo: repositoryName,
        username: currentUser,
        extension: 'json',
      });
      expect(response.status).toEqual(200);
    });
  });

  describe('fetchGithubFile', () => {
    it('should return file', async () => {
      // Arrange
      const fetchCurrentUserResp = await client.fetchCurrentUser();
      const currentUser = fetchCurrentUserResp.data.login;
      const fetchRepositoriesResp = await client.fetchRepositories({
        owner: currentUser,
      });
      const repositoryName = fetchRepositoriesResp.data[0].name;
      const { data: files } = await client.searchFiles({
        repo: repositoryName,
        username: currentUser,
        extension: 'json',
      });
      const file = files.items[0];
      if (!file) return;
      // Act
      const response = await client.fetchTextFromGithubFile({
        repo: repositoryName,
        owner: currentUser,
        path: file.path,
      });
      // Assert
      expect(typeof response).toEqual('string');
    });
  });
});
