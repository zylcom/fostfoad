<script setup>
import IconSearch from "./icons/IconSearch.vue";
import SearchFilterButton from "./SearchFilterButton.vue";
</script>

<template>
  <div class="relative flex w-full">
    <input
      type="text"
      class="h-10 w-full rounded-[10px] bg-white px-9 placeholder:text-sm placeholder:italic focus:outline-none focus:ring-1"
      placeholder="Search foods"
    />

    <span class="absolute left-3 top-1/2 -mt-2">
      <IconSearch class="h-4 w-4" />
    </span>

    <SearchFilterButton />
  </div>
</template>
