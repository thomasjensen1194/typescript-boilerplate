import Apollo from './Apollo';
import { gql } from 'apollo-boost';
import { store } from 'index';
import authReducer from 'redux/reducers/auth';
import jwtDecode from 'jwt-decode';

interface User {
  id: string;
  username: string;
  email: string;
}

interface UserInput {
  username: string;
  password: string;
  email: string;
}

class User {
  static decode = (token: string): User => {
    return jwtDecode(token);
  };

  /**
   * Logges in a user, returns a JWT-token as cookie and as string
   */
  static login = async (data: UserInput) => {
    const mutation = gql`
      mutation($data: UserInput) {
        login(data: $data)
      }
    `;

    const token = await Apollo.mutate<string>('login', mutation, { data }); // JWT-Token
    const user = User.decode(token);
    await store.dispatch(authReducer.actions.login(user));
  };

  /**
   * Creates user, and logges the user in. Returns a JWT-token as cookie and as string.
   */
  static createUser = async (data: UserInput) => {
    const mutation = gql`
      mutation createUser($data: UserInput) {
        createUser(data: $data)
      }
    `;
    const token = await Apollo.mutate<string>('createUser', mutation, { data }); // JWT-Token
    const user = User.decode(token);

    await store.dispatch(authReducer.actions.login(user));
  };

  /**
   * Logges a user out, by deleting the cookie, and removing from redux
   */
  static logout = async () => {
    const mutation = gql`
      mutation {
        logout
      }
    `;

    await Apollo.mutate<string>('logout', mutation);
    await store.dispatch(authReducer.actions.logout());
  };
}

export default User;
