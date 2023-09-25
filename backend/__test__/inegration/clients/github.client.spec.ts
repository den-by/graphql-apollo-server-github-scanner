import * as process from 'process';

import { Octokit } from 'octokit';
import fetch from 'cross-fetch';

import { GithubClient } from '../../../src/clients/github.client';

describe('GithubClient', () => {
  let octokit: Octokit;
  let client: GithubClient;

  beforeEach(() => {
    const auth = process.env.GITHUB_TOKEN;
    octokit = new Octokit({
      auth,
      request: {
        fetch,
      },
    });
    client = new GithubClient({ octokit });
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
    describe('positive cases', () => {
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
    describe('negative cases', () => {
      it('should throw error', async () => {
        // Arrange
        // Act
        const response = client.searchFiles({
          repo: 'fake-repo',
          username: 'fake-user',
          extension: '',
        });
        // Assert
        await expect(response).rejects.toThrow();
      });
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
