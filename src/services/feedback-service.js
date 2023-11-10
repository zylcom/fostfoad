import { axios, getAccessToken, getGuestUserId } from "@/utils";
import validate from "../validation/validation";
import { descriptionValidation } from "../validation/feedback-validation";

async function create(description) {
  const authToken = getAccessToken();
  const guestUserId = getGuestUserId();

  description = validate(descriptionValidation, description);

  console.log(description);

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
