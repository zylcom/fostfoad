<script setup>
import { ref } from "vue";
import BannerHeader from "../components/BannerHeader.vue";
import BestRatedProductList from "../components/BestRatedProductList.vue";
import CartButton from "../components/CartButton.vue";
import ProductList from "../components/ProductList.vue";
import SearchBar from "../components/SearchBar.vue";
import { useHideOnScroll } from "../composables/useHideOnScroll";

const keyword = ref("");
const navElement = ref(null);

useHideOnScroll(navElement);
</script>

<template>
  <header class="inline">
    <nav
      class="fixed top-0 z-20 flex w-full items-center gap-x-2 bg-bleached-silk px-6 pb-2 pt-3 shadow transition-all duration-500"
      ref="navElement"
    >
      <SearchBar v-model:keyword="keyword" redirectTo="result" />

      <CartButton />
    </nav>

    <BannerHeader />
  </header>

  <main class="mx-[18px] flex flex-col gap-y-16 pb-16 pt-6">
    <BestRatedProductList title="Best Rated Foods" category="food" />

    <BestRatedProductList title="Best Rated Drinks" category="drink" />

    <ProductList title="All Food & Drink" :keyword="keyword" />
  </main>
</template>
