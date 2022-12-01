<script setup>
import { computed } from "vue";

const props = defineProps({
  image: String,
  name: String,
  price: Number,
  slug: String,
  overlayBg: Boolean,
});

const formatPriceToIDR = computed(() => {
  return props.price
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(props.price)
    : "";
});
</script>

<template>
  <RouterLink :to="`/menu/${slug}`" class="p-2 shadow-sm hover:shadow-xl">
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
          class="block max-h-screen w-full object-cover object-center shadow-md"
          loading="lazy"
        />
      </div>

      <figcaption>
        <h4 class="text-xs">{{ name }}</h4>
        <span class="text-xs">{{ formatPriceToIDR }}</span>
      </figcaption>
    </figure>
  </RouterLink>
</template>
