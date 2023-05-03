<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { allStore } from "../stores";

const route = useRouter();
const { authUserStore, errorStore } = allStore();
const name = ref("");
const email = ref("");
const phoneNumber = ref("");
const password = ref("");
const confirmPassword = ref("");
const confirmPasswordInput = ref("");
const phoneCountryCode = ref("ID");
const authUser = authUserStore.getAuthUser;
const error = errorStore.getError;

function onSubmitHandler() {
  authUserStore.register({
    name: name.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    password: password.value,
    confirmationPassword: confirmPassword.value,
    countryCode: phoneCountryCode.value,
  });
}

function onPhoneNumberInput(number, phoneObject) {
  phoneNumber.value = number;
  phoneCountryCode.value = phoneObject.country?.iso2 || "ID";
}

watch([name, email, phoneNumber], () => {
  errorStore.$reset();
});

watch([password, confirmPassword], ([newPassword, newConfirmPassword]) => {
  if (newPassword !== "" || newConfirmPassword !== "") {
    errorStore.$reset();
  }
});

watch(error, (newValue) => {
  if (newValue) {
    password.value = "";
    confirmPassword.value = "";
  }
});

watch(authUser, () => {
  if (authUser.value) {
    route.push({ path: "/" });
  }
});
</script>

<template>
  <form
    action=""
    class="mx-5 mt-8 text-sm [&>label]:block [&>*]:mt-5"
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
    </label>

    <label for="email">
      Email

      <input
        type="text"
        id="email"
        class="block w-full rounded-[10px] bg-bleached-silk px-1 py-4 text-sm placeholder:font-roboto focus:outline-none focus:ring-0"
        :class="{
          'border border-red-400': error && error.errorType === 'email',
        }"
        placeholder="email@example.com"
        v-model="email"
        data-cy="email-input"
        required
      />

      <span
        v-if="error && error.errorType === 'email'"
        class="block text-xs text-red-500"
      >
        {{ error.message }}
      </span>
    </label>

    <div>
      Phone Number

      <vue-tel-input
        class="rounded-[10px] text-sm placeholder:font-roboto [&_ul]:w-[80vw] [&_ul]:max-w-[390px] [&_input]:rounded-r-[10px] [&_input]:bg-bleached-silk [&_input]:py-4 [&>div]:rounded-l-[10px]"
        v-model="phoneNumber"
        @on-input="onPhoneNumberInput"
        defaultCountry="ID"
        :class="{
          'border border-red-400': error && error.errorType === 'phone-number',
        }"
        :inputOptions="{
          id: 'phone-number-input',
          showDialCode: true,
          required: true,
        }"
        validCharactersOnly
      />

      <span
        v-if="error && error.errorType === 'phone-number'"
        class="block text-xs text-red-500"
      >
        {{ error.message }}
      </span>
    </div>

    <label for="password">
      Password

      <input
        type="password"
        id="password"
        class="block w-full rounded-[10px] bg-bleached-silk px-1 py-4 text-sm placeholder:font-roboto focus:outline-none focus:ring-0"
        :class="{
          'border border-red-400': error && error.errorType === 'password',
        }"
        placeholder="Password"
        minlength="8"
        v-model="password"
        data-cy="password-input"
        required
      />

      <span
        v-if="error && error.errorType === 'password'"
        class="block text-xs text-red-500"
      >
        {{ error.message }}
      </span>
    </label>

    <label for="confirm-password">
      Confirm Password

      <input
        type="password"
        id="confirm-password"
        class="block w-full rounded-[10px] bg-bleached-silk px-1 py-4 text-sm placeholder:font-roboto focus:outline-none"
        :class="{
          'border border-red-400': error && error.errorType === 'password',
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
        v-if="error && error.errorType === 'general'"
        class="mt-2 block text-center text-sm text-red-500"
      >
        {{ error.message }}
      </span>

      <button
        type="submit"
        class="mt-6 w-full rounded-lg bg-torii-red/95 py-2 font-rubik text-charolais-cattle hover:bg-torii-red/90 active:bg-torii-red"
      >
        Register
      </button>
    </div>
  </form>
</template>
