import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  __typename?: 'Query';
  repositories?: Maybe<Repositories>;
  repository?: Maybe<Repository>;
};


export type QueryRepositoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRepositoryArgs = {
  name: Scalars['String']['input'];
};

export type Repositories = {
  __typename?: 'Repositories';
  nodes?: Maybe<Array<Repository>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Repository = {
  __typename?: 'Repository';
  isPrivate: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  numberOfFiles: Scalars['Int']['output'];
  owner: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  webhooks?: Maybe<Array<Webhook>>;
  ymlContent?: Maybe<Scalars['String']['output']>;
  ymlFile?: Maybe<Scalars['String']['output']>;
  ymlFileContent?: Maybe<Scalars['String']['output']>;
};

export type Webhook = {
  __typename?: 'Webhook';
  url: Scalars['String']['output'];
};

export type RepositoriesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RepositoriesQuery = { __typename?: 'Query', repositories?: { __typename?: 'Repositories', totalCount?: number | null, nodes?: Array<{ __typename?: 'Repository', name: string, numberOfFiles: number, owner: string, size: number, ymlContent?: string | null, ymlFile?: string | null, ymlFileContent?: string | null, isPrivate: boolean, webhooks?: Array<{ __typename?: 'Webhook', url: string }> | null }> | null } | null };

export type RepositoryQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type RepositoryQuery = { __typename?: 'Query', repository?: { __typename?: 'Repository', name: string, numberOfFiles: number, owner: string, size: number, ymlContent?: string | null, ymlFile?: string | null, ymlFileContent?: string | null, isPrivate: boolean, webhooks?: Array<{ __typename?: 'Webhook', url: string }> | null } | null };


export const RepositoriesDocument = gql`
    query Repositories($limit: Int, $offset: Int) {
  repositories(limit: $limit, offset: $offset) {
    nodes {
      name
      numberOfFiles
      owner
      size
      ymlContent
      webhooks {
        url
      }
      ymlFile
      ymlFileContent
      isPrivate
    }
    totalCount
  }
}
    `;
export const RepositoryDocument = gql`
    query Repository($name: String!) {
  repository(name: $name) {
    name
    numberOfFiles
    owner
    size
    ymlContent
    webhooks {
      url
    }
    ymlFile
    ymlFileContent
    isPrivate
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Repositories(variables?: RepositoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RepositoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RepositoriesQuery>(RepositoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Repositories', 'query');
    },
    Repository(variables: RepositoryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RepositoryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RepositoryQuery>(RepositoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Repository', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;