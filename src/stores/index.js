import { useAuthUserStore } from "./authUser";
import { useCategoryStore } from "./category";
import { useErrorStore } from "./error";
import { useLoadingStore } from "./loading";
import { useProductDetailStore } from "./productDetail";
import { useProductsStore } from "./products";
import { useTagStore } from "./tag";

export const allStore = () => {
  return {
    authUserStore: useAuthUserStore(),
    categoryStore: useCategoryStore(),
    errorStore: useErrorStore(),
    loadingStore: useLoadingStore(),
    productsStore: useProductsStore(),
    productDetailStore: useProductDetailStore(),
    tagStore: useTagStore(),
  };
};
