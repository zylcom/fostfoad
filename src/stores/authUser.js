import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useQuery } from "@vue/apollo-composable";
import { allStore } from ".";
import { fetchApiWithToken, saveAccessToken } from "../utils";
import { GET_MY_PROFILE_QUERY, LOGIN_QUERY } from "../config";

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
        console.log(error);
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

    // fetchApi(LOGIN_QUERY, { authIdentifier: phoneNumber, password })
    //   .then((response) => {
    //     if (response.data.data.authenticate.__typename === "UserAuth") {
    //       authUser.value = response.data.data.authenticate.data;

    //       saveAccessToken(response.data.data.authenticate.token);
    //     } else {
    //       errorStore.setError({ message: "Invalid credentials!" });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     loadingStore.hideLoading();
    //   });
  }

  return { authUser, getAuthUser, login, preload };
});
