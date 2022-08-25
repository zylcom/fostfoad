<script setup>
import { ref } from "vue";

defineProps({ settingName: String, toggleId: String, child: Object });

const element = ref(null);

function toggleCheckbox() {
  if (element.value.$el.firstChild.nodeName.toLowerCase() === "input") {
    element.value.$el.firstChild.checked = false;
  }
}
</script>

<template>
  <button
    class="flex w-full items-center justify-between text-lg"
    @click="toggleCheckbox"
  >
    {{ settingName }}

    <component :is="child" :toggle-id="toggleId" ref="element" />
  </button>
</template>
