import gql from "graphql-tag";
import { defineStore } from "pinia";
import { useQuery } from "@vue/apollo-composable";
import { ref } from "vue";

export const useCategoryStore = defineStore("Category", () => {
  const category = ref("food");
  const categoryList = ref([]);
  const GET_CATEGORY_LIST_QUERY = gql`
    query {
      getAllProductCategory {
        ... on CategoryList {
          categories {
            id
            name
            slug
          }
        }
      }
    }
  `;

  function changeCategory(newCategory) {
    category.value = newCategory;
  }

  function fetchProductsCategory() {
    const { onResult } = useQuery(GET_CATEGORY_LIST_QUERY);

    onResult((queryResult) => {
      categoryList.value = queryResult.data.getAllProductCategory.categories;
    });
  }

  return { category, categoryList, changeCategory, fetchProductsCategory };
});
