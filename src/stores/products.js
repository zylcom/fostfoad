import { ref } from "vue";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("Products", () => {
  const products = ref([]);
  const hasNextPage = ref(false);
  const paging = ref({});
  const cursor = ref(0);

  function set(data) {
    const uniq = [...products.value, ...data.data].filter(function (e) {
      const key = [e.id, e.name, e.slug].join("|");

      if (!this[key]) {
        this[key] = true;
        return true;
      }
    }, {});

    products.value = uniq;
    paging.value = data.paging;
    hasNextPage.value = data.paging.hasNextPage;
    cursor.value = data.paging.nextCursor;
  }

  function $reset() {
    products.value = [];
  }

  return {
    cursor,
    hasNextPage,
    paging,
    products,
    set,
    $reset,
  };
});
