<script setup>
import { ref } from "vue";
import IconSend from "../components/icons/IconSend.vue";

defineProps({ onSubmitHandler: Function });

const reviewDescription = ref("");
</script>

<template>
  <form
    action=""
    class="w-full"
    @submit.prevent="onSubmitHandler(reviewDescription)"
  >
    <input
      type="text"
      placeholder="Leave review"
      class="w-full rounded-[10px] py-2 px-1 pr-10 focus:outline-none focus:ring-0"
      v-model="reviewDescription"
    />

    <button
      type="submit"
      class="absolute top-3 right-3 hover:scale-125"
      title="Send review"
    >
      <IconSend />
    </button>
  </form>
</template>
