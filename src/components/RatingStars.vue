<script setup>
import RatingStarButton from "./RatingStarButton.vue";

defineProps({ changeRateHandler: Function });
</script>

<template>
  <div class="mb-3 flex w-full items-center gap-x-3">
    Rate us
    <div
      class="flex flex-row-reverse gap-x-1 [&_input[type='radio']]:hidden [&_label]:cursor-pointer [&_*]:transition [&_*]:duration-300"
    >
      <RatingStarButton
        v-for="i in [5, 4, 3, 2, 1]"
        :key="i"
        :id="`star-${i}`"
        @on-change-rate="changeRateHandler"
        :rate-value="i"
        :title="`${i} Star`"
      />
    </div>
  </div>
</template>
