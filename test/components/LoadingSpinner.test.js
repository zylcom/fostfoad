import { shallowMount } from "@vue/test-utils";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

describe("LoadingSpinner.vue Test", () => {
  const wrapper = shallowMount(LoadingSpinner);

  beforeEach(() => {
    wrapper.vm.loadingStore.isLoading = true;
  });

  test("'IconLoading' component must be visible if isLoading is true", () => {
    expect(wrapper.findComponent("icon-loading-stub").isVisible()).toBe(true);
  });

  test("'IconLoading' component must not be visible if isLoading is false", () => {
    wrapper.vm.loadingStore.isLoading = false;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findComponent("icon-loading-stub").isVisible()).toBe(
        false
      );
    });
  });
});
