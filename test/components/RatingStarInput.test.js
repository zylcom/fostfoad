import { shallowMount } from "@vue/test-utils";
import RatingStarInput from "@/components/RatingStarInput.vue";

describe("RatingStarInput.vue Test", () => {
  const id = "star-1";
  const currentRate = 1;
  const wrapper = shallowMount(RatingStarInput, {
    props: { id, currentRate, rateValue: 1 },
  });

  it("should be checked if currentRate props same as id", () => {
    expect(wrapper.find("input[name='rating']").element.checked).toBe(true);
  });

  it("should render 'IconStar' component", () => {
    expect(wrapper.find("icon-star-stub").exists()).toBe(true);
  });
});
