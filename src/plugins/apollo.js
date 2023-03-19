import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { getAccessToken } from "../utils";

const httpLink = createHttpLink({ uri: "http://localhost:4000" });
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = getAccessToken();
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
});

export default apolloClient;
