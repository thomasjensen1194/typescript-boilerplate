import { gql } from "apollo-boost";

export const LOGIN = gql`
  mutation Login($username: String, $password: String!, $email: String) {
    login(username: $username, password: $password, email: $email)
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email)
  }
`;
