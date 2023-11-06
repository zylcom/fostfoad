import { ref } from "vue";
import { defineStore } from "pinia";
import { allStore } from ".";
import userService from "../services/user-service";
import {
  getCartFromLocalstorage,
  getGuestUserId,
  removeAccessToken,
  saveGuestUserId,
} from "../utils";
import cartService from "../services/cart-service";
import { z } from "zod";

export const useAuthUserStore = defineStore("User", () => {
  const { cartStore, errorStore } = allStore();
  const authUser = ref(null);
  const isLoggedIn = ref(false);

  async function setAuthUser(data) {
    const cart = getCartFromLocalstorage();
    const validGuestUserId = z
      .string({
        invalid_type_error: "Guest user id must be a string!",
        required_error: "Guest user id is required!",
      })
      .nonempty({ message: "Guest user id is not allowed to be empty!" })
      .uuid({ message: "Guest user id is invalid!" })
      .safeParse(getGuestUserId());

    if (data.isLoggedIn) {
      authUser.value = data.userPayload;

      cartStore.setMyCart(data.userPayload.cart);
    } else {
      removeAccessToken();

      if (data.userPayload === null) {
        await preload();
        return;
      }

      if (!validGuestUserId.success) {
        saveGuestUserId(data.userPayload.guestUserId);
      }

      if (!cart) {
        cartStore.setMyCart({ cartItems: [], totalPrice: 0 });
      } else {
        const result = await cartService.revalidateCart(cart);

        cartStore.setMyCart(result.data.data);
      }
    }
  }

  async function preload() {
    errorStore.$reset();

    return await userService.getMyProfile().then(async (result) => {
      isLoggedIn.value = result.isLoggedIn;

      await setAuthUser(result);

      return result.isLoggedIn;
    });
  }

  function $reset() {
    authUser.value = null;
    isLoggedIn.value = false;
  }

  return {
    authUser,
    isLoggedIn,
    preload,
    setAuthUser,
    $reset,
  };
});
