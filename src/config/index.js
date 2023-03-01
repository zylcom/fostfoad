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

export { BASE_URL, GET_MY_PROFILE_QUERY, LOGIN_QUERY };
