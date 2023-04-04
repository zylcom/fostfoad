<script setup>
import IconCart from "./icons/IconCart.vue";
import { allStore } from "../stores";

const { authUserStore, cartStore } = allStore();
const authUser = authUserStore.getAuthUser;
const myCart = cartStore.getMyCart;
</script>

<template>
  <RouterLink
    to="/cart"
    class="relative transition duration-300 hover:scale-125"
    v-if="authUser"
  >
    <span
      class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-torii-red text-xs text-white"
    >
      {{ myCart.cartItems.length }}
    </span>
    <IconCart class="h-6 w-6" />
  </RouterLink>
</template>
