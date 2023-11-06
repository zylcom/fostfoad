<script setup>
import { computed } from "vue";
import IconCart from "./icons/IconCart.vue";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();
const totalItems = computed(() => cartStore.cart.totalItems);
</script>

<template>
  <RouterLink
    to="/cart"
    class="relative transition duration-300 hover:scale-125"
  >
    <span
      class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-torii-red text-[0.6rem] font-thin text-white"
    >
      {{ totalItems > 99 ? "99+" : totalItems }}
    </span>
    <IconCart class="h-6 w-6" />
  </RouterLink>
</template>
