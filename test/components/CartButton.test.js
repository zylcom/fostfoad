import { RouterLinkStub, mount } from "@vue/test-utils";
import CartButton from "@/components/CartButton.vue";

describe("CartButton.vue Test", () => {
  const cart = { id: 1, cartItems: [{ id: 1 }, { id: 2 }], totalItems: 2 };

  const wrapper = mount(CartButton, {
    global: {
      stubs: { RouterLink: RouterLinkStub },
    },
  });

  beforeEach(() => {
    wrapper.vm.cartStore.cart = cart;
  });

  it("should display cartItems length if not undefined", () => {
    expect(wrapper.find("span").text()).toBe(cart.cartItems.length + "");
  });

  it("should display zero if cartItems is undefined", () => {
    wrapper.vm.cartStore.cart = { id: 1, totalItems: 0 };

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find("span").text()).toBe("0");
    });
  });
});
