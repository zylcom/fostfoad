import { onMounted, onUnmounted, unref } from "vue";

export function useHideOnScroll(target) {
  let prevScrollpos = window.scrollY;

  function scrollHandler() {
    const currentScrollpos = window.scrollY;
    const targetElement = unref(target);

    if (
      prevScrollpos > currentScrollpos ||
      window.innerHeight >= document.body.scrollHeight
    ) {
      targetElement.style.top = "0";
    } else {
      targetElement.style.top = "-65px";
    }

    prevScrollpos = currentScrollpos;
  }

  onMounted(() => {
    window.addEventListener("scroll", scrollHandler);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", scrollHandler);
  });
}
