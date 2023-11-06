import validate from "../validation/validation";
import { axios, getAccessToken, getGuestUserId } from "@/utils";
import { useOrderStore } from "@/stores/order";
import { orderIdValidation } from "../validation/order-validation";

async function create(cart) {
  const authToken = getAccessToken();
  const guestUserId = getGuestUserId();

  return axios
    .post(`/orders${guestUserId ? "?guest_uid=" + guestUserId : ""}`, cart, {
      headers: { Authorization: authToken },
    })
    .then(async (response) => {
      if (response.status === 200) {
        return await checkout(response.data.data.id, cart);
      }

      return response;
    });
}

async function checkout(orderId, cart) {
  orderId = validate(orderIdValidation, orderId);
  const authToken = getAccessToken();
  const guestUserId = getGuestUserId();

  return axios.post(
    `/orders/checkout?id=${orderId}${
      guestUserId ? "&guest_uid=" + guestUserId : ""
    }`,
    cart,
    { headers: { Authorization: authToken } }
  );
}

async function get(orderId) {
  const orderStore = useOrderStore();
  const authToken = getAccessToken();
  const guestUserId = getGuestUserId();

  orderId = validate(orderIdValidation, orderId);

  return axios
    .get(
      `/orders/${orderId}${guestUserId ? "?guest_uid=" + guestUserId : ""}`,
      { headers: { Authorization: authToken } }
    )
    .then((response) => {
      orderStore.set(response.data.data);

      return response;
    });
}

async function cancel(orderId) {
  const orderStore = useOrderStore();

  orderId = validate(orderIdValidation, orderId);

  return axios
    .post(
      `/orders/${orderId}/cancel`,
      {},
      { headers: { Authorization: getAccessToken() } }
    )
    .then((response) => {
      console.log(response.data);

      orderStore.set(response.data.data);

      return response;
    });
}

export default { create, checkout, get, cancel };
