<script setup>
import { onUnmounted, ref } from "vue";
import { useToast } from "vue-toast-notification";
import IconCross from "./icons/IconCross.vue";
import ReviewInputForm from "./ReviewInputForm.vue";
import ReviewItem from "./ReviewItem.vue";
import reviewService from "../services/review-service";
import { useReviewsStore } from "../stores/reviews";

const $toast = useToast();
const reviewsStore = useReviewsStore();
const myReview = reviewsStore.getMyReview;
const modalBoxElement = ref();
const isModalOpen = ref(false);

function toggleModalBox() {
  isModalOpen.value = !isModalOpen.value;

  if (isModalOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

async function updateReviewHandler({ description, rating, productSlug }) {
  try {
    await reviewService.update({
      description,
      rating,
      productSlug,
    });

    $toast.success("Review updated", { position: "bottom" });
  } catch (error) {
    $toast.error("Something went wrong!", { position: "bottom" });
  } finally {
    toggleModalBox();
  }
}

onUnmounted(() => {
  isModalOpen.value = false;
  document.body.style.overflow = "";
});
</script>

<template>
  <h4 class="pb-3 pl-5 pt-8 font-bold text-dark-tone-ink">My Review</h4>

  <ReviewItem :review="myReview" />

  <button
    class="pl-5 pt-2 text-xs font-medium text-heirloom-hydrangea hover:underline"
    @click="toggleModalBox()"
  >
    Edit My review
  </button>

  <div
    class="fixed left-0 top-0 z-50 flex h-screen w-full items-center backdrop-blur"
    v-show="isModalOpen"
    ref="modalBoxElement"
  >
    <div class="mx-3 w-full rounded-sm bg-bleached-silk shadow-md">
      <div class="flex items-center justify-between border-b p-3">
        <span class="font-rubik font-semibold">Edit review</span>

        <button
          class="cursor-pointer transition duration-300 hover:scale-125"
          title="Cancel edit"
          @click="toggleModalBox()"
        >
          <IconCross />
        </button>
      </div>

      <ReviewInputForm :myReview="myReview" :sendReview="updateReviewHandler" />
    </div>
  </div>
</template>
