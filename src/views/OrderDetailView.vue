<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";
import BackButton from "@/components/BackButton.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import orderService from "@/services/order-service";
import { allStore } from "@/stores";
import { formatDateToLocaleId, formatNumberToIDR } from "@/utils";
import { useHideOnScroll } from "@/composables/useHideOnScroll";
import { useLoading } from "@/composables/useLoading";

const route = useRoute();
const $toast = useToast();
const { orderStore } = allStore();
const order = computed(() => orderStore.order);
const orderId = route.params.id;
const navElement = ref(null);
const { isLoading, showLoading, hideLoading } = useLoading();
const {
  isLoading: isFetching,
  showLoading: showFetching,
  hideLoading: hideFetching,
} = useLoading();

useHideOnScroll(navElement);

async function checkout() {
  showFetching();

  try {
    const result = await orderService.checkout(orderId);

    if (result.data.data.url) {
      $toast.success("You will be redirect to payment form in 3 seconds!", {
        position: "top",
      });

      setTimeout(() => {
        window.location.replace(result.data.data.url);
      }, 3000);
    }
  } catch (error) {
    $toast.error("Oops something went wrong!", { position: "top" });
  } finally {
    hideFetching();
  }
}

async function cancel() {
  const confirmResponse = confirm(
    "Are you sure want to cancel the order? It will canceled permanently!"
  );

  showFetching();

  try {
    if (confirmResponse) {
      await orderService.cancel(orderId);
    }

    $toast.success("Order has been canceled!", { position: "top" });
  } catch (error) {
    $toast.error("Oops something went wrong!", { position: "top" });
  } finally {
    hideFetching();
  }
}

onMounted(async () => {
  showLoading();

  try {
    await orderService.get(orderId);
  } catch (error) {
    error;
  } finally {
    hideLoading();
  }
});
</script>

<template>
  <header class="inline">
    <nav
      class="fixed top-0 z-30 flex w-full justify-between px-6 pb-3 pt-5 backdrop-blur-md transition-all duration-500"
      ref="navElement"
    >
      <BackButton />
    </nav>
  </header>

  <LoadingSpinner v-show="isFetching" />

  <main
    class="flex min-h-screen items-center justify-center py-14"
    v-if="!isLoading"
  >
    <div class="mx-4 w-full rounded-3xl bg-white px-6 pt-8" v-if="order">
      <p class="text-[0.65rem] leading-[0] text-blood-moon">
        ID# {{ orderId }}
      </p>
      <span class="text-[0.65rem]">
        {{ formatDateToLocaleId({ date: Date.now(), showTime: true }) }}
      </span>

      <h2
        class="my-4 text-center text-sm font-medium text-blood-moon"
        v-if="order.status === 'uncomplete'"
      >
        Your order is uncomplete! Checkout to complete the order.
      </h2>

      <h2
        class="my-4 text-center text-sm font-medium text-blood-moon"
        v-else-if="order.status === 'canceled'"
      >
        Your order is canceled!.
      </h2>

      <h2 class="my-4 text-center text-sm font-medium text-blood-moon" v-else>
        Your order is on its way!
      </h2>

      <img
        class="mx-auto w-4/5"
        src="../assets/images/order_uncomplete.svg"
        alt=""
        v-if="order.status === 'canceled'"
      />
      <img
        class="mx-auto w-4/5"
        src="../assets/images/order_success.svg"
        alt=""
        v-else-if="order.status === 'complete'"
      />
      <img
        class="mx-auto w-4/5"
        src="../assets/images/order_delivered.svg"
        alt=""
        v-else-if="order.status === 'delivered'"
      />
      <img
        class="mx-auto w-4/5"
        src="../assets/images/order_uncomplete.svg"
        alt=""
        v-else
      />

      <p class="mt-4 font-rubik">Here's your order items</p>

      <ul class="my-4 max-h-60 overflow-y-auto">
        <li
          class="flex w-full items-center gap-x-4 border-b border-dashed py-2 text-sm"
          v-for="item in order.items"
          :key="item.id"
        >
          <div class="flex w-full justify-between gap-x-2 overflow-x-hidden">
            <p class="truncate">{{ item.product.name }}</p>

            <span class="mr-4 whitespace-nowrap">Qty: {{ item.quantity }}</span>
          </div>

          <span>
            {{ formatNumberToIDR(item.quantity * item.product.price) }}
          </span>
        </li>
      </ul>

      <div class="flex justify-end gap-x-4 text-sm font-medium">
        <span>Total: </span>
        <span>{{ formatNumberToIDR(order.subTotal) }}</span>
      </div>

      <div class="pb-2 pt-5">
        <div
          class="my-4 flex justify-evenly gap-x-4"
          v-if="order.status !== 'canceled'"
        >
          <button
            class="rounded bg-transparent p-1 font-medium uppercase tracking-wider text-chilled-chilly transition-all hover:scale-110"
            @click="cancel()"
            :disabled="isFetching"
            v-if="order.status === 'uncomplete'"
          >
            CANCEL
          </button>

          <button
            type="button"
            class="flex gap-x-2 rounded p-1 px-2 font-medium uppercase tracking-wider text-white"
            :class="
              isFetching
                ? 'cursor-default bg-gray-400'
                : 'bg-spandex-green/95 hover:bg-spandex-green/90 active:bg-spandex-green'
            "
            :disabled="isFetching"
            @click="checkout()"
            v-if="order.status === 'uncomplete'"
          >
            Checkout
          </button>
        </div>

        <p class="pt-3 text-center text-[0.65rem]">
          Have any troubles? Please contact
          <span class="text-seljuk-blue">the support</span>
        </p>
      </div>
    </div>

    <div v-else>Order not found!</div>
  </main>

  <div
    class="flex h-screen items-center justify-center bg-zhen-zhu-bai-pearl"
    v-else
  >
    <strong class="text-2xl">Loading...</strong>
  </div>
</template>
