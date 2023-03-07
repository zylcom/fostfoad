import { BASE_URL, GET_MY_PROFILE_QUERY } from "../config";

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

function saveAccessToken(token) {
  localStorage.setItem("accessToken", token);
}

function getAccessToken() {
  return localStorage.getItem("accessToken");
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

let prevScrollpos = window.scrollY;

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

export {
  checkUserIsLoggedIn,
  clearKeyword,
  fetchApiWithToken,
  formatNumberToIDR,
  getAccessToken,
  saveAccessToken,
  hideElementWhenScrollDown,
};
