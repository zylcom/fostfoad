import { defineStore } from "pinia";
import { ref } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useLoadingStore } from "./loading";
import { CHECKOUT_ORDER_QUERY, GET_ORDER_BY_ID_QUERY } from "@/config";

export const useOrderStore = defineStore("Order", () => {
  const loadingStore = useLoadingStore();
  const order = ref(null);
  const isPaymentValid = ref(false);

  function checkoutOrder(orderId) {
    loadingStore.showLoading();

    const { mutate, onDone, onError } = useMutation(CHECKOUT_ORDER_QUERY);

    mutate({ orderId });

    onDone((mutateResult) => {
      console.log(mutateResult.data.checkoutOrder);

      if (mutateResult.data.checkoutOrder.__typename === "CheckoutSession") {
        window.location.href = mutateResult.data.checkoutOrder.url;
      }

      loadingStore.hideLoading();
    });

    onError(({ networkError }) => {
      if (networkError) {
        alert(networkError.message);
      }

      loadingStore.hideLoading();
    });
  }

  function getOrderById(orderId, sessionId) {
    const { onResult, onError, loading } = useQuery(GET_ORDER_BY_ID_QUERY, {
      orderId,
    });

    onResult((queryResult) => {
      order.value = null;

      console.log(queryResult.data.getOrderById);

      if (queryResult.data.getOrderById.__typename === "Order") {
        order.value = queryResult.data.getOrderById;

        if (
          sessionId ===
            queryResult.data.getOrderById.checkoutSession.sessionId &&
          queryResult.data.getOrderById.payment.status === "paid"
        ) {
          isPaymentValid.value = true;
        }
      }
    });

    onError(({ networkError }) => {
      if (networkError) {
        alert(networkError.message);
      }

      // loadingStore.hideLoading();
    });

    console.log(isPaymentValid.value);

    return loading;
  }

  return {
    order,
    isPaymentValid,
    checkoutOrder,
    getOrderById,
  };
});
