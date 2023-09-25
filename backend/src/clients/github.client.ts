import { Endpoints } from '@octokit/types';
import fetch from 'cross-fetch';
import { Octokit } from 'octokit';

type listUserReposResponse = Endpoints['GET /users/{username}/repos']['response'];

export class GithubClient {
  octokit: Octokit;

  constructor({ octokit }: { octokit: Octokit }) {
    this.octokit = octokit;
  }

  async fetchCurrentUser() {
    return await this.octokit.request('GET /user');
  }

  async fetchRepositories({ owner }: { owner: string }): Promise<listUserReposResponse> {
    return await this.octokit.request(`GET /users/{username}/repos`, {
      username: owner,
    });
  }

  async getHooks({ owner, repository }: { owner: string; repository: string }) {
    return await this.octokit.request('GET /repos/{owner}/{repo}/hooks', {
      owner,
      repo: repository,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }

  async searchFiles({ extension, username, repo }: { extension?: string; repo: string; username: string }) {
    try {
      let q = `repo:${username}/${repo}`;
      if (extension !== undefined) {
        q += `+extension:${extension}`;
      }
      q += `+per_page:1`;

      return await this.octokit.request('GET /search/code', {
        q,
        // headers: {
        //   'X-GitHub-Api-Version': '2022-11-28'
        // }
      });
    } catch (error) {
      console.error('Error searching for files:', error);
      throw error;
    }
  }

  async fetchTextFromGithubFile({ owner, repo, path }: { owner: string; repo: string; path: string }) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const response = await fetch(url);
    if (response.status === 200) {
      const dataString = await response.text();
      const dataObject = JSON.parse(dataString);
      const { content } = dataObject;
      // eslint-disable-next-line no-buffer-constructor
      const buff = new Buffer(content, 'base64');

      return buff.toString('ascii');
    }
    throw new Error(`Error fetching file, response status: ${response.status}`);
  }
}
