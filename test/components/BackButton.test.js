import { mount } from "@vue/test-utils";
import BackButton from "@/components/BackButton.vue";

describe("BackButton.vue Test", () => {
  it("should call 'goBack' function", async () => {
    const wrapper = mount(BackButton);

    const goBack = vi.spyOn(wrapper.vm, "goBack");

    await wrapper.get("button").trigger("click");

    expect(goBack).toHaveBeenCalled();
  });
});
