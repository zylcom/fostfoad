<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import DetailProductViewHeader from "../components/DetailProductViewHeader.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductDetailCard from "../components/ProductDetailCard.vue";
import ReviewComponent from "../components/ReviewComponent.vue";
import { allStore } from "../stores";
import { getCartItem } from "../utils";

const route = useRoute();
const productSlug = route.params.slug;

const { authUserStore, cartStore, loadingStore, productDetailStore } =
  allStore();

const authUser = authUserStore.getAuthUser;
const myCart = cartStore.getMyCart;
const product = computed(() => productDetailStore.product);
const cartItem = computed(() =>
  getCartItem(myCart.value?.cartItems, +product.value.id)
);
const isLiked = computed(() =>
  product.value.likedBy.includes(authUser.value?.id)
);

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

  <main
    class="relative rounded-t-2xl bg-zhen-zhu-bai-pearl"
    v-if="product !== null"
  >
    <div
      class="fixed left-0 top-0 w-full after:absolute after:left-0 after:top-0 after:z-10 after:inline-block after:h-full after:w-full after:bg-gradient-to-b after:from-black/80 after:content-['']"
    >
      <div class="relative h-0 w-full bg-explosive-grey pt-[66.7%] shadow-md">
        <img
          src="https://picsum.photos/1920/1280.webp"
          :alt="product.name"
          class="absolute top-0 left-0 block max-h-screen w-full object-cover object-center shadow-md"
          loading="lazy"
        />
      </div>
    </div>

    <ProductDetailCard
      :cartItem="cartItem"
      :product="product"
      :isLiked="isLiked"
      :likeProductHandler="likeProduct"
    />

    <ReviewComponent :reviewsLength="product.reviews.length" />
  </main>

  <div
    class="flex h-screen items-center justify-center bg-zhen-zhu-bai-pearl"
    v-else-if="!loadingStore.isLoading"
  >
    <strong class="text-2xl">Product Not Found!</strong>
  </div>
</template>
