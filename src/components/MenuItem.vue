<script setup>
import IconPlus from "./icons/IconPlus.vue";

defineProps({
  productName: String,
  price: Number,
});
</script>

<template>
  <div
    class="menu-item grid grid-cols-2 grid-rows-2 gap-y-1 border-b-2 border-charolais-cattle px-6 py-1"
  >
    <h4 class="order-1 text-sm text-dark-tone-ink">
      {{ productName }}
    </h4>
    <span class="order-3 text-xs text-gray-500">{{ price }}</span>

    <button
      class="order-2 row-span-2 flex h-5 w-5 items-center justify-center place-self-end self-center rounded-full bg-mercury"
    >
      <IconPlus color="#de3905" />
    </button>
  </div>
</template>
