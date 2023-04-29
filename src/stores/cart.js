import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useMutation, useQuery } from "@vue/apollo-composable";
import {
  DELETE_CART_ITEM_BY_ID_QUERY,
  GET_MY_CART_QUERY,
  UPDATE_MY_CART_QUERY,
} from "../config";
import { useLoadingStore } from "./loading";

export const useCartStore = defineStore("Cart", () => {
  const loadingStore = useLoadingStore();
  const cart = ref({});
  const getMyCart = computed(() => cart);

  function setMyCart(cartData) {
    cart.value = cartData;
  }

  function fetchMyCart() {
    loadingStore.showLoading();

    const { onResult, onError } = useQuery(
      GET_MY_CART_QUERY,
      {},
      { fetchPolicy: "no-cache" }
    );

    onResult((queryResult) => {
      if (queryResult.data.getMyCart.__typename === "Cart") {
        setMyCart(queryResult.data.getMyCart);
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

  function updateMyCart(productId, quantity) {
    loadingStore.showLoading();

    const { mutate, onDone, onError } = useMutation(UPDATE_MY_CART_QUERY, {
      fetchPolicy: "no-cache",
    });

    mutate({ productId, quantity });

    onDone((mutateResult) => {
      if (mutateResult.data.updateMyCart.__typename === "Cart") {
        setMyCart(mutateResult.data.updateMyCart);
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

  function deleteCartItemById(id) {
    loadingStore.showLoading();

    const { mutate, onDone, onError } = useMutation(
      DELETE_CART_ITEM_BY_ID_QUERY,
      { fetchPolicy: "no-cache" }
    );

    mutate({ cartItemId: id });

    onDone((mutateResult) => {
      if (mutateResult.data.deleteCartItemById.__typename === "Cart") {
        setMyCart(mutateResult.data.deleteCartItemById);
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

  return {
    cart,
    getMyCart,
    deleteCartItemById,
    fetchMyCart,
    setMyCart,
    updateMyCart,
  };
});
