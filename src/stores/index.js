import { useCategoryStore } from "./category";
import { useLoadingStore } from "./loading";
import { useProductDetailStore } from "./productDetail";
import { useProductsStore } from "./products";
import { useTagStore } from "./tag";

export const allStore = () => {
  return {
    categoryStore: useCategoryStore(),
    loadingStore: useLoadingStore(),
    productsStore: useProductsStore(),
    productDetailStore: useProductDetailStore(),
    tagStore: useTagStore(),
  };
};
