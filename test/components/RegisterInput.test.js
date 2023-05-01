import { mount } from "@vue/test-utils";
import RegisterInput from "@/components/RegisterInput.vue";

describe("RegisterInput.vue Test", () => {
  const name = "Test Register";
  const email = "test@register.com";
  const password = "secret";
  const wrapper = mount(RegisterInput, {
    global: {
      components: { "vue-tel-input": { template: "<div></div>" } },
    },
  });

  test("if name input filled, name ref will have same value", async () => {
    await wrapper.find("#name").setValue(name);

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.name).toBe(name);
    });
  });

  test("if email input filled, email ref will have same value", async () => {
    await wrapper.find("#email").setValue(email);

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.email).toBe(email);
    });
  });

  test("if password input filled, password ref will have same value", async () => {
    await wrapper.find("#password").setValue(password);

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.password).toBe(password);
    });
  });

  test("if confirm password input filled, confirm password ref will have same value", async () => {
    await wrapper.find("#confirm-password").setValue(password);

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.confirmPassword).toBe(password);
    });
  });

  it("should call 'onSubmitHandler' when form submitted", async () => {
    const onSubmitHandler = vi.spyOn(wrapper.vm, "onSubmitHandler");
    await wrapper.find("form").trigger("submit");

    expect(onSubmitHandler).toHaveBeenCalled();
  });

  it("should call 'register' action when form submitted", async () => {
    await wrapper.find("form").trigger("submit");

    expect(wrapper.vm.authUserStore.register).toHaveBeenCalled();
  });
});
