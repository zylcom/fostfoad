<script setup>
import IconPlus from "./icons/IconPlus.vue";
import { computed } from "vue";
import { useAuthUserStore } from "../stores/authUser";

const props = defineProps({
  productName: String,
  price: Number,
  slug: String,
});

const authUserStore = useAuthUserStore();
const authUser = authUserStore.getAuthUser;

const formatPriceToIDR = computed(() => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(props.price);
});
</script>

<template>
  <div
    class="flex w-full items-center justify-between border-b-2 border-charolais-cattle px-6 py-1 hover:bg-bleached-silk"
  >
    <RouterLink :to="`/menu/${slug}`" class="w-full">
      <h4 class="text-sm text-dark-tone-ink">
        {{ productName }}
      </h4>
      <span class="text-xs text-gray-500">{{ formatPriceToIDR }}</span>
    </RouterLink>

    <button
      class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mercury"
      v-if="authUser"
    >
      <IconPlus color="#de3905" class="h-3 w-3" />
    </button>
  </div>
</template>
