<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import BackButton from "../components/BackButton.vue";
import ProductList from "../components/ProductList.vue";
import SearchBar from "../components/SearchBar.vue";

const route = useRoute();
const keyword = ref(route.query["product-name"] || "");

watch(route, () => {
  keyword.value = route.query["product-name"];
});
</script>

<template>
  <header class="inline">
    <nav
      class="fixed left-0 top-0 z-10 flex w-full items-center gap-x-3 bg-bleached-silk px-6 py-5"
    >
      <BackButton />

      <SearchBar v-model:keyword="keyword" />
    </nav>
  </header>

  <main class="min-h-screen w-full bg-zhen-zhu-bai-pearl px-5 pt-16">
    <ProductList :keyword="keyword" />
  </main>
</template>
