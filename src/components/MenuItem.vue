<script setup>
import { computed } from "vue";
import MenuItemAction from "./MenuItemAction.vue";
import { formatNumberToIDR } from "../utils";

const props = defineProps({
  product: Object,
});

const product = computed(() => props.product);
const formattedPrice = computed(() => formatNumberToIDR(product.value.price));
</script>

<template>
  <div
    class="flex w-full items-center justify-between border-b-2 border-charolais-cattle px-6 py-1 hover:bg-bleached-silk"
  >
    <RouterLink :to="`/menu/${product.slug}`" class="w-full">
      <h4 class="text-sm text-dark-tone-ink">
        {{ product.name }}
      </h4>

      <span class="text-xs text-gray-500">{{ formattedPrice }}</span>
    </RouterLink>

    <MenuItemAction :product="product" />
  </div>
</template>
