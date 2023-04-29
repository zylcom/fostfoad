<script setup>
import { computed } from "vue";
import { useCartStore } from "../stores/cart";
import IconCross from "./icons/IconCross.vue";
import ProductCard from "./ProductCard.vue";

const props = defineProps({
  cartItemId: Number,
  quantity: Number,
  product: Object,
});

const cartStore = useCartStore();
const itemId = computed(() => props.cartItemId);

function removeItemHandler() {
  cartStore.deleteCartItemById(itemId.value);
}
</script>

<template>
  <div class="p-2 shadow-md">
    <button
      class="absolute right-4 top-4 z-50 transition duration-300 hover:scale-125"
      title="Remove item"
      @click="removeItemHandler()"
    >
      <IconCross class="h-5 w-5" />
    </button>

    <ProductCard :product="product" :quantity="quantity" overlay-bg />
  </div>
</template>
