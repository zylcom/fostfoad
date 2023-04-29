import { mount } from "@vue/test-utils";
import AddToCartButton from "@/components/AddToCartButton.vue";

describe("AddToCartButton.vue Test", () => {
  const wrapper = mount(AddToCartButton, {
    props: { cartItem: {} },
  });

  test("if quantity props greater than 0, button must not disabled", async () => {
    await wrapper.setProps({ quantity: 1 });
    const button = wrapper.find("button");

    expect(button.attributes().disabled).toBeUndefined();
  });

  test("if quantity props less than 1, button must be disabled", async () => {
    await wrapper.setProps({ quantity: 0 });
    const button = wrapper.find("button");

    expect(button.attributes().disabled).toBeDefined();
  });

  test("if quantity props undefined, button must be disabled", () => {
    const button = wrapper.find("button");

    expect(button.attributes().disabled).toBeDefined();
  });

  it("should display 'Add to cart' text when cartItem empty", () => {
    const button = wrapper.find("button");

    expect(button.text()).toBe("Add to cart");
  });

  it("should display 'Update' text when cartItem not empty", async () => {
    await wrapper.setProps({ cartItem: { id: 1 } });
    const button = wrapper.find("button");

    expect(button.text()).toBe("Update");
  });

  it("should fire event 'addToCartHandler' when clicked and quantity props greater than 0", async () => {
    await wrapper.setProps({ quantity: 1 });
    const addToCartHandler = vi.spyOn(wrapper.vm, "addToCartHandler");

    await wrapper.get("button").trigger("click");

    expect(addToCartHandler).toHaveBeenCalled();
  });

  it("should call 'updateMyCart' action with productId and quantity when clicked", async () => {
    const productId = 1;
    const quantity = 5;

    await wrapper.setProps({ productId, quantity });

    wrapper.vm.$nextTick(async () => {
      await wrapper.get("button").trigger("click");

      expect(wrapper.vm.cartStore.updateMyCart).toHaveBeenCalledWith(
        productId,
        quantity
      );
    });
  });
});
