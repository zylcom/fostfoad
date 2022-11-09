<script setup>
defineProps({
  tag: String,
});
</script>

<template>
  <button class="text-xs">{{ tag }}</button>
</template>
