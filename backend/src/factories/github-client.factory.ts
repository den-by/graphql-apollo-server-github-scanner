import fetch from 'cross-fetch';
import { Octokit } from 'octokit';

import { GithubClient } from '../clients/github.client';
import { asyncMethodDecorator } from '../decorators/async-method.decorator';
import { QueueHelper } from '../helpers/queue.helper';
import { retryHelper } from '../helpers/retry.helper';

export class GithubClientFactory {
  static buildDecoratedClient({ githubToken, concurrency }: { githubToken: string; concurrency: number }) {
    return new GithubClientFactory({ githubToken }).retryWhenRateLimit().limitConcurrency(concurrency).build();
  }

  githubClient: GithubClient;

  constructor({ githubToken }: { githubToken: string }) {
    const octokit = new Octokit({
      auth: githubToken,
      request: {
        fetch,
      },
    });
    this.githubClient = new GithubClient({
      octokit,
    });
  }

  limitConcurrency(concurrency: number) {
    const queueHelper = new QueueHelper({ concurrency });

    async function queryFunction(task: Function) {
      return queueHelper.addTask(() => task());
    }
    this.githubClient = asyncMethodDecorator(this.githubClient, queryFunction);

    return this;
  }

  retryWhenRateLimit() {
    async function queryFunction(task: Function) {
      return retryHelper(() => task());
    }
    this.githubClient = asyncMethodDecorator(this.githubClient, queryFunction);

    return this;
  }

  build() {
    return this.githubClient;
  }
}
