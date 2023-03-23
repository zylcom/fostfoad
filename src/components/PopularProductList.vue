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
        class="grid translate-y-5 rotate-90 grid-cols-[repeat(5,minmax(200px,1fr))] grid-rows-1 gap-x-2"
      >
        <ProductCard
          image="https://picsum.photos/1920/1280.webp?random=1"
          name="Takoyaki"
          :price="20000"
          class="p-2"
        />

        <ProductCard
          image="https://picsum.photos/1920/1280.webp?random=2"
          name="Sushi Uramaki"
          :price="30000"
          class="p-2"
        />

        <ProductCard
          image="https://picsum.photos/1920/1280.webp?random=3"
          name="Sushi Uzumaki"
          :price="25000"
          class="p-2"
        />

        <ProductCard
          image="https://picsum.photos/1920/1280.webp?random=4"
          name="Sushi Otsusuki"
          :price="25000"
          class="p-2"
        />

        <ProductCard
          image="https://picsum.photos/1920/1280.webp?random=5"
          name="Sushi Akatsuki"
          :price="25000"
          class="p-2"
        />
      </div>
    </div>
  </section>
</template>
