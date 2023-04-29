import { shallowMount } from "@vue/test-utils";
import ProductDetailCard from "@/components/ProductDetailCard.vue";

describe("ProductDetailCard.vue Test", () => {
  const product = {
    id: 1,
    name: "Pizza",
    slug: "pizza",
    price: 10000,
    likedBy: [1, 2, 3, 4, 5],
  };
  const authUser = { id: 1, name: "John Doe" };
  const wrapper = shallowMount(ProductDetailCard, {
    props: { cartItem: {}, product },
  });

  it("should not render 'QuantityInput' component if authUser is null", () => {
    expect(wrapper.findComponent("quantiy-input-stub").exists()).toBe(false);
  });

  it("should not render 'AddToCartButton' component if authUser is null", () => {
    expect(wrapper.findComponent("add-to-cart-button-stub").exists()).toBe(
      false
    );
  });

  it("should render 'QuantityInput' component if authUser is not null", () => {
    wrapper.vm.authUserStore.authUser = authUser;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findComponent("quantity-input-stub").exists()).toBe(true);
    });
  });

  it("should render 'AddToCartButton' component if authUser is not null", () => {
    expect(wrapper.findComponent("add-to-cart-button-stub").exists()).toBe(
      true
    );
  });
});
