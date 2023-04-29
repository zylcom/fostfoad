<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import BannerHeader from "../components/BannerHeader.vue";
import BestRatedProductList from "../components/BestRatedProductList.vue";
import CartButton from "../components/CartButton.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductList from "../components/ProductList.vue";
import SearchBar from "../components/SearchBar.vue";
import { allStore } from "../stores";
import { useHideOnScroll } from "../composables/useHideOnScroll";

const route = useRoute();
const { productsStore } = allStore();
const keyword = ref(route.query["product-name"] || "");
const products = computed(() => productsStore.products);
const endCursor = computed(() => productsStore.endCursor);
const navElement = ref(null);

function loadMore() {
  productsStore.fetchMore(products.value, {
    category: "",
    tag: "",
    cursor: { id: endCursor.value },
  });
}

useHideOnScroll(navElement);

onMounted(() => {
  productsStore.fetchFilteredProducts({});
});
</script>

<template>
  <LoadingSpinner />

  <header class="inline">
    <nav
      class="fixed top-0 z-20 flex w-full items-center gap-x-2 bg-bleached-silk px-6 pt-3 pb-2 shadow transition-all duration-500"
      ref="navElement"
    >
      <SearchBar v-model:keyword="keyword" redirectTo="result" />

      <CartButton />
    </nav>

    <BannerHeader />
  </header>

  <main class="mx-[18px] flex flex-col gap-y-16 pt-6 pb-16">
    <BestRatedProductList title="Best Rated Foods" category="food" />

    <BestRatedProductList title="Best Rated Drinks" category="drink" />

    <ProductList
      title="All Food & Drink"
      :keyword="keyword"
      :products="products"
      :loadMore="loadMore"
    />
  </main>
</template>
