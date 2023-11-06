<script setup>
import IconLoading from "../components/icons/IconLoading.vue";
</script>

<template>
  <div
    class="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center"
  >
    <span
      class="flex flex-col items-center justify-center rounded-lg bg-thamar-black/80 px-10 py-3 text-white backdrop-blur"
    >
      <IconLoading />

      Loading...
    </span>
  </div>
</template>
