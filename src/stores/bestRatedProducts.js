import { useQuery } from "@vue/apollo-composable";
import { defineStore } from "pinia";
import { ref } from "vue";
import { GET_BEST_RATED_PRODUCTS_QUERY } from "../config";
import { useLoadingStore } from "./loading";

export const useBestRatedProductsStore = defineStore(
  "Best Rated Products",
  () => {
    const loadingStore = useLoadingStore();
    const bestRatedFoods = ref([]);
    const bestRatedDrinks = ref([]);

    function fetchBestRatedProducts(category) {
      loadingStore.showLoading();

      const { onResult, onError } = useQuery(
        GET_BEST_RATED_PRODUCTS_QUERY,
        {
          category,
        },
        { fetchPolicy: "no-cache" }
      );

      onResult((queryResult) => {
        if (
          queryResult.data.getBestRatedProducts.__typename ===
          "BestRatedProductList"
        ) {
          if (category === "food") {
            bestRatedFoods.value =
              queryResult.data.getBestRatedProducts.products;
          } else if (category === "drink") {
            bestRatedDrinks.value =
              queryResult.data.getBestRatedProducts.products;
          }
        } else {
          alert(queryResult.data.getBestRatedProducts.message);
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

    return { bestRatedFoods, bestRatedDrinks, fetchBestRatedProducts };
  }
);
