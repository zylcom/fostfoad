import { computed, ref } from "vue";
import { defineStore } from "pinia";
import {
  calculateTotalItems,
  calculateTotalPrice,
  saveCartToLocalstorage,
} from "../utils";

export const useCartStore = defineStore("Cart", () => {
  const cart = ref({});
  const getMyCart = computed(() => cart.value);

  function setMyCart(cartData) {
    cart.value = {
      ...cartData,
      totalItems: calculateTotalItems(cartData.cartItems),
      totalPrice: calculateTotalPrice(cartData.cartItems),
    };

    saveCartToLocalstorage(cart.value);
  }

  function upsertItem(item) {
    const updatedItems = [
      ...cart.value.cartItems.filter(
        (val) => val.productSlug !== item.productSlug
      ),
      { ...item },
    ];

    const infoMessage =
      cart.value.cartItems.length === updatedItems.length ? "Updated" : "Added";

    setMyCart({ cartItems: updatedItems });

    return infoMessage;
  }

  function getItem(productSlug) {
    const cart = getMyCart;

    return cart.value.cartItems.find(
      (item) => item.product?.slug === productSlug
    );
  }

  function deleteItem(itemProductSlug) {
    const updatedItems = cart.value.cartItems.filter(
      (item) => item.product.slug !== itemProductSlug
    );

    setMyCart({ cartItems: updatedItems });

    return "Item deleted!";
  }

  return {
    cart,
    getMyCart,
    deleteItem,
    getItem,
    setMyCart,
    upsertItem,
  };
});
