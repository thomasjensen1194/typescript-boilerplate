import Apollo from './Apollo';
import { gql } from 'apollo-boost';
import { store } from 'index';
import authReducer from 'redux/reducers/auth';
import { User as UserType, UserInput } from 'types/generated';

interface User extends UserType {}

class User {
  /**
   * Fetches the user object based on the stored cookie. Cookie can be placed by login or user creation.
   */
  static fetch = async () => {
    const query = gql`
      query {
        user {
          id
          username
          email
        }
      }
    `;

    const user = await Apollo.query<User>('user', query);
    store.dispatch(authReducer.actions.login(user));
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

    await Apollo.mutate<string>('login', mutation, { data }); // JWT-Token
    await User.fetch();
  };

  /**
   * Creates user, and logges the user in. Returns a JWT-token as cookie and as string.
   */
  static createUser = async (data: UserInput) => {
    const mutation = gql`
      mutation($data: UserInput) {
        createUser(data: $data)
      }
    `;
    await Apollo.mutate<string>('createUser', mutation, { data }); // JWT-Token
    await User.fetch();
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
    store.dispatch(authReducer.actions.logout());
  };
}

export default User;
