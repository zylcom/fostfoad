<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";
import DetailProductViewHeader from "@/components/DetailProductViewHeader.vue";
import ProductDetailCard from "@/components/ProductDetailCard.vue";
import productService from "@/services/product-service";
import ReviewComponent from "@/components/ReviewComponent.vue";
import { allStore } from "@/stores";
import { useLoading } from "@/composables/useLoading";

const $toast = useToast();
const route = useRoute();
const productSlug = route.params.slug;

const { authUserStore, productDetailStore } = allStore();

const authUser = computed(() => authUserStore.authUser);
const product = computed(() => productDetailStore.product);
const isLiked = computed(() =>
  product.value.likes.some((val) => val.username === authUser.value?.username)
);

const { isLoading, showLoading, hideLoading } = useLoading();

onMounted(async () => {
  showLoading();

  try {
    await productService.get(productSlug);
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      $toast.error(error.message, { position: "bottom" });
    }

    console.log(error);
  } finally {
    hideLoading();
  }
});
</script>

<template>
  <DetailProductViewHeader />

  <div
    class="flex h-screen items-center justify-center bg-zhen-zhu-bai-pearl"
    v-if="isLoading"
  >
    <strong class="text-2xl">Loading...</strong>
  </div>

  <main
    class="relative rounded-t-2xl bg-zhen-zhu-bai-pearl"
    v-else-if="!isLoading && product !== null"
  >
    <div
      class="fixed left-0 top-0 w-full after:absolute after:left-0 after:top-0 after:z-10 after:inline-block after:h-full after:w-full after:bg-gradient-to-b after:from-black/80 after:content-['']"
    >
      <div class="relative h-0 w-full bg-explosive-grey pt-[66.7%] shadow-md">
        <img
          src="https://picsum.photos/1920/1280.webp"
          :alt="product.name"
          class="absolute left-0 top-0 block max-h-screen w-full object-cover object-center shadow-md"
          loading="lazy"
        />
      </div>
    </div>

    <ProductDetailCard :product="product" :isLiked="isLiked" />

    <ReviewComponent :reviewsLength="product.reviews.length" />
  </main>

  <div
    class="flex h-screen items-center justify-center bg-zhen-zhu-bai-pearl"
    v-else-if="!isLoading && product === null"
  >
    <strong class="text-2xl">Product Not Found!</strong>
  </div>
</template>
