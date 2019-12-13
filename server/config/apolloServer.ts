import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from 'graphql/schema';
import { generateLoaders } from 'graphql/dataloaders';
import jwt from 'jsonwebtoken';
import Express from 'express';
import User from 'models/userModel';
const secret = process.env.SECRET || '';

const getUserFromCookie = (req: Express.Request) => {
  const token = req.cookies?.user;

  if (token) {
    return jwt.verify(token, secret) as User;
  }

  // If no user is logged in, user is null
  return null;
};

const generateContext = (req: Express.Request, res: Express.Response) => ({
  ...generateLoaders(),
  user: getUserFromCookie(req),
  res
});

export type Context = ReturnType<typeof generateContext>;

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => generateContext(req, res)
});
