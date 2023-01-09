import apolloClient from "../plugins/apollo";
import gql from "graphql-tag";
import { ref } from "vue";
import { defineStore } from "pinia";
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import { useLoadingStore } from "./loading";

provideApolloClient(apolloClient);

export const useProductsStore = defineStore("Products", () => {
  const loadingStore = useLoadingStore();
  const products = ref([]);
  const hasNextPage = ref(false);
  const endCursor = ref(0);
  const take = 10;
  const GET_PRODUCTS_QUERY = gql`
    query GetFilteredProducts(
      $take: Int
      $category: String!
      $tag: String
      $cursor: Cursor
      $keyword: String
    ) {
      getFilteredProducts(
        take: $take
        category: $category
        tag: $tag
        cursor: $cursor
        keyword: $keyword
      ) {
        ... on ProductList {
          edges {
            node {
              id
              name
              slug
              price
            }
            cursor
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `;

  /**
   * Get product list depend on product category or tag or keyword
   * @param {object} variables
   */
  function fetchFilteredProducts({ category = "", tag = "", keyword = "" }) {
    loadingStore.showLoading();

    const { onError, onResult } = useQuery(GET_PRODUCTS_QUERY, {
      take,
      category,
      tag,
      keyword,
    });

    onResult((queryResult) => {
      products.value =
        queryResult.data.getFilteredProducts.__typename === "ProductNotFound"
          ? []
          : queryResult.data.getFilteredProducts.edges;
      hasNextPage.value =
        queryResult.data.getFilteredProducts.pageInfo?.hasNextPage || false;
      endCursor.value =
        +queryResult.data.getFilteredProducts.pageInfo?.endCursor || 0;
      loadingStore.hideLoading();
    });

    onError(({ networkError }) => {
      if (networkError) {
        alert(networkError.message);
      }

      loadingStore.hideLoading();
    });
  }

  /**
   * Fetch more data and merge to previous data
   * @param {array} previousData previous product data
   * @param {object} variables variables for fetching data
   */
  function fetchMore(previousData, { category, tag, keyword, cursor }) {
    loadingStore.showLoading();

    const { onError, onResult } = useQuery(GET_PRODUCTS_QUERY, {
      take,
      category,
      tag,
      keyword,
      cursor,
    });

    onResult((queryResult) => {
      queryResult.data.getFilteredProducts.__typename !== "ProductNotFound"
        ? (products.value = [
            ...previousData,
            ...queryResult.data.getFilteredProducts.edges,
          ])
        : (products.value = previousData);
      hasNextPage.value =
        queryResult.data.getFilteredProducts.pageInfo?.hasNextPage || false;
      endCursor.value =
        +queryResult.data.getFilteredProducts.pageInfo?.endCursor || 0;
      loadingStore.hideLoading();
    });

    onError(({ networkError }) => {
      if (networkError) {
        alert(networkError.message);
      }

      loadingStore.hideLoading();
    });
  }

  return {
    endCursor,
    hasNextPage,
    products,
    fetchFilteredProducts,
    fetchMore,
  };
});
