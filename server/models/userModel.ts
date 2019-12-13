import { Model } from 'objection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const secret = process.env.SECRET || '';

interface User {
  userId: number;
  username: string;
  password: string;
  role: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

class User extends Model {
  static tableName = 'users';
  static idColumn = 'userId';

  $beforeInsert() {
    this.createdAt = new Date();
    this.password = bcrypt.hashSync(this.password, 10);
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }

  static async login(username: string, email: string) {
    let user: User | undefined;
    if (username) user = await User.query().findOne({ username: username });
    if (email) user = await User.query().findOne({ email: email });
    if (!user) throw new Error('Incorrect username or password');

    return user;
  }

  verify(password: string) {
    return bcrypt.compare(password, this.password);
  }

  signToken() {
    const { userId, username, email } = this;

    return jwt.sign({ userId, username, email }, secret);
  }
}

export default User;
