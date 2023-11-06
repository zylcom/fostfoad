import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation";
import validate from "../validation/validation";
import { axios, getAccessToken } from "../utils";

async function register({ name, username, passwordForm, phonenumberForm }) {
  const result = validate(registerUserValidation, {
    username,
    passwordForm,
    name,
    phonenumberForm,
  });

  return axios.post(
    "/users",
    {
      username: result.username,
      name: result.username,
      phonenumberForm: result.phonenumberForm,
      password: result.passwordForm.password,
    },
    { cache: false }
  );
}

async function getMyProfile() {
  return await axios
    .get("/users/current", {
      headers: { Authorization: getAccessToken() },
    })
    .then((response) => {
      if (response.status === 200 && response.data.data.username) {
        localStorage.removeItem("guest_uid");

        return {
          isLoggedIn: true,
          userPayload: response.data.data,
        };
      } else if (response.status === 200 && response.data.data.guestUserId) {
        return { isLoggedIn: false, userPayload: response.data.data };
      } else {
        return { isLoggedIn: false, userPayload: null };
      }
    })
    .catch(() => {
      return { isLoggedIn: false, userPayload: null };
    });
}

async function login(data) {
  const result = validate(loginUserValidation, data);

  return await axios.post(
    "/users/login",
    {
      username: result.username,
      password: result.password,
    },
    { cache: false }
  );
}

export default { register, getMyProfile, login };
