import { mount } from "@vue/test-utils";
import LoginInput from "@/components/LoginInput.vue";
import { nextTick } from "vue";

describe("LoginInput.vue Test", () => {
  const username = "username";
  const password = "password";
  const wrapper = mount(LoginInput);

  it("should call 'onSubmitHandler' when form is submitted", async () => {
    const onSubmitHandler = vi.spyOn(wrapper.vm, "onSubmitHandler");

    await wrapper.find("input[type='text']").setValue(username);
    await wrapper.find("input[type='password']").setValue(password);
    await wrapper.find("button[type='submit']").trigger("submit");

    await nextTick();

    expect(onSubmitHandler).toHaveBeenCalled();
  });

  it("should have value username", async () => {
    await wrapper.find("input[type='text']").setValue(username);

    await nextTick();

    expect(wrapper.vm.username).toBe(username);
  });

  it("should have value password", async () => {
    await wrapper.find("input[type='password']").setValue(password);

    await nextTick();

    expect(wrapper.vm.password).toBe(password);
  });
});
