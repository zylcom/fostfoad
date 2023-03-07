<script setup>
import MenuItem from "../components/MenuItem.vue";
import { computed, onMounted, ref, watch } from "vue";
import { allStore } from "../stores";
import { clearKeyword } from "../utils";

const props = defineProps({ category: String, tag: String, keyword: String });

const { productsStore, loadingStore } = allStore();
const productCategory = computed(() => props.category);
const productTag = computed(() => props.tag);
const searchKeyword = computed(() => clearKeyword(props.keyword));
const target = ref(null);
const observer = ref(null);
const loading = computed(() => loadingStore.isLoading);
const products = computed(() => productsStore.products);
const hasNextPage = computed(() => productsStore.hasNextPage);
const endCursor = computed(() => productsStore.endCursor);

function loadMore() {
  productsStore.fetchMore(products.value, {
    category: productCategory.value,
    tag: productTag.value,
    keyword: searchKeyword.value,
    cursor: { id: endCursor.value },
  });
}

onMounted(() => {
  productsStore.fetchFilteredProducts({
    category: productCategory.value,
    tag: productTag.value,
    keyword: searchKeyword.value,
  });

  const options = {
    threshold: 1.0,
  };

  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting && hasNextPage.value) {
      loadMore();
    }
  }, options);
  observer.value.observe(target.value);
});

watch([productCategory, productTag], () => {
  productsStore.fetchFilteredProducts({
    category: productCategory.value,
    tag: productTag.value,
    keyword: searchKeyword.value,
  });
});

watch(searchKeyword, (newValue) => {
  if (!newValue) {
    productsStore.fetchFilteredProducts({
      category: productCategory.value,
      tag: productTag.value,
      keyword: newValue,
    });
  }
});
</script>

<template>
  <div class="mt-2 flex flex-col">
    <div v-if="products.length > 0">
      <MenuItem
        v-for="product in products"
        :key="product.node.id"
        :product-name="product.node.name"
        :price="product.node.price"
        :slug="product.node.slug"
      />
    </div>

    <div class="pt-5 pb-16 text-center" ref="target">
      <span v-if="loading">Loading...</span>
      <span v-else-if="products.length < 1">Products not found!</span>
      <span v-else-if="!hasNextPage">That's a wrap!</span>
      <button
        v-else
        class="mt-3 cursor-pointer rounded bg-seljuk-blue/50 px-5 py-1"
        @click="loadMore"
      >
        Load more!
      </button>
    </div>
  </div>
</template>
