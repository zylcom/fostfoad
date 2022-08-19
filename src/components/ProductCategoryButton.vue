<script setup>
defineProps({
  category: String,
});
</script>

<template>
  <button class="font-roboto text-xs text-gray-500">{{ category }}</button>
</template>
