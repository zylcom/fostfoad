<script setup>
import { computed, ref } from "vue";
import RatingStars from "./RatingStars.vue";
import ReviewDescriptionInput from "./ReviewDescriptionInput.vue";
import { allStore } from "../stores";

const props = defineProps({ myReview: Object, sendReview: Function });

const { productDetailStore } = allStore();
const myReview = computed(() => props.myReview);
const product = productDetailStore.getProduct;
const rate = ref(myReview.value?.rate || 0);
const reviewDescription = ref(myReview.value?.description || "");

function changeRate(rateStars) {
  rate.value = rateStars;
}
</script>

<template>
  <form
    class="sticky bottom-0 left-0 z-30 w-full bg-bleached-silk px-5 py-3"
    @submit.prevent="
      sendReview({
        description: reviewDescription,
        rateStar: rate,
        productId: +product.id,
        slug: product.slug,
      })
    "
  >
    <RatingStars :currentRate="rate" :changeRateHandler="changeRate" />

    <div class="relative" v-if="rate">
      <ReviewDescriptionInput v-model:reviewDescription="reviewDescription" />
    </div>
  </form>
</template>
