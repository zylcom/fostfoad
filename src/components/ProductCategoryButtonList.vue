<script setup>
import ProductCategoryButton from "../components/ProductCategoryButton.vue";
</script>

<template>
  <div
    class="absolute z-10 h-[87vw] min-w-[20px] max-w-[40px] origin-top-left translate-y-8 translate-x-6 -rotate-90 select-none overflow-y-auto"
  >
    <div class="flex translate-y-3 rotate-90 flex-row flex-nowrap gap-x-4">
      <ProductCategoryButton category="Coffee" class="text-dark-tone-ink" />
      <ProductCategoryButton category="Tea" />
      <ProductCategoryButton category="Juice" />
      <ProductCategoryButton category="Cocktail" />
      <ProductCategoryButton category="Coffee" />
      <ProductCategoryButton category="Tea" />
      <ProductCategoryButton category="Juice" />
      <ProductCategoryButton category="Cocktail" />
    </div>
  </div>
</template>
