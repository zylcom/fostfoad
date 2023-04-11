<script setup>
import { computed } from "vue";
import { useCartStore } from "../stores/cart";

const props = defineProps({
  productId: Number,
  quantity: Number,
  cartItem: Object,
});

const cartStore = useCartStore();
const cartItem = computed(() => props.cartItem);
const quantity = computed(() => props.quantity);
const productId = computed(() => props.productId);

function addToCartHandler() {
  cartStore.updateMyCart(productId.value, quantity.value);
}
</script>

<template>
  <button
    class="mt-6 w-full rounded-lg py-2 font-rubik"
    :class="
      quantity > 0
        ? 'bg-torii-red/95 text-charolais-cattle hover:bg-torii-red/90 active:bg-torii-red'
        : 'cursor-not-allowed bg-mercury text-gray-500'
    "
    :disabled="quantity > 0 ? false : true"
    @click="addToCartHandler"
  >
    {{ cartItem.id ? "Update" : "Add to cart" }}
  </button>
</template>
