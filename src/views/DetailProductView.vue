<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import BackButton from "../components/BackButton.vue";
import CartButton from "../components/CartButton.vue";
import IconLove from "../components/icons/IconLove.vue";
import ReviewCard from "../components/ReviewCard.vue";
import { allStore } from "../stores";
import { formatNumberToIDR } from "../utils";

const route = useRoute();
const productSlug = route.params.slug;

const { loadingStore, productDetailStore } = allStore();

const loading = computed(() => loadingStore.isLoading);
const product = computed(() => productDetailStore.product);

const quantity = ref(1);
const navBar = ref(null);
const total = computed(() =>
  formatNumberToIDR(product.value.price * quantity.value)
);
const formattedPrice = computed(() => formatNumberToIDR(product.value.price));
let prevScrollpos = window.scrollY;

function scrollHandler() {
  const currentScrollpos = window.scrollY;

  if (prevScrollpos > currentScrollpos) {
    navBar.value.style.top = "0";
  } else if (product.value?.name) {
    navBar.value.style.top = "-65px";
  }

  prevScrollpos = currentScrollpos;
}

function onInputQuantity(e) {
  quantity.value = parseInt(Math.abs(e.target.value));
}

onMounted(() => {
  productDetailStore.fetchProductDetail(productSlug);
  window.addEventListener("scroll", scrollHandler);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollHandler);
});
</script>

<template>
  <header class="inline">
    <nav
      class="fixed z-30 flex w-full justify-between px-6 pt-5 pb-3 backdrop-blur-md transition-all duration-500"
      :class="{ 'top-0': product === null }"
      ref="navBar"
    >
      <BackButton path="/menu" />

      <CartButton />
    </nav>

    <div
      class="sticky top-0 after:absolute after:left-0 after:top-0 after:z-10 after:inline-block after:h-full after:w-full after:bg-gradient-to-b after:from-black/80 after:content-['']"
    >
      <img
        src="https://picsum.photos/1920/1280.webp"
        :alt="product.name"
        class="block max-h-screen w-full object-cover object-center shadow-md"
        loading="lazy"
        v-if="product !== null"
      />
    </div>
  </header>

  <div
    class="flex h-screen items-center justify-center bg-zhen-zhu-bai-pearl"
    v-if="loading"
  >
    <strong class="text-2xl">Loading...</strong>
  </div>

  <div
    class="flex h-screen items-center justify-center bg-zhen-zhu-bai-pearl"
    v-else-if="product === null"
  >
    <strong class="text-2xl">Product Not Found!</strong>
  </div>

  <main
    class="relative z-20 -translate-y-5 rounded-t-2xl bg-zhen-zhu-bai-pearl px-6 pt-12 pb-5"
    v-else
  >
    <div class="flex items-center justify-between pb-5">
      <h1 class="text-2xl font-medium text-dark-tone-ink">
        {{ product.name }}
      </h1>
      <button><IconLove /></button>
    </div>

    <h4 class="text-sm text-dark-tone-ink">Ingredients</h4>
    <p class="text-xs text-gray-500">
      {{ product.ingredients }}
    </p>

    <div class="flex flex-col gap-y-6 pt-6 text-sm">
      <p class="font-medium">
        Price: <span class="font-normal">{{ formattedPrice }}</span>
      </p>

      <div class="flex items-center gap-x-2">
        <span class="text-sm">Quantity:</span>

        <input
          class="border-b border-b-torii-red bg-transparent font-rubik text-sm focus:outline-none focus:ring-0"
          min="1"
          :value="quantity"
          @input="onInputQuantity"
          type="number"
        />
      </div>

      <p class="font-medium">
        Total: <span class="break-words font-normal">{{ total }}</span>
      </p>
    </div>

    <button
      class="my-6 w-full rounded-lg py-2 font-rubik"
      :class="
        quantity >= 1
          ? 'bg-torii-red text-charolais-cattle'
          : 'cursor-not-allowed bg-mercury text-gray-500'
      "
      :disabled="quantity >= 1 ? false : true"
    >
      Add to cart
    </button>

    <div>
      <h4 class="pb-6 text-sm text-dark-tone-ink">Reviews</h4>
      <div class="review-list flex flex-col gap-y-6">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  </main>
</template>
