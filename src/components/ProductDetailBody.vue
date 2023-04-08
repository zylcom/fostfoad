<script setup>
import { computed, ref } from "vue";
import AddToCartButton from "./AddToCartButton.vue";
import IconLove from "./icons/IconLove.vue";
import IconStar from "./icons/IconStar.vue";
import QuantityInput from "./QuantityInput.vue";
import ReviewComponent from "./ReviewComponent.vue";
import { formatFloatNumber, formatNumberToIDR } from "../utils";

const props = defineProps({
  authUser: Object,
  cartItem: Object,
  product: Object,
  rate: Number,
  isLiked: Boolean,
  likeProductHandler: Function,
});

const authUser = computed(() => props.authUser);
const formattedPrice = computed(() => formatNumberToIDR(props.product.price));
const product = computed(() => props.product);
const cartItem = computed(() => props.cartItem);
const formattedAverageRating = computed(() =>
  formatFloatNumber(product.value.averageRating)
);

const quantity = ref(cartItem.value?.quantity || 1);
const total = computed(() =>
  formatNumberToIDR(product.value.price * quantity.value)
);
</script>

<template>
  <main
    class="relative z-20 -translate-y-5 rounded-t-2xl bg-zhen-zhu-bai-pearl px-6 pt-12"
    :class="rate ? 'pb-24' : 'pb-14'"
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

        <button
          class="order-2 cursor-pointer transition duration-300 hover:scale-125 active:scale-100"
          title="Like"
          @click="likeProductHandler"
        >
          <IconLove :class="isLiked ? 'fill-blood-moon' : ''" />
        </button>

        <span class="order-4 font-rubik text-sm">
          {{ product.likedBy.length }}
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

    <div class="flex flex-col gap-y-6 pt-6 text-sm" v-if="authUser">
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
      v-if="authUser"
      :quantity="quantity"
      :productId="+product.id"
      :cartItem="cartItem"
    />

    <ReviewComponent :reviewsLength="product.reviews.length" />
  </main>
</template>
