import gql from "graphql-tag";
import { defineStore } from "pinia";
import { useQuery } from "@vue/apollo-composable";
import { ref } from "vue";

export const useTagStore = defineStore("Tag", () => {
  const tag = ref("");
  const tagList = ref([]);
  const GET_TAG_LIST_QUERY = gql`
    query GetTagsByCategory($category: String!) {
      getTagsByCategory(category: $category) {
        ... on TagList {
          tags {
            id
            name
            slug
          }
        }
      }
    }
  `;

  function changeTag(newTag) {
    tag.value = newTag;
  }

  function fetchProductsTags(category) {
    const { onResult } = useQuery(GET_TAG_LIST_QUERY, { category });

    onResult((queryResult) => {
      tagList.value = queryResult.data.getTagsByCategory.tags;
    });
  }

  return { tag, tagList, changeTag, fetchProductsTags };
});
