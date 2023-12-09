import { ref } from "vue";
import { defineStore } from "pinia";
import { allStore } from ".";
import userService from "../services/user-service";
import {
  getAccessToken,
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
      .min(1, { message: "Guest user id is not allowed to be empty!" })
      .uuid({ message: "Guest user id is invalid!" })
      .safeParse(getGuestUserId());

    if (data.isLoggedIn) {
      localStorage.removeItem("guest_uid");

      authUser.value = data.userPayload;
      cartStore.setMyCart(data.userPayload.cart);
    } else {
      authUser.value = null;
      removeAccessToken();

      // if (data.userPayload === null) {
      //   await preload();
      //   return;
      // }

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

    const token = getAccessToken();
    const guestUserId = getGuestUserId();
    const validGuestUserId = z
      .string({
        invalid_type_error: "Guest user id must be a string!",
        required_error: "Guest user id is required!",
      })
      .min(1, { message: "Guest user id is not allowed to be empty!" })
      .uuid({ message: "Guest user id is invalid!" })
      .safeParse(guestUserId);
    let userData = { isLoggedIn: false, userPayload: null };

    if (token) {
      const result = await userService.getMyProfile();

      if (result !== null) {
        userData.isLoggedIn = true;
        userData.userPayload = result.data.data;
      } else {
        window.location.reload();
      }
    } else if (guestUserId && validGuestUserId.success) {
      userData.userPayload = { guestUserId };
    } else {
      const result = await userService.createGuestUser();

      userData.userPayload = result.data.data;
    }

    setAuthUser(userData);

    return userData;
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
