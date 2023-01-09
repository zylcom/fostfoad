import gql from "graphql-tag";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { useLoadingStore } from "./loading";

export const useProductDetailStore = defineStore("Product Detail", () => {
  const loadingStore = useLoadingStore();
  const product = ref(null);
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

  function fetchProductDetail(slug) {
    loadingStore.showLoading();
    product.value = null;

    const { onError, onResult } = useQuery(GET_PRODUCT_QUERY, { slug });

    onResult((queryResult) => {
      if (queryResult.data.getProduct.__typename === "Product") {
        product.value = queryResult.data.getProduct;
      }

      loadingStore.hideLoading();
    });

    onError(({ networkError }) => {
      if (networkError) {
        alert(networkError.message);
      }

      loadingStore.hideLoading();
    });
  }

  return { product, fetchProductDetail };
});
