<script setup>
import { computed } from "vue";
import { isNumberKey } from "../utils";

const props = defineProps({
  quantity: Number,
});
const emit = defineEmits(["update:quantity"]);

const quantityItem = computed(() => props.quantity);

function onInputQuantity() {
  if (this.value.length > this.maxLength) {
    this.value = this.value.slice(0, this.maxLength);
  }

  emit("update:quantity", +this.value.slice(0, this.maxlength));
}
</script>

<template>
  <input
    type="number"
    class="bg-mercury text-center font-rubik text-sm focus:outline-none focus:ring-0"
    min="1"
    max="999"
    maxlength="3"
    :value="quantityItem"
    :oninput="onInputQuantity"
    :onkeypress="isNumberKey"
  />
</template>
