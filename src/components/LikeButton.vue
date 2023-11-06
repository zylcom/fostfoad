<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";
import IconLove from "./icons/IconLove.vue";
import productService from "../services/product-service";
import { useAuthUserStore } from "../stores/authUser";

const props = defineProps({
  isLiked: Boolean,
});

const $toast = useToast();
const route = useRoute();
const productSlug = route.params.slug;
const authUserStore = useAuthUserStore();
const authUser = computed(() => authUserStore.authUser);
const isLiked = computed(() => props.isLiked);
const isFetching = ref(false);

async function likeProduct() {
  if (!authUser.value) {
    const confirmResult = confirm("Login first to like this product");

    if (confirmResult) {
      window.location.replace("/login");
    }

    return;
  }

  isFetching.value = true;

  try {
    if (isLiked.value) {
      await productService.neutralizeLikeProduct(productSlug);
    } else {
      await productService.like(productSlug);
    }
  } catch (error) {
    $toast.error("Something went wrong!", { position: "top" });
  } finally {
    setTimeout(() => {
      isFetching.value = false;
    }, 1000);
  }
}
</script>

<template>
  <button
    class="order-2 cursor-pointer transition duration-300 hover:scale-125 active:scale-100"
    title="Like"
    @click="likeProduct"
    :disabled="isFetching ? true : false"
  >
    <IconLove :class="isLiked ? 'fill-blood-moon' : ''" />
  </button>
</template>
