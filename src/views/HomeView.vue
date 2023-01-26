<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import BannerHeader from "../components/BannerHeader.vue";
import CartButton from "../components/CartButton.vue";
import PopularProductList from "../components/PopularProductList.vue";
import ProductList from "../components/ProductList.vue";
import SearchBar from "../components/SearchBar.vue";
import { allStore } from "../stores";

const searchBarWrapper = ref(null);
const route = useRoute();
const { productsStore } = allStore();
const keyword = ref(route.query["product-name"] || "");
const products = computed(() => productsStore.products);
const endCursor = computed(() => productsStore.endCursor);
let prevScrollpos = window.scrollY;

function scrollHandler() {
  const currentScrollpos = window.scrollY;

  if (prevScrollpos > currentScrollpos) {
    searchBarWrapper.value.style.top = "0";
  } else {
    searchBarWrapper.value.style.top = "-65px";
  }

  prevScrollpos = currentScrollpos;
}

function loadMore() {
  productsStore.fetchMore(products.value, {
    category: "",
    tag: "",
    cursor: { id: endCursor.value },
  });
}

onMounted(() => {
  productsStore.fetchFilteredProducts({});

  window.addEventListener("scroll", scrollHandler);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollHandler);
});
</script>
<template>
  <header class="inline">
    <nav
      class="fixed top-0 z-20 flex gap-x-2 bg-bleached-silk px-6 pt-3 pb-2 shadow transition-all duration-500"
      ref="searchBarWrapper"
    >
      <SearchBar v-model:keyword="keyword" redirect-to="result" />
      <CartButton />
    </nav>

    <BannerHeader />
  </header>

  <main class="mx-[18px] flex flex-col gap-y-16 pt-6 pb-16">
    <PopularProductList title="Most Popular Foods" />

    <PopularProductList title="Most Popular Drinks" class="[&>h1]:mt-36" />

    <ProductList
      title="All Food & Drink"
      class="[&>h1]:mt-36"
      :keyword="keyword"
      :products="products"
      :load-more="loadMore"
    />
  </main>
</template>
