import { gql } from 'apollo-server-express';
import { typeDefs as User, resolvers as UserResolvers } from './types/user';

const Query = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const rootResolver = {};

export const typeDefs = [Query, User];
export const resolvers = [rootResolver, UserResolvers];
