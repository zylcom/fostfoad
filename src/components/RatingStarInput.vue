<script setup>
import { computed, onMounted, ref } from "vue";
import IconStar from "./icons/IconStar.vue";

const props = defineProps({
  id: String,
  currentRate: Number,
  rateValue: Number,
  title: String,
});
defineEmits(["on-change-rate"]);

const currentRate = computed(() => props.currentRate);
const inputRadioElement = ref();

onMounted(() => {
  if (inputRadioElement.value.id === "star-" + currentRate.value) {
    inputRadioElement.value.checked = true;
  }
});
</script>

<template>
  <input
    :id="id"
    class="peer"
    type="radio"
    name="rating"
    :value="rateValue"
    @change="$emit('on-change-rate', +$event.target.value)"
    ref="inputRadioElement"
  />

  <label
    :for="id"
    class="peer-active:scale-150 peer-checked:[&>svg]:scale-125 peer-checked:[&>svg]:fill-spandex-green peer-hover:[&>svg]:scale-125 peer-hover:[&>svg]:fill-spandex-green"
    :title="title"
  >
    <IconStar />
  </label>
</template>
