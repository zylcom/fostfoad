<script setup>
import IconHome from "../components/icons/IconHome.vue";
import IconMenu from "../components/icons/IconMenu.vue";
import IconHistory from "../components/icons/IconHistory.vue";
import IconDotsHorizontal from "../components/icons/IconDotsHorizontal.vue";
</script>

<template>
  <nav class="flex justify-around">
    <button class="flex flex-col items-center justify-end">
      <IconHome />

      <span class="text-[length:9px]">Home</span>
    </button>

    <button class="flex flex-col items-center justify-end">
      <IconMenu />

      <span class="text-[length:9px]">Menu</span>
    </button>

    <button class="flex flex-col items-center justify-end">
      <IconHistory />

      <span class="text-[length:9px]">History</span>
    </button>

    <button class="flex flex-col items-center justify-end">
      <IconDotsHorizontal />

      <span class="text-[length:9px]">More</span>
    </button>
  </nav>
</template>
