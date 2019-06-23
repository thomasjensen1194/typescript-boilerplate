import { getRepository } from "typeorm";
import User from "../typeORM/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { secret } = require("../config/index");

const resolvers = {
  Query: {
    user: (obj, { id }, ctx, info) => {
      return getRepository(User).findOne(id);
    }
  },

  Mutation: {
    createUser: async (obj, { username, password, email }, cts, info) => {
      const user = new User();
      const saltedPassword = await bcrypt.hash(password, 10);

      user.username = username;
      user.password = saltedPassword;
      user.email = email;

      const newUser = await getRepository(User).save(user);

      console.log(newUser);

      return jwt.sign(newUser, secret);
    }
  }
};

export default resolvers;
