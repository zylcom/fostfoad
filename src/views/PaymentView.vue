<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import PaymentReceipt from "@/components/PaymentReceipt.vue";
import paymentService from "@/services/payment-service";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useLoading } from "@/composables/useLoading";

const route = useRoute();
const sessionId = route.params.sessionId;
const orderDetail = ref(null);

const { isLoading, showLoading, hideLoading } = useLoading();

onMounted(async () => {
  showLoading();

  try {
    const result = await paymentService.get(sessionId);

    orderDetail.value = result.data.data;
  } catch (error) {
    // console.log(error);
  } finally {
    hideLoading();
  }
});
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-seljuk-blue p-6"
  >
    <LoadingSpinner v-if="isLoading" />

    <h2 class="text-lg text-bleached-silk" v-else-if="!orderDetail">
      Payment detail not found!
    </h2>

    <PaymentReceipt :order="orderDetail" v-else />

    <RouterLink class="mt-12 w-full" to="/">
      <button
        class="w-full rounded-lg bg-bleached-silk py-3 text-center text-sm font-semibold tracking-widest text-seljuk-blue"
      >
        Back to Home
      </button>
    </RouterLink>
  </div>
</template>
