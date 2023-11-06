<script setup>
defineProps({
  text: String,
});
</script>

<template>
  <button class="h-9 rounded-full px-12 text-center text-sm">
    {{ text }}
  </button>
</template>
