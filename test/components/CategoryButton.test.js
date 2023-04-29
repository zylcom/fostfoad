import { mount } from "@vue/test-utils";
import CategoryButton from "@/components/CategoryButton.vue";

describe("CategoryButton.vue Test", () => {
  const text = "Food";
  const wrapper = mount(CategoryButton, { props: { text } });

  it("should display text from props", () => {
    expect(wrapper.find("button").text()).toBe(text);
  });
});
