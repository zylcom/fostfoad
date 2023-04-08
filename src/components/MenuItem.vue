<script setup>
import { computed } from "vue";
import MenuItemAction from "./MenuItemAction.vue";
import { allStore } from "../stores";
import { getCartItem } from "../utils";

const props = defineProps({
  productId: Number,
  productName: String,
  price: Number,
  slug: String,
});

const { authUserStore, cartStore } = allStore();
const authUser = authUserStore.getAuthUser;
const myCart = cartStore.getMyCart;
const productId = computed(() => props.productId);
const cartItem = computed(() =>
  getCartItem(myCart.value.cartItems, +productId.value)
);

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

    <MenuItemAction
      :cartItem="authUser ? cartItem : {}"
      :productId="productId"
      v-if="authUser"
    />
  </div>
</template>
