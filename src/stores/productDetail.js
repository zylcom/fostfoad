import { defineStore } from "pinia";
import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { useLoadingStore } from "./loading";
import { GET_PRODUCT_QUERY } from "../config";
import { useReviewsStore } from "./reviews";

export const useProductDetailStore = defineStore("Product Detail", () => {
  const loadingStore = useLoadingStore();
  const reviewsStore = useReviewsStore();
  const product = ref(null);

  function fetchProductDetail(slug) {
    loadingStore.showLoading();
    product.value = null;

    const { onError, onResult } = useQuery(GET_PRODUCT_QUERY, {
      slug,
    });

    onResult((queryResult) => {
      if (queryResult.data.getProduct.__typename === "Product") {
        reviewsStore.setReviews(queryResult.data.getProduct.reviews);
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
