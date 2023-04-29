<script setup>
import { computed, ref } from "vue";
import BackButton from "../components/BackButton.vue";
import CartItem from "../components/CartItem.vue";
import IconPlus from "../components/icons/IconPlus.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import { allStore } from "../stores";
import { formatNumberToIDR } from "../utils";
import { useHideOnScroll } from "../composables/useHideOnScroll";

const { authUserStore, cartStore } = allStore();
const authUser = authUserStore.getAuthUser;
const myCart = cartStore.getMyCart;
const navElement = ref(null);
const totalPrice = computed(() => formatNumberToIDR(myCart.value.totalPrice));

useHideOnScroll(navElement);
</script>

<template>
  <header class="bg-cloud-break">
    <div
      class="fixed top-0 z-50 flex w-full items-center bg-cloud-break px-6 pt-3 pb-2 shadow transition-all duration-500"
      ref="navElement"
    >
      <nav class="flex">
        <BackButton />
      </nav>

      <h1 class="w-full text-center text-2xl font-medium">Your Cart</h1>
    </div>
  </header>

  <LoadingSpinner />

  <main
    class="flex min-h-screen flex-col items-center justify-center pt-24"
    v-if="authUser !== null"
  >
    <div v-if="myCart.cartItems?.length < 1">
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
      class="relative z-20 w-full -translate-y-2 rounded-t-2xl bg-zhen-zhu-bai-pearl"
      v-else
    >
      <div
        class="grid grid-cols-2 items-center gap-4 border-b border-torii-red/50 px-3 pt-6 pb-6 [&>div]:relative"
      >
        <CartItem
          v-for="cartItem in myCart.cartItems"
          :key="cartItem.id"
          :cartItemId="+cartItem.id"
          :product="cartItem.product"
          :quantity="cartItem.quantity"
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
        class="flex justify-between px-6 pt-2 pb-4 text-xs font-medium text-thamar-black"
      >
        Total: <span class="font-normal">{{ totalPrice }}</span>
      </p>

      <div class="border-t border-prunus-avium/50 px-6 pt-24">
        <h1 class="font-rubik text-lg text-thamar-black">Payment mode:</h1>
        <p class="font-rubik text-xs text-gray-500">
          Choose a method of payment
        </p>

        <div class="my-6 grid grid-cols-2 gap-6">
          <label
            for="payment-1"
            class="flex cursor-pointer items-center gap-x-2"
          >
            <input type="radio" name="payment_method" id="payment-1" disabled />
            Coming Soon
          </label>

          <label
            for="payment-2"
            class="flex cursor-pointer items-center gap-x-2"
          >
            <input type="radio" name="payment_method" id="payment-2" disabled />
            Coming Soon
          </label>

          <label
            for="payment-3"
            class="flex cursor-pointer items-center gap-x-2"
          >
            <input type="radio" name="payment_method" id="payment-3" disabled />
            Coming Soon
          </label>

          <label
            for="payment-4"
            class="flex cursor-pointer items-center gap-x-2"
          >
            <input type="radio" name="payment_method" id="payment-4" disabled />
            Coming Soon
          </label>
        </div>

        <button
          class="my-6 w-full rounded-lg bg-torii-red/95 py-2 font-rubik text-charolais-cattle hover:bg-torii-red/90 active:bg-torii-red"
        >
          Buy
        </button>
      </div>
    </div>
  </main>
</template>
