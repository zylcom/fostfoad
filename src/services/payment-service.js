import { axios, getAccessToken, getGuestUserId } from "../utils";

async function get(sessionId) {
  const authToken = getAccessToken();
  const guestUserId = getGuestUserId();

  return axios
    .get(
      `/payment/${sessionId}${guestUserId ? "?guest_uid=" + guestUserId : ""}`,
      {
        headers: { Authorization: authToken },
      }
    )
    .then((response) => {
      return response;
    });
}

export default { get };
