<script setup>
import ProductCard from "./ProductCard.vue";

defineProps({
  title: String,
});
</script>

<template>
  <section>
    <h1 class="text-sm font-medium">{{ title }}</h1>

    <div class="food-list mt-5 flex flex-col gap-y-5">
      <ProductCard
        image="/src/assets/images/foods/takiyoki.jpg"
        name="Takoyaki"
        :price="20000"
      />

      <ProductCard
        image="/src/assets/images/foods/cappuccino.jpg"
        name="Cappuccino"
        :price="20000"
      />

      <ProductCard
        image="/src/assets/images/foods/sushi-hosomaki.jpg"
        name="Sushi Hosomaki"
        :price="25000"
      />

      <ProductCard
        image="/src/assets/images/foods/lemonade.jpg"
        name="Lemonade"
        :price="25000"
      />
    </div>
  </section>
</template>
