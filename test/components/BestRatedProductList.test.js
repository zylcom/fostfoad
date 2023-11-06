import { shallowMount } from "@vue/test-utils";
import BestRatedProductList from "@/components/BestRatedProductList.vue";

describe("BestRatedProductList.vue Test", () => {
  const bestRatedFoods = [{ id: 1, name: "Kontoru" }];
  const bestRatedDrinks = [{ id: 2, name: "Saburo" }];
  const wrapper = shallowMount(BestRatedProductList);

  beforeEach(() => {
    wrapper.vm.bestRatedProductsStore.foods = bestRatedFoods;
    wrapper.vm.bestRatedProductsStore.drinks = bestRatedDrinks;
  });

  it("should display text same as title props", async () => {
    const titleProps = "Best Rated Foods";
    await wrapper.setProps({ title: titleProps });

    const h1 = wrapper.find("h1");

    expect(h1.text()).toBe(titleProps);
  });

  test("if category props is 'food' bestRatedProducts must food list", async () => {
    await wrapper.setProps({ category: "food" });

    expect(wrapper.vm.bestRatedProducts).toStrictEqual(bestRatedFoods);
  });

  test("if category props is 'drink' bestRatedProducts must drink list", async () => {
    await wrapper.setProps({ category: "drink" });

    expect(wrapper.vm.bestRatedProducts).toStrictEqual(bestRatedDrinks);
  });

  it("should not render text 'Empty' if bestRatedProducts length more than one", async () => {
    expect(wrapper.find("p").exists()).toBe(false);
  });
});
