import { shallowMount } from "@vue/test-utils";
import RatingStars from "@/components/RatingStars.vue";

describe("RatingStars.vue Test", () => {
  const wrapper = shallowMount(RatingStars);

  it("should render 'RatingStarInput' component 5 times", () => {
    expect(wrapper.findAllComponents("rating-star-input-stub").length).toBe(5);
  });
});
