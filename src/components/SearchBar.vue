<script setup>
import { computed, watch } from "vue";
import IconCross from "./icons/IconCross.vue";
import IconSearch from "./icons/IconSearch.vue";
import SearchFilterButton from "./SearchFilterButton.vue";
import { useProductsStore } from "../stores/products";
import { clearKeyword } from "../utils";

const props = defineProps({ keyword: String, category: String, tag: String });
defineEmits(["update:keyword"]);

const store = useProductsStore();
const productCategory = computed(() => props.category);
const productTag = computed(() => props.tag);
const searchKeyword = computed(() => props.keyword);

function searchHandler() {
  store.fetchFilteredProducts({
    category: productCategory.value,
    tag: productTag.value,
    keyword: clearKeyword(searchKeyword.value),
  });
}

watch(searchKeyword, () => {
  if (searchKeyword.value === "") {
    store.fetchFilteredProducts({
      category: productCategory.value,
      tag: productTag.value,
      keyword: clearKeyword(searchKeyword.value),
    });
  }
});
</script>

<template>
  <div class="relative flex w-full">
    <form @submit.prevent="searchHandler">
      <input
        type="text"
        class="h-10 w-full rounded-[10px] bg-white pl-9 pr-16 placeholder:text-sm placeholder:italic focus:outline-none focus:ring-1"
        :value="keyword"
        @input="$emit('update:keyword', $event.target.value)"
        placeholder="Search product..."
      />
    </form>

    <button
      class="absolute left-3 top-1/2 -mt-2 cursor-pointer"
      @click="searchHandler"
    >
      <IconSearch class="h-5 w-5" />
    </button>

    <button
      v-show="searchKeyword !== ''"
      class="group absolute right-10 top-1/2 -mt-1.5 cursor-pointer"
      @click="$emit('update:keyword', '')"
    >
      <IconCross
        class="h-4 w-4 transition-all duration-300 group-hover:scale-110"
      />
    </button>

    <SearchFilterButton />
  </div>
</template>
