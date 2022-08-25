import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        default: () => import("../views/HomeView.vue"),
        NavigationBar: () => import("../components/NavigationBar.vue"),
      },
    },
    {
      path: "/menu",
      name: "menu",
      components: {
        default: () => import("../views/MenuView.vue"),
        NavigationBar: () => import("../components/NavigationBar.vue"),
      },
    },
    {
      path: "/history",
      name: "history",
      components: {
        default: () => import("../views/HistoryView.vue"),
        NavigationBar: () => import("../components/NavigationBar.vue"),
      },
    },
    {
      path: "/settings",
      name: "settings",
      components: {
        default: () => import("../views/SettingView.vue"),
        NavigationBar: () => import("../components/NavigationBar.vue"),
      },
    },
  ],
});

export default router;
