<script setup>
import IconLoading from "../components/icons/IconLoading.vue";
import { useLoadingStore } from "../stores/loading";

const loadingStore = useLoadingStore();
</script>

<template>
  <div
    v-show="loadingStore.isLoading"
    class="fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center"
  >
    <span
      class="flex flex-col items-center justify-center rounded-lg bg-thamar-black/80 px-10 py-3 text-white backdrop-blur"
    >
      <IconLoading />

      Loading...
    </span>
  </div>
</template>
