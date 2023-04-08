<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import DetailProductViewHeader from "../components/DetailProductViewHeader.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductDetailBody from "../components/ProductDetailBody.vue";
import RatingStars from "../components/RatingStars.vue";
import ReviewInput from "../components/ReviewInput.vue";
import { allStore } from "../stores";
import { getCartItem } from "../utils";

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
const product = computed(() => productDetailStore.product);
const myReview = reviewsStore.getMyReview;
const myCart = cartStore.getMyCart;
const cartItem = computed(() =>
  getCartItem(myCart.value.cartItems, +product.value.id)
);
const isLiked = computed(() =>
  product.value.likedBy.includes(authUser.value?.id)
);

const rate = ref(0);

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

function likeProduct() {
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

onMounted(() => {
  productDetailStore.fetchProductDetail(productSlug);
});
</script>

<template>
  <DetailProductViewHeader :product="product" />

  <LoadingSpinner />

  <ProductDetailBody
    :authUser="authUser"
    :cartItem="authUser ? cartItem : {}"
    :product="product"
    :rate="rate"
    :isLiked="isLiked"
    :likeProductHandler="likeProduct"
    v-if="product !== null"
  />

  <div
    class="flex h-screen items-center justify-center bg-zhen-zhu-bai-pearl"
    v-else-if="!loadingStore.isLoading"
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
