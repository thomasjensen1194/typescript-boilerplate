import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    user(id: Int): User
  }

  type Mutation {
    createUser(username: String!, password: String!, email: String): User
  }

  type User {
    id: Int!
    username: String!
    password: String!
    email: String
  }
`;

export default typeDefs;
