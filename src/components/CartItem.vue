<script setup>
import IconCross from "./icons/IconCross.vue";
import ProductCard from "./ProductCard.vue";
</script>

<template>
  <div class="p-2 shadow-md">
    <button
      class="absolute right-4 top-4 z-50 transition duration-300 hover:scale-125"
      title="Remove item"
    >
      <IconCross class="h-5 w-5" />
    </button>

    <ProductCard
      image="https://picsum.photos/1920/1280.webp"
      name="Takoyaki"
      :price="20000"
      overlay-bg
    />
  </div>
</template>
