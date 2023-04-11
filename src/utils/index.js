import { BASE_URL, GET_MY_PROFILE_QUERY } from "../config";

let prevScrollpos = window.scrollY;

async function fetchApiWithToken(query, variables) {
  return await fetch(BASE_URL, {
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
  return number ? parseFloat(number.toFixed(1)) : "";
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
  let result = false;

  result = await fetchApiWithToken(GET_MY_PROFILE_QUERY)
    .then((response) => {
      if (response.data.getMyProfile.__typename === "User") {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);

      return false;
    });

  return result;
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

export {
  checkUserIsLoggedIn,
  clearKeyword,
  fetchApiWithToken,
  formatFloatNumber,
  formatNumberToIDR,
  getAccessToken,
  getCartItem,
  hideElementWhenScrollDown,
  isNumberKey,
  removeAccessToken,
  saveAccessToken,
};
