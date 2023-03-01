import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorStore = defineStore("Error", () => {
  const error = ref(null);

  function setError(newError) {
    error.value = newError;
  }

  function $reset() {
    error.value = null;
  }

  return { error, setError, $reset };
});
