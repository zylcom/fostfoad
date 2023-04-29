import { RouterLinkStub, mount } from "@vue/test-utils";
import CartButton from "@/components/CartButton.vue";

describe("CartButton.vue Test", () => {
  const authUser = { id: 1 };
  const cart = { id: 1, cartItems: [{ id: 1 }, { id: 2 }] };

  const wrapper = mount(CartButton, {
    global: {
      stubs: { RouterLink: RouterLinkStub },
    },
  });

  beforeEach(() => {
    wrapper.vm.authUserStore.authUser = authUser;
    wrapper.vm.cartStore.cart = cart;
  });

  it("should render 'RouterLink' when authUser not empty", () => {
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe("/cart");
  });

  it("should display cartItems length if not undefined", () => {
    expect(wrapper.find("span").text()).toBe(cart.cartItems.length + "");
  });

  it("should display zero if cartItems is undefined", () => {
    wrapper.vm.myCart = { id: 1 };

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find("span").text()).toBe("0");
    });
  });

  it("should not render 'RouterLink' when authUser is null", () => {
    wrapper.vm.authUser = null;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(false);
    });
  });
});
