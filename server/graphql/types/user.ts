import { gql } from 'apollo-server-express';
import User from '../../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Context } from 'config/apolloServer';

export const typeDefs = gql`
  extend type Query {
    currentUser: User
  }

  extend type Mutation {
    login(username: String!, password: String!): String
    logout: Boolean
    createUser: String
  }

  type User {
    id: Int!
    username: String!
    email: String!
  }
`;

export const resolvers = {
  Query: {
    currentUser: (parent, args, ctx, info) => {
      return ctx.user;
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
    login: async (parent, { username, passport }, ctx: Context) => {
      ctx.passport.authenticate('jwt', (req) => {
        console.log(req);
        return req.user;
      });
    },
    logout: async (parent, args, ctx: Context) => {
      ctx.logout();
    }
  },
  User: {
    id: ({ id }) => id,
    username: async ({ id }, _, ctx: Context) => {
      const user = await ctx.userLoader.load(id);
      if (!user) return null;
      return user.username;
    },
    email: async ({ id }, _, ctx: Context) => {
      const user = await ctx.userLoader.load(id);
      if (!user) return null;
      return user.email;
    }
  }
};
