<script setup>
defineProps({
  text: String,
});
</script>

<template>
  <button
    class="h-9 rounded-full bg-charolais-cattle px-12 text-center font-roboto text-sm text-gray-500"
  >
    {{ text }}
  </button>
</template>
