import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useReviewsStore } from "./reviews";

export const useProductDetailStore = defineStore("Product Detail", () => {
  const reviewsStore = useReviewsStore();
  const product = ref(null);
  const getProduct = computed(() => product.value);

  function setData(data) {
    product.value = data;
    reviewsStore.setReviews(data.reviews);
  }

  return {
    product,
    getProduct,
    setData,
  };
});
