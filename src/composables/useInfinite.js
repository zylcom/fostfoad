import { computed, ref, unref } from "vue";
import productService from "@/services/product-service";
import { allStore } from "@/stores";

export function useInfinite() {
  const { loadingStore, productsStore } = allStore();
  const hasNextPage = computed(() => productsStore.hasNextPage);
  const isLoading = computed(() => loadingStore.isLoading);
  const observer = ref(null);

  async function fetchData({ category, name, tag }) {
    loadingStore.showLoading();

    try {
      await productService.infinite({
        category,
        name,
        tag,
      });
    } catch (error) {
      console.error(error);
    } finally {
      loadingStore.hideLoading();
    }
  }

  async function fetchNextPage({ category, name, tag, cursor }) {
    loadingStore.showLoading();

    try {
      await productService.infinite({
        category,
        name,
        tag,
        cursor,
      });
    } catch (error) {
      console.error(error);
    } finally {
      loadingStore.hideLoading();
    }
  }

  async function infiniteScroll(target, loadmore) {
    const element = unref(target);

    const options = {
      threshold: 1.0,
    };

    observer.value = new IntersectionObserver(async ([entry]) => {
      if (entry && entry.isIntersecting && hasNextPage.value) {
        await loadmore();
      }
    }, options);
    observer.value.observe(element);
  }

  return {
    fetchData,
    fetchNextPage,
    infiniteScroll,
    isLoading,
  };
}
