<script setup>
defineProps({
  path: String,
  pathName: String,
  icon: Object,
  textActiveColor: String,
});
</script>

<template>
  <router-link :to="path" custom v-slot="{ isActive, navigate }">
    <button class="flex flex-col items-center justify-end" @click="navigate">
      <component :is="icon" :is-active="isActive" />

      <span
        :class="isActive ? textActiveColor : 'text-dark-tone-ink/90'"
        class="text-[length:9px]"
        >{{ pathName }}</span
      >
    </button>
  </router-link>
</template>
