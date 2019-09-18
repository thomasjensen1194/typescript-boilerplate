import { gql } from 'apollo-server-express';
import User from '../../models/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const typeDefs = gql`
  extend type Query {
    user(id: Int): User
  }

  extend type Mutation {
    createUser(username: String!, password: String!, email: String!): String
    login(username: String, password: String!, email: String): String
  }

  type User {
    id: Int!
    username: String!
    password: String!
    email: String!
  }
`;

export const resolvers = {
  Query: {
    user: (obj, { id }, ctx, info) => {
      return User.query().findById(id);
    }
  },

  Mutation: {
    createUser: async (obj, { username, password, email }, ctx, info) => {
      const user = new User();
      const saltedPassword = await bcrypt.hash(password, 10);

      user.username = username;
      user.password = saltedPassword;
      user.email = email;

      const newUser = await User.query().insert(user);

      return jwt.sign(
        { username: newUser.username, id: newUser.id, email: newUser.email },
        process.env.SECRET || ''
      );
    },
    login: async (obj, { username, password, email }, ctx, info) => {
      if (!password || (!username && !email))
        throw new Error('You must provide username/email and password');
      let user;
      if (username) user = await User.query().findOne({ username: username });
      if (email) user = await User.query().findOne({ email: email });
      if (!user) throw new Error('Incorrect username or password');

      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        return jwt.sign(
          { username: user.username, id: user.id, email: user.email },
          process.env.SECRET || ''
        );
      } else {
        throw new Error('Incorrect username or password');
      }
    }
  }
};
