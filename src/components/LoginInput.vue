<script setup>
import { ref } from "vue";

const phoneNumber = ref("");
const password = ref("");
</script>

<template>
  <form action="" class="mx-5 mt-8 text-sm">
    <label for="phone">
      Phone Number

      <input
        type="text"
        id="phone"
        class="block w-full rounded-[10px] bg-bleached-silk px-1 py-4 text-sm placeholder:font-roboto focus:outline-none focus:ring-0"
        placeholder="Phone Number"
        v-model="phoneNumber"
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

    <label
      for="remember-me"
      class="flex items-center gap-x-1 text-[length:10px]"
    >
      <input type="checkbox" name="" id="remember-me" />

      Remember me
    </label>

    <button
      type="submit"
      class="my-6 w-full rounded-lg bg-torii-red/95 py-2 font-rubik text-charolais-cattle hover:bg-torii-red/90 active:bg-torii-red"
    >
      Login
    </button>
  </form>
</template>
