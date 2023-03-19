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
const GET_PRODUCT_QUERY = gql`
  query GetProduct($slug: String!) {
    getProduct(slug: $slug) {
      ... on Product {
        id
        name
        slug
        price
        image
        ingredients
        averageRating
        reviews {
          id
          description
          rate
          user {
            id
            name
            avatar
          }
          createdAt
        }
      }
    }
  }
`;
const CREATE_REVIEW_QUERY = gql`
  mutation CreateReview(
    $productId: Int!
    $userId: Int!
    $description: String
    $rate: Int!
  ) {
    createReview(
      productId: $productId
      userId: $userId
      description: $description
      rate: $rate
    ) {
      __typename
      ... on Review {
        id
        description
        rate
        user {
          id
          name
          avatar
        }
        createdAt
      }
      ... on FailCreateReview {
        message
      }
    }
  }
`;
export {
  BASE_URL,
  GET_MY_PROFILE_QUERY,
  GET_PRODUCT_QUERY,
  LOGIN_QUERY,
  REGISTER_USER_QUERY,
  CREATE_REVIEW_QUERY,
};
