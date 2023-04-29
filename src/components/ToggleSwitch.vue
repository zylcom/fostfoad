<script setup>
defineProps({ toggleId: String });
</script>

<template>
  <label
    :for="toggleId"
    class="relative inline-flex cursor-pointer items-center"
  >
    <input
      type="checkbox"
      value=""
      :id="toggleId"
      class="peer sr-only"
      ref="input" />
    <div
      class="peer h-5 w-8 rounded-full bg-gray-300 after:absolute after:-left-1 after:h-5 after:w-5 after:rounded-full after:border after:border-dark-tone-ink after:bg-white after:transition-all after:content-[''] peer-checked:bg-venetian-nights peer-checked:after:translate-x-full peer-focus:outline-none dark:border-gray-600"
    ></div
  ></label>
</template>
