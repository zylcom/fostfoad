<script setup>
import { ref, watch } from "vue";

const password = ref("");
const confirmPassword = ref("");
const confirmPasswordInput = ref();

watch([password, confirmPassword], () => {
  if (
    password.value !== confirmPassword.value &&
    confirmPassword.value !== ""
  ) {
    confirmPasswordInput.value.classList.add("border", "border-red-400");
  } else {
    confirmPasswordInput.value.classList.remove("border", "border-red-400");
  }
});
</script>

<template>
  <form action="" class="mx-5 mt-8 text-sm">
    <label for="name">
      Name

      <input
        type="text"
        id="name"
        class="block w-full rounded-[10px] bg-bleached-silk px-1 py-4 text-sm placeholder:font-roboto focus:outline-none focus:ring-0"
        placeholder="Your Name"
        required
      />
    </label>

    <label for="phone">
      Phone Number

      <input
        type="text"
        id="phone"
        class="block w-full rounded-[10px] bg-bleached-silk px-1 py-4 text-sm placeholder:font-roboto focus:outline-none focus:ring-0"
        placeholder="Phone Number"
        required
      />
    </label>

    <label for="password">
      Password

      <input
        type="password"
        id="password"
        class="block w-full rounded-[10px] bg-bleached-silk px-1 py-4 text-sm placeholder:font-roboto focus:outline-none focus:ring-0"
        placeholder="Password"
        minlength="8"
        v-model="password"
        required
      />
    </label>

    <label for="confirm-password">
      Confirm Password

      <input
        type="password"
        id="confirm-password"
        class="block w-full rounded-[10px] bg-bleached-silk px-1 py-4 text-sm placeholder:font-roboto focus:outline-none"
        placeholder="Confirm Your Password"
        v-model="confirmPassword"
        ref="confirmPasswordInput"
        required
      />
    </label>

    <button
      type="submit"
      class="my-6 w-full rounded-lg bg-torii-red/95 py-2 font-rubik text-charolais-cattle hover:bg-torii-red/90 active:bg-torii-red"
    >
      Login
    </button>
  </form>
</template>
