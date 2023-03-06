import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { allStore } from ".";
import { fetchApiWithToken, saveAccessToken } from "../utils";
import {
  GET_MY_PROFILE_QUERY,
  LOGIN_QUERY,
  REGISTER_USER_QUERY,
} from "../config";

export const useAuthUserStore = defineStore("User", () => {
  const { errorStore, loadingStore } = allStore();
  const authUser = ref(null);
  const getAuthUser = computed(() => authUser);

  async function preload() {
    errorStore.$reset();

    await fetchApiWithToken(GET_MY_PROFILE_QUERY)
      .then((response) => {
        if (response.data.getMyProfile.__typename === "User") {
          authUser.value = response.data.getMyProfile;
        } else {
          authUser.value = null;
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function login(email, password) {
    loadingStore.showLoading();

    const { onResult, onError } = useQuery(LOGIN_QUERY, {
      email,
      password,
    });

    onResult((queryResult) => {
      if (queryResult.data.authenticate.__typename === "UserAuth") {
        authUser.value = queryResult.data.authenticate.data;

        saveAccessToken(queryResult.data.authenticate.token);
      } else {
        errorStore.setError({ message: "Invalid credentials!" });
      }

      loadingStore.hideLoading();
    });

    onError(({ networkError }) => {
      if (networkError) {
        alert(networkError.message);
      }

      loadingStore.hideLoading();
    });
  }

  function register({ name, email, phoneNumber, password, countryCode }) {
    loadingStore.showLoading();

    const { mutate, onDone, onError } = useMutation(REGISTER_USER_QUERY);

    mutate({ name, email, phoneNumber, password, countryCode });

    onDone((mutateResult) => {
      if (mutateResult.data.registerUser.__typename === "UserAuth") {
        authUser.value = mutateResult.data.registerUser.data;

        saveAccessToken(mutateResult.data.registerUser.token);
      } else {
        switch (mutateResult.data.registerUser.message) {
          case `Email ${email} already in use!`:
            errorStore.setError({
              errorType: "email",
              message: mutateResult.data.registerUser.message,
            });
            break;

          case "Email is invalid!":
            errorStore.setError({
              errorType: "email",
              message: mutateResult.data.registerUser.message,
            });
            break;

          case `Phone Number ${phoneNumber} already in use!`:
            errorStore.setError({
              errorType: "phone-number",
              message: mutateResult.data.registerUser.message,
            });
            break;

          case `Phone number is invalid!`:
            errorStore.setError({
              errorType: "phone-number",
              message: mutateResult.data.registerUser.message,
            });
            break;

          default:
            errorStore.setError({
              errorType: "general",
              message: "Register account failed",
            });
            break;
        }
      }

      loadingStore.hideLoading();
    });

    onError(({ networkError }) => {
      if (networkError) {
        alert(networkError.message);
      }

      loadingStore.hideLoading();
    });
  }

  return { authUser, getAuthUser, login, preload, register };
});
