import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from 'graphql/schema';
import { generateLoaders } from 'graphql/dataloaders';

export type Context = ReturnType<typeof generateLoaders>;

export default new ApolloServer({ typeDefs, resolvers, context: () => ({ ...generateLoaders() }) });
