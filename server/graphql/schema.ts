import { gql, makeExecutableSchema } from "apollo-server-express";
import { merge } from "lodash";
import { typeDefs as User, resolvers as UserResolvers } from "./types/user";

const Query = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const resolvers = {};

export default makeExecutableSchema({
  typeDefs: [Query, User],
  resolvers: merge(resolvers, UserResolvers)
});
