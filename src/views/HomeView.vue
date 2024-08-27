<script setup>
import { ref } from "vue";
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
  <header
    class="fixed top-0 z-20 inline w-full shadow transition-all duration-500"
    ref="navElement"
  >
    <div
      class="h-3 w-full [background:repeating-linear-gradient(135deg,#F2921E,#F2921E_7%,#d9cbc4_7%,#d9cbc4_14%)]"
    />

    <nav
      class="grid w-full grid-cols-[90%_10%] grid-rows-2 items-center gap-x-2 gap-y-4 bg-dark-serpent px-6 pb-2 pt-3 md:grid-cols-11 md:grid-rows-1"
    >
      <SearchBar
        v-model:keyword="keyword"
        redirectTo="result"
        class="order-2 md:order-1 md:col-span-5"
      />

      <a
        href="/"
        class="order-1 col-span-2 text-center text-3xl text-snowbank md:order-2 md:col-span-5 md:text-left"
      >
        baR<sup class="-top-5 text-xs">2</sup><span class="-ml-2">esto</span>
      </a>

      <CartButton
        class="order-3 col-span-1 w-fit justify-self-center md:justify-self-end"
      />
    </nav>
  </header>

  <main class="mx-[18px] flex flex-col gap-y-16 pb-16 pt-36 md:pt-24">
    <BestRatedProductList title="Best Rated Foods" category="food" />

    <BestRatedProductList title="Best Rated Drinks" category="drink" />

    <ProductList title="All Food & Drink" :keyword="keyword" />
  </main>
</template>
