<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { allStore } from "../stores";

const route = useRouter();
const email = ref("");
const password = ref("");

const { authUserStore, errorStore } = allStore();
const authUser = authUserStore.getAuthUser;
const error = errorStore.getError;

function onSubmitHandle() {
  authUserStore.login(email.value, password.value);
}

watch(authUser, () => {
  if (authUser.value) {
    route.push({ path: "/" });
  }
});

watch([email, password], () => {
  errorStore.$reset();
});
</script>

<template>
  <form action="" class="mx-5 mt-8 text-sm" @submit.prevent="onSubmitHandle">
    <label for="email">
      Email

      <input
        type="email"
        id="email"
        class="block w-full rounded-[10px] bg-bleached-silk px-1 py-4 text-sm placeholder:font-roboto focus:outline-none focus:ring-0"
        :class="error ? 'border border-red-400' : ''"
        v-model="email"
        placeholder="email@example.com"
        autofocus
        required
      />
    </label>

    <label for="password" class="mt-3 block">
      Password

      <input
        type="password"
        id="password"
        class="block w-full rounded-[10px] bg-bleached-silk px-1 py-4 text-sm placeholder:font-roboto focus:outline-none focus:ring-0"
        :class="error ? 'border border-red-400' : ''"
        v-model="password"
        placeholder="Password"
        required
      />
    </label>

    <label
      for="remember-me"
      class="float-righ inline-flex items-center gap-x-1 text-[length:10px]"
    >
      <input type="checkbox" name="" id="remember-me" />

      Remember me
    </label>

    <a href="#" class="float-right text-[length:10px] text-venetian-nights">
      Forgot password?
    </a>

    <span v-if="error" class="mt-2 block text-sm text-red-500">
      {{ error.message }}
    </span>

    <button
      type="submit"
      class="my-6 w-full rounded-lg bg-torii-red/95 py-2 font-rubik text-charolais-cattle hover:bg-torii-red/90 active:bg-torii-red"
    >
      Login
    </button>
  </form>
</template>
