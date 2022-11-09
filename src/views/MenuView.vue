<script setup>
import CartButton from "../components/CartButton.vue";
import CategoryButton from "../components/CategoryButton.vue";
import MenuList from "../components/MenuList.vue";
import ProductTagButtonList from "../components/ProductTagButtonList.vue";
import SearchBar from "../components/SearchBar.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useProductStore } from "../stores/products";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const category = ref(route.query.category || "food");
const tag = ref(route.query.tag || "");
const keyword = ref(route.query["product-name"] || "");
const store = useProductStore();
const tags = computed(() => store.tags);

function changeCategoryHandler(categoryName) {
  category.value = categoryName;
  router.push({
    path: "menu",
    query: {
      category: categoryName,
    },
  });
  tag.value = "";
  keyword.value = "";
}

function changeTagHandler(tagName) {
  router.push({
    path: "menu",
    query: {
      category: category.value,
      tag: tagName === "" ? undefined : tagName,
      "product-name": keyword.value === "" ? undefined : keyword.value,
    },
  });
  tag.value = tagName;
}

onMounted(() => {
  store.fetchProductTagsByCategory(category.value);
});

watch(category, () => {
  store.fetchProductTagsByCategory(category.value);
});

watch(keyword, () => {
  router.push({
    path: "menu",
    query: {
      category: category.value,
      tag: tag.value === "" ? undefined : tag.value,
      "product-name": keyword.value === "" ? undefined : keyword.value,
    },
  });
});
</script>

<template>
  <header class="inline bg-bleached-silk">
    <h1 class="pt-11 text-center text-2xl font-medium">Menu</h1>

    <div
      class="sticky top-0 flex justify-center gap-x-2.5 bg-bleached-silk py-4 px-6"
    >
      <SearchBar v-model:keyword="keyword" :category="category" :tag="tag" />
      <CartButton />
    </div>
  </header>

  <main class="min-h-[70vh] rounded-t-[20px] bg-zhen-zhu-bai-pearl">
    <div
      class="sticky top-16 z-20 rounded-t-[20px] bg-zhen-zhu-bai-pearl px-5 py-8"
    >
      <div class="flex justify-center gap-x-2.5" ref="target">
        <CategoryButton
          text="Foods"
          :class="category === 'food' ? 'bg-torii-red text-bleached-silk' : ''"
          @click="changeCategoryHandler('food')"
        />
        <CategoryButton
          text="Drinks"
          :class="
            category === 'drink' ? 'bg-chocobo-feather text-bleached-silk' : ''
          "
          @click="changeCategoryHandler('drink')"
        />
      </div>

      <ProductTagButtonList
        :tag="tag"
        :tags="tags"
        :onClickHandler="changeTagHandler"
      />
    </div>

    <MenuList :category="category" :tag="tag" :keyword="keyword" />
  </main>
</template>
