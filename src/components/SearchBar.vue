<script setup>
import IconSearch from "./icons/IconSearch.vue";
import SearchFilterButton from "./SearchFilterButton.vue";
</script>

<template>
  <div class="flex relative">
    <input
      type="text"
      class="w-full h-10 bg-white rounded-[10px] pl-8 focus:ring-1 focus:outline-none placeholder:text-sm placeholder:italic"
      placeholder="Search foods"
    />

    <span class="absolute left-3 top-1/2 -mt-2">
      <IconSearch class="w-4 h-4" />
    </span>

    <SearchFilterButton />
  </div>
</template>
