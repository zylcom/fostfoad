<script setup>
import BannerHeader from "../components/BannerHeader.vue";
import CartButton from "../components/CartButton.vue";
import PopularProductList from "../components/PopularProductList.vue";
import ProductList from "../components/ProductList.vue";
import SearchBar from "../components/SearchBar.vue";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const searchBarWrapper = ref(null);
const route = useRoute();
const router = useRouter();
const keyword = ref(route.query["product-name"] || "");
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

onMounted(() => {
  window.addEventListener("scroll", scrollHandler);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollHandler);
});

watch(keyword, () => {
  router.push({
    path: "/",
    query: {
      "product-name": keyword.value === "" ? undefined : keyword.value,
    },
  });
});
</script>

<template>
  <header class="inline">
    <div
      class="fixed top-0 z-20 flex gap-x-2 bg-bleached-silk px-6 pt-3 pb-2 shadow transition-all duration-500"
      ref="searchBarWrapper"
    >
      <SearchBar v-model:keyword="keyword" />
      <CartButton />
    </div>

    <BannerHeader />
  </header>

  <main class="mx-[18px] flex flex-col gap-y-16 pt-6 pb-16">
    <PopularProductList title="Most Popular Foods" />

    <PopularProductList title="Most Popular Drinks" class="[&>h1]:mt-36" />

    <ProductList
      title="All Food & Drink"
      class="[&>h1]:mt-36"
      :keyword="keyword"
    />
  </main>
</template>
