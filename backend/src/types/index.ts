export interface IRepository {
  isPrivate: boolean;
  name: string;
  numberOfFiles?: number;
  owner: string;
  size?: number;
  ymlContent?: string;
  ymlFile?: string;
  webhooks?: { url: string }[];
}

export interface IRepositories {
  nodes: IRepository[];
  totalCount: number;
}
