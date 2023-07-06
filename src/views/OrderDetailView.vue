<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import IconArrow from "@/components/icons/IconArrow.vue";
import { allStore } from "@/stores";
import { formatDateToLocaleId, formatNumberToIDR } from "@/utils";

const route = useRoute();
const { loadingStore, orderStore } = allStore();
const orderId = +route.params.id;
const sessionId = route.query.session_id;
const loadingOrder = ref(true);
const showAlert = computed(() => orderStore.isPaymentValid);

function checkoutOrderHandler() {
  orderStore.checkoutOrder(orderId);
}

onMounted(() => {
  loadingOrder.value = orderStore.getOrderById(orderId, sessionId);
});
</script>

<template>
  <v-layout>
    <v-app-bar
      class="bg-cloud-break"
      scroll-behavior="hide"
      scroll-threshold="10"
    >
      <template v-slot:prepend>
        <RouterLink to="/history">
          <IconArrow />
        </RouterLink>
      </template>
    </v-app-bar>

    <v-main>
      <v-overlay
        :model-value="loadingOrder.value"
        class="align-center justify-center"
        v-if="loadingOrder.value"
        persistent
      >
        <v-progress-circular color="primary" indeterminate size="64" />
      </v-overlay>

      <v-container
        class="flex min-h-screen flex-col items-center justify-center"
        v-else
        fluid
      >
        <v-container v-if="!orderStore.order" class="text-center" fluid>
          Nothing to show

          <RouterLink to="/">
            <v-btn color="success" block>Go Home</v-btn>
          </RouterLink>
        </v-container>

        <v-container v-else fluid>
          <v-alert
            class="mb-4"
            type="success"
            title="Payment Successfully!"
            v-if="showAlert"
            closable
          />

          <v-card class="w-full border-t-4 border-t-torii-red">
            <v-card-title class="my-2 font-rubik">
              <p class="text-sm text-chilled-chilly">
                Order ID #<span class="text-dark-tone-ink">{{
                  orderStore.order.id
                }}</span>
              </p>

              <p class="text-xs text-gray-500">
                {{
                  formatDateToLocaleId({
                    date: orderStore.order.createdAt,
                    showTime: true,
                  })
                }}
              </p>
            </v-card-title>

            <v-card-subtitle>
              <h2
                class="my-3 whitespace-break-spaces text-center text-base font-medium text-torii-red"
              >
                {{
                  orderStore.order.status === "uncomplete"
                    ? "Your order is uncomplete. Checkout to complete the order."
                    : "Your order is on its way!"
                }}
              </h2>

              <v-img
                class="mx-auto"
                :width="500"
                :height="200"
                src="../src/assets/images/order_uncomplete.svg"
                lazy-src="../src/assets/images/order_uncomplete.svg"
                aspect-ratio="1"
                cover
                v-if="orderStore.order.status === 'uncomplete'"
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center fill-height justify-center" />
                </template>
              </v-img>

              <v-img
                class="mx-auto"
                :width="500"
                :height="200"
                src="../src/assets/images/order_success.svg"
                lazy-src="../src/assets/images/order_success.svg"
                aspect-ratio="1"
                cover
                v-else-if="orderStore.order.status === 'success'"
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center fill-height justify-center" />
                </template>
              </v-img>

              <v-img
                class="mx-auto"
                :width="500"
                :height="200"
                src="../src/assets/images/order_waiting.svg"
                lazy-src="../src/assets/images/order_waiting.svg"
                aspect-ratio="1"
                cover
                v-else
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center fill-height justify-center" />
                </template>
              </v-img>
            </v-card-subtitle>

            <v-card-text>
              <h2 class="font-semibold">Here's your receipt</h2>

              <div class="my-4 max-h-60 overflow-scroll">
                <ul
                  class="grid w-full grid-cols-6 items-center gap-x-4 border-b border-dashed py-2"
                  v-for="item in orderStore.order.orderItems"
                  :key="item.id"
                >
                  <li class="col-span-3">{{ item.product.name }}</li>

                  <li class="mr-4 whitespace-nowrap">
                    qty: {{ item.quantity }}
                  </li>
                  <li class="col-end-7 place-self-end self-center">
                    {{ formatNumberToIDR(item.product.price) }}
                  </li>
                </ul>
              </div>

              <div class="flex justify-end gap-x-4 font-medium">
                <span>Total: </span>
                <span>{{
                  formatNumberToIDR(orderStore.order.amountSubtotal)
                }}</span>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer />

              <v-btn color="error" :disabled="loadingStore.isLoading">
                Delete
              </v-btn>

              <v-btn
                :loading="loadingStore.isLoading"
                color="success"
                @click="checkoutOrderHandler()"
                v-if="orderStore.order.status === 'uncomplete'"
              >
                Checkout
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-container>
    </v-main>
  </v-layout>
</template>
