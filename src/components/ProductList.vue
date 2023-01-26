<script setup>
import { computed, onMounted, ref } from "vue";
import ProductCard from "./ProductCard.vue";
import { allStore } from "../stores";

const props = defineProps({
  title: String,
  keyword: String,
  products: Array,
  loadMore: Function,
});

const { loadingStore, productsStore } = allStore();
const target = ref(null);
const observer = ref(null);
const products = computed(() => props.products);
const error = computed(() => productsStore.hasError);
const loading = computed(() => loadingStore.isLoading);
const hasNextPage = computed(() => productsStore.hasNextPage);

onMounted(() => {
  const options = {
    threshold: 1.0,
  };

  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting && hasNextPage.value) {
      props.loadMore();
    }
  }, options);
  observer.value.observe(target.value);
});
</script>

<template>
  <section>
    <h1 class="text-sm font-medium">{{ title }}</h1>

    <div class="food-list mt-5 flex flex-col gap-y-5">
      <div v-if="products.length > 0" class="flex flex-col gap-y-5">
        <ProductCard
          v-for="product in products"
          :key="product.node.id"
          :image="`https://picsum.photos/1920/1280.webp?random=${product.node.id}`"
          :name="product.node.name"
          :price="product.node.price"
          :slug="product.node.slug"
        />
      </div>

      <div class="pt-5 pb-16 text-center" ref="target">
        <span v-if="loading">Loading...</span>
        <span v-else-if="products.length < 1"> Products not found! </span>
        <span v-else-if="!hasNextPage">That's a wrap!</span>
        <button
          v-else-if="!error"
          class="mt-3 cursor-pointer rounded bg-seljuk-blue/50 px-5 py-1"
          @click="loadMore"
        >
          Load more!
        </button>
      </div>
    </div>
  </section>
</template>
