<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { allStore } from "../stores";
import IconLoading from "../components/icons/IconLoading.vue";
import userService from "../services/user-service";
import { saveAccessToken } from "../utils";

const route = useRouter();
const { authUserStore, errorStore, loadingStore } = allStore();
const name = ref("");
const username = ref("");
const phonenumber = ref("");
const password = ref("");
const confirmPassword = ref("");
const confirmPasswordInput = ref("");
const phoneCountryCode = ref("ID");
const authUser = computed(() => authUserStore.authUser);
const error = errorStore.getError;

async function onSubmitHandler() {
  loadingStore.showLoading();

  try {
    const result = await userService.register({
      name: name.value,
      username: username.value,
      phonenumberForm: {
        number: phonenumber.value,
        countryCode: phoneCountryCode.value,
      },
      passwordForm: {
        password: password.value,
        confirm: confirmPassword.value,
      },
    });

    saveAccessToken(result.data.data.token);
    authUserStore.preload();
  } catch (error) {
    if (error.response) {
      errorStore.setError({
        general: { _errors: [error.response.data.errors] },
      });
    } else {
      errorStore.setError(error.issues);
    }
  } finally {
    loadingStore.hideLoading();
  }
}

function onPhoneNumberInput(number, phoneObject) {
  phonenumber.value = number;
  phoneCountryCode.value = phoneObject.country?.iso2 || "ID";
}

watch(authUser, () => {
  route.push({ path: "/" });
});

watch([password, confirmPassword], () => {
  errorStore.$reset();
});
</script>

<template>
  <form
    action=""
    class="mx-5 mt-8 text-sm [&>*]:mt-5 [&>label]:block"
    data-cy="form-register"
    @submit.prevent="onSubmitHandler()"
  >
    <label for="name">
      Name

      <input
        type="text"
        id="name"
        class="block w-full rounded-[10px] bg-bleached-silk px-1 py-4 text-sm placeholder:font-roboto focus:outline-none focus:ring-0"
        placeholder="Your Name"
        v-model="name"
        data-cy="name-input"
        autofocus
        required
      />

      <span v-if="error && error.name" class="block text-xs text-red-500">
        {{ error.name._errors[0] }}
      </span>
    </label>

    <label for="username">
      Username

      <input
        type="text"
        id="username"
        class="block w-full rounded-[10px] bg-bleached-silk px-1 py-4 text-sm placeholder:font-roboto focus:outline-none focus:ring-0"
        :class="{
          'border border-red-400': error && error.username,
        }"
        placeholder="john doe"
        v-model="username"
        data-cy="username-input"
        required
      />

      <span v-if="error && error.username" class="block text-xs text-red-500">
        {{ error.username._errors[0] }}
      </span>
    </label>

    <div>
      Phone Number

      <vue-tel-input
        class="rounded-[10px] text-sm placeholder:font-roboto [&>div]:rounded-l-[10px] [&_input]:rounded-r-[10px] [&_input]:bg-bleached-silk [&_input]:py-4 [&_ul]:w-[80vw] [&_ul]:max-w-[390px]"
        v-model="phonenumber"
        @on-input="onPhoneNumberInput"
        defaultCountry="ID"
        :class="{
          'border border-red-400': error && error?.phonenumberForm?.number,
        }"
        :inputOptions="{
          id: 'phone-number-input',
          showDialCode: true,
          required: true,
        }"
        validCharactersOnly
      />

      <span
        v-if="error && error?.phonenumberForm?.number"
        class="block text-xs text-red-500"
      >
        {{ error.phonenumberForm.number._errors[0] }}
      </span>
    </div>

    <label for="password">
      Password

      <input
        type="password"
        id="password"
        class="block w-full rounded-[10px] bg-bleached-silk px-1 py-4 text-sm placeholder:font-roboto focus:outline-none focus:ring-0"
        :class="{
          'border border-red-400': error && error.passwordForm,
        }"
        placeholder="Password"
        minlength="8"
        v-model="password"
        data-cy="password-input"
        required
      />

      <span
        v-if="error && error.passwordForm"
        class="block text-xs text-red-500"
      >
        {{
          error.passwordForm?.confirm?._errors[0] ||
          error.passwordForm.password._errors[0]
        }}
      </span>
    </label>

    <label for="confirm-password">
      Confirm Password

      <input
        type="password"
        id="confirm-password"
        class="block w-full rounded-[10px] bg-bleached-silk px-1 py-4 text-sm placeholder:font-roboto focus:outline-none"
        :class="{
          'border border-red-400': error && error.passwordForm,
        }"
        placeholder="Confirm Your Password"
        v-model="confirmPassword"
        ref="confirmPasswordInput"
        data-cy="confirm-password-input"
        required
      />
    </label>

    <div>
      <span
        v-if="!!error && !!error.general"
        class="block text-sm text-red-500"
      >
        {{ error.general._errors[0] }}
      </span>

      <button
        type="submit"
        class="my-6 flex w-full items-center justify-center gap-x-2 rounded-lg py-2 font-rubik text-charolais-cattle"
        :class="
          loadingStore.isLoading
            ? 'bg-gray-400 hover:bg-gray-400'
            : 'bg-torii-red/95 hover:bg-torii-red/90 active:bg-torii-red'
        "
        :disabled="loadingStore.isLoading"
      >
        <IconLoading class="my-0" v-if="loadingStore.isLoading" />
        Register
      </button>
    </div>
  </form>
</template>
