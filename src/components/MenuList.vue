<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import MenuItem from "@/components/MenuItem.vue";
import MenuItemSkeleton from "@/components/MenuItemSkeleton.vue";
import { allStore } from "@/stores";
import { clearKeyword } from "@/utils";
import { useInfinite } from "@/composables/useInfinite";

const props = defineProps({ category: String, tag: String, keyword: String });

const { productsStore } = allStore();
const productCategory = computed(() => props.category);
const productTag = computed(() => props.tag);
const searchKeyword = computed(() => clearKeyword(props.keyword));
const products = computed(() => productsStore.products);
const hasNextPage = computed(() => productsStore.hasNextPage);
const cursor = computed(() => productsStore.cursor);
const target = ref(null);

const { fetchData, fetchNextPage, infiniteScroll, isLoading } = useInfinite();

watch([productCategory, productTag], async () => {
  productsStore.$reset();

  await fetchData({
    category: productCategory.value,
    name: searchKeyword.value,
    tag: productTag.value,
  });
});

onMounted(() => {
  productsStore.$reset();

  infiniteScroll(target, async () => {
    await fetchNextPage({
      category: productCategory.value,
      name: searchKeyword.value,
      tag: productTag.value,
      cursor: cursor.value,
    });
  });
});

onMounted(async () => {
  await fetchData({
    category: productCategory.value,
    name: searchKeyword.value,
    tag: productTag.value,
  });
});

onUnmounted(() => {
  productsStore.$reset();
});
</script>

<template>
  <div class="mt-2 flex flex-col">
    <div v-if="products.length > 0">
      <MenuItem
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <div class="pb-16 text-center" ref="target">
      <div v-if="isLoading">
        <MenuItemSkeleton v-for="i in 3" :key="i" />
      </div>

      <span v-else-if="products.length < 1">Products not found!</span>
      <span v-else-if="!hasNextPage">That's a wrap!</span>
      <button
        v-else
        class="mt-3 cursor-pointer rounded bg-seljuk-blue/50 px-5 py-1"
        @click="fetchNextPage()"
      >
        Load more!
      </button>
    </div>
  </div>
</template>
