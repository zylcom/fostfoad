<script setup>
import IconCross from "./icons/IconCross.vue";
import ProductCard from "./ProductCard.vue";
</script>

<template>
  <div>
    <button class="absolute right-1 top-1 z-20">
      <IconCross />
    </button>

    <ProductCard
      image="/src/assets/images/foods/takiyoki.jpg"
      name="Takoyaki"
      :price="20000"
      overlay-bg
    />
  </div>
</template>
