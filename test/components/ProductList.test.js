import { shallowMount } from "@vue/test-utils";
import ProductList from "@/components/ProductList.vue";

describe("ProductList.vue Test", () => {
  const title = "All products";
  const loadMoreMock = vi.fn();
  const products = [
    { node: { id: 1, name: "Pizza", price: 10000, slug: "pizza" } },
    { node: { id: 2, name: "Burger", price: 8000, slug: "burger" } },
  ];
  const hasNextPage = true;
  const wrapper = shallowMount(ProductList, {
    props: { title, products, loadMore: loadMoreMock },
  });

  beforeEach(() => {
    wrapper.vm.loadingStore.isLoading = true;
    wrapper.vm.productsStore.hasNextPage = hasNextPage;
  });

  it("should render 'ProductCard' component if products length more than 0", () => {
    expect(wrapper.findComponent("product-card-stub").exists()).toBe(true);
  });

  it("should display title text", () => {
    expect(wrapper.find("h1").text()).toBe(title);
  });

  it("should display text 'Loading...' if isLoading true", () => {
    expect(wrapper.find("span").text()).toBe("Loading...");
  });

  it("should call 'loadMore' props when button is clicked", () => {
    wrapper.vm.loadingStore.isLoading = false;

    wrapper.vm.$nextTick(async () => {
      await wrapper.find("button").trigger("click");

      expect(wrapper.vm.loadMore).toHaveBeenCalled();
    });
  });

  it("should display text 'That's a wrap!' if hasNextPage is false", () => {
    wrapper.vm.productsStore.hasNextPage = false;
    wrapper.vm.loadingStore.isLoading = false;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find("span").text()).toBe("That's a wrap!");
    });
  });

  it("should not render 'ProductCard' component if products length less than 1", async () => {
    await wrapper.setProps({ products: [] });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findComponent("product-card-stub").exists()).toBe(false);
    });
  });

  it("should display text 'Products not found!' if products length less than 1 and isLoading false", () => {
    wrapper.vm.loadingStore.isLoading = false;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find("span").text()).toBe("Products not found!");
    });
  });
});
