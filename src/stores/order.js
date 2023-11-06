import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrderStore = defineStore("Order", () => {
  const order = ref(null);
  const isPaymentValid = ref(false);

  function set(data) {
    order.value = data;
  }

  return {
    order,
    isPaymentValid,
    set,
  };
});
