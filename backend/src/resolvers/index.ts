import { Resolvers } from '../generated/graphql';
import { GithubService } from '../services';

const repositoryService = new GithubService();

export const resolvers: Resolvers = {
  Query: {
    repositories: async (_: any, { limit, offset }) => repositoryService.fetchRepositories(limit, offset),
    repository: async (_: any, { name }: any) => repositoryService.fetchRepository(name),
  },
};
