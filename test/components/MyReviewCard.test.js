import { shallowMount } from "@vue/test-utils";
import MyReviewCard from "@/components/MyReviewCard.vue";

describe("MyReviewCard.vue Test", () => {
  const myReview = { id: 1, description: "Good", rating: 4 };
  const wrapper = shallowMount(MyReviewCard);

  beforeEach(() => {
    wrapper.vm.reviewsStore.myReview = myReview;
  });

  it("should render 'ReviewItem' component with props", () => {
    expect(
      wrapper.findComponent("review-item-stub").props().review
    ).toStrictEqual(myReview);
  });

  it("should not render 'ReviewInputForm' component", () => {
    expect(wrapper.findComponent("review-input-form-stub").isVisible()).toBe(
      false
    );
  });

  it("should render 'ReviewInputForm' component if modal box is open", async () => {
    await wrapper.find("button").trigger("click");

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findComponent("review-input-form-stub").isVisible()).toBe(
        true
      );
    });
  });
});
