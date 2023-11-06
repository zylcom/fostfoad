<script setup>
import { useRouter } from "vue-router";
import IconArrow from "./icons/IconArrow.vue";

const router = useRouter();

function goBack() {
  switch (router.currentRoute.value.path) {
    case "/login":
    case "/register":
      router.push({ path: "/" });
      break;

    default:
      router.go(-1);
      break;
  }
}
</script>

<template>
  <button class="transition duration-300 hover:scale-125" @click="goBack()">
    <IconArrow class="h-6 w-6" />
  </button>
</template>
