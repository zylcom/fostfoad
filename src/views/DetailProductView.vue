<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import DetailProductViewHeader from "../components/DetailProductViewHeader.vue";
import IconLove from "../components/icons/IconLove.vue";
import IconStar from "../components/icons/IconStar.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import RatingStars from "../components/RatingStars.vue";
import ReviewComponent from "../components/ReviewComponent.vue";
import ReviewInput from "../components/ReviewInput.vue";
import { allStore } from "../stores";
import { formatFloatNumber, formatNumberToIDR } from "../utils";

const route = useRoute();
const productSlug = route.params.slug;

const {
  authUserStore,
  cartStore,
  loadingStore,
  productDetailStore,
  reviewsStore,
} = allStore();

const authUser = authUserStore.getAuthUser;
const loading = computed(() => loadingStore.isLoading);
const product = computed(() => productDetailStore.product);
const myReview = reviewsStore.getMyReview;
const myCart = cartStore.getMyCart;

const quantityInputElement = ref(null);
const quantity = ref(1);
const rate = ref(0);

const formattedPrice = computed(() => formatNumberToIDR(product.value.price));
const formattedAverateRating = computed(() =>
  formatFloatNumber(product.value.averageRating)
);
const total = computed(() =>
  formatNumberToIDR(product.value.price * quantity.value)
);
const isLiked = computed(() =>
  product.value.likedBy.includes(authUser.value?.id)
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

function changeRate(rateStars) {
  rate.value = rateStars;
}

function sendReview(reviewDescription) {
  reviewsStore.postReview({
    productId: +product.value.id,
    userId: +authUser.value.id,
    description: reviewDescription,
    rateStar: rate.value,
    slug: productSlug,
  });
}

function likeProductHandler() {
  if (!authUser.value) {
    const confirmResult = confirm("Login first to like this product");

    if (confirmResult) {
      window.location.replace("/login");
    }

    return;
  }

  if (isLiked.value) {
    productDetailStore.neutralizeLikeProduct(+product.value.id);
  } else {
    productDetailStore.likeProduct(+product.value.id);
  }
}

function onAddCartClicked() {
  cartStore.updateMyCart(+product.value.id, +quantity.value);
}

onMounted(() => {
  productDetailStore.fetchProductDetail(productSlug);
});
</script>

<template>
  <DetailProductViewHeader :product="product" :loading="loading" />

  <LoadingSpinner />

  <main
    class="relative z-20 -translate-y-5 rounded-t-2xl bg-zhen-zhu-bai-pearl px-6 pt-12"
    :class="rate ? 'pb-24' : 'pb-14'"
    v-if="product !== null"
  >
    <div class="flex items-center justify-between gap-x-3 pb-5">
      <h1 class="text-2xl font-medium text-dark-tone-ink">
        {{ product.name }}
      </h1>

      <div class="grid grid-cols-2 justify-items-center gap-x-2">
        <IconStar class="order-1 h-6 w-6 fill-spandex-green" />
        <span class="order-3 font-rubik text-sm font-bold" title="Rating">
          {{ formattedAverateRating }}
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
      @click="onAddCartClicked"
      v-if="authUser"
    >
      {{
        myCart.cartItems.some((item) => item.product.id === product.id)
          ? "Update"
          : "Add to cart"
      }}
    </button>

    <ReviewComponent :reviewsLength="product.reviews.length" />
  </main>

  <div
    class="flex h-screen items-center justify-center bg-zhen-zhu-bai-pearl"
    v-else-if="!loading"
  >
    <strong class="text-2xl">Product Not Found!</strong>
  </div>

  <div
    class="fixed bottom-0 left-0 z-30 w-full bg-bleached-silk px-5 py-3"
    v-if="product && authUser && !myReview"
  >
    <RatingStars :changeRateHandler="changeRate" />

    <div class="relative" v-if="rate">
      <ReviewInput :onSubmitHandler="sendReview" />
    </div>
  </div>
</template>
