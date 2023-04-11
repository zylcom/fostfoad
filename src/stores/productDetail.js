import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useLoadingStore } from "./loading";
import {
  GET_PRODUCT_QUERY,
  LIKE_PRODUCT_QUERY,
  NEUTRALIZE_LIKE_PRODUCT_QUERY,
} from "../config";
import { useReviewsStore } from "./reviews";
import apolloClient from "../plugins/apollo";

export const useProductDetailStore = defineStore("Product Detail", () => {
  const loadingStore = useLoadingStore();
  const reviewsStore = useReviewsStore();
  const product = ref(null);
  const productSlug = ref(null);
  const getProduct = computed(() => product);

  function fetchProductDetail(slug) {
    loadingStore.showLoading();
    product.value = null;
    productSlug.value = slug;

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

  function likeProduct(productId) {
    loadingStore.showLoading();

    const { mutate, onDone, onError } = useMutation(LIKE_PRODUCT_QUERY);

    mutate({ productId });

    onDone((mutateResult) => {
      if (mutateResult.data.likeProduct.__typename === "Like") {
        apolloClient.cache.updateQuery(
          {
            query: GET_PRODUCT_QUERY,
            variables: { slug: productSlug.value },
          },
          (data) => {
            const newData = {
              getProduct: {
                ...data.getProduct,
                likedBy: [
                  ...data.getProduct.likedBy,
                  mutateResult.data.likeProduct.userId,
                ],
              },
            };
            return newData;
          }
        );
      } else if (mutateResult.data.likeProduct.message === "jwt expired") {
        alert("Your session has ended. You must login again.");

        window.location.replace("/login");
      } else {
        alert("Something went wrong. Refresh your browser and try again!");
      }
    });

    onError(({ networkError }) => {
      if (networkError) {
        alert(networkError.message);
      }

      loadingStore.hideLoading();
    });
  }

  function neutralizeLikeProduct(productId) {
    loadingStore.showLoading();

    const { mutate, onDone, onError } = useMutation(
      NEUTRALIZE_LIKE_PRODUCT_QUERY
    );

    mutate({ productId });

    onDone((mutateResult) => {
      if (mutateResult.data.neutralizeLikeProduct.__typename === "Like") {
        apolloClient.cache.updateQuery(
          {
            query: GET_PRODUCT_QUERY,
            variables: { slug: productSlug.value },
          },
          (data) => {
            const newData = {
              getProduct: {
                ...data.getProduct,
                likedBy: data.getProduct.likedBy.filter(
                  (like) =>
                    like !== mutateResult.data.neutralizeLikeProduct.userId
                ),
              },
            };
            return newData;
          }
        );
      } else if (
        mutateResult.data.neutralizeLikeProduct.message === "jwt expired"
      ) {
        alert("Your session has ended. You must login again.");

        window.location.replace("/login");
      } else {
        alert("Something went wrong. Refresh your browser and try again!");
      }
    });

    onError(({ networkError }) => {
      if (networkError) {
        alert(networkError.message);
      }

      loadingStore.hideLoading();
    });
  }

  return {
    product,
    getProduct,
    fetchProductDetail,
    likeProduct,
    neutralizeLikeProduct,
  };
});
