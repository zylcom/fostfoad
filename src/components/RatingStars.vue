<script setup>
import RatingStarInput from "./RatingStarInput.vue";

defineProps({ currentRate: Number, changeRateHandler: Function });
</script>

<template>
  <div class="mb-3 flex w-full items-center gap-x-3">
    Rate
    <div
      class="flex flex-row-reverse gap-x-1 [&_input[type='radio']]:hidden [&_label]:cursor-pointer [&_*]:transition [&_*]:duration-300"
    >
      <RatingStarInput
        v-for="i in [5, 4, 3, 2, 1]"
        :key="i"
        :currentRate="currentRate"
        :id="`star-${i}`"
        @on-change-rate="changeRateHandler"
        :rateValue="i"
        :title="`${i} Star`"
      />
    </div>
  </div>
</template>
