import validate from "../validation/validation";
import { allStore } from "../stores";
import { axios, getAccessToken } from "../utils";
import {
  productSlug,
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

async function deleteItem(itemProductSlug) {
  itemProductSlug = validate(productSlug, itemProductSlug);

  return axios
    .delete(`/users/current/carts/items/${itemProductSlug}`, {
      headers: { Authorization: getAccessToken() },
    })
    .then((response) => {
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
