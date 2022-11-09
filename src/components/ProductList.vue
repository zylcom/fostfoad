<script setup>
import ProductCard from "./ProductCard.vue";
import { useProductStore } from "../stores/products";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  title: String,
  keyword: String,
});

const target = ref(null);
const observer = ref(null);
const searchKeyword = computed(() => props.keyword);
const store = useProductStore();
const products = store.getProducts;
const error = computed(() => store.hasError);
const loading = computed(() => store.isLoading);
const hasNextPage = computed(() => store.hasNextPage);
const endCursor = computed(() => store.endCursor);

function loadMore() {
  store.fetchMore(products.value, {
    category: "",
    tag: "",
    keyword: searchKeyword.value,
    cursor: { id: endCursor.value },
  });
}

function reloadPage() {
  window.location.reload();
}

onMounted(() => {
  store.fetchFilteredProducts();

  const options = {
    threshold: 1.0,
  };

  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting && hasNextPage.value) {
      loadMore();
    }
  }, options);
  observer.value.observe(target.value);
});
</script>

<template>
  <section>
    <h1 class="text-sm font-medium">{{ title }}</h1>

    <div class="food-list mt-5 flex flex-col gap-y-5">
      <div class="mt-5 text-center" v-if="error">
        <p>Oops, something went wrong!</p>
        <button
          class="mt-3 rounded bg-spandex-green px-5 py-1"
          @click="reloadPage"
        >
          Reload
        </button>
      </div>

      <ProductCard
        v-else
        v-for="product in products"
        :key="product.node.id"
        :image="`https://picsum.photos/1920/1280.webp?random=${product.node.id}`"
        :name="product.node.name"
        :price="product.node.price"
      />

      <div class="pt-5 pb-16 text-center" ref="target">
        <span v-if="loading && !error">Loading...</span>
        <span v-else-if="products.length < 1 && !error"
          >Products not found!</span
        >
        <span v-else-if="!hasNextPage && !error">That's a wrap!</span>
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
