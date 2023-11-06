<script setup>
import { computed, ref } from "vue";
import AddToCartButton from "./AddToCartButton.vue";
import IconStar from "./icons/IconStar.vue";
import LikeButton from "./LikeButton.vue";
import QuantityInput from "./QuantityInput.vue";
import { allStore } from "../stores";
import { formatFloatNumber, formatNumber, formatNumberToIDR } from "../utils";

const props = defineProps({
  product: Object,
  isLiked: Boolean,
});

const { cartStore } = allStore();
const formattedPrice = computed(() => formatNumberToIDR(props.product.price));
const product = computed(() => props.product);
const cartItem = computed(() => cartStore.getItem(product.value.slug));
const formattedAverageRating = computed(() =>
  formatFloatNumber(product.value.averageRating)
);

const quantity = ref(cartItem.value?.quantity || 1);
const total = computed(() =>
  formatNumberToIDR(product.value.price * quantity.value)
);
</script>

<template>
  <div
    class="relative z-10 mt-48 rounded-t-2xl bg-zhen-zhu-bai-pearl px-5 py-4"
  >
    <div class="flex items-center justify-between gap-x-3 pb-5">
      <h1 class="text-2xl font-medium text-dark-tone-ink">
        {{ product.name }}
      </h1>

      <div class="grid grid-cols-2 justify-items-center gap-x-2">
        <IconStar class="order-1 h-6 w-6 fill-spandex-green" />

        <span class="order-3 font-rubik text-sm font-bold" title="Rating">
          {{ formattedAverageRating }}
        </span>

        <LikeButton :isLiked="isLiked" />

        <span class="order-4 font-rubik text-sm">
          {{ formatNumber(product?.likes.length || 0) }}
        </span>
      </div>
    </div>

    <h4 class="text-sm text-dark-tone-ink">Ingredients:</h4>
    <p class="text-xs text-gray-500">
      {{ product.ingredients }}
    </p>

    <p class="pt-6 text-sm font-medium">
      Price: <span class="font-normal">{{ formattedPrice }}</span>
    </p>

    <div class="flex flex-col gap-y-6 pt-6 text-sm">
      <div class="flex flex-col gap-y-6">
        <div class="flex items-center gap-x-2">
          <span class="text-sm">Quantity:</span>

          <QuantityInput v-model:quantity="quantity" />
        </div>

        <span class="font-medium">
          Total: <span class="break-words font-normal">{{ total }}</span>
        </span>
      </div>
    </div>

    <AddToCartButton
      :quantity="quantity"
      :product="product"
      :cartItem="cartItem"
    />
  </div>
</template>
