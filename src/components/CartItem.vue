<script setup>
import { computed } from "vue";
import { useToast } from "vue-toast-notification";
import IconCross from "./icons/IconCross.vue";
import ProductCard from "./ProductCard.vue";
import cartService from "@/services/cart-service";
import { allStore } from "@/stores";
import { useLoading } from "@/composables/useLoading";

const props = defineProps({
  quantity: Number,
  product: Object,
});

const $toast = useToast();
const { authUserStore, cartStore } = allStore();
const authUser = computed(() => authUserStore.authUser);
const product = computed(() => props.product);

const { isLoading, hideLoading, showLoading } = useLoading();

async function removeItemHandler() {
  if (confirm("Are sure want to delete this item?")) {
    showLoading();

    try {
      if (authUser.value) {
        await cartService.deleteItem(product.value.slug);

        cartStore.deleteItem(product.value.slug);
      } else {
        cartStore.deleteItem(product.value.slug);
      }

      $toast.success("Item deleted!", { position: "top" });
    } catch (error) {
      console.log(error);

      $toast.error("Something went wrong!", { position: "top" });
    } finally {
      hideLoading();
    }
  }
}
</script>

<template>
  <div class="p-2 shadow-md">
    <button
      class="absolute right-4 top-4 z-50 transition duration-300 hover:scale-125"
      title="Remove item"
      @click="removeItemHandler()"
      :disabled="isLoading ? true : false"
    >
      <IconCross class="h-5 w-5 stroke-chilled-chilly" />
    </button>

    <ProductCard :product="product" :quantity="quantity" overlay-bg />
  </div>
</template>
