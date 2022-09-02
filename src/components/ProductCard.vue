<script setup>
defineProps({
  image: String,
  name: String,
  price: Number,
  overlayBg: Boolean,
});
</script>

<template>
  <figure>
    <div
      :class="{
        'relative after:absolute after:left-0 after:top-0 after:z-10 after:inline-block after:h-full after:w-full after:bg-gradient-to-b after:from-black/80 after:content-[\'\']':
          overlayBg,
      }"
    >
      <img
        :src="image"
        :alt="name"
        class="block w-full object-cover object-center shadow-md"
      />
    </div>

    <figcaption>
      <h4 class="text-xs">{{ name }}</h4>
      <span class="text-xs">{{ price }}</span>
    </figcaption>
  </figure>
</template>
