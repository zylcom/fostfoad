<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import IconCross from "./icons/IconCross.vue";
import IconSearch from "./icons/IconSearch.vue";
import SearchFilterButton from "./SearchFilterButton.vue";
import { useProductsStore } from "../stores/products";
import { clearKeyword } from "../utils";

const props = defineProps({
  keyword: String,
  category: String,
  tag: String,
  redirectTo: String,
});
defineEmits(["update:keyword"]);

const router = useRouter();
const store = useProductsStore();
const productCategory = computed(() => props.category);
const productTag = computed(() => props.tag);
const searchKeyword = computed(() => clearKeyword(props.keyword));

function searchHandler(redirectPath) {
  if (!searchKeyword.value) {
    return;
  }

  if (redirectPath === "result") {
    router.push({
      path: `/${redirectPath}`,
      query: {
        "product-name": searchKeyword.value,
      },
    });
  }

  if (router.currentRoute.value.path === "/menu") {
    router.push({
      path: "menu",
      query: {
        category: productCategory.value,
        tag: productTag.value === "" ? undefined : productTag.value,
        "product-name": searchKeyword.value,
      },
    });
  }

  if (router.currentRoute.value.path === "/result") {
    window.scrollTo(0, 0);

    router.push({
      query: {
        "product-name": searchKeyword.value,
      },
    });
  }

  store.fetchFilteredProducts({
    category: productCategory.value,
    tag: productTag.value,
    keyword: searchKeyword.value,
  });
}
</script>

<template>
  <div class="relative flex w-full">
    <form @submit.prevent="searchHandler(redirectTo)" class="w-full">
      <input
        type="text"
        class="h-10 w-full rounded-[10px] bg-white pl-9 placeholder:text-sm placeholder:italic focus:outline-none focus:ring-1"
        :class="router.currentRoute.value.path === '/' ? 'pr-8' : 'pr-16'"
        :value="keyword"
        @input="$emit('update:keyword', $event.target.value)"
        placeholder="Search product..."
        required
      />
    </form>

    <button
      class="absolute left-3 top-1/2 -mt-2 cursor-pointer"
      @click="searchHandler(redirectTo)"
      title="Search"
      :disabled="searchKeyword === ''"
    >
      <IconSearch class="h-5 w-5" />
    </button>

    <button
      v-show="searchKeyword !== undefined"
      class="group absolute top-1/2 -mt-1.5 cursor-pointer"
      :class="router.currentRoute.value.path === '/' ? 'right-3' : 'right-10'"
      @click="$emit('update:keyword', '')"
      title="Clear"
    >
      <IconCross
        class="h-4 w-4 transition-all duration-300 group-hover:scale-110"
      />
    </button>

    <SearchFilterButton v-if="router.currentRoute.value.path !== '/'" />
  </div>
</template>
