<script setup>
import { computed, onMounted } from "vue";
import ProductCard from "./ProductCard.vue";
import { useBestRatedProductsStore } from "../stores/bestRatedProducts";

const props = defineProps({
  title: String,
  category: String,
});

const bestRatedProductsStore = useBestRatedProductsStore();
const category = computed(() => props.category);
const bestRatedProducts = computed(() =>
  category.value === "food"
    ? bestRatedProductsStore.bestRatedFoods
    : bestRatedProductsStore.bestRatedDrinks
);

onMounted(() => {
  bestRatedProductsStore.fetchBestRatedProducts(category.value);
});
</script>

<template>
  <section
    class="relative"
    :class="{
      'mb-36': bestRatedProducts.length > 0,
    }"
  >
    <h1 class="text-sm font-medium">{{ title }}</h1>

    <p
      class="translate-y-6 text-center font-rubik"
      v-if="bestRatedProducts.length < 1"
    >
      Empty
    </p>

    <div
      class="absolute z-10 h-[90vw] min-w-[200px] max-w-[210px] origin-top-left translate-y-52 -rotate-90 select-none overflow-y-auto"
      v-else
    >
      <div
        class="grid translate-y-5 rotate-90 grid-cols-[repeat(10,minmax(200px,1fr))] grid-rows-1 gap-x-2"
      >
        <ProductCard
          class="p-2"
          v-for="popularProduct in bestRatedProducts"
          :key="popularProduct.id"
          :product="popularProduct"
          showLikesCountAndAverageRating
        />
      </div>
    </div>
  </section>
</template>
