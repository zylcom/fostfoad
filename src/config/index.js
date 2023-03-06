import gql from "graphql-tag";

const BASE_URL = "http://localhost:4000";
const GET_MY_PROFILE_QUERY = `
  query GetMyProfile {
    getMyProfile {
      __typename
      ... on User {
        id
        name
        email
        phoneNumber
        avatar
        createdAt
      }
      ... on UserError {
        message
      }
    }
  }`;
const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      __typename
      ... on UserAuth {
        data {
          id
          name
          email
          phoneNumber
          avatar
          createdAt
        }
        token
      }

      ... on AuthFailed {
        message
      }
    }
  }
`;
const REGISTER_USER_QUERY = gql`
  mutation Register(
    $name: String!
    $email: String!
    $phoneNumber: String!
    $password: String!
    $countryCode: String!
  ) {
    registerUser(
      name: $name
      email: $email
      phoneNumber: $phoneNumber
      password: $password
      countryCode: $countryCode
    ) {
      __typename
      ... on UserAuth {
        data {
          id
          name
          email
          phoneNumber
          avatar
          createdAt
        }
        token
      }
      ... on CreateUserFailed {
        message
      }
    }
  }
`;
export { BASE_URL, GET_MY_PROFILE_QUERY, LOGIN_QUERY, REGISTER_USER_QUERY };
