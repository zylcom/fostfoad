import apolloClient from "../plugins/apollo";
import gql from "graphql-tag";
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { provideApolloClient, useQuery } from "@vue/apollo-composable";

provideApolloClient(apolloClient);

export const useProductStore = defineStore("Products", () => {
  const products = ref([]);
  const product = ref({});
  const tags = ref([]);
  const hasNextPage = ref(false);
  const endCursor = ref(0);
  const isLoading = ref(true);
  const hasError = ref(null);
  const getProducts = computed(() => products);
  const getProduct = computed(() => product);
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
        }
      }
    }
  `;

  /**
   * Get product list depend on product category or tag or keyword
   * @param {string} category product category
   * @param {string} tag product tag
   * @param {string} keyword search keyword
   */
  function fetchFilteredProducts(category = "", tag = "", keyword = "") {
    hasError.value = null;
    isLoading.value = true;

    const { loading, error, onResult } = useQuery(GET_PRODUCTS_QUERY, {
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
      isLoading.value = loading.value;
    });

    setTimeout(() => {
      if (error.value) {
        hasError.value = error.value;
      }
    }, 10000);
  }

  /**
   * Get product tag list depend on product category
   * @param {string} category product category
   */
  function fetchProductTagsByCategory(category) {
    const { onResult } = useQuery(
      gql`
        query GetTagsByCategory($category: String!) {
          getTagsByCategory(category: $category) {
            ... on TagList {
              tags {
                id
                name
                slug
              }
            }
          }
        }
      `,
      { category }
    );

    onResult((queryResult) => {
      tags.value = queryResult.data.getTagsByCategory.tags;
    });
  }

  /**
   * Get product by slug
   * @param {string} slug slug of product
   */
  function fetchProductBySlug(slug) {
    hasError.value = null;
    isLoading.value = true;

    const { error, loading, onResult } = useQuery(GET_PRODUCT_QUERY, { slug });

    onResult((queryResult) => {
      product.value = queryResult.data?.getProduct || {};
      isLoading.value = loading.value;
    });

    setTimeout(() => {
      if (error.value) {
        hasError.value = error.value;
      }
    }, 10000);
  }

  /**
   * Fetch more data and merge to previous data
   * @param {array} previousData previous product data
   * @param {object} variables variables for fetching data
   */
  function fetchMore(previousData, { category, tag, keyword, cursor }) {
    hasError.value = null;
    isLoading.value = true;

    const { error, loading, onResult } = useQuery(GET_PRODUCTS_QUERY, {
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
      isLoading.value = loading.value;
    });

    setTimeout(() => {
      if (error.value) {
        hasError.value = error.value;
      }
    }, 10000);
  }

  return {
    endCursor,
    getProducts,
    hasNextPage,
    products,
    tags,
    hasError,
    isLoading,
    getProduct,
    fetchFilteredProducts,
    fetchProductTagsByCategory,
    fetchProductBySlug,
    fetchMore,
  };
});
