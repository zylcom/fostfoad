<script setup>
import { computed } from "vue";
import IconStar from "../components/icons/IconStar.vue";

const props = defineProps({
  avatar: String,
  name: String,
  description: String,
  rate: Number,
  updatedAt: String,
});

const formattedDate = computed(() =>
  new Intl.DateTimeFormat("id-ID").format(new Date(props.updatedAt))
);
</script>

<template>
  <div
    class="grid grid-cols-[3rem_auto_auto] grid-rows-[min-content_auto] items-center gap-y-3"
  >
    <div class="h-10 w-10">
      <img :src="avatar" :alt="name" class="rounded-full object-cover" />
    </div>

    <div class="text-xs">
      <h4 class="font-medium">{{ name }}</h4>
      <p class="text-gray-500">{{ formattedDate }}</p>
    </div>

    <div class="ml-auto flex items-center gap-x-1">
      <span class="block text-sm text-gray-500">
        {{ rate }}
      </span>

      <IconStar class="h-5 w-5 fill-spandex-green" />
    </div>

    <p class="col-span-3 break-all text-xs">{{ description }}</p>
  </div>
</template>
