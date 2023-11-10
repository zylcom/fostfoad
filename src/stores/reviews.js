import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useAuthUserStore } from "./authUser";
// import { useLoadingStore } from "./loading";

export const useReviewsStore = defineStore("Reviews", () => {
  const authUserStore = useAuthUserStore();
  // const loadingStore = useLoadingStore();
  const reviews = ref([]);
  const myReview = ref(null);
  const getReviews = computed(() => reviews);
  const getMyReview = computed(() => myReview);

  function setReviews(productReviews) {
    const authUser = computed(() => authUserStore.authUser);

    reviews.value = productReviews;
    myReview.value = null;

    if (!authUser.value) {
      return productReviews;
    }

    // Get current user review and remove from reviews list.
    reviews.value = productReviews.filter((reviewData) => {
      if (reviewData.user.username === authUser.value.username) {
        myReview.value = reviewData;
      }

      return reviewData.user.username !== authUser.value.username;
    });
  }

  return {
    reviews,
    myReview,
    getMyReview,
    getReviews,
    setReviews,
  };
});
