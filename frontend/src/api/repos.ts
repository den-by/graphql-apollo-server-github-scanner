import { getSdk } from "../generated/graphql.ts";
import { GraphQLClient } from "graphql-request";

export interface IRepo {
  id: string
  repoName: string
  repoSize: string
  repoOwner: string
}

export interface IReposList {
  repositories: IRepo[]
  totalItems: number
  itemsPerPage: number
}

export interface ISelectedRepo {
  id: string
  repoName: string
  repoOwner: string
  isPrivate: boolean
  numberOfFiles: number
  fileContent: string
}

const client: GraphQLClient = new GraphQLClient('http://localhost:4000/graphql')
const sdk = getSdk(client)

export const getReposList = async (pageNumber: number): Promise<IReposList> => {
  const reps = await sdk.Repositories({ limit: 4, offset: (pageNumber - 1) * 4});
  return {
    repositories: reps.repositories?.nodes?.map((repo): IRepo => {
      return {
        id: repo?.name || '',
        repoName: repo?.name || '',
        repoSize: (repo?.size ?? 0).toString(),
        repoOwner: repo?.owner || '',
      }
    }) || [],
    totalItems: reps.repositories?.totalCount || 0,
    itemsPerPage: 4
  };
}

export const getRepo = async (id: string): Promise<ISelectedRepo> => {
  const repo = await sdk.Repository({ name: id });
  return {
    id: repo.repository?.name || '',
    repoName: repo.repository?.name || '',
    repoOwner: repo.repository?.owner || '',
    isPrivate: repo.repository?.isPrivate || false,
    numberOfFiles: repo.repository?.numberOfFiles || 0,
    fileContent: repo.repository?.ymlContent || '',
  }
}
