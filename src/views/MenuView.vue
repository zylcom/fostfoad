<script setup>
import NavigationBar from "../components/NavigationBar.vue";
import SearchBar from "../components/SearchBar.vue";
import CartButton from "../components/CartButton.vue";
import PillButton from "../components/PillButton.vue";
import ProductCategoryButtonList from "../components/ProductCategoryButtonList.vue";
import MenuList from "../components/MenuList.vue";
</script>

<template>
  <header class="sticky top-0 z-20 bg-bleached-silk px-6 pt-9">
    <div class="relative flex justify-center">
      <h1 class="text-center font-roboto text-2xl font-medium">Menu</h1>

      <CartButton class="absolute right-0" />
    </div>

    <SearchBar class="py-6" />
  </header>

  <main class="rounded-t-[20px] bg-zhen-zhu-bai-pearl">
    <div
      class="sticky top-36 z-20 flex justify-center gap-x-2.5 bg-zhen-zhu-bai-pearl px-5 pt-8 pb-6"
    >
      <PillButton text="Foods" />
      <PillButton text="Drinks" class="bg-chocobo-feather text-bleached-silk" />
    </div>

    <ProductCategoryButtonList />

    <MenuList />
  </main>

  <footer class="fixed bottom-0 z-50 w-full bg-white py-2">
    <NavigationBar />
  </footer>
</template>
