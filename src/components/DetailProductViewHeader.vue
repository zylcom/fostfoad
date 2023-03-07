<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import BackButton from "./BackButton.vue";
import CartButton from "./CartButton.vue";
import { useAuthUserStore } from "../stores/authUser";
import { hideElementWhenScrollDown } from "../utils";

const props = defineProps({ product: Object, loading: Boolean });

const authUserStore = useAuthUserStore();
const authUser = authUserStore.getAuthUser;
const navBar = ref(null);
const product = computed(() => props.product);

function onScrollHandler() {
  hideElementWhenScrollDown(navBar);
}

onMounted(() => {
  window.addEventListener("scroll", onScrollHandler);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScrollHandler);
});
</script>

<template>
  <header class="inline">
    <nav
      class="fixed z-30 flex w-full justify-between px-6 pt-5 pb-3 backdrop-blur-md transition-all duration-500"
      ref="navBar"
    >
      <BackButton />

      <CartButton v-if="authUser" />
    </nav>

    <div
      class="sticky top-0 after:absolute after:left-0 after:top-0 after:z-10 after:inline-block after:h-full after:w-full after:bg-gradient-to-b after:from-black/80 after:content-['']"
    >
      <div
        class="relative h-0 w-full bg-explosive-grey pt-[66.7%] shadow-md"
        v-if="!loading && product !== null"
      >
        <img
          src="https://picsum.photos/1920/1280.webp"
          :alt="product.name"
          class="absolute top-0 left-0 block max-h-screen w-full object-cover object-center shadow-md"
          loading="lazy"
          v-if="product !== null"
        />
      </div>
    </div>
  </header>
</template>
