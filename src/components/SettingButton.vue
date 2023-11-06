<script setup>
import { ref } from "vue";

defineProps({
  to: String,
  settingName: String,
  toggleId: String,
  child: Object,
});

const element = ref(null);

function toggleCheckbox() {
  if (element.value.$el.firstChild.nodeName.toLowerCase() === "input") {
    element.value.$el.firstChild.checked =
      !element.value.$el.firstChild.checked;
  }
}
</script>

<template>
  <RouterLink
    :to="to"
    class="flex w-full items-center justify-between text-lg"
    v-if="!toggleId"
  >
    {{ settingName }}

    <component :is="child" ref="element" />
  </RouterLink>

  <button
    class="flex w-full items-center justify-between text-lg"
    @click="toggleCheckbox()"
    v-else
  >
    {{ settingName }}

    <component :is="child" :toggle-id="toggleId" ref="element" />
  </button>
</template>
