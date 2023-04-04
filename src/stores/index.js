import { useAuthUserStore } from "./authUser";
import { useCartStore } from "./cart";
import { useCategoryStore } from "./category";
import { useErrorStore } from "./error";
import { useLoadingStore } from "./loading";
import { useProductDetailStore } from "./productDetail";
import { useProductsStore } from "./products";
import { useReviewsStore } from "./reviews";
import { useTagStore } from "./tag";

export const allStore = () => {
  return {
    authUserStore: useAuthUserStore(),
    categoryStore: useCategoryStore(),
    errorStore: useErrorStore(),
    loadingStore: useLoadingStore(),
    productsStore: useProductsStore(),
    productDetailStore: useProductDetailStore(),
    reviewsStore: useReviewsStore(),
    tagStore: useTagStore(),
    cartStore: useCartStore(),
  };
};
