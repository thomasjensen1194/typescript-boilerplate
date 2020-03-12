import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from 'graphql/schema';
import { generateLoaders } from 'graphql/dataloaders';
import jwt from 'jsonwebtoken';
import Express from 'express';
import User from 'models/userModel';
const secret = process.env.SECRET || '';

const getUserFromCookie = (req: Express.Request, res: Express.Response) => {
  const token = req.cookies?.user;

  if (token) {
    try {
      return jwt.verify(token, secret) as User;
    } catch (error) {
      res.cookie('user', {}, { expires: new Date(0) });
      return null;
    }
  }

  // If no user is logged in, user is null
  return null;
};

const generateContext = (req: Express.Request, res: Express.Response) => ({
  ...generateLoaders(),
  user: getUserFromCookie(req, res),
  res,
  req
});

export type Context = ReturnType<typeof generateContext>;

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => generateContext(req, res)
});
