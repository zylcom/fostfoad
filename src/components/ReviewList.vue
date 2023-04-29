<script setup>
import ReviewItem from "./ReviewItem.vue";

defineProps({ reviews: Array });
</script>

<template>
  <div class="review-list flex min-h-[10vh] flex-col gap-y-6 pb-5">
    <ReviewItem v-for="review in reviews" :key="review.id" :review="review" />
  </div>
</template>
