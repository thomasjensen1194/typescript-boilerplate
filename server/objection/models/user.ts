import { Model } from "objection";

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  email: string;
}

class User extends Model {
  static tableName = "user";
}

export default User;
