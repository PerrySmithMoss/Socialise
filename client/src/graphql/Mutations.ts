import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
    ) {
      firstName
      lastName
      email
      username
      password
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $username: String!, $oldPassword: String!, $newPassword: String!
    ) {
    updatePassword(
      username: $userName, oldPassword: $oldPassword, newPassword: $newPassword
      ) {
        message
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      message
    }
  }
`;
