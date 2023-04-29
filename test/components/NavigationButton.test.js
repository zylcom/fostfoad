import { RouterLinkStub, mount } from "@vue/test-utils";
import NavigationButton from "@/components/NavigationButton.vue";

describe("NavigationButton.vue Test", () => {
  const path = "/menu";
  const pathName = "Menu";
  const wrapper = mount(NavigationButton, {
    global: { stubs: { RouterLink: RouterLinkStub } },
    props: { path, pathName },
  });

  it("should render 'RouterLink' component", () => {
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe(path);
  });

  it("should display 'pathName' text", () => {
    expect(wrapper.find("span").text()).toBe(pathName);
  });

  it("should call 'navigation' function when button is clicked", async () => {
    const navigation = vi.spyOn(wrapper.vm, "navigation");

    await wrapper.find("button").trigger("click");

    wrapper.vm.$nextTick(() => {
      expect(navigation).toHaveBeenCalled();
    });
  });
});
