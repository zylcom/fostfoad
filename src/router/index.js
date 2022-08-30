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
      path: "/menu/:slug",
      name: "detail product",
      component: () => import("../views/DetailProductView.vue"),
    },
  ],
});

export default router;
