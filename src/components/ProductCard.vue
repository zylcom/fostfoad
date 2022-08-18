<script setup>
defineProps({
  image: String,
  name: String,
  price: Number,
});
</script>

<template>
  <figure>
    <img
      :src="image"
      :alt="name"
      class="w-full object-cover object-center shadow-md"
    />

    <figcaption>
      <h4 class="text-xs">{{ name }}</h4>
      <span class="text-xs">{{ price }}</span>
    </figcaption>
  </figure>
</template>
