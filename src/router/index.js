import { createRouter, createWebHistory } from "vue-router";
import { useAuthUserStore } from "@/stores/authUser";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: { requiresAuth: false },
      components: {
        default: () => import("@/views/HomeView.vue"),
        NavigationTab: () => import("@/components/NavigationTab.vue"),
      },
    },
    {
      path: "/menu",
      name: "menu",
      meta: { requiresAuth: false },
      components: {
        default: () => import("@/views/MenuView.vue"),
        NavigationTab: () => import("@/components/NavigationTab.vue"),
      },
    },
    {
      path: "/menu/:slug",
      meta: { requiresAuth: false },
      name: "detail product",
      component: () => import("@/views/DetailProductView.vue"),
    },
    {
      path: "/history",
      name: "history",
      meta: { requiresAuth: true },
      components: {
        default: () => import("@/views/HistoryView.vue"),
        NavigationTab: () => import("@/components/NavigationTab.vue"),
      },
    },
    {
      path: "/settings",
      name: "settings",
      meta: { requiresAuth: false },
      components: {
        default: () => import("@/views/SettingView.vue"),
        NavigationTab: () => import("@/components/NavigationTab.vue"),
      },
    },
    {
      path: "/cart",
      name: "cart",
      meta: { requiresAuth: true },
      component: () => import("@/views/CartView.vue"),
    },
    {
      path: "/result",
      name: "search",
      meta: { requiresAuth: false },
      component: () => import("@/views/SearchPage.vue"),
    },
    {
      path: "/login",
      name: "login",
      meta: { requiresAuth: false },
      component: () => import("@/views/AuthenticationView.vue"),
    },
    {
      path: "/register",
      name: "register",
      meta: { requiresAuth: false },
      component: () => import("@/views/AuthenticationView.vue"),
    },
    {
      path: "/checkout-success",
      name: "checkout-success",
      meta: { requiresAuth: true },
      component: () => import("@/views/CheckoutSuccessView.vue"),
    },
    {
      path: "/order/:id",
      name: "order",
      meta: { requiresAuth: true },
      component: () => import("@/views/OrderDetailView.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  const authUserStore = useAuthUserStore();

  authUserStore.preload();

  if (to.meta.requiresAuth && !(await authUserStore.preload())) {
    return { path: "/login" };
  }

  if (
    (to.fullPath === "/login" || to.fullPath === "/register") &&
    (await authUserStore.preload())
  ) {
    return { path: "/" };
  }
});

export default router;
