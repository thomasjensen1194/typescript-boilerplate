import { gql } from 'apollo-server-express';
import User from '../../models/userModel';
import { Context } from 'config/apolloServer';

export const typeDefs = gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
    createUser(data: UserInput): String
    login(data: UserInput): String
    logout: String
  }

  type User {
    id: Int!
    username: String!
    email: String!
  }

  input UserInput {
    username: String!
    password: String!
    email: String!
  }
`;

export const resolvers = {
  Query: {
    me: (obj, args, ctx: Context, info) => {
      const user = ctx.user;
      if (!user) return null;

      return User.query().findById(user.userId);
    }
  },

  Mutation: {
    createUser: async (obj, { data }, ctx: Context, info) => {
      const newUser = await User.query().insertAndFetch(data);

      const token = newUser.signToken();
      ctx.res.cookie('user', token);
      return token;
    },
    login: async (obj, { data }, ctx: Context, info) => {
      const { username, password, email } = data;
      if (!password || (!username && !email))
        throw new Error('You must provide username/email and password');

      const user = await User.login(username, email);
      const isValid = await user.verify(password);

      if (isValid) {
        const token = user.signToken();
        ctx.res.cookie('user', token);
        return token;
      } else {
        throw new Error('Incorrect username or password');
      }
    },
    logout: (root, args, ctx: Context) => {
      ctx.res.cookie('user', {}, { expires: new Date(0) });
      return 'Logged out';
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
