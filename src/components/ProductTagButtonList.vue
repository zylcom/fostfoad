<script setup>
import ProductTagButton from "../components/ProductTagButton.vue";
import { computed } from "vue";

const props = defineProps({
  tag: String,
  tags: Array,
  onClickHandler: Function,
});
const tagName = computed(() => props.tag);
</script>

<template>
  <div
    class="absolute z-10 h-[87vw] min-w-[20px] max-w-[40px] origin-top-left translate-y-8 -rotate-90 select-none overflow-y-auto"
  >
    <div class="flex translate-y-3 rotate-90 flex-row flex-nowrap gap-x-4">
      <ProductTagButton
        tag="All"
        :class="tagName === '' ? 'text-red-500' : 'text-gray-500'"
        @click="onClickHandler('')"
      />
      <ProductTagButton
        v-for="tag in tags"
        :tag="tag.name"
        :key="tag.id"
        :class="tagName === tag.slug ? 'text-red-500' : 'text-gray-500'"
        @click="onClickHandler(tag.slug)"
      />
    </div>
  </div>
</template>
