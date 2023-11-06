<script setup>
defineProps({ color: String });
</script>

<template>
  <svg
    width="9"
    height="9"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="h-4 w-4"
  >
    <line y1="4.5" x2="9" y2="4.5" :stroke="color" />
    <line x1="4.5" y1="9" x2="4.5" :stroke="color" />
  </svg>
</template>
