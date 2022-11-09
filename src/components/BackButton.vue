<script setup>
import IconArrow from "./icons/IconArrow.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const routePath = ref("/menu");
const router = useRouter();

onMounted(() => {
  if (
    router.options.history.state.back !== null &&
    router.options.history.state.back !== "/cart"
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
