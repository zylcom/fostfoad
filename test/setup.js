import { config } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { createRouter, createWebHistory } from "vue-router";
import { beforeEach, vi } from "vitest";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: {
        template: "Home",
      },
    },
  ],
});

config.global.plugins = [
  createTestingPinia({
    createSpy: vi.fn,
  }),
  router,
];

const scrollToMock = vi.fn();
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
vi.stubGlobal("scrollTo", scrollToMock);

beforeEach(() => {
  setActivePinia(createPinia());
});
