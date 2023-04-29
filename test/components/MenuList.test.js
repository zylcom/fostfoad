import { shallowMount } from "@vue/test-utils";
import MenuList from "@/components/MenuList.vue";

describe("MenuList.vue Test", () => {
  const products = [
    { node: { id: 1, name: "Pizza", price: 10000, slug: "pizza" } },
    { node: { id: 2, name: "Burger", price: 8000, slug: "burger" } },
  ];
  const hasNextPage = true;
  const wrapper = shallowMount(MenuList);

  beforeEach(() => {
    wrapper.vm.loadingStore.isLoading = false;
    wrapper.vm.productsStore.products = products;
    wrapper.vm.productsStore.hasNextPage = hasNextPage;
  });

  it("should render 'MenuItem' component if products length more than 0", () => {
    expect(wrapper.findComponent("menu-item-stub").isVisible()).toBe(true);
  });

  it("should render load more button if products length more than 0, not loading and has next page", () => {
    expect(wrapper.find("button").text()).toBe("Load more!");
  });
});
