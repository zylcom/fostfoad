import { shallowMount } from "@vue/test-utils";
import MenuItemAction from "@/components/MenuItemAction.vue";

describe("MenuItemAction.vue Test", () => {
  const product = {
    id: 1,
    name: "Omelet",
    slug: "omelet",
    price: 10000,
    averageRating: 1.8,
    description: "It's super fluffy.",
    ingredients: "Egg, milk",
    categorySlug: "food",
    createdAt: "2023-11-03T10:30:49.014Z",
    updatedAt: "2023-11-03T10:30:49.014Z",
  };
  const wrapper = shallowMount(MenuItemAction, {
    props: { product },
  });

  it("should render 'IconPlus' component if cartItem is empty", () => {
    expect(wrapper.findComponent("icon-plus-stub").isVisible()).toBe(true);
  });

  it("should render button with title 'Add to cart' if cartItem is empty", () => {
    expect(wrapper.find("button").attributes("title")).toBe("Add to cart");
  });
});
