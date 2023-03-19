<script setup>
import ReviewCard from "../components/ReviewCard.vue";

defineProps({ reviews: Array });
</script>

<template>
  <div class="review-list flex flex-col gap-y-6">
    <ReviewCard
      v-for="review in reviews"
      :key="review.id"
      :description="review.description"
      :rate="review.rate"
      :name="review.user.name"
      :avatar="review.user.avatar"
      :createdAt="review.createdAt"
    />
  </div>
</template>
