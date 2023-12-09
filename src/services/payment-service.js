import { axios, getAccessToken, getGuestUserId } from "../utils";

async function get(sessionId) {
  const guestUserId = getGuestUserId();

  return axios
    .get(
      `/payment/${sessionId}${guestUserId ? "?guest_uid=" + guestUserId : ""}`,
      {
        headers: { Authorization: "Bearer ".concat(getAccessToken()) },
      },
    )
    .then((response) => {
      return response;
    });
}

export default { get };
