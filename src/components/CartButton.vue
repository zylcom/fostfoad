<script setup>
import IconCart from "./icons/IconCart.vue";
</script>

<template>
  <RouterLink
    to="/cart"
    class="flex items-center transition duration-300 hover:scale-125"
  >
    <IconCart class="h-6 w-6" />
  </RouterLink>
</template>
