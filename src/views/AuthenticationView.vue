<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoginInput from "../components/LoginInput.vue";
import RegisterInput from "../components/RegisterInput.vue";

const route = useRouter();
const path = ref(route.currentRoute.value.name);

function switchTab(newPath) {
  path.value = newPath;

  route.push({ path: newPath });
}
</script>

<template>
  <div class="relative h-0 w-full bg-explosive-grey pt-[66.7%] shadow-md">
    <img
      src="https://picsum.photos/480/320.webp"
      alt=""
      class="absolute top-0 left-0 block w-full object-cover object-center"
      loading="lazy"
    />
  </div>

  <div class="-translate-y-5 rounded-t-[20px] bg-white pt-2 font-rubik">
    <div class="flex w-full justify-around text-sm">
      <button
        class="px-4 py-1"
        :class="path === 'login' ? 'border-b-2 border-torii-red' : ''"
        @click="switchTab('login')"
      >
        Login
      </button>

      <button
        class="px-4 py-1"
        :class="path === 'register' ? 'border-b-2 border-torii-red' : ''"
        @click="switchTab('register')"
      >
        Register
      </button>
    </div>

    <LoginInput v-if="path === 'login'" />

    <RegisterInput v-if="path === 'register'" />
  </div>
</template>
