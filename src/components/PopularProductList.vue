<script setup>
import ProductCard from "./ProductCard.vue";

defineProps({
  title: String,
});
</script>

<template>
  <section class="relative">
    <h1 class="text-sm font-medium">{{ title }}</h1>

    <div
      class="absolute z-10 h-[90vw] min-w-[200px] max-w-[210px] origin-top-left translate-y-52 -rotate-90 select-none overflow-y-auto"
    >
      <div
        class="grid translate-y-5 rotate-90 grid-cols-[repeat(3,minmax(200px,1fr))] grid-rows-1 gap-x-2"
      >
        <ProductCard
          image="/src/assets/images/foods/takiyoki.jpg"
          name="Takoyaki"
          :price="20000"
        />

        <ProductCard
          image="/src/assets/images/foods/sushi-uramaki.jpg"
          name="Sushi Uramaki"
          :price="30000"
        />

        <ProductCard
          image="/src/assets/images/foods/sushi-hosomaki.jpg"
          name="Sushi Hosomaki"
          :price="25000"
        />
      </div>
    </div>
  </section>
</template>
