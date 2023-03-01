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

const { authUserStore, loadingStore, productDetailStore } = allStore();

const authUser = authUserStore.getAuthUser;
const loading = computed(() => loadingStore.isLoading);
const product = computed(() => productDetailStore.product);

const quantityInputElement = ref(null);
const quantity = ref(1);

const formattedPrice = computed(() => formatNumberToIDR(product.value.price));
const total = computed(() =>
  formatNumberToIDR(product.value.price * quantity.value)
);

function onInputQuantity() {
  if (this.value.length > this.maxLength) {
    this.value = this.value.slice(0, this.maxLength);
  }

  quantity.value = this.value.slice(0, this.maxlength);
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

      <button
        class="transition duration-300"
        :class="
          authUser
            ? 'cursor-pointer hover:scale-125 active:scale-100'
            : 'cursor-not-allowed'
        "
        :title="authUser ? 'Like' : 'Login to like'"
        :disabled="authUser ? false : true"
      >
        <IconLove />
      </button>
    </div>

    <h4 class="text-sm text-dark-tone-ink">Ingredients:</h4>
    <p class="text-xs text-gray-500">
      {{ product.ingredients }}
    </p>

    <div class="flex flex-col gap-y-6 pt-6 text-sm" v-if="authUser">
      <p class="font-medium">
        Price: <span class="font-normal">{{ formattedPrice }}</span>
      </p>

      <div class="flex flex-col gap-y-6">
        <div class="flex items-center gap-x-2">
          <span class="text-sm">Quantity:</span>

          <input
            type="number"
            class="w-full border-b border-b-torii-red bg-transparent font-rubik text-sm focus:outline-none focus:ring-0"
            min="1"
            max="999"
            maxlength="3"
            :value="quantity"
            :oninput="onInputQuantity"
            :onkeypress="isNumberKey"
            ref="quantityInputElement"
          />
        </div>

        <span class="font-medium">
          Total: <span class="break-words font-normal">{{ total }}</span>
        </span>
      </div>
    </div>

    <button
      class="mt-6 w-full rounded-lg py-2 font-rubik"
      :class="
        quantity > 0
          ? 'bg-torii-red/95 text-charolais-cattle hover:bg-torii-red/90 active:bg-torii-red'
          : 'cursor-not-allowed bg-mercury text-gray-500'
      "
      :disabled="quantity > 0 ? false : true"
      v-if="authUser"
    >
      Add to cart
    </button>

    <div>
      <h4 class="py-6 text-sm text-dark-tone-ink">Reviews</h4>

      <div class="review-list flex flex-col gap-y-6">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  </main>
</template>
