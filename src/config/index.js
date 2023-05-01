import gql from "graphql-tag";

const CREATE_REVIEW_QUERY = gql`
  mutation CreateReview($productId: Int!, $description: String, $rating: Int!) {
    createReview(
      productId: $productId
      description: $description
      rating: $rating
    ) {
      __typename
      ... on Review {
        id
        description
        rating
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
const UPDATE_REVIEW_QUERY = gql`
  mutation UpdateReview($productId: Int!, $description: String, $rating: Int!) {
    updateReview(
      productId: $productId
      description: $description
      rating: $rating
    ) {
      __typename
      ... on Review {
        id
        description
        rating
        user {
          id
          name
          avatar
        }
        updatedAt
      }
      ... on FailUpdateReview {
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
const GET_BEST_RATED_PRODUCTS_QUERY = gql`
  query GetBestRatedProducts($category: String) {
    getBestRatedProducts(category: $category) {
      __typename
      ... on BestRatedProductList {
        products {
          id
          name
          slug
          price
          averageRating
          likesCount
        }
      }
      ... on ProductError {
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
          rating
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
    $confirmationPassword: String!
    $countryCode: String!
  ) {
    registerUser(
      name: $name
      email: $email
      phoneNumber: $phoneNumber
      password: $password
      confirmationPassword: $confirmationPassword
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
const GET_MY_CART_QUERY = gql`
  query GetMyCart {
    getMyCart {
      __typename
      ... on Cart {
        id
        totalPrice
        cartItems {
          id
          quantity
          product {
            id
            name
            slug
            price
          }
        }
      }
      ... on CartError {
        message
      }
    }
  }
`;
const UPDATE_MY_CART_QUERY = gql`
  mutation UpdateMyCart($productId: Int!, $quantity: Int!) {
    updateMyCart(productId: $productId, quantity: $quantity) {
      __typename
      ... on Cart {
        id
        totalPrice
        cartItems {
          id
          quantity
          product {
            id
            name
            slug
            price
          }
        }
      }
      ... on CartError {
        message
      }
    }
  }
`;
const DELETE_CART_ITEM_BY_ID_QUERY = gql`
  mutation DeleteCartItemById($cartItemId: Int!) {
    deleteCartItemById(cartItemId: $cartItemId) {
      __typename
      ... on Cart {
        id
        totalPrice
        cartItems {
          id
          quantity
          product {
            id
            name
            slug
            price
          }
        }
      }
      ... on CartError {
        message
      }
    }
  }
`;

export {
  CREATE_REVIEW_QUERY,
  DELETE_CART_ITEM_BY_ID_QUERY,
  GET_MY_CART_QUERY,
  GET_MY_PROFILE_QUERY,
  GET_BEST_RATED_PRODUCTS_QUERY,
  GET_PRODUCT_QUERY,
  LIKE_PRODUCT_QUERY,
  LOGIN_QUERY,
  NEUTRALIZE_LIKE_PRODUCT_QUERY,
  REGISTER_USER_QUERY,
  UPDATE_MY_CART_QUERY,
  UPDATE_REVIEW_QUERY,
};
