<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import BackButton from "../components/BackButton.vue";
import ProductList from "../components/ProductList.vue";
import SearchBar from "../components/SearchBar.vue";
import { allStore } from "../stores";

const route = useRoute();
const keyword = ref(route.query["product-name"] || "");
const { productsStore } = allStore();
const products = computed(() => productsStore.products);
const endCursor = computed(() => productsStore.endCursor);

function loadMore() {
  productsStore.fetchMore(products.value, {
    category: "",
    tag: "",
    keyword: route.query["product-name"] || keyword.value,
    cursor: { id: endCursor.value },
  });
}

onMounted(() => {
  if (keyword.value !== "") {
    productsStore.fetchFilteredProducts({ keyword: keyword.value });
  }
});
</script>

<template>
  <header class="inline">
    <nav
      class="fixed top-0 left-0 z-10 flex w-full items-center gap-x-3 bg-bleached-silk px-6 py-5"
    >
      <BackButton />

      <SearchBar v-model:keyword="keyword" />
    </nav>
  </header>

  <main class="min-h-screen w-full bg-zhen-zhu-bai-pearl px-5 pt-16">
    <ProductList :products="products" :load-more="loadMore" />
  </main>
</template>
