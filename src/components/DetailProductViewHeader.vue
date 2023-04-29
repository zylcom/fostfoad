<script setup>
import { ref } from "vue";
import BackButton from "./BackButton.vue";
import CartButton from "./CartButton.vue";
import { useHideOnScroll } from "../composables/useHideOnScroll";

const navElement = ref(null);

useHideOnScroll(navElement);
</script>

<template>
  <header class="inline">
    <nav
      class="fixed top-0 z-30 flex w-full justify-between px-6 pt-5 pb-3 backdrop-blur-md transition-all duration-500"
      ref="navElement"
    >
      <BackButton />

      <CartButton />
    </nav>
  </header>
</template>
