<script setup>
import { computed, ref } from "vue";
import { useToast } from "vue-toast-notification";
import BackButton from "@/components/BackButton.vue";
import CartItem from "@/components/CartItem.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconLoading from "../components/icons/IconLoading.vue";
import orderService from "../services/order-service";
import { useCartStore } from "@/stores/cart";
import { formatNumberToIDR } from "@/utils";
import { useHideOnScroll } from "@/composables/useHideOnScroll";
import { useLoading } from "@/composables/useLoading";

const $toast = useToast();
const cartStore = useCartStore();
const myCart = computed(() => cartStore.cart);
const items = computed(() => cartStore.cart.cartItems);
const totalPrice = computed(() =>
  formatNumberToIDR(myCart.value.totalPrice || 0)
);
const navElement = ref(null);
const { isLoading, showLoading, hideLoading } = useLoading();

useHideOnScroll(navElement);

async function checkoutHandler() {
  showLoading();

  try {
    const result = await orderService.create(myCart.value);

    if (result.data.data.url) {
      window.location.replace(result.data.data.url);
    }
  } catch (error) {
    $toast.error("Something went wrong!", { position: "top" });
  } finally {
    hideLoading();
  }
}
</script>

<template>
  <header class="bg-cloud-break">
    <div
      class="fixed top-0 z-50 flex w-full items-center bg-cloud-break px-6 pb-2 pt-3 shadow transition-all duration-500"
      ref="navElement"
    >
      <nav class="flex">
        <BackButton />
      </nav>

      <h1 class="w-full text-center text-2xl font-medium">Your Cart</h1>
    </div>
  </header>

  <main class="flex min-h-screen flex-col items-center justify-center pt-24">
    <div v-if="items?.length < 1">
      <p class="mb-4">Your cart is empty!</p>

      <RouterLink
        to="/menu"
        class="flex h-fit items-center justify-center gap-x-1 text-sm text-heirloom-hydrangea hover:underline"
      >
        Add some item
        <span class="rounded-full bg-mercury p-1">
          <IconPlus color="#2a7dd2" />
        </span>
      </RouterLink>
    </div>

    <div
      class="relative z-20 w-full -translate-y-2 rounded-t-2xl bg-zhen-zhu-bai-pearl px-4"
      v-else
    >
      <div
        class="grid grid-cols-2 items-center gap-4 border-b border-torii-red/50 pb-6 pt-6 [&>div]:relative"
      >
        <CartItem
          v-for="item in items"
          :key="item.product.id"
          :product="item.product"
          :quantity="item.quantity"
        />

        <RouterLink
          to="/menu"
          class="flex h-fit items-center justify-center gap-x-1 text-sm text-heirloom-hydrangea hover:underline"
        >
          Add some more
          <span class="rounded-full bg-mercury p-1">
            <IconPlus color="#2a7dd2" />
          </span>
        </RouterLink>
      </div>

      <p
        class="flex justify-between px-6 pb-4 pt-2 text-xs font-medium text-thamar-black"
      >
        Total: <span class="font-normal">{{ totalPrice }}</span>
      </p>

      <button
        class="flex w-full justify-center gap-x-2 rounded py-4 font-medium uppercase tracking-wider text-white"
        type="button"
        :class="
          isLoading
            ? 'cursor-default bg-gray-400'
            : 'bg-spandex-green/95 hover:bg-spandex-green/90 active:bg-spandex-green'
        "
        :disabled="isLoading"
        @click="checkoutHandler()"
      >
        <IconLoading class="my-0" v-if="isLoading" />

        Checkout Order
      </button>
    </div>
  </main>
</template>
