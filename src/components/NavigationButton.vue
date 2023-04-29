<script setup>
defineProps({
  path: String,
  pathName: String,
  icon: Object,
  textActiveColor: String,
});

function navigation(navigateFunction, isActive) {
  isActive ? window.scrollTo(0, 0) : navigateFunction();
}
</script>

<template>
  <RouterLink :to="path" custom v-slot="{ isActive, navigate }">
    <button
      class="flex flex-col items-center justify-end"
      @click="navigation(navigate, isActive)"
    >
      <component :is="icon" :is-active="isActive" />

      <span
        :class="isActive ? textActiveColor : 'text-dark-tone-ink/90'"
        class="text-[length:9px]"
        >{{ pathName }}</span
      >
    </button>
  </RouterLink>
</template>
