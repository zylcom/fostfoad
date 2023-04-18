import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { allStore } from ".";
import { checkUserIsLoggedIn, saveAccessToken } from "../utils";
import { LOGIN_QUERY, REGISTER_USER_QUERY } from "../config";

export const useAuthUserStore = defineStore("User", () => {
  const { cartStore, errorStore, loadingStore } = allStore();
  const authUser = ref(null);
  const getAuthUser = computed(() => authUser);
  const isLoggedIn = ref(false);

  function setAuthUser(userPayload) {
    if (userPayload) {
      authUser.value = userPayload;

      cartStore.fetchMyCart();
    } else {
      authUser.value = null;
    }
  }

  async function preload() {
    errorStore.$reset();

    return await checkUserIsLoggedIn().then((res) => {
      isLoggedIn.value = res.isLoggedIn;

      setAuthUser(res.userPayload);

      return res.isLoggedIn;
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
        setAuthUser(queryResult.data.authenticate.data);
        saveAccessToken(queryResult.data.authenticate.token);
        cartStore.fetchMyCart();
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
        setAuthUser(mutateResult.data.registerUser.data);
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

  return {
    authUser,
    getAuthUser,
    isLoggedIn,
    login,
    preload,
    register,
    setAuthUser,
  };
});
