<script setup>
import { computed } from "vue";
import { formatNumberToIDR } from "../utils";

const props = defineProps({
  image: String,
  name: String,
  price: Number,
  slug: String,
  overlayBg: Boolean,
});

const formattedPrice = computed(() => formatNumberToIDR(props.price));
</script>

<template>
  <RouterLink :to="`/menu/${slug}`" class="cursor-pointer shadow-md">
    <div
      :class="{
        'relative after:absolute after:left-0 after:top-0 after:z-10 after:inline-block after:h-full after:w-full after:bg-gradient-to-b after:from-black/80 after:content-[\'\']':
          overlayBg,
      }"
    >
      <div class="relative h-0 w-full bg-explosive-grey pt-[66.7%] shadow-md">
        <img
          :src="image"
          :alt="name"
          class="absolute top-0 left-0 block max-h-[1280px] w-full object-cover object-center"
          loading="lazy"
        />
      </div>
    </div>

    <div>
      <h4 class="text-xs">{{ name }}</h4>
      <span class="text-xs">{{ formattedPrice }}</span>
    </div>
  </RouterLink>
</template>
