<script setup>
import { useToast } from "vue-toast-notification";
import MyReviewCard from "./MyReviewCard.vue";
import ReviewList from "./ReviewList.vue";
import ReviewInputForm from "./ReviewInputForm.vue";
import reviewService from "../services/review-service";
import { allStore } from "../stores";

defineProps({
  reviewsLength: Number,
});

const $toast = useToast();
const { authUserStore, reviewsStore } = allStore();

async function createReviewHandler({ description, rating, productSlug }) {
  try {
    await reviewService.create({
      description,
      rating,
      productSlug,
    });

    $toast.success("Create new review successfully", { position: "bottom" });
  } catch (error) {
    $toast.error("Something went wrong!", { position: "bottom" });
  }
}
</script>

<template>
  <div class="relative z-10 bg-zhen-zhu-bai-pearl">
    <MyReviewCard v-if="reviewsStore.myReview" />

    <h4 class="pb-3 font-bold text-dark-tone-ink">
      All Reviews ({{ reviewsLength }})
    </h4>

    <ReviewList :reviews="reviewsStore.reviews" />

    <ReviewInputForm
      :sendReview="createReviewHandler"
      v-if="authUserStore.authUser && !reviewsStore.myReview"
    />
  </div>
</template>
