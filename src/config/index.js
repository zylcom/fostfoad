import gql from "graphql-tag";

const BASE_URL = "http://localhost:4000";
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
        updatedAt
      }
      ... on FailCreateReview {
        message
      }
    }
  }
`;
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
        likedBy
        reviews {
          id
          description
          rate
          user {
            id
            name
            avatar
          }
          updatedAt
        }
      }
    }
  }
`;
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
const LIKE_PRODUCT_QUERY = gql`
  mutation LikeProduct($productId: Int!) {
    likeProduct(productId: $productId) {
      ... on Like {
        id
        productId
        userId
        updatedAt
      }
      ... on FailLikeProduct {
        message
      }
    }
  }
`;
const NEUTRALIZE_LIKE_PRODUCT_QUERY = gql`
  mutation NeutralizeLikeProduct($productId: Int!) {
    neutralizeLikeProduct(productId: $productId) {
      ... on Like {
        id
        productId
        userId
        updatedAt
      }
      ... on FailNeutralizeLikeProduct {
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
export {
  BASE_URL,
  CREATE_REVIEW_QUERY,
  GET_MY_PROFILE_QUERY,
  GET_PRODUCT_QUERY,
  LIKE_PRODUCT_QUERY,
  LOGIN_QUERY,
  NEUTRALIZE_LIKE_PRODUCT_QUERY,
  REGISTER_USER_QUERY,
};
