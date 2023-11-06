import { defineStore } from "pinia";
import { ref } from "vue";

export const useTagStore = defineStore("Tag", () => {
  const tag = ref("");
  const tagList = ref([]);

  function set(data) {
    tagList.value = data;
  }

  function changeTag(newTag) {
    tag.value = newTag;
  }

  return { tag, tagList, changeTag, set };
});
