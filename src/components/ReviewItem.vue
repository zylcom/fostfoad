<script setup>
import { computed } from "vue";
import IconStar from "./icons/IconStar.vue";

const props = defineProps({
  review: Object,
});

const formattedDate = computed(() =>
  new Intl.DateTimeFormat("id-ID").format(new Date(props.review.updatedAt))
);
</script>

<template>
  <div
    class="grid grid-cols-[3rem_auto_auto] grid-rows-[min-content_auto] items-center gap-y-3 px-5"
  >
    <div class="h-10 w-10">
      <img
        :src="review.user.avatar"
        :alt="review.user.name"
        class="rounded-full bg-explosive-grey object-cover"
      />
    </div>

    <div class="text-xs">
      <h4 class="font-medium">{{ review.user.name }}</h4>
      <p class="text-gray-500">{{ formattedDate }}</p>
    </div>

    <div class="ml-auto flex items-center gap-x-1">
      <span class="block text-sm text-gray-500">
        {{ review.rate }}
      </span>

      <IconStar class="h-5 w-5 fill-spandex-green" />
    </div>

    <p class="col-span-3 break-all text-xs">{{ review.description }}</p>
  </div>
</template>
