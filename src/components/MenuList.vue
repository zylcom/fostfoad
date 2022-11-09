<script setup>
import MenuItem from "../components/MenuItem.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useProductStore } from "../stores/products";

const props = defineProps({ category: String, tag: String, keyword: String });

const productCategory = computed(() => props.category);
const productTag = computed(() => props.tag);
const searchKeyword = computed(() => props.keyword);
const target = ref(null);
const observer = ref(null);
const store = useProductStore();
const products = store.getProducts;
const loading = computed(() => store.isLoading);
const error = computed(() => store.hasError);
const hasNextPage = computed(() => store.hasNextPage);
const endCursor = computed(() => store.endCursor);

function loadMore() {
  store.fetchMore(products.value, {
    category: productCategory.value,
    tag: productTag.value,
    keyword: searchKeyword.value,
    cursor: { id: endCursor.value },
  });
}

function reloadPage() {
  window.location.reload();
}

onMounted(() => {
  store.fetchFilteredProducts(
    productCategory.value,
    productTag.value,
    searchKeyword.value
  );

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
  store.fetchFilteredProducts(
    productCategory.value,
    productTag.value,
    searchKeyword.value
  );
});
</script>

<template>
  <div class="mt-2 flex flex-col">
    <div class="mt-5 text-center" v-if="error">
      <p>Oops, something went wrong!</p>
      <button
        class="mt-3 rounded bg-spandex-green px-5 py-1"
        @click="reloadPage"
      >
        Reload
      </button>
    </div>

    <MenuItem
      v-else
      v-for="product in products"
      :key="product.node.id"
      :product-name="product.node.name"
      :price="product.node.price"
    />

    <div class="pt-5 pb-16 text-center" ref="target">
      <span v-if="loading && !error">Loading...</span>
      <span v-else-if="products.length < 1 && !error">Products not found!</span>
      <span v-else-if="!hasNextPage && !error">That's a wrap!</span>
      <button
        v-else-if="!error"
        class="mt-3 cursor-pointer rounded bg-seljuk-blue/50 px-5 py-1"
        @click="loadMore"
      >
        Load more!
      </button>
    </div>
  </div>
</template>
