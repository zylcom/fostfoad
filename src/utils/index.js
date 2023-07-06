import { GET_MY_PROFILE_QUERY } from "../config";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

async function fetchApiWithToken({ query, variables, operationName }) {
  return await fetch(baseApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({ operationName, query, variables }),
  }).then((response) => response.json());
}

function clearKeyword(keyword) {
  return keyword ? keyword.trim().replace(/\s{2,}/g, " ") : undefined;
}

function formatNumberToIDR(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
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
  return await fetchApiWithToken({
    query: GET_MY_PROFILE_QUERY,
    operationName: "GetMyProfile",
  })
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

function formatDateToLocaleId({ date, showTime, hour12 }) {
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  if (showTime) {
    options.hour = "numeric";
    options.minute = "numeric";
    options.hour12 = hour12;
  }

  return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
}

export {
  checkUserIsLoggedIn,
  clearKeyword,
  fetchApiWithToken,
  formatDateToLocaleId,
  formatFloatNumber,
  formatNumber,
  formatNumberToIDR,
  getAccessToken,
  getCartItem,
  isNumberKey,
  removeAccessToken,
  saveAccessToken,
};
