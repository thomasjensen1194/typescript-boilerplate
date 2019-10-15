import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from 'graphql/schema';
import { generateLoaders } from 'graphql/dataloaders';
import Passport from 'passport';

export type Context = ReturnType<typeof generateLoaders> & {
  logout: Function;
  passport: typeof Passport;
};

module.exports = (passport: typeof Passport) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      ...generateLoaders(),
      user: req.user,
      logout: () => req.logout(),
      passport
    })
  });
