<script setup>
import ReviewCard from "./ReviewCard.vue";
import ReviewList from "./ReviewList.vue";
import { useReviewsStore } from "../stores/reviews";

defineProps({ reviewsLength: Number });

const reviewsStore = useReviewsStore();
const reviews = reviewsStore.getReviews;
const myReview = reviewsStore.getMyReview;
</script>

<template>
  <div v-if="myReview">
    <h4 class="pb-3 pt-8 font-bold text-dark-tone-ink">MyReview</h4>

    <ReviewCard
      :avatar="myReview.user.avatar"
      :name="myReview.user.name"
      :description="myReview.description"
      :updatedAt="myReview.updatedAt"
      :rate="myReview.rate"
    />

    <button class="pt-2 text-xs font-medium text-heirloom-hydrangea">
      Edit My review
    </button>
  </div>

  <h4 class="pb-3 pt-8 font-bold text-dark-tone-ink">
    All Reviews ({{ reviewsLength }})
  </h4>

  <ReviewList :reviews="reviews" />
</template>
