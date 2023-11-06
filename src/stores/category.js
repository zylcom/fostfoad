import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoryStore = defineStore("Category", () => {
  const category = ref("food");
  const categoryList = ref([]);

  function setCategoryList(data) {
    categoryList.value = data;
  }

  function changeCategory(newCategory) {
    category.value = newCategory;
  }

  return {
    category,
    categoryList,
    changeCategory,
    setCategoryList,
  };
});
