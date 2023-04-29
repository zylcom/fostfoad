import { mount } from "@vue/test-utils";
import LoginInput from "@/components/LoginInput.vue";

describe("LoginInput.vue Test", () => {
  const email = "example@email.com";
  const password = "password";
  const error = { message: "Invalid credentials!" };
  const wrapper = mount(LoginInput);

  it("should call 'onSubmitHandler' when form is submitted", async () => {
    const onSubmitHandler = vi.spyOn(wrapper.vm, "onSubmitHandler");

    await wrapper.find("button[type='submit']").trigger("submit");

    expect(onSubmitHandler).toHaveBeenCalled();
  });

  test("if email input filled, email ref will have same value", async () => {
    await wrapper.find("input[type='email']").setValue(email);

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.email).toBe(email);
    });
  });

  test("if password input filled, password ref will have same value", async () => {
    await wrapper.find("input[type='password']").setValue(password);

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.password).toBe(password);
    });
  });

  it("should call 'login' action with email and password when form submitted", async () => {
    await wrapper.find("button[type='submit']").trigger("submit");

    expect(wrapper.vm.authUserStore.login).toBeCalledWith(email, password);
  });

  it("should display error message when error not null", () => {
    wrapper.vm.errorStore.error = error;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find("span").text()).toBe(error.message);
    });
  });

  test("if error not null, input should have red border", () => {
    expect(wrapper.find("input[type='email']").classes()).toContain(
      "border",
      "border-red-400"
    );
  });
});
