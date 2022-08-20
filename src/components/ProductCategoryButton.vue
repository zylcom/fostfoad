<script setup>
defineProps({
  category: String,
});
</script>

<template>
  <button class="text-xs text-gray-500">{{ category }}</button>
</template>
