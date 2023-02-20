import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        default: () => import("../views/HomeView.vue"),
        FooterNavigation: () => import("../components/FooterNavigation.vue"),
      },
    },
    {
      path: "/menu",
      name: "menu",
      components: {
        default: () => import("../views/MenuView.vue"),
        FooterNavigation: () => import("../components/FooterNavigation.vue"),
      },
    },
    {
      path: "/menu/:slug",
      name: "detail product",
      component: () => import("../views/DetailProductView.vue"),
    },
    {
      path: "/history",
      name: "history",
      components: {
        default: () => import("../views/HistoryView.vue"),
        FooterNavigation: () => import("../components/FooterNavigation.vue"),
      },
    },
    {
      path: "/settings",
      name: "settings",
      components: {
        default: () => import("../views/SettingView.vue"),
        FooterNavigation: () => import("../components/FooterNavigation.vue"),
      },
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/result",
      name: "search",
      component: () => import("../views/SearchPage.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/AuthenticationView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/AuthenticationView.vue"),
    },
  ],
});

export default router;
