<script setup>
import SearchBar from "../components/SearchBar.vue";
import CartButton from "../components/CartButton.vue";
import BannerHeader from "../components/BannerHeader.vue";
import NavigationBar from "../components/NavigationBar.vue";
import PopularProductList from "../components/PopularProductList.vue";
import ProductList from "../components/ProductList.vue";
</script>

<template>
  <header class="mx-6 pt-5">
    <div class="flex gap-x-2">
      <SearchBar />
      <CartButton />
    </div>

    <BannerHeader />
  </header>

  <main class="mx-[18px] flex flex-col gap-y-16 pt-6 pb-16">
    <PopularProductList title="Most Popular Foods" />

    <PopularProductList title="Most Popular Drinks" class="[&>h1]:mt-36" />

    <ProductList title="All Food & Drink" class="[&>h1]:mt-36" />
  </main>

  <footer class="fixed bottom-0 w-full bg-white py-2"><NavigationBar /></footer>
</template>
