<script setup>
import MyReviewCard from "./MyReviewCard.vue";
import ReviewList from "./ReviewList.vue";
import ReviewInputForm from "./ReviewInputForm.vue";
import { allStore } from "../stores";

defineProps({
  reviewsLength: Number,
});

const { authUserStore, reviewsStore } = allStore();

function createReviewHandler({ description, rateStar, productId, slug }) {
  reviewsStore.postReview({
    productId,
    description,
    rateStar,
    slug,
  });
}
</script>

<template>
  <div class="relative z-10 bg-zhen-zhu-bai-pearl">
    <MyReviewCard v-if="reviewsStore.myReview" />

    <h4 class="pb-3 pl-5 pt-8 font-bold text-dark-tone-ink">
      All Reviews ({{ reviewsLength }})
    </h4>

    <ReviewList :reviews="reviewsStore.reviews" />

    <ReviewInputForm
      :sendReview="createReviewHandler"
      v-if="authUserStore.authUser && !reviewsStore.myReview"
    />
  </div>
</template>
