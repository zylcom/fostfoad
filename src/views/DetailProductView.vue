<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import DetailProductViewHeader from "../components/DetailProductViewHeader.vue";
import IconLove from "../components/icons/IconLove.vue";
import ReviewCard from "../components/ReviewCard.vue";
import { allStore } from "../stores";
import { formatNumberToIDR } from "../utils";

const route = useRoute();
const productSlug = route.params.slug;

const { loadingStore, productDetailStore } = allStore();

const loading = computed(() => loadingStore.isLoading);
const product = computed(() => productDetailStore.product);

const quantity = ref(1);

const formattedPrice = computed(() => formatNumberToIDR(product.value.price));
const total = computed(() =>
  formatNumberToIDR(product.value.price * quantity.value)
);
const isInQuantityValueRange = computed(
  () => quantity.value >= 1 && quantity.value <= 999
);

function onInputQuantity(event) {
  quantity.value = event.target.value;
}

function isNumberKey(event) {
  const charCode = event.which ? event.which : event.keyCode;

  return charCode > 31 && (charCode < 48 || charCode > 57) ? false : true;
}

onMounted(() => {
  productDetailStore.fetchProductDetail(productSlug);
});
</script>

<template>
  <DetailProductViewHeader :product="product" :loading="loading" />

  <div
    class="flex h-screen items-center justify-center bg-zhen-zhu-bai-pearl"
    v-if="loading"
  >
    <strong class="text-2xl">Loading...</strong>
  </div>

  <div
    class="flex h-screen items-center justify-center bg-zhen-zhu-bai-pearl"
    v-else-if="product === null"
  >
    <strong class="text-2xl">Product Not Found!</strong>
  </div>

  <main
    class="relative z-20 -translate-y-5 rounded-t-2xl bg-zhen-zhu-bai-pearl px-6 pt-12 pb-5"
    v-else
  >
    <div class="flex items-center justify-between pb-5">
      <h1 class="text-2xl font-medium text-dark-tone-ink">
        {{ product.name }}
      </h1>

      <button>
        <IconLove />
      </button>
    </div>

    <h4 class="text-sm text-dark-tone-ink">Ingredients</h4>
    <p class="text-xs text-gray-500">
      {{ product.ingredients }}
    </p>

    <div class="flex flex-col gap-y-6 pt-6 text-sm">
      <p class="font-medium">
        Price: <span class="font-normal">{{ formattedPrice }}</span>
      </p>

      <div class="flex items-center gap-x-2">
        <span class="text-sm">Quantity:</span>

        <input
          type="number"
          class="w-full border-b border-b-torii-red bg-transparent font-rubik text-sm focus:outline-none focus:ring-0"
          min="1"
          max="999"
          :value="quantity"
          @input="onInputQuantity"
          :onkeypress="isNumberKey"
        />
      </div>

      <p
        class="top-0 -translate-y-3 text-xs text-red-500"
        v-if="!isInQuantityValueRange"
      >
        Value must be 1 - 999.
      </p>

      <span class="font-medium">
        Total: <span class="break-words font-normal">{{ total }}</span>
      </span>
    </div>

    <button
      class="my-6 w-full rounded-lg py-2 font-rubik"
      :class="
        isInQuantityValueRange
          ? 'bg-torii-red text-charolais-cattle'
          : 'cursor-not-allowed bg-mercury text-gray-500'
      "
      :disabled="isInQuantityValueRange ? false : true"
    >
      Add to cart
    </button>

    <div>
      <h4 class="pb-6 text-sm text-dark-tone-ink">Reviews</h4>

      <div class="review-list flex flex-col gap-y-6">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  </main>
</template>
