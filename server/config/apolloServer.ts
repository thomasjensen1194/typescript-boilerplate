import { ApolloServer } from 'apollo-server-express';
import schema from 'graphql/schema';

export default new ApolloServer({ schema });
