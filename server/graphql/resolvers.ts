import User from "../objection/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { secret } = require("../config/index");

const resolvers = {
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
        secret
      );
    },
    login: async (obj, { username, password, email }, ctx, info) => {
      if (!password || (!username && !email))
        throw new Error("You must provide username/email and password");
      let user;
      if (username) user = await User.query().findOne({ username: username });
      if (email) user = await User.query().findOne({ email: email });
      if (!user) throw new Error("User not found");

      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        return jwt.sign(
          { username: user.username, id: user.id, email: user.email },
          secret
        );
      } else {
        throw new Error("Incorrect username or password");
      }
    }
  }
};

export default resolvers;
