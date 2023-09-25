import { readFileSync } from 'fs';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { resolvers } from './resolvers';

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

interface MyContext {
  token?: string;
}

const server = new ApolloServer<MyContext>({ typeDefs, resolvers });
startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
