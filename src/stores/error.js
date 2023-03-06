import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useErrorStore = defineStore("Error", () => {
  const error = ref(null);
  const getError = computed(() => error);

  function setError(newError) {
    error.value = newError;
  }

  function $reset() {
    error.value = null;
  }

  return { error, getError, setError, $reset };
});
