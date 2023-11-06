import { axios, getAccessToken, getGuestUserId } from "@/utils";

async function create(description) {
  const authToken = getAccessToken();
  const guestUserId = getGuestUserId();

  return axios
    .post(
      `/feedback${guestUserId ? "?guest_uid=" + guestUserId : ""}`,
      { description },
      {
        headers: { Authorization: authToken },
      }
    )
    .then((response) => {
      return response;
    });
}

export default { create };
