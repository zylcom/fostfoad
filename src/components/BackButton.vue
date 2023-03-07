<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import IconArrow from "./icons/IconArrow.vue";

const routePath = ref("/menu");
const router = useRouter();

onMounted(() => {
  if (
    router.options.history.state.back === null ||
    router.options.history.state.back === "/result" ||
    /result/gi.test(router.currentRoute.value.fullPath)
  ) {
    routePath.value = "/";
  } else if (
    router.options.history.state.back === "/login" ||
    router.options.history.state.back === "/register"
  ) {
    routePath.value = "/settings";
  } else if (
    router.options.history.state.back !== "/cart" &&
    router.options.history.state.back !== "/login" &&
    router.options.history.state.back !== "/register"
  ) {
    routePath.value = router.options.history.state.back;
  }
});
</script>

<template>
  <RouterLink :to="routePath" class="transition duration-300 hover:scale-125">
    <IconArrow class="h-6 w-6" />
  </RouterLink>
</template>
