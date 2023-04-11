<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import BackButton from "./BackButton.vue";
import CartButton from "./CartButton.vue";
import { hideElementWhenScrollDown } from "../utils";

const navBar = ref(null);

function onScrollHandler() {
  hideElementWhenScrollDown(navBar);
}

onMounted(() => {
  window.addEventListener("scroll", onScrollHandler);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScrollHandler);
});
</script>

<template>
  <header class="inline">
    <nav
      class="fixed top-0 z-30 flex w-full justify-between px-6 pt-5 pb-3 backdrop-blur-md transition-all duration-500"
      ref="navBar"
    >
      <BackButton />

      <CartButton />
    </nav>
  </header>
</template>
