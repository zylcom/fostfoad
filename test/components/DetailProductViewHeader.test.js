import { shallowMount } from "@vue/test-utils";
import DetailProductViewHeader from "@/components/DetailProductViewHeader.vue";

describe("DetailProductViewHeader.vue", () => {
  const wrapper = shallowMount(DetailProductViewHeader);

  it("should render BackButton component", () => {
    expect(wrapper.findComponent("back-button-stub").isVisible()).toBe(true);
  });

  it("should render CartButton component", () => {
    expect(wrapper.findComponent("cart-button-stub").isVisible()).toBe(true);
  });
});
