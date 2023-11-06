import { computed } from "vue";
import validate from "../validation/validation";
import { allStore } from "../stores";
import { axios, calculateTotalPrice, getAccessToken } from "../utils";
import {
  deleteItemValidation,
  upsertCartItemValidation,
} from "../validation/cart-validation";

async function upsert({ productSlug, quantity }) {
  const { cartStore } = allStore();
  const result = validate(upsertCartItemValidation, { productSlug, quantity });

  return axios
    .put(
      "/users/current/carts/items",
      { productSlug: result.productSlug, quantity: result.quantity },
      { headers: { Authorization: getAccessToken() } }
    )
    .then((response) => {
      cartStore.upsertItem(response.data.data);

      if (response.data.data.createdAt === response.data.data.updatedAt) {
        return "Added";
      } else {
        return "Updated";
      }
    });
}

async function deleteItem(itemProductId) {
  const { cartStore, cartItemsStore } = allStore();
  const cart = computed(() => cartStore.cart);
  const items = computed(() => cartItemsStore.items);
  itemProductId = validate(deleteItemValidation, itemProductId);

  return axios
    .delete(`/users/current/carts/items/${itemProductId}`, {
      headers: { Authorization: getAccessToken() },
    })
    .then((response) => {
      const newItems = items.value.filter(
        (item) => item.product.id !== itemProductId
      );

      cartItemsStore.$reset();
      cartItemsStore.set(newItems);

      cart.value.totalPrice = calculateTotalPrice(newItems);

      return response;
    });
}

async function revalidateCart(cart) {
  return axios
    .post(
      "/carts/validate",
      { ...cart },
      {
        cache: false,
        headers: {
          Authorization: getAccessToken(),
        },
      }
    )
    .catch(() => {
      return { data: { data: { cartItems: [], totalPrice: 0 } } };
    });
}

export default { upsert, deleteItem, revalidateCart };
