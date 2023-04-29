import { shallowMount } from "@vue/test-utils";
import MenuItemAction from "@/components/MenuItemAction.vue";

describe("MenuItemAction.vue Test", () => {
  const cartItem = { id: 1, quantity: 5 };
  const productId = 1;
  const quantity = 5;
  const wrapper = shallowMount(MenuItemAction, {
    props: { cartItem: {}, productId },
  });

  it("should render 'IconPlus' component if cartItem is empty", () => {
    expect(wrapper.findComponent("icon-plus-stub").isVisible()).toBe(true);
  });

  it("should render button with title 'Add to cart' if cartItem is empty", () => {
    expect(wrapper.find("button").attributes("title")).toBe("Add to cart");
  });

  it("should render 'IconPencil' component if cartItem is not empty", async () => {
    await wrapper.setProps({ cartItem });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findComponent("icon-pencil-stub").isVisible()).toBe(true);
    });
  });

  it("should render button with title 'Update' if cartItem is not empty", () => {
    expect(wrapper.find("button").attributes("title")).toBe("Update");
  });

  it("should call 'onAddCartClicked' when form submitted", async () => {
    const onAddCartClicked = vi.spyOn(wrapper.vm, "onAddCartClicked");

    await wrapper.find("form").trigger("submit");

    expect(onAddCartClicked).toHaveBeenCalled();
  });

  it("should call 'updateMyCart' action with productId and quantity when form submitted", async () => {
    wrapper.vm.quantity = quantity;
    await wrapper.find("form").trigger("submit");

    expect(wrapper.vm.cartStore.updateMyCart).toHaveBeenCalledWith(
      productId,
      quantity
    );
  });
});
