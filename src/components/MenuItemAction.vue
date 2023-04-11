<script setup>
import { computed, ref } from "vue";
import IconPencil from "./icons/IconPencil.vue";
import IconPlus from "./icons/IconPlus.vue";
import QuantityInput from "./QuantityInput.vue";
import { useCartStore } from "../stores/cart";

const props = defineProps({ cartItem: Object, productId: Number });

const cartStore = useCartStore();
const cartItem = computed(() => props.cartItem);
const productId = computed(() => props.productId);

const quantity = ref(cartItem.value.quantity || 1);

function onAddCartClicked() {
  cartStore.updateMyCart(productId.value, quantity.value);
}
</script>

<template>
  <form class="flex items-center gap-x-2" @submit.prevent="onAddCartClicked">
    <span class="text-xs">Qty:</span>

    <QuantityInput class="w-12" v-model:quantity="quantity" />

    <button
      type="submit"
      class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mercury"
      :title="cartItem.id ? 'Update' : 'Add to cart'"
    >
      <IconPlus color="#de3905" class="h-3 w-3" v-if="!cartItem.id" />

      <IconPencil class="h-3 w-3" v-else />
    </button>
  </form>
</template>
