import { mount } from "@vue/test-utils";
import ProductTagButton from "@/components/ProductTagButton.vue";

describe("ProductTagButton.vue Test", () => {
  const tag = "Coffee";
  const wrapper = mount(ProductTagButton, { props: { tag } });

  it("should display tag text", () => {
    expect(wrapper.find("button").text()).toBe(tag);
  });
});
