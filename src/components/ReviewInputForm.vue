<script setup>
import { computed, ref } from "vue";
import RatingStars from "./RatingStars.vue";
import ReviewDescriptionInput from "./ReviewDescriptionInput.vue";
import { allStore } from "../stores";

const props = defineProps({ myReview: Object, sendReview: Function });

const { productDetailStore } = allStore();
const myReview = computed(() => props.myReview);
const product = productDetailStore.getProduct;
const rating = ref(myReview.value?.rating || 0);
const description = ref(myReview.value?.description || "");

function changeRate(rateStars) {
  rating.value = rateStars;
}
</script>

<template>
  <form
    class="sticky bottom-0 left-0 z-30 w-full bg-bleached-silk px-5 py-3"
    @submit.prevent="
      sendReview({
        description,
        rating,
        productSlug: product.slug,
      })
    "
  >
    <RatingStars :currentRate="rating" :changeRateHandler="changeRate" />

    <div class="relative" v-if="rating">
      <ReviewDescriptionInput v-model:description="description" />
    </div>
  </form>
</template>
