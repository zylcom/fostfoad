<script setup>
import IconStar from "../components/icons/IconStar.vue";

defineProps({ id: String, rateValue: Number, title: String });
defineEmits(["on-change-rate"]);
</script>

<template>
  <input
    :id="id"
    class="peer"
    type="radio"
    name="rating"
    :value="rateValue"
    @change="$emit('on-change-rate', +$event.target.value)"
  />
  <label
    :for="id"
    class="peer-active:scale-150 peer-checked:[&>svg]:scale-125 peer-checked:[&>svg]:fill-spandex-green peer-hover:[&>svg]:scale-125 peer-hover:[&>svg]:fill-spandex-green"
    :title="title"
  >
    <IconStar />
  </label>
</template>
