<script setup>
import IconSend from "./icons/IconSend.vue";

defineProps({ reviewDescription: String });
defineEmits(["update:reviewDescription"]);
</script>

<template>
  <input
    type="text"
    placeholder="Leave review"
    class="w-full rounded-[10px] py-2 px-1 pr-10 focus:outline-none focus:ring-0"
    :value="reviewDescription"
    @input="$emit('update:reviewDescription', $event.target.value)"
  />

  <button
    type="submit"
    class="absolute top-3 right-3 hover:scale-125"
    title="Send review"
  >
    <IconSend />
  </button>
</template>
