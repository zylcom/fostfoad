<script setup>
import IconStar from "../components/icons/IconStar.vue";
</script>

<template>
  <div class="review flex items-center gap-x-3">
    <img
      src="../assets/images/foods/lemonade.jpg"
      alt="zylcom"
      class="h-14 w-14 rounded-full object-cover"
    />

    <div class="review-desc text-xs">
      <h4 class="font-medium">Zylcom</h4>
      <p class="text-gray-500">Really good food</p>
    </div>

    <p class="ml-auto flex items-center gap-x-1 text-xs text-gray-500">
      4.5
      <span><IconStar /> </span>
    </p>
  </div>
</template>
