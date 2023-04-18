import { GET_MY_PROFILE_QUERY } from "../config";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;
let prevScrollpos = window.scrollY;

async function fetchApiWithToken(query, variables) {
  return await fetch(baseApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({ query, variables }),
  }).then((response) => response.json());
}

function clearKeyword(keyword) {
  return keyword ? keyword.trim().replace(/\s{2,}/g, " ") : undefined;
}

function formatNumberToIDR(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

function formatFloatNumber(number) {
  return number ? parseFloat(number.toFixed(1)) : 0;
}

function saveAccessToken(token) {
  localStorage.setItem("accessToken", token);
}

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function removeAccessToken() {
  localStorage.removeItem("accessToken");
}

async function checkUserIsLoggedIn() {
  return await fetchApiWithToken(GET_MY_PROFILE_QUERY)
    .then((response) => {
      if (response.data.getMyProfile.__typename === "User") {
        return { isLoggedIn: true, userPayload: response.data.getMyProfile };
      } else {
        return { isLoggedIn: false, userPayload: null };
      }
    })
    .catch((error) => {
      console.log(error.message);

      return { isLoggedIn: false, userPayload: null };
    });
}

function hideElementWhenScrollDown(element) {
  const currentScrollpos = window.scrollY;

  if (
    prevScrollpos > currentScrollpos ||
    window.innerHeight >= document.body.scrollHeight
  ) {
    element.value.style.top = "0";
  } else {
    element.value.style.top = "-65px";
  }

  prevScrollpos = currentScrollpos;
}

function isNumberKey(event) {
  const charCode = event.which ? event.which : event.keyCode;

  return charCode > 31 && (charCode < 48 || charCode > 57) ? false : true;
}

function getCartItem(cartItems, productId) {
  if (!cartItems) {
    return {};
  }

  const cartItem = cartItems.find((item) => +item.product.id === productId);

  return cartItem || {};
}

function formatNumber(number) {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + "B";
  }

  return number;
}

export {
  checkUserIsLoggedIn,
  clearKeyword,
  fetchApiWithToken,
  formatFloatNumber,
  formatNumber,
  formatNumberToIDR,
  getAccessToken,
  getCartItem,
  hideElementWhenScrollDown,
  isNumberKey,
  removeAccessToken,
  saveAccessToken,
};
